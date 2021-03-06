---
layout:     post
title:      "Unix时间戳(Unix timestamp)工具"
date:       2015-10-08 03:59:11 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<h2>
	<script src="http://dup.baidustatic.com/painter/clb/fixed7o.js" charset="utf-8" async=""></script><script src="http://cb.baidu.com/ecom?di=1033281&amp;dcb=BAIDU_DUP_define&amp;dtm=BAIDU_DUP2_SETJSONADSLOT&amp;dbv=0&amp;dci=2&amp;dri=0&amp;dis=0&amp;dai=2&amp;dds=&amp;drs=1&amp;dvi=1442225175&amp;ltu=http%3A%2F%2Ftool.chinaz.com%2FTools%2Funixtime.aspx&amp;liu=&amp;ltr=&amp;lcr=&amp;ps=153x1053&amp;psr=1920x1080&amp;par=1920x1050&amp;pcs=1206x758&amp;pss=1206x2637&amp;pis=-1x-1&amp;cfv=18&amp;ccd=24&amp;chi=2&amp;cja=true&amp;cpl=2&amp;cmi=4&amp;cce=true&amp;col=zh-CN&amp;cec=utf-8&amp;cdo=-1&amp;tsr=68&amp;tlm=1444275718&amp;tcn=1444275718&amp;tpr=1444275718177&amp;dpt=none&amp;coa=&amp;dpr=1&amp;ti=Unix%E6%97%B6%E9%97%B4%E6%88%B3(Unix%20timestamp)%E8%BD%AC%E6%8D%A2%E5%B7%A5%E5%85%B7%20-%20%E7%AB%99%E9%95%BF%E5%B7%A5%E5%85%B7&amp;baidu_id=" charset="utf-8" async=""></script><script src="http://cb.baidu.com/ecom?di=1033280&amp;dcb=BAIDU_DUP_define&amp;dtm=BAIDU_DUP2_SETJSONADSLOT&amp;dbv=0&amp;dci=2&amp;dri=0&amp;dis=0&amp;dai=1&amp;dds=&amp;drs=1&amp;dvi=1442225175&amp;ltu=http%3A%2F%2Ftool.chinaz.com%2FTools%2Funixtime.aspx&amp;liu=&amp;ltr=&amp;lcr=&amp;ps=153x153&amp;psr=1920x1080&amp;par=1920x1050&amp;pcs=1206x758&amp;pss=1206x2637&amp;pis=-1x-1&amp;cfv=18&amp;ccd=24&amp;chi=2&amp;cja=true&amp;cpl=2&amp;cmi=4&amp;cce=true&amp;col=zh-CN&amp;cec=utf-8&amp;cdo=-1&amp;tsr=64&amp;tlm=1444275718&amp;tcn=1444275718&amp;tpr=1444275718177&amp;dpt=none&amp;coa=&amp;dpr=1&amp;ti=Unix%E6%97%B6%E9%97%B4%E6%88%B3(Unix%20timestamp)%E8%BD%AC%E6%8D%A2%E5%B7%A5%E5%85%B7%20-%20%E7%AB%99%E9%95%BF%E5%B7%A5%E5%85%B7&amp;baidu_id=" charset="utf-8" async=""></script><span style="color:#FF0000;">如何在不同编程语言中获取现在的Unix时间戳(Unix timestamp)？&lt;/span>
</h2>

