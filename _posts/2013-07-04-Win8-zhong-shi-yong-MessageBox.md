---
layout:     post
title:      "Win8中使用MessageBox"
date:       2013-07-04 15:17:37 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p>
	在Win8商店应用中是没有MessageBox的，弹出对话框可以用下面的方式实现：
</p>
<pre class="prettyprint lang-cs">private async void CancelCommandButton_Click(object sender, RoutedEventArgs e)
{
    // Create the message dialog and set its content
    var messageDialog = new MessageDialog("No internet connection has been found.");

    // Add commands and set their callbacks; both buttons use the same callback function instead of inline event handlers
    messageDialog.Commands.Add(new UICommand(
        "Try again", 
        new UICommandInvokedHandler(this.CommandInvokedHandler)));
    messageDialog.Commands.Add(new UICommand(
        "Close", 
        new UICommandInvokedHandler(this.CommandInvokedHandler)));

    // Set the command that will be invoked by default
    messageDialog.DefaultCommandIndex = 0;

    // Set the command to be invoked when escape is pressed
    messageDialog.CancelCommandIndex = 1;

    // Show the message dialog
    await messageDialog.ShowAsync();
}

private void CommandInvokedHandler(IUICommand command)
{
    // Display message showing the label of the command that was invoked
    rootPage.NotifyUser("The '" + command.Label + "' command has been selected.", 
        NotifyType.StatusMessage);
}</pre>
当然了可以简单的封装成MessageBox：
<pre class="prettyprint lang-cs">public async static void Show(string str)
        {
            var messageDialog = new MessageDialog(str);
            await messageDialog.ShowAsync();
        }</pre>
