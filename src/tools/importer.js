/**
 * Created by mac on 2017/8/31.
 */

import Vue from 'vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)

import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

import {Alert, Confirm, Prompt, Toast} from 'wc-messagebox'
import 'wc-messagebox/style.css'
Vue.use(Alert)
Vue.use(Confirm)
Vue.use(Prompt)
Vue.use(Toast)

import XConst from './const'
import XUtils from './utils'
import XApi from './api'
import XDirectives from './directives'
Vue.use(XConst)
Vue.use(XUtils)
Vue.use(XApi)
Vue.use(XDirectives)

import Paginate from 'vuejs-paginate'
import PageHeader from '../components/section/page_header.vue'
import PageFooter from '../components/section/page_footer.vue'
import PageSidebar from '../components/section/page_sidebar.vue'

import XSearch from '../components/section/x_search.vue'
import XComment from '../components/section/x_comment.vue'
import XEditor from '../components/section/x_editor.vue'

import MArticle from '../components/section/m_article.vue'
import MLink from '../components/section/m_link.vue'
import MConfig from '../components/section/m_config.vue'
import MCategory from '../components/section/m_category.vue'

Vue.component('paginate', Paginate)
Vue.component('PageHeader', PageHeader)
Vue.component('PageFooter', PageFooter)
Vue.component('PageSidebar', PageSidebar)

Vue.component('XSearch', XSearch)
Vue.component('XComment', XComment)
Vue.component('XEditor', XEditor)

Vue.component('MArticle', MArticle)
Vue.component('MLink', MLink)
Vue.component('MConfig', MConfig)
Vue.component('MCategory', MCategory)

import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
