---
layout:     post
title:      "MongoDB官方C#驱动中查询条件Query用法"
date:       2013-07-04 15:21:48 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<pre class="prettyprint lang-cs">Query.All("name", "a", "b");//通过多个元素来匹配数组
  
  Query.And(Query.EQ("name", "a"), Query.EQ("title", "t"));//同时满足多个条件
  
  Query.EQ("name", "a");//等于
  
  Query.Exists("type", true);//判断键值是否存在
  
  Query.GT("value", 2);//大于&gt;
  
  Query.GTE("value", 3);//大于等于&gt;=
  
  Query.In("name", "a", "b");//包括指定的所有值,可以指定不同类型的条件和值
  
  Query.LT("value", 9);//小于&lt;
  
  Query.LTE("value", 8);//小于等于&lt;=
  
  Query.Mod("value", 3, 1);//将查询值除以第一个给定值,若余数等于第二个给定值则返回该结果
  
  Query.NE("name", "c");//不等于
  
  Query.Nor(Array);//不包括数组中的值
  
  Query.Not("name");//元素条件语句
  
  Query.NotIn("name", "a", 2);//返回与数组中所有条件都不匹配的文档
  
  Query.Or(Query.EQ("name", "a"), Query.EQ("title", "t"));//满足其中一个条件
  
  Query.Size("name", 2);//给定键的长度
  
  Query.Type("_id", BsonType.ObjectId );//给定键的类型
  
  Query.Where(BsonJavaScript);//执行JavaScript
  
  Query.Matches("Title",str);//模糊查询 相当于sql中like -- str可包含正则表达式</pre>
<p>
	&nbsp;
</p>