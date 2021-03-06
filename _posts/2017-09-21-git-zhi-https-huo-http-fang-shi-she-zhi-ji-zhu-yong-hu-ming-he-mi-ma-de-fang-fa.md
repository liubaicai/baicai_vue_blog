---
layout:     post
title:      "git之https或http方式设置记住用户名和密码的方法"
date:       2017-09-21 08:12:24 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>https 方式每次都要输入密码，按照如下设置即可输入一次就不用再手输入密码的困扰而且又享受 https 带来的极速</p><p>设置记住密码（默认15分钟）：</p><pre class="ql-syntax" spellcheck="false">git config --global credential.helper cache
</pre><p>如果想自己设置时间，可以这样做：</p><pre class="ql-syntax" spellcheck="false">git config credential.helper 'cache --timeout=3600'
</pre><p>这样就设置一个小时之后失效</p><p>长期存储密码：</p><pre class="ql-syntax" spellcheck="false">git config --global credential.helper store
</pre><p><strong>增加远程地址的时候带上密码也是可以的。(推荐)</strong></p><pre class="ql-syntax" spellcheck="false">http://yourname:password@gitee.com/name/project.git
</pre><p>补充：使用客户端也可以存储密码的。</p><p>如果你正在使用ssh而且想体验https带来的高速，那么你可以这样做： 切换到项目目录下 ：</p><pre class="ql-syntax" spellcheck="false">cd projectfile/
</pre><p>移除远程ssh方式的仓库地址</p><pre class="ql-syntax" spellcheck="false">git remote rm origin
</pre><p>增加https远程仓库地址</p><pre class="ql-syntax" spellcheck="false">git remote add origin http://yourname:password@gitee.com/name/project.git
</pre><p><strong>Update:</strong></p><p>Git-for-Windows 默认带有&nbsp;<a href="https://github.com/Microsoft/Git-Credential-Manager-for-Windows" target="_blank" style="color: rgb(83, 124, 141);">Git-Credential-Manager-for-Windows</a></p><p>Linux 和 Mac 用户可以使用：&nbsp;<a href="https://github.com/Microsoft/Git-Credential-Manager-for-Mac-and-Linux" target="_blank" style="color: rgb(83, 124, 141);">Git-Credential-Manager-for-Mac-and-Linux</a></p><p>安装文档：&nbsp;<a href="https://github.com/Microsoft/Git-Credential-Manager-for-Mac-and-Linux/blob/master/Install.md" target="_blank" style="color: rgb(83, 124, 141);">https://github.com/Microsoft/Git-Credential-Manager-for-Mac-and-Linux/blob/master/Install.md</a></p><p>搞定，enjoy the speed！</p>