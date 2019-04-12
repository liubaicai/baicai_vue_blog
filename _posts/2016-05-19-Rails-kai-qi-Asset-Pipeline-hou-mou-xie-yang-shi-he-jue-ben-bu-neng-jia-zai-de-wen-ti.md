---
layout:     post
title:      "Rails开启Asset Pipeline后，某些样式和脚本不能加载的问题"
date:       2016-05-19 04:20:04 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p><font color="#333333" face="Microsoft YaHei, Arial, sans-serif">Asset Pipeline 提供了一个框架，用于连接、压缩 JavaScript 和 CSS 文件。还允许使用其他语言和预处理器编写 JavaScript 和 CSS，例如 CoffeeScript、Sass 和 ERB。&lt;/font></p><p><font color="#333333" face="Microsoft YaHei, Arial, sans-serif">Rails种是默认开启Asset Pipeline的。&lt;/font></p><pre><font color="#333333" face="Microsoft YaHei, Arial, sans-serif">&lt;%= stylesheet_link_tag "application", media: "all" %&gt;<br></font><font color="#333333" face="Microsoft YaHei, Arial, sans-serif">&lt;%= javascript_include_tag "application" %&gt;</font></pre><p><font color="#333333" face="Microsoft YaHei, Arial, sans-serif">但是有时候，production环境下，样式什么的会失效。经过分析，我的失效原因是如下原因。&lt;/font></p><p><font color="#333333" face="Microsoft YaHei, Arial, sans-serif">application.js中，是默认引入turbolinks这个类库的。&lt;/font></p><p><font color="#333333" face="Microsoft YaHei, Arial, sans-serif">Turbolinks 为页面中所有的 &lt;a&gt; 元素添加了一个点击事件处理程序。如果浏览器支持 PushState，Turbolinks 会发起 Ajax 请求，处理响应，然后使用响应主体替换原始页面的整个 &lt;body&gt; 元素。最后，使用 PushState 技术更改页面的 URL，让新页面可刷新，并且有个精美的 URL。&lt;/font></p><p><font color="#333333" face="Microsoft YaHei, Arial, sans-serif">如果我们需要在页面加载时做一些事情。在 jQuery 中，我们可以这么写：</font></p><pre><font color="#333333" face="Microsoft YaHei, Arial, sans-serif">$(document).ready(xxxxx)</font></pre><p><font color="#333333" face="Microsoft YaHei, Arial, sans-serif">不过，因为 Turbolinks 改变了常规的页面加载流程，所以不会触发这个事件。如果编写了类似上面的代码，要将其修改为(以我的代码为例)：&lt;/font></p><pre><font color="#333333" face="Microsoft YaHei, Arial, sans-serif">$(document).on('page:change', function() {<br></font><font color="#333333" face="Microsoft YaHei, Arial, sans-serif">&nbsp; $('pre').each(function(i, block) {<br></font><font color="#333333" face="Microsoft YaHei, Arial, sans-serif">&nbsp; &nbsp; hljs.highlightBlock(block);<br></font><font color="#333333" face="Microsoft YaHei, Arial, sans-serif">&nbsp; });<br></font><font color="#333333" face="Microsoft YaHei, Arial, sans-serif">});</font></pre><p><font color="#333333" face="Microsoft YaHei, Arial, sans-serif">其他可用事件等详细信息，请参阅 <a href="https://github.com/rails/turbolinks/blob/master/README.md" target="_blank">Turbolinks</a> 的说明文件。&lt;/font></p><p></p><p></p><p></p>