以往的开发中我们常常会弹出一个模态对话框来等待用户的响应，silverlight中是使用MessageBox，但在Metro&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br />
UI中提供了一个全新的对话框MessageDialog，它是以异步方式弹出，你当然可以使用await来等待用户的响应，它还有一个更炫耀的功能就是可以在一个对话框让指定多个命令！你在以往往的开发中如果想实现类似的功能，是不是得自己实现？MessageDialog只提供了一个弹出方法：<br />
<br />
<span style="color:#0000FF;">public</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; IAsyncOperation&lt;IUICommand&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ShowAsync();<br />
<br />
（1）只有提示消息对话框<br />
<br />
使用一个构造函数的MessageDialog可以实例化一个对话框，然后以异步方式打开它，此时它会默认显示一个“关闭”按钮：<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MessageDialog&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; md = <span style="color:#0000FF;">new</span> MessageDialog(<span style="color:#800000;">"</span><span style="color:#800000;">保存成功，请注意查收。&lt;/span><span style="color:#800000;">"</span><span style="color:#000000;">);md.ShowAsync();</span><br />
<br />
效果图：<br />
<br />
<img width="895" height="116" alt="" src="http://pic002.cnblogs.com/images/2012/48455/2012091710502356.png" /><br />
<br />
（2）带有标题的对话框&lt;br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MessageDialog&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; md = <span style="color:#0000FF;">new</span> MessageDialog(<span style="color:#800000;">"</span><span style="color:#800000;">保存成功，请注意查收。&lt;/span><span style="color:#800000;">"</span>, <span style="color:#800000;">"</span><span style="color:#800000;">提示</span><span style="color:#800000;">"</span>);<br />
<br />
效果图：<br />
<br />
<img width="891" height="159" alt="" src="http://pic002.cnblogs.com/images/2012/48455/2012091710512836.png" /><br />
<br />
（3）指定自定义命令的对话框<br />
<br />
MessageDialog类有一个重要的成员，可以在当前对话框中呈现多个命令按钮：&lt;br />
<br />
<span style="color:#0000FF;">public</span> IList&lt;IUICommand&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Commands { <span style="color:#0000FF;">get</span>; }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br />
<br />
可以看到，只要你愿意，你可以向Commands注入多个命令，有意思吧？有一个已经实现了接口IUICommand的类UICommand，这个类就是对命令的处理，它不仅接收一个标签文本，还可以接收一个处理程序的委托UICommandInvokedHandler，UICommand类的构造函数有四个：&lt;br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000FF;">public</span><span style="color:#000000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; UICommand();</span><span style="color:#0000FF;">public</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; UICommand(<span style="color:#0000FF;">string</span><span style="color:#000000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; label);</span><span style="color:#0000FF;">public</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; UICommand(<span style="color:#0000FF;">string</span><span style="color:#000000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; label, UICommandInvokedHandler action);</span><span style="color:#0000FF;">public</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; UICommand(<span style="color:#0000FF;">string</span> label,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; UICommandInvokedHandler action, <span style="color:#0000FF;">object</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; commandId);<br />
<br />
来看一下如何注册命令的处理程序：&lt;br />
<br />
<br />
<br />
<a id="url_1" target="_blank"><img src="mhtml:file://C:\Users\shuai\Desktop\Win8中使用MessageBoxWin8开发 - 菜园子 - Powered by phpwind.mht!http://common.cnblogs.com/images/copycode.gif" border="0" /></a> 　　　　　　 MessageDialog md = <span style="color:#0000FF;">new</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; MessageDialog(<span style="color:#800000;">"</span><span style="color:#800000;">确定要提交当前数据吗？&lt;/span><span style="color:#800000;">"</span>, <span style="color:#800000;">"</span><span style="color:#800000;">询问</span><span style="color:#800000;">"</span><span style="color:#000000;">);md.Commands.Add(</span><span style="color:#0000FF;">new</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; UICommand(<span style="color:#800000;">"</span><span style="color:#800000;">确定</span><span style="color:#800000;">"</span>, cmd =&gt;<span style="color:#000000;">{Debug.WriteLine(</span><span style="color:#800000;">"</span><span style="color:#800000;">确定</span><span style="color:#800000;">"</span><span style="color:#000000;">);}));md.Commands.Add(</span><span style="color:#0000FF;">new</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; UICommand(<span style="color:#800000;">"</span><span style="color:#800000;">放弃</span><span style="color:#800000;">"</span>, cmd =&gt;<span style="color:#000000;">{Debug.WriteLine(</span><span style="color:#800000;">"</span><span style="color:#800000;">放弃</span><span style="color:#800000;">"</span><span style="color:#000000;">);}));md.ShowAsync();</span><br />
<br />
<a id="url_2" target="_blank"><img src="mhtml:file://C:\Users\shuai\Desktop\Win8中使用MessageBoxWin8开发 - 菜园子 - Powered by phpwind.mht!http://common.cnblogs.com/images/copycode.gif" border="0" /></a><br />
<br />
效果图：<br />
<br />
<img width="886" height="161" alt="" src="http://pic002.cnblogs.com/images/2012/48455/2012091710544419.png" /><br />
<br />
如果你觉得上面的处理还不过瘾，请看下面。&lt;br />
<br />
（4）使用具有命令Id的命令&lt;br />
<br />
细心的你一定能发现上面UICommand的最后一个构造函数：<br />
<br />
<span style="color:#0000FF;">public</span> UICommand(<span style="color:#0000FF;">string</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; label, UICommandInvokedHandler action, <span style="color:#0000FF;">object</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; commandId);<br />
<br />
最后一个参数可以指定命令的Id，也就是说，在下文中我们可以根据这个Id来进行不同的操作，这个object类型的Id允许你给它任意类型的数据。下面的代码我们取消了注册命令处理程序，而是为指定了命令Id：&lt;br />
<br />
<br />
<br />
<a id="url_3" target="_blank"><img src="mhtml:file://C:\Users\shuai\Desktop\Win8中使用MessageBoxWin8开发 - 菜园子 - Powered by phpwind.mht!http://common.cnblogs.com/images/copycode.gif" border="0" /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MessageDialog&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; md = <span style="color:#0000FF;">new</span> MessageDialog(<span style="color:#800000;">"</span><span style="color:#800000;">确定要提交当前数据吗？&lt;/span><span style="color:#800000;">"</span>, <span style="color:#800000;">"</span><span style="color:#800000;">询问</span><span style="color:#800000;">"</span><span style="color:#000000;">);md.Commands.Add(</span><span style="color:#0000FF;">new</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; UICommand(<span style="color:#800000;">"</span><span style="color:#800000;">确定</span><span style="color:#800000;">"</span>, <span style="color:#0000FF;">null</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:#800080;">0</span><span style="color:#000000;">));md.Commands.Add(</span><span style="color:#0000FF;">new</span> UICommand(<span style="color:#800000;">"</span><span style="color:#800000;">放弃</span><span style="color:#800000;">"</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:#0000FF;">null</span>, <span style="color:#800080;">1</span><span style="color:#000000;">));md.Commands.Add(</span><span style="color:#0000FF;">new</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; UICommand(<span style="color:#800000;">"</span><span style="color:#800000;">帮组</span><span style="color:#800000;">"</span>, <span style="color:#0000FF;">null</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:#800080;">2</span><span style="color:#000000;">));md.DefaultCommandIndex&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>= <span style="color:#800080;">0</span><span style="color:#000000;">;md.CancelCommandIndex&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>= <span style="color:#800080;">1</span><span style="color:#000000;">;</span><span style="color:#0000FF;">var</span> flg = <span style="color:#0000FF;">await</span><span style="color:#000000;"> md.ShowAsync();</span><span style="color:#008000;">//</span><span style="color:#008000;">var flg = md.ShowAsync();</span><span style="color:#0000FF;">switch</span><span style="color:#000000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (flg.Id){</span><span style="color:#0000FF;">case</span> <span style="color:#800080;">0</span><span style="color:#000000;">:</span><span style="color:#008000;">//</span><span style="color:#008000;">Do&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Something</span><span style="color:#0000FF;">break</span><span style="color:#000000;">;</span><span style="color:#0000FF;">case</span> <span style="color:#800080;">1</span><span style="color:#000000;">:</span><span style="color:#008000;">//</span><span style="color:#008000;">Do&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Something</span><span style="color:#0000FF;">break</span><span style="color:#000000;">;</span><span style="color:#0000FF;">case</span> <span style="color:#800080;">2</span><span style="color:#000000;">:</span><span style="color:#008000;">//</span><span style="color:#008000;">Go&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; to Help</span><span style="color:#0000FF;">break</span><span style="color:#000000;">;</span><span style="color:#0000FF;">default</span><span style="color:#000000;">:</span><span style="color:#0000FF;">break</span><span style="color:#000000;">;}</span><br />
<br />
<a id="url_4" target="_blank"><img src="mhtml:file://C:\Users\shuai\Desktop\Win8中使用MessageBoxWin8开发 - 菜园子 - Powered by phpwind.mht!http://common.cnblogs.com/images/copycode.gif" border="0" /></a><br />
<br />
<br />
<br />
在前面我们看到MessageDialog是以异步方式打开，所以我们可以根据需要获取ShowAsync()的响应结果，根据命令Id执行进一步的操作。使用DefaultCommandIndex指定当我们按下Enter键时响应的按钮，CancelCommandIndex指定当按下Esc键时应的按钮。&lt;img width="894" height="154" alt="" src="http://pic002.cnblogs.com/images/2012/48455/2012091710565216.png" /><br />
<br />
很遗憾的是MessageDialoge不能定义对话框的样式，&amp;nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 如何想创建更个性的对话框，可以使用Popup <br />
来模拟对话框，关于Popup这里就不再介绍了，感兴趣的可以去查找相关资料。
<p>
	&nbsp;
</p>