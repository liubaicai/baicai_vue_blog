---
layout:     post
title:      "vue-router 路由的 history 模式"
date:       2017-08-31 04:53:34 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

<p style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: antialiased; font-size: 15px; orphans: 3; widows: 3; margin-top: 1.2em; margin-bottom: 1.2em; word-spacing: 0.05em; line-height: 1.6em; color: rgb(51, 51, 51); font-family: &quot;Source Sans Pro&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif;"><code style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-family: &quot;Roboto Mono&quot;, Monaco, courier, monospace; font-size: 0.85em; background-color: rgb(248, 248, 248); color: inherit; padding: 0.2em; margin: 0px; border-radius: 2px; white-space: nowrap; break-inside: avoid; direction: ltr; border: none;">vue-router</code>&nbsp;默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。</p><p style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: antialiased; font-size: 15px; orphans: 3; widows: 3; margin-top: 1.2em; margin-bottom: 1.2em; word-spacing: 0.05em; line-height: 1.6em; color: rgb(51, 51, 51); font-family: &quot;Source Sans Pro&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif;">如果不想要很丑的 hash，我们可以用路由的&nbsp;<span style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: antialiased; font-weight: 600; font-size: inherit; color: rgb(44, 62, 80);">history 模式</span>，这种模式充分利用&nbsp;<code style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-family: &quot;Roboto Mono&quot;, Monaco, courier, monospace; font-size: 0.85em; background-color: rgb(248, 248, 248); color: inherit; padding: 0.2em; margin: 0px; border-radius: 2px; white-space: nowrap; break-inside: avoid; direction: ltr; border: none;">history.pushState</code>&nbsp;API 来完成 URL 跳转而无须重新加载页面。</p><pre style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-family: &quot;Roboto Mono&quot;, Monaco, courier, monospace; font-size: 15px; white-space: pre-wrap; background: rgb(248, 248, 248); break-inside: avoid; direction: ltr; margin-bottom: 0px; padding: 1.2em 1.4em; border-width: initial; border-style: none; border-color: initial; word-wrap: normal; line-height: 1.5em;"><code class="lang-js" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-family: &quot;Roboto Mono&quot;, Monaco, courier, monospace; font-size: 0.8em; background-image: initial; background-position: 0px 0px; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; margin: 0px; border-radius: 2px; white-space: pre; position: relative; break-inside: avoid; direction: ltr; border: none; display: block; max-width: initial; overflow: initial; line-height: inherit;"><span class="hljs-keyword" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(137, 89, 168);">const</span> router = <span class="hljs-keyword" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(137, 89, 168);">new</span> VueRouter({
  mode: <span class="hljs-string" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(113, 140, 0);">'history'</span>,
  routes: [...]
})
</code></pre><p style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: antialiased; font-size: 15px; orphans: 3; widows: 3; margin-top: 1.2em; margin-bottom: 1.2em; word-spacing: 0.05em; line-height: 1.6em; color: rgb(51, 51, 51); font-family: &quot;Source Sans Pro&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif;">当你使用 history 模式时，URL 就像正常的 url，例如&nbsp;<code style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-family: &quot;Roboto Mono&quot;, Monaco, courier, monospace; font-size: 0.85em; background-color: rgb(248, 248, 248); color: inherit; padding: 0.2em; margin: 0px; border-radius: 2px; white-space: nowrap; break-inside: avoid; direction: ltr; border: none;">http://yoursite.com/user/id</code>，也好看！</p><p style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: antialiased; font-size: 15px; orphans: 3; widows: 3; margin-top: 1.2em; margin-bottom: 1.2em; word-spacing: 0.05em; line-height: 1.6em; color: rgb(51, 51, 51); font-family: &quot;Source Sans Pro&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif;">不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问&nbsp;<code style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-family: &quot;Roboto Mono&quot;, Monaco, courier, monospace; font-size: 0.85em; background-color: rgb(248, 248, 248); color: inherit; padding: 0.2em; margin: 0px; border-radius: 2px; white-space: nowrap; break-inside: avoid; direction: ltr; border: none;">http://oursite.com/user/id</code>&nbsp;就会返回 404，这就不好看了。</p><p style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: antialiased; font-size: 15px; orphans: 3; widows: 3; margin-top: 1.2em; margin-bottom: 1.2em; word-spacing: 0.05em; line-height: 1.6em; color: rgb(51, 51, 51); font-family: &quot;Source Sans Pro&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif;">所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个&nbsp;<code style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-family: &quot;Roboto Mono&quot;, Monaco, courier, monospace; font-size: 0.85em; background-color: rgb(248, 248, 248); color: inherit; padding: 0.2em; margin: 0px; border-radius: 2px; white-space: nowrap; break-inside: avoid; direction: ltr; border: none;">index.html</code>&nbsp;页面，这个页面就是你 app 依赖的页面。</p><h2 id="后端配置例子" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: antialiased; font-size: 1.75em; orphans: 3; widows: 3; break-after: avoid; margin-top: 45px; margin-bottom: 0.8em; font-weight: 600; color: rgb(44, 62, 80); padding-bottom: 0.7em; border-bottom: 1px solid rgb(221, 221, 221); font-family: &quot;Source Sans Pro&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif;">后端配置例子</h2><h4 id="apache" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: antialiased; font-size: 1.25em; orphans: 3; widows: 3; break-after: avoid; margin-top: 1.275em; margin-bottom: 0.85em; font-weight: 600; color: rgb(44, 62, 80); font-family: &quot;Source Sans Pro&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif;">Apache</h4><pre style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-family: &quot;Roboto Mono&quot;, Monaco, courier, monospace; font-size: 15px; white-space: pre-wrap; background: rgb(248, 248, 248); break-inside: avoid; direction: ltr; margin-bottom: 0px; padding: 1.2em 1.4em; border-width: initial; border-style: none; border-color: initial; word-wrap: normal; line-height: 1.5em;"><code class="lang-apache" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-family: &quot;Roboto Mono&quot;, Monaco, courier, monospace; font-size: 0.8em; background-image: initial; background-position: 0px 0px; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; margin: 0px; border-radius: 2px; white-space: pre; position: relative; break-inside: avoid; direction: ltr; border: none; display: block; max-width: initial; overflow: initial; line-height: inherit;"><span class="hljs-section" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit;">&lt;IfModule mod_rewrite.c&gt;</span>
  <span class="hljs-attribute" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(200, 40, 41);">RewriteEngine</span> <span class="hljs-literal" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(245, 135, 31);">On</span>
  <span class="hljs-attribute" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(200, 40, 41);">RewriteBase</span> /
  <span class="hljs-attribute" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(200, 40, 41);">RewriteRule</span> ^index\.html$ -<span class="hljs-meta" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit;"> [L]</span>
  <span class="hljs-attribute" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(200, 40, 41);">RewriteCond</span> <span class="hljs-variable" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(200, 40, 41);">%{REQUEST_FILENAME}</span> !-f
  <span class="hljs-attribute" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(200, 40, 41);">RewriteCond</span> <span class="hljs-variable" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(200, 40, 41);">%{REQUEST_FILENAME}</span> !-d
  <span class="hljs-attribute" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(200, 40, 41);">RewriteRule</span> . /index.html<span class="hljs-meta" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit;"> [L]</span>
