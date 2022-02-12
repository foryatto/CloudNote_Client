import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Todo from '../components/Todo.vue'
import Me from '../components/Me.vue'
import ViewNote from '../components/ViewNote.vue'

import Selection from '../components/Selection.vue'
import Search from '../components/Search.vue'
import SearchInfo from '../components/SearchInfo.vue'
import Login from '../components/Login.vue'
import TopicInfo from '../components/TopicInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    meta:{
      requireAuth: true
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      requireAuth: true
    },
  },
  {
    path: '/viewNote',
    name: 'ViewNote',
    component: ViewNote,
    meta:{
      requireAuth: true
    },
  },
  {
    path: '/me',
    name: 'me',
    component: Me,
    meta:{
      requireAuth: true
    },
  },
  {
    path: '/todo',
    name: 'todo',
    component: Todo,
    meta:{
      requireAuth: true
    },
  },
  {
    path: '/selection',
    name: 'Selection',
    component: Selection,
    meta:{
      requireAuth: true
    },
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta:{
      requireAuth: true
    },
  },
  {
    path: '/searchInfo/:title',
    name: 'SearchInfo',
    component: SearchInfo,
    meta:{
      requireAuth: true
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/topicInfo/:id',
    name: 'TopicInfo',
    component: TopicInfo,
    meta:{
      requireAuth: true
    },
  },
]

const router = new VueRouter({
  routes
})

export default router
