---
layout:     post
title:      "Win8商店程序应用程序栏和设置栏"
date:       2013-07-04 15:10:34 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<div class="read_h1" id="subject_11">
	SemanticZoom设置缩放视图
</div>
<div class="read_h1">
	<a href="http://msdn.microsoft.com/en-us/library/windows/apps/xaml/hh781234">http://msdn.microsoft.com/en-us/library/windows/apps/xaml/hh781234</a> 
</div>
<div class="read_h1">
	&nbsp;
</div>
SettingsPane.GetForCurrentView().CommandsRequested += onCommandsRequested;
<div class="read_h1">
	&nbsp;
</div>
<p>
	<a href="http://technet.microsoft.com/zh-cn/subscriptions/hh781234">http://technet.microsoft.com/zh-cn/subscriptions/hh781234</a> 
</p>
<p>
	&nbsp;
</p>
<pre class="prettyprint lang-cs">private void CreateAppBar()
        {
            this.BottomAppBar = null;
            AppBar bottomBar = new AppBar();
            StackPanel sp = new StackPanel() { Orientation = Orientation.Horizontal };

            Button btn1 = new Button();
            btn1.Content = "设置";
            btn1.Click += btn1_Click;
            sp.Children.Add(btn1);

            bottomBar.Content = sp;
            this.BottomAppBar = bottomBar;
        }

        void btn1_Click(object sender, RoutedEventArgs e)
        {
        }

        void onSettingsCommand(IUICommand command)
        {
            SettingsCommand settingsCommand = (SettingsCommand)command;
            if (settingsCommand.Label == "设置")
            {
            }
        }

        void onCommandsRequested(SettingsPane settingsPane, SettingsPaneCommandsRequestedEventArgs eventArgs)
        {
            UICommandInvokedHandler handler = new UICommandInvokedHandler(onSettingsCommand);
            SettingsCommand generalCommand = new SettingsCommand("Setting", "设置", handler);
            eventArgs.Request.ApplicationCommands.Clear();
            eventArgs.Request.ApplicationCommands.Add(generalCommand);
        }</pre>
<p>
	&nbsp;
</p>
<p>
	&nbsp;
</p>
<div class="read_h1">
	&nbsp;
</div>