<span class="hljs-section" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit;">&lt;/IfModule&gt;</span>
</code></pre><h4 id="nginx" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: antialiased; font-size: 1.25em; orphans: 3; widows: 3; break-after: avoid; margin-top: 1.275em; margin-bottom: 0.85em; font-weight: 600; color: rgb(44, 62, 80); font-family: &quot;Source Sans Pro&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif;">nginx</h4><pre style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-family: &quot;Roboto Mono&quot;, Monaco, courier, monospace; font-size: 15px; white-space: pre-wrap; background: rgb(248, 248, 248); break-inside: avoid; direction: ltr; margin-bottom: 0px; padding: 1.2em 1.4em; border-width: initial; border-style: none; border-color: initial; word-wrap: normal; line-height: 1.5em;"><code class="lang-nginx" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-family: &quot;Roboto Mono&quot;, Monaco, courier, monospace; font-size: 0.8em; background-image: initial; background-position: 0px 0px; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; margin: 0px; border-radius: 2px; white-space: pre; position: relative; break-inside: avoid; direction: ltr; border: none; display: block; max-width: initial; overflow: initial; line-height: inherit;"><span class="hljs-attribute" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(200, 40, 41);">location</span> / {
  <span class="hljs-attribute" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(200, 40, 41);">try_files</span> <span class="hljs-variable" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(200, 40, 41);">$uri</span> <span class="hljs-variable" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(200, 40, 41);">$uri</span>/ /index.html;
}
</code></pre><h4 id="nodejs-express" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: antialiased; font-size: 1.25em; orphans: 3; widows: 3; break-after: avoid; margin-top: 1.275em; margin-bottom: 0.85em; font-weight: 600; color: rgb(44, 62, 80); font-family: &quot;Source Sans Pro&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif;">Node.js (Express)</h4><p style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: antialiased; font-size: 15px; orphans: 3; widows: 3; margin-top: 1.2em; margin-bottom: 1.2em; word-spacing: 0.05em; line-height: 1.6em; color: rgb(51, 51, 51); font-family: &quot;Source Sans Pro&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif;"><a href="https://github.com/bripkens/connect-history-api-fallback" target="_blank" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: antialiased; font-size: inherit; color: rgb(66, 185, 131); background-image: initial; background-position: 0px 0px; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-weight: 600;">https://github.com/bripkens/connect-history-api-fallback</a></p><h2 id="警告" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: antialiased; font-size: 1.75em; orphans: 3; widows: 3; break-after: avoid; margin-top: 45px; margin-bottom: 0.8em; font-weight: 600; color: rgb(44, 62, 80); padding-bottom: 0.7em; border-bottom: 1px solid rgb(221, 221, 221); font-family: &quot;Source Sans Pro&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif;">警告</h2><p style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: antialiased; font-size: 15px; orphans: 3; widows: 3; margin-top: 1.2em; margin-bottom: 1.2em; word-spacing: 0.05em; line-height: 1.6em; color: rgb(51, 51, 51); font-family: &quot;Source Sans Pro&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif;">给个警告，因为这么做以后，你的服务器就不再返回 404 错误页面，因为对于所有路径都会返回&nbsp;<code style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-family: &quot;Roboto Mono&quot;, Monaco, courier, monospace; font-size: 0.85em; background-color: rgb(248, 248, 248); color: inherit; padding: 0.2em; margin: 0px; border-radius: 2px; white-space: nowrap; break-inside: avoid; direction: ltr; border: none;">index.html</code>&nbsp;文件。为了避免这种情况，你应该在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面。</p><pre style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-family: &quot;Roboto Mono&quot;, Monaco, courier, monospace; font-size: 15px; white-space: pre-wrap; background: rgb(248, 248, 248); break-inside: avoid; direction: ltr; margin-bottom: 0px; padding: 1.2em 1.4em; border-width: initial; border-style: none; border-color: initial; word-wrap: normal; line-height: 1.5em;"><code class="lang-js" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-family: &quot;Roboto Mono&quot;, Monaco, courier, monospace; font-size: 0.8em; background-image: initial; background-position: 0px 0px; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; margin: 0px; border-radius: 2px; white-space: pre; position: relative; break-inside: avoid; direction: ltr; border: none; display: block; max-width: initial; overflow: initial; line-height: inherit;"><span class="hljs-keyword" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(137, 89, 168);">const</span> router = <span class="hljs-keyword" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(137, 89, 168);">new</span> VueRouter({
  mode: <span class="hljs-string" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(113, 140, 0);">'history'</span>,
  routes: [
    { path: <span class="hljs-string" style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: initial; font-size: inherit; color: rgb(113, 140, 0);">'*'</span>, component: NotFoundComponent }
  ]
})
</code></pre><p style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: antialiased; font-size: 15px; orphans: 3; widows: 3; margin-top: 1.2em; word-spacing: 0.05em; line-height: 1.6em; color: rgb(51, 51, 51); font-family: &quot;Source Sans Pro&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; margin-bottom: 0px !important;">或者，如果你是用 Node.js 作后台，可以使用服务端的路由来匹配 URL，当没有匹配到路由的时候返回 404，从而实现 fallback。</p><p style="-webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: antialiased; font-size: 15px; orphans: 3; widows: 3; margin-top: 1.2em; word-spacing: 0.05em; line-height: 1.6em; color: rgb(51, 51, 51); font-family: &quot;Source Sans Pro&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; margin-bottom: 0px !important;"><img src="http://7xpagu.com1.z0.glb.clouddn.com/8jq3ajl498xcsustxhzyuu.jpg-500p"></p>