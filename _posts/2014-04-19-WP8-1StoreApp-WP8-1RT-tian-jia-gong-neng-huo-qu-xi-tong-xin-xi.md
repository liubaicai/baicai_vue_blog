---
layout:     post
title:      "WP8.1StoreApp(WP8.1RT)---添加推送功能和获取系统信息"
date:       2014-04-19 11:43:06 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	添加推送通知
</p>

<p>
	1:Package.appxmanifest中的声明添加后台任务的推送通知权限
</p>

<p>
	2:var channel = await PushNotificationChannelManager.CreatePushNotificationChannelForApplicationAsync();
</p>

<p>
	3:添加适合自己的处理逻辑，收工
</p>

<p>
	获取手机系统信息
</p>

<p>
	1:大部分的系统信息都在EasClientDeviceInformation类中
</p>

<p>
	2:大部分的应用信息都在Package.Current.Id中
</p>

<p>
	3:系统版本OSVersion在Environment中，但是不知道是8.1被移除了还是bug，这个消失了
</p>