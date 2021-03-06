---
layout:     post
title:      "向WindowsPhone手机Toast推送通知"
date:       2013-09-15 13:42:57 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	启动带参数的进程，将推送信息传递过去：
</p>

<pre class="brush:csharp;">
PushMsg msg = new PushMsg(appid, title, content);
Push push = new Push();
Thread t = new Thread(new ParameterizedThreadStart(push.PushToast));
t.IsBackground = true;
t.Start(msg);</pre>

<pre class="brush:csharp;">
public class Push
{
&nbsp;&nbsp;&nbsp; public void PushToast(Object o)
&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; try
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PushMsg msg = o as PushMsg;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; List&lt;string&gt; urllist = MySqlDB.GetPushUrls(msg.appid);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; foreach (var item in urllist)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; try
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SendToastNotification(getPushXml(msg), item);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; catch { }
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; catch { }
&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp; private void SendToastNotification(byte[] Payload, string url)
&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // The URI that the Push Notification Service returns to the Push Client when creating a notification channel.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; HttpWebRequest sendNotificationRequest = (HttpWebRequest)WebRequest.Create(url);

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // HTTP POST is the only allowed method to send the notification.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sendNotificationRequest.Method = WebRequestMethods.Http.Post;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // The optional custom header X-MessageID uniquely identifies a notification message. If it is present, the 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // same value is returned in the notification response. It must be a string that contains a UUID.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sendNotificationRequest.Headers["X-MessageID"] = Guid.NewGuid().ToString();

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Sets toast notification
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sendNotificationRequest.ContentType = "text/xml; charset=utf-8";
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sendNotificationRequest.Headers.Add("X-WindowsPhone-Target", "toast");
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sendNotificationRequest.Headers.Add("X-NotificationClass", "2");
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Possible batching interval values:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // 2: The message is delivered by the Push Notification Service immediately.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // 12: The message is delivered by the Push Notification Service within 450 seconds.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // 22: The message is delivered by the Push Notification Service within 900 seconds.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Sets the web request content length.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; sendNotificationRequest.ContentLength = Payload.Length;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Sets the notification payload to send.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; byte[] notificationMessage = Payload;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Sends the notification.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; using (Stream requestStream = sendNotificationRequest.GetRequestStream())
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; requestStream.Write(notificationMessage, 0, notificationMessage.Length);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Gets the response.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; HttpWebResponse response = (HttpWebResponse)sendNotificationRequest.GetResponse();
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; string notificationStatus = response.Headers["X-NotificationStatus"];
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; string notificationChannelStatus = response.Headers["X-SubscriptionStatus"];
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; string deviceConnectionStatus = response.Headers["X-DeviceConnectionStatus"];
&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp; private byte[] getPushXml(PushMsg msg)
&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; string toastMessage = "&lt;?xml version=\"1.0\" encoding=\"utf-8\"?&gt;" +
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "&lt;wp:Notification xmlns:wp=\"WPNotification\"&gt;" +
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "&lt;wp:Toast&gt;" +
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "&lt;wp:Text1&gt;" + (msg.title == null ? "" : msg.title) + "&lt;/wp:Text1&gt;" +
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "&lt;wp:Text2&gt;" + msg.content + "&lt;/wp:Text2&gt;" +
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "&lt;/wp:Toast&gt;" +
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "&lt;/wp:Notification&gt;";
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; byte[] strBytes = new UTF8Encoding().GetBytes(toastMessage);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return strBytes;
&nbsp;&nbsp;&nbsp; }
}

public class PushMsg
{
&nbsp;&nbsp;&nbsp; public string appid { get; set; }
&nbsp;&nbsp;&nbsp; public string title { get; set; }
&nbsp;&nbsp;&nbsp; public string content { get; set; }

&nbsp;&nbsp;&nbsp; public PushMsg(string appid, string title, string content)
&nbsp;&nbsp;&nbsp; {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.appid = appid;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.title = title;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.content = content;
&nbsp;&nbsp;&nbsp; }
}</pre>

<p>
	实际应用中需要考虑出错重试/抛弃机制以及多线程实现以加快推送速度。
</p>