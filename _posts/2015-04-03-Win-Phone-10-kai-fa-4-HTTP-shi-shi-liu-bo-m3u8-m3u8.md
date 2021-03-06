---
layout:     post
title:      "Win(Phone)10开发第(4)弹，HTTP 实时流播放 m3u8"
date:       2015-04-03 07:09:53 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	其实这篇只有一句话，win10原生支持HLS啦
</p>

<pre class="brush:csharp;">
AdaptiveMediaSourceCreationResult amsResult = await AdaptiveMediaSource.CreateFromUriAsync(new Uri(&ldquo;http://xxxxx.m3u8&rdquo;, UriKind.Absolute));
AdaptiveMediaSource ams = amsResult.MediaSource;
mediaElement.SetMediaStreamSource(ams);</pre>

<p>
	MSDN如是说：
</p>

<p>
	你可以使用新的 <a href="https://msdn.microsoft.com/library/windows/apps/windows.media.streaming.adaptive.adaptivemediasource.aspx"><font color="#0066cc">AdaptiveMediaSource</font></a> 类将自适应媒体流功能添加到你的应用。通过将对象指向流清单文件对其进行初始化。受支持的清单格式包括 HTTP 实时流 (HLS)、基于 HTTP 的动态自适应流 (DASH) 以及平滑流。一旦将对象绑定到 XAML 媒体元素，将开始自适应播放。可以在适当情况下查询和设置流的属性，例如可用比特率、最小和最大比特率。
</p>

<p>
	还一个关于&lt;strong>MediaElement&nbsp;</strong>的：
</p>

<p>
	在 Windows 10 上，<a href="https://msdn.microsoft.com/library/windows/apps/xaml/windows.ui.xaml.controls.mediaelement.aspx"><font color="#0066cc">MediaElement</font></a> 将播放包含多个流的内容，即使其中一个流具有错误解码，只要媒体内容包含至少一个有效流即可。例如，如果包含音频和视频流的内容中的视频流失败， <a href="https://msdn.microsoft.com/library/windows/apps/xaml/windows.ui.xaml.controls.mediaelement.partialmediafailuredetected.aspx"><font color="#0066cc">MediaElement</font></a> 仍将播放的音频流。 <a href="https://msdn.microsoft.com/library/windows/apps/xaml/windows.ui.xaml.controls.mediaelement.partialmediafailuredetected.aspx"><font color="#0066cc">PartialMediaFailureDetected</font></a> 会通知你流内的其中一个流无法解码。它还允许你知道哪种类型的流失败，以便你可以在 UI 中反映该信息。如果在媒体流内的所有流失败， 将引发 <a href="https://msdn.microsoft.com/library/windows/apps/xaml/windows.ui.xaml.controls.mediaelement.mediafailed.aspx"><font color="#0066cc">MediaFailed</font></a> 事件。
</p>