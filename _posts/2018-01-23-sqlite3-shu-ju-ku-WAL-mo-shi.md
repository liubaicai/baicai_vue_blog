---
layout:     post
title:      "sqlite3数据库WAL模式"
date:       2018-01-23 09:22:34 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>与delete模式相比，WAL模式在大部分情况下更快，并发性更好，读和写之间互不阻塞。但WAL会产生数个日志文件，百万条级别数据库读写性能降低（似乎）。</p><p><br></p><p><strong>一、什么是WAL？</strong></p><p>WAL的全称是Write Ahead Logging，它是很多数据库中用于实现原子事务的一种机制，SQLite在3.7.0版本引入了该特性。</p><p><strong>二、WAL如何工作？</strong></p><p>在引入WAL机制之前，SQLite使用rollback journal机制实现原子事务。</p><p>rollback journal机制的原理是：在修改数据库文件中的数据之前，先将修改所在分页中的数据备份在另外一个地方，然后才将修改写入到数据库文件中；如果事务失败，则将备份数据拷贝回来，撤销修改；如果事务成功，则删除备份数据，提交修改。</p><p>WAL机制的原理是：修改并不直接写入到数据库文件中，而是写入到另外一个称为WAL的文件中；如果事务失败，WAL中的记录会被忽略，撤销修改；如果事务成功，它将在随后的某个时间被写回到数据库文件中，提交修改。</p><p>同步WAL文件和数据库文件的行为被称为checkpoint（检查点），它由SQLite自动执行，默认是在WAL文件积累到1000页修改的时候；当然，在适当的时候，也可以手动执行checkpoint，SQLite提供了相关的接口。执行checkpoint之后，WAL文件会被清空。</p><p>在读的时候，SQLite将在WAL文件中搜索，找到最后一个写入点，记住它，并忽略在此之后的写入点（这保证了读写和读读可以并行执行）；随后，它确定所要读的数据所在页是否在WAL文件中，如果在，则读WAL文件中的数据，如果不在，则直接读数据库文件中的数据。</p><p>在写的时候，SQLite将之写入到WAL文件中即可，但是必须保证独占写入，因此写写之间不能并行执行。</p><p>WAL在实现的过程中，使用了共享内存技术，因此，所有的读写进程必须在同一个机器上，否则，无法保证数据一致性。</p><p><strong>三、WAL的优点与缺点</strong></p><p>优点：</p><p>1.读和写可以完全地并发执行，不会互相阻塞（但是写之间仍然不能并发）。</p><p>2.WAL在大多数情况下，拥有更好的性能（因为无需每次写入时都要写两个文件）。</p><p>3.磁盘I/O行为更容易被预测。</p><p>缺点：</p><p>1.访问数据库的所有程序必须在同一主机上，且支持共享内存技术。</p><p>2.每个数据库现在对应3个文件：&lt;yourdb&gt;.db，&lt;yourdb&gt;-wal，&lt;yourdb&gt;-shm。</p><p><strong><u>3.当写入数据达到GB级的时候，数据库性能将下降。</u></strong></p><p>4.3.7.0之前的SQLite无法识别启用了WAL机制的数据库文件。</p><p><strong>四、WAL引入的兼容性问题</strong></p><p>在启用了WAL之后，数据库文件格式的版本号由1升级到了2，因此，3.7.0之前的SQLite无法识别启用了WAL机制的数据库文件。</p><p>禁用WAL会使数据库文件格式的版本号恢复到1，从而可以被SQLite 3.7.0之前的版本识别。</p><p><strong>五、WAL引入的性能问题</strong></p><p>在一般情况下，WAL会提高SQLite的事务性能；但是在某些极端情况下，却会导致SQLite事务性能的下降。</p><p>1.在事务执行时间较长或者要修改的数据量达到GB级的时候，WAL文件会被占用，它会暂时阻止checkpoint的执行（checkpoint会清空WAL文件），这将导致WAL文件变得很大，增加寻址时间，最终导致读写性能的下降。</p><p>2.当checkpoint执行的时候，会降低当时的读写性能，因此，WAL可能会导致周期性的性能下降。</p><p><strong>六、与WAL相关的PRAGMA和接口</strong></p><p>代码如下:</p><pre class="ql-syntax" spellcheck="false">PRAGMA journal_mode
PRAGMA wal_checkpoint
PRAGMA wal_autocheckpoint
sqlite3_wal_checkpoint
sqlite3_wal_autocheckpoint
sqlite3_wal_hook
</pre><p><br></p><pre class="ql-syntax" spellcheck="false">数据库只有在事务中才能被更改。所有更改数据库的命令（除SELECT以外的所有SQL命令）都会自动开启一个新事务，并且当最后一个查询完成时自动提交。
而BEGIN命令可以手动开始事务，并关闭自动提交。当下一条COMMIT命令执行时，自动提交再次打开，事务中所做的更改也被写入数据库。当COMMIT失败时，自动提交仍然关闭，以便让用户尝试再次提交。若执行的是ROLLBACK命令，则也打开自动提交，但不保存事务中的更改。关闭数据库或遇到错误时，也会自动回滚事务。
经常有人抱怨SQLite的插入太慢，实际上它可以做到每秒插入几万次，但是每秒只能提交几十次事务。因此在插入大批数据时，可以通过禁用自动提交来提速。
事务在改写数据库文件时，会先生成一个rollback journal（回滚日志），记录初始状态（其实就是备份），所有改动都是在数据库文件上进行的。当事务需要回滚时，可以将备份文件的内容还原到数据库文件；提交成功时，默认的delete模式下会直接删除这个日志。这个日志也可以帮助解决事务执行过程中断电，导致数据库文件损坏的问题。但如果操作系统或文件系统有bug，或是磁盘损坏，则仍有可能无法恢复。
而从3.7.0版本（对应iOS 4.3）开始，SQLite还提供了Write-Ahead Logging模式。与delete模式相比，WAL模式在大部分情况下更快，并发性更好，读和写之间互不阻塞；而其缺点对于iPhone这种嵌入式设备来说可以忽略，只需注意不要以只读方式打开WAL模式的数据库即可。
使用WAL模式时，改写操是附加（append）到WAL文件，而不改动数据库文件，因此数据库文件可以被同时读取。当执行checkpoint操作时，WAL文件的内容会被写回数据库文件。当WAL文件达到SQLITE_DEFAULT_WAL_AUTOCHECKPOINT（默认值是1000）页（默认大小是1KB）时，会自动使用当前COMMIT的线程来执行checkpoint操作。也可以关闭自动checkpoint，改为手动定期checkpoint。
为了避免读取的数据不一致，查询时也需要读取WAL文件，并记录一个结尾标记（end mark）。这样的代价就是读取会变得稍慢，但是写入会变快很多。要提高查询性能的话，可以减小WAL文件的大小，但写入性能也会降低。
需要注意的是，低版本的SQLite不能读取高版本的SQLite生成的WAL文件，但是数据库文件是通用的。这种情况在用户进行iOS降级时可能会出现，可以把模式改成delete，再改回WAL来修复。
要对一个数据库连接启用WAL模式，需要执行“PRAGMA journal_mode=WAL;”这条命令，它的默认值是“journal_mode=DELETE”。执行后会返回新的journal_mode字符串值，即成功时为"wal"，失败时为之前的模式（例如"delete"）。一旦启用WAL模式后，数据库会保持这个模式，这样下次打开数据库时仍然是WAL模式。
要停止自动checkpoint，可以使用wal_autocheckpoint指令或sqlite3_wal_checkpoint()函数。手动执行checkpoint可以使用wal_checkpoint指令或sqlite3_wal_checkpoint()函数。
</pre><p><br></p>