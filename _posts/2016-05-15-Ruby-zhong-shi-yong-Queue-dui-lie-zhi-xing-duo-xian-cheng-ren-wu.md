---
layout:     post
title:      "Ruby中使用Queue队列执行多线程任务"
date:       2016-05-15 06:12:10 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p style="margin-bottom: 0px; padding: 0px; font-family: Arial;"><span style="font-family: Helvetica, Tahoma, Arial, sans-serif;">我们都知道啊，一个程序可能有多个进程组成，而一个进程也可以有多个线程并行运行。线程的并行运行，可以提高程序的运行效率，但也存在着很多的危险，可能出现多个线程抢占一个资源的情况。这里我们就以ruby为例来说一说线程在ruby当中的应用。&lt;/span></p><p style="margin-bottom: 0px; padding: 0px; font-family: Arial;"><br></p><p style="margin-bottom: 0px; padding: 0px; font-family: Arial;">在Ruby中，提供三种实现同步的方式，分别是：<br></p><p style="margin-bottom: 0px; padding: 0px; font-family: Arial;">1. 通过Mutex类实现线程同步&lt;/p><p style="margin-bottom: 0px; padding: 0px; font-family: Arial;">2. 监管数据交接的Queue类实现线程同步&lt;/p><p style="margin-bottom: 0px; padding: 0px; font-family: Arial;">3. 使用ConditionVariable实现同步控制</p><p style="margin-bottom: 0px; padding: 0px; font-family: Arial;"><br></p><p style="margin-bottom: 0px; padding: 0px; font-family: Arial;">这里，介绍下Queue的使用：</p><p style="margin-bottom: 0px; padding: 0px; font-family: Arial;">Queue是thread标准库里的一个类。&lt;br></p><p style="margin-bottom: 0px; padding: 0px; font-family: Arial;"><span style="color: rgb(36, 39, 41); font-family: Consolas, Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace, sans-serif; font-size: 13px; white-space: pre-wrap; background-color: rgb(239, 240, 241);"><br></span></p><pre>require 'thread'

queue = Queue.new
threads = []

# 添加工作单元，比如一堆下载列表，也可使用 queue.push(obj)push进去
queue &lt;&lt; work_unit

4.times do
  threads &lt;&lt; Thread.new do
    # 循环执行，直到队列为空
    until queue.empty?
      # 当取出为空时抛出异常
      work_unit = queue.pop(true) rescue nil
      if work_unit
        # 执行工作
      end
    end
    # 当任务队列进行完毕，就将结束
  end
end

# 等待所有线程执行完毕
threads.each { |t| t.join }</pre><p style="margin-bottom: 0px; padding: 0px; font-family: Arial;">最终运行，可以发现，已经多线程执行任务了，并且用到了四核心的处理器。&lt;/p><p style="margin-bottom: 0px; padding: 0px; font-family: Arial;"><img src="http://7xpagu.com1.z0.glb.clouddn.com/images/1463353765.jpg" style="width: 504px;"></p><p style="margin-bottom: 0px; padding: 0px; font-family: Arial;"><br></p>