---
layout:     post
title:      "jquery字体大小点击切换保存cookie"
date:       2017-05-18 04:41:43 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<pre>&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"&gt;
&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
&lt;title&gt;jquery字体大小点击切换保存cookie支持大中小字体大小切换&lt;/title&gt;
&lt;meta name="description" content="jquery字体大小点击切换网页文本内容字号大中小改变且保存cookie,用户下次打开为之前最后设置状态" /&gt;

&lt;script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript"&gt;
function fontResizer(smallFont,medFont,largeFont){
	
	function clearSelected(){
		$(".smallFont").removeClass("curFont");
		$(".medFont").removeClass("curFont");
		$(".largeFont").removeClass("curFont");
	}
	
	function saveState(curSize){
		var date = new Date();
		date.setTime(date.getTime()+(7*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
		document.cookie = "fontSizer"+"="+curSize+expires+"; path=/";
	}

	$(".smallFont").click(function(){
		$('.fontsizebox').css('font-size', smallFont);
		clearSelected();
		$(".smallFont").addClass("curFont");
		saveState(smallFont);
	});

	$(".medFont").click(function(){
		$('.fontsizebox').css('font-size', medFont);
		clearSelected();
		$(".medFont").addClass("curFont");
		saveState(medFont);
	});

	$(".largeFont").click(function(){
		$('.fontsizebox').css('font-size', largeFont);
		clearSelected();
		$(".largeFont").addClass("curFont");
		saveState(largeFont);
	});

	function getCookie(c_name){
		if(document.cookie.length&gt;0){
			c_start=document.cookie.indexOf(c_name + "=");
			if (c_start!=-1){
				c_start=c_start + c_name.length+1;
				c_end=document.cookie.indexOf(";",c_start); 
				if(c_end==-1)c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
			}
		} 
		return "";
	}

	var savedSize = getCookie('fontSizer');

	if(savedSize!=""){
		$('.fontsizebox').css('font-size', savedSize);
		switch(savedSize){
			case smallFont: $(".smallFont").addClass("curFont");
			break;
			case medFont: $(".medFont").addClass("curFont");
			break;
			case largeFont: $(".largeFont").addClass("curFont");
			break;
			default: $(".medFont").addClass("curFont");
		}
	}else {
		$('.fontsizebox').css('font-size', medFont);
		$(".medFont").addClass("curFont");
	}
	
}
&lt;/script&gt;

&lt;script type="text/javascript"&gt;
$(document).ready(function() {
	fontResizer('12px','16px','22px');
});
&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;style type="text/css"&gt;
*{margin:0;padding:0;list-style-type:none;}
a,img{border:0;}
body{font-size:12px;}
.fontbox{width:800px;margin:0 auto;}
.fontbox h1,.fontbox h2{margin:10px 0;}
/* fontsizebox */
.fontsizebox p{line-height:22px;margin:20px 0 0 0;text-indent:2em;}
/* fontResizer */
.fontResizer{margin:10px 0;height:24px;}
.fontResizer a{display:block;float:left;width:17px;height:17px;text-align:center;border:1px solid #ccc;line-height:17px;color:#666;text-decoration:none;}
.fontResizer a:hover{color:#000;text-decoration:none;}
.smallFont{font-size:10px;}
.medFont{font-size:12px;}
.largeFont{font-size:14px;}
.curFont{background:#EEEEF7;}
&lt;/style&gt;


&lt;div class="fontbox"&gt;

	&lt;div class="fontResizer"&gt;
		&lt;a href="javascript:void(0);" class="smallFont"&gt;小&lt;/a&gt;&lt;a href="javascript:void(0);" class="medFont"&gt;中&lt;/a&gt;&lt;a href="javascript:void(0);" class="largeFont"&gt;大&lt;/a&gt;
	&lt;/div&gt;
	
	&lt;h1&gt;字体大小演示&lt;/h1&gt;
	&lt;h2&gt;点击“A”的链接调整字体&lt;/h2&gt;
	
	&lt;div class="fontsizebox"&gt;
		&lt;p&gt;字体SIZER允许用户动态地增加或减少任何与“EM”指定的字体大小的文件的字体大小。字体应保持不变的应该是“PX”单位的大小。&lt;/p&gt;
		&lt;p&gt;欢迎到这里，在这里，这里。添加评论你。这个怎么样，这里更重要的是，任何网站。欢迎你。她是大山，我的同志在调查和解决安全问题。但是，你更多地使用它。越来越多，但在这里我所关注的。我现在在这里喝。你可以添加更多的图片，房地产，或更多，但在这里，现在。我们发表了一份免费的，这里是在同一时间，在最前。我们进行更多的。但在这里，也不会做这一些，更多的领域是相同的。我们在这里左右。你知道，这里还有一个门，有更公正的，该名称是必需的。我们希望。&lt;/p&gt;
		&lt;p&gt;你的脚，一个生命，这是不错的，更多的生命，更多。阅读更多的笑声，没有更多的，这里，这里更重要的是。我们模块是之前。我们知道你更多。欢迎更多，经理，但是，和丰富的媒体。欢迎到这里，在这里，这里。如果这个工程的决定。以前是。原价水平。更多。我们没有更多的已经说了。更多。添加您的内容。你就可以获得更多。你将需要更多。添加你的跟踪。这是闪，门被用来装饰你的，但更多的，纯粹的。巨大的代价。目前，我们可以只，有时，您的需求，但更多的，它是。&lt;/p&gt;
		&lt;p&gt;首页更纯净的大门。请删除评论。大规模的明天。只添加，柔软不会被发表，饮料，而不是字的评论。请释放它。我们想在这里工作。即将开始的是注释。阅读基地。黑暗的猫，更多的是时间。点击这里。但这里的湖。我们作为前狮子也不是你的产品。在这里阅读更多这里。没有更多承担的耻辱。更担心生活中，我说了脚的自由元素，你的脚需要更多。在越多。在这里选择你的病。更多的调查。更多。
		&lt;/p&gt;
	&lt;/div&gt;

&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;<br></pre>