<table>
	<tbody>
		<tr>
			<td>
				Java
			</td>
			<td>
				time
			</td>
		</tr>
		<tr>
			<td>
				JavaScript
			</td>
			<td>
				Math.round(new Date().getTime()/1000)<br />
				getTime()返回数值的单位是毫秒
			</td>
		</tr>
		<tr>
			<td>
				Microsoft .NET / C#
			</td>
			<td>
				epoch = (DateTime.Now.ToUniversalTime().Ticks - 621355968000000000) / 10000000
			</td>
		</tr>
		<tr>
			<td>
				MySQL
			</td>
			<td>
				SELECT unix_timestamp(now())
			</td>
		</tr>
		<tr>
			<td>
				Perl
			</td>
			<td>
				time
			</td>
		</tr>
		<tr>
			<td>
				PHP
			</td>
			<td>
				time()
			</td>
		</tr>
		<tr>
			<td>
				PostgreSQL
			</td>
			<td>
				SELECT extract(epoch FROM now())
			</td>
		</tr>
		<tr>
			<td>
				Python
			</td>
			<td>
				先 import time 然后 time.time()
			</td>
		</tr>
		<tr>
			<td>
				Ruby
			</td>
			<td>
				获取Unix时间戳：Time.now 或 Time.new<br />
				显示Unix时间戳：Time.now.to_i
			</td>
		</tr>
		<tr>
			<td>
				SQL Server
			</td>
			<td>
				SELECT DATEDIFF(s, &#39;1970-01-01 00:00:00&#39;, GETUTCDATE())
			</td>
		</tr>
		<tr>
			<td>
				Unix / Linux
			</td>
			<td>
				date +%s
			</td>
		</tr>
		<tr>
			<td>
				VBScript / ASP
			</td>
			<td>
				DateDiff("s", "01/01/1970 00:00:00", Now())
			</td>
		</tr>
		<tr>
			<td>
				其他操作系统<br />
				(如果Perl被安装在系统中)
			</td>
			<td>
				命令行状态：perl -e "print time"
			</td>
		</tr>
	</tbody>
</table>

<h2>
	<span style="color:#FF0000;">如何在不同编程语言中实现Unix时间戳(<i>Unix timestamp</i>) &rarr; 普通时间？</span>
</h2>

<table>
	<tbody>
		<tr>
			<td>
				Java
			</td>
			<td>
				String date = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new java.util.Date(<u>Unix timestamp</u> * 1000))
			</td>
		</tr>
		<tr>
			<td>
				JavaScript
			</td>
			<td>
				先 var unixTimestamp = new Date(<u>Unix timestamp</u> * 1000) 然后 commonTime = unixTimestamp.toLocaleString()
			</td>
		</tr>
		<tr>
			<td>
				Linux
			</td>
			<td>
				date -d @<u>Unix timestamp</u>
			</td>
		</tr>
		<tr>
			<td>
				MySQL
			</td>
			<td>
				from_unixtime(<u>Unix timestamp</u>)
			</td>
		</tr>
		<tr>
			<td>
				Perl
			</td>
			<td>
				先 my $time = <u>Unix timestamp</u> 然后 my ($sec, $min, $hour, $day, $month, $year) = (localtime($time))[0,1,2,3,4,5,6]
			</td>
		</tr>
		<tr>
			<td>
				PHP
			</td>
			<td>
				date(&#39;r&#39;, <u>Unix timestamp</u>)
			</td>
		</tr>
		<tr>
			<td>
				PostgreSQL
			</td>
			<td>
				SELECT TIMESTAMP WITH TIME ZONE &#39;epoch&#39; + <u>Unix timestamp</u>) * INTERVAL &#39;1 second&#39;;
			</td>
		</tr>
		<tr>
			<td>
				Python
			</td>
			<td>
				先 import time 然后 time.gmtime(<u>Unix timestamp</u>)
			</td>
		</tr>
		<tr>
			<td>
				Ruby
			</td>
			<td>
				Time.at(<u>Unix timestamp</u>)
			</td>
		</tr>
		<tr>
			<td>
				SQL Server
			</td>
			<td>
				DATEADD(s, <u>Unix timestamp</u>, &#39;1970-01-01 00:00:00&#39;)
			</td>
		</tr>
		<tr>
			<td>
				VBScript / ASP
			</td>
			<td>
				DateAdd("s", <u>Unix timestamp</u>, "01/01/1970 00:00:00")
			</td>
		</tr>
		<tr>
			<td>
				其他操作系统<br />
				(如果Perl被安装在系统中)
			</td>
			<td>
				命令行状态：perl -e "print scalar(localtime(<u>Unix timestamp</u>))"
			</td>
		</tr>
	</tbody>
</table>

<h2>
	<span style="color:#FF0000;">如何在不同编程语言中实现普通时间 &rarr; Unix时间戳(<i>Unix timestamp</i>)？&lt;/span>
</h2>

<table>
	<tbody>
		<tr>
			<td>
				Java
			</td>
			<td>
				long epoch = new java.text.SimpleDateFormat("<u>dd/MM/yyyy HH:mm:ss</u>").parse("01/01/1970 01:00:00");
			</td>
		</tr>
		<tr>
			<td>
				JavaScript
			</td>
			<td>
				var commonTime = new Date(Date.UTC(<u>year</u>, <u>month</u> - 1, <u>day</u>, <u>hour</u>, <u>minute</u>, <u>second</u>))
			</td>
		</tr>
		<tr>
			<td>
				MySQL
			</td>
			<td>
				SELECT unix_timestamp(<u>time</u>)<br />
				时间格式: YYYY-MM-DD HH:MM:SS 或 YYMMDD 或 YYYYMMDD
			</td>
		</tr>
		<tr>
			<td>
				Perl
			</td>
			<td>
				先 use Time::Local 然后 my $time = timelocal($sec, $min, $hour, $day, $month, $year);
			</td>
		</tr>
		<tr>
			<td>
				PHP
			</td>
			<td>
				mktime(<u>hour</u>, <u>minute</u>, <u>second</u>, <u>month</u>, <u>day</u>, <u>year</u>)
			</td>
		</tr>
		<tr>
			<td>
				PostgreSQL
			</td>
			<td>
				SELECT extract(epoch FROM date(&#39;<u>YYYY-MM-DD HH:MM:SS</u>&#39;));
			</td>
		</tr>
		<tr>
			<td>
				Python
			</td>
			<td>
				先 import time 然后 int(time.mktime(time.strptime(&#39;<u>YYYY-MM-DD HH:MM:SS</u>&#39;, &#39;%Y-%m-%d %H:%M:%S&#39;)))
			</td>
		</tr>
		<tr>
			<td>
				Ruby
			</td>
			<td>
				Time.local(<u>year</u>, <u>month</u>, <u>day</u>, <u>hour</u>, <u>minute</u>, <u>second</u>)
			</td>
		</tr>
		<tr>
			<td>
				SQL Server
			</td>
			<td>
				SELECT DATEDIFF(s, &#39;1970-01-01 00:00:00&#39;, <u>time</u>)
			</td>
		</tr>
		<tr>
			<td>
				Unix / Linux
			</td>
			<td>
				date +%s -d"Jan 1, 1970 00:00:01"
			</td>
		</tr>
		<tr>
			<td>
				VBScript / ASP
			</td>
			<td>
				DateDiff("s", "01/01/1970 00:00:00", <u>time</u>)
			</td>
		</tr>
	</tbody>
</table>

<p>
	<!--EndFragment-->
</p>