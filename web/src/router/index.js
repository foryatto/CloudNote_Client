import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Manager from '../views/Manager.vue'

import Note from '../components/manager/Note.vue'
import AddNote from '../components/manager/AddNote.vue'
import UpdateNote from '../components/manager/UpdateNote.vue'
import NoteTrash from '../components/manager/NoteTrash.vue'
import ViewNote from '../components/manager/ViewNote.vue'

import Category from '../components/manager/Category.vue'
import Todo from '../components/manager/Todo.vue'
import Profile from '../components/manager/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Manager',
    component: Manager,
    meta:{
      requireAuth: true
    },
    children: [
      {
        path: '/',
        name: 'Note',
        component: Note
      },
      {
        path: '/note',
        name: 'Note',
        component: Note
      },
      {
        path: '/addNote',
        name: 'AddNote',
        component: AddNote
      },
      {
        path: '/updateNote',
        name: 'UpdateNote',
        component: UpdateNote
      },
      {
        path: '/noteTrash',
        name: 'NoteTrash',
        component: NoteTrash
      },
      {
        path: '/todo',
        name: 'Todo',
        component: Todo
      },
      {
        path: '/category',
        name: 'Category',
        component: Category
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/viewNote',
    name: 'ViewNote',
    component: ViewNote
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: SignUp
  },
]

const router = new VueRouter({
  routes
})

export default router
