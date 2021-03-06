---
layout:     post
title:      "Ruby中区分运行来源的方法"
date:       2018-01-12 17:10:44 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>当我们在写模块的时候，或多或少需要直接运行这个文件也可以执行一些方法，但是这样对于当这个模块被require或者include时，显得不好，在ruby里，有没有区分运行来自当前文件，还是被require的目标文件调用呢？</p><p><strong>Python可以</strong></p><p>比如像Python这样</p><p>代码如下:</p><pre class="ql-syntax" spellcheck="false">if __name__ == '__main__':
&nbsp;&nbsp;&nbsp;print "from direct running"
</pre><p><strong>Ruby当然也可以</strong></p><p>对于处处为程序员着想，拥有快乐编程理念的Ruby来说当然是可以区别的。其原理就是判断启动文件是否为模块的代码文件。</p><p>代码如下:</p><pre class="ql-syntax" spellcheck="false">if __FILE__ == $0
&nbsp;&nbsp;&nbsp;puts 'called from direct running'
end
</pre><p><strong>举个例子</strong></p><p>工具类模块utils.rb</p><p>代码如下:</p><pre class="ql-syntax" spellcheck="false">module Utils
&nbsp;&nbsp;&nbsp;class StringUtils
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;def self.test
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;puts "test method myfile=" + __FILE__ + ';load from ' +&nbsp;$0
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end
&nbsp;&nbsp;&nbsp;end
endif __FILE__ == $0
&nbsp;&nbsp;&nbsp;puts 'called from direct running'
&nbsp;&nbsp;&nbsp;Utils::StringUtils.test()
end
</pre><p>直接运行，结果,if条件成立，执行了输出</p><p>代码如下:</p><pre class="ql-syntax" spellcheck="false">20:04:37-androidyue~/rubydir/test$ ruby utils.rb
called from direct running
test method myfile=utils.rb;load from utils.rb
</pre><p>引用Utils的类test.rb</p><p>代码如下:</p><pre class="ql-syntax" spellcheck="false">require './utils'
Utils::StringUtils.test()
</pre><p>运行结果，引入模块的条件不成立，没有输出called from direct running</p><pre class="ql-syntax" spellcheck="false">代码如下:
20:08:07-androidyue~/rubydir/test$ ruby test.rb
test method myfile=/home/androidyue/rubydir/test/utils.rb;load from test.rb
</pre><p><br></p>