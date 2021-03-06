---
layout:     post
title:      "Windows10 开机自启动 Linux 子系统和 ssh 服务"
date:       2018-12-13 10:12:31 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>win10 中的 Linux 子系统默认无法开机自启动，并且 ssh 服务也需要每次启动 bash 后手动启动，这里使用两个脚本来让 Linux 子系统在系统启动时也自行启动，并且将 ssh 服务打开。</p><h1><strong>win10 配置</strong></h1><ul><li>创建一个批处理脚本<code style="background-color: rgb(251, 247, 248); color: rgb(255, 118, 0);">wslstartup.bat</code>，写入如下内容：</li><li><strong>复制</strong></li></ul><pre class="ql-syntax" spellcheck="false">powershell.exe -WindowStyle Hidden -c "bash /init.sh "
</pre><ul><li class="ql-indent-1">这里表示隐藏窗口启动 Linux 子系统，并执行<code style="background-color: rgb(251, 247, 248); color: rgb(255, 118, 0);">/init.sh</code>shell 脚本。</li><li>打开运行，输入<code style="background-color: rgb(251, 247, 248); color: rgb(255, 118, 0);">shell:startup</code>回车，打开 windows 启动文件夹，将创建的批处理脚本移动进去。</li></ul><h1><strong>Linux 子系统配置</strong></h1><ul><li>在根目录创建<code style="background-color: rgb(251, 247, 248); color: rgb(255, 118, 0);">init.sh</code>shell 脚本，写入以下内容：</li><li><strong>复制</strong></li></ul><pre class="ql-syntax" spellcheck="false">#!/bin/bash
pn=$(ps aux | grep -v grep |grep sshd|wc -l)
if [ "${pn}" != "0" ]; then
    pid=$(ps aux|grep -v grep|grep /usr/sbin/sshd|awk '{print $2}')
    echo "123456" | sudo -S kill $pid
fi
echo "123456" | sudo -S /usr/sbin/service ssh start
</pre><ul><li class="ql-indent-1">其中<code style="background-color: rgb(251, 247, 248); color: rgb(255, 118, 0);">echo</code>的内容为默认登陆用户的登陆密码。</li><li>更改脚本权限，和更改属主和属组为默认用户：</li><li><strong>复制</strong></li></ul><pre class="ql-syntax" spellcheck="false"># chmod 755 /init.sh
# chown user:user /init.sh
</pre><ul><li>配置完成后，下次开机就可以自启动 Linux 子系统，并且将 ssh 服务启动，我们就可以在 xshell 等软件中登陆子系统了。</li></ul><p><br></p>