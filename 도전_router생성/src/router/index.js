import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Board.vue"
import Board from "../views/Board.vue"
import TodoList from "../views/Todo/List.vue"
import TodoDetail from "../views/Todo/Detail.vue"

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"home",
    component:Home,
  },
  {
    path:"/board",
    name:"board",
    component:Board,
  },
  {
    path:"/todo",
    name:"list",
    component:TodoList,
  },
  {
    path:"/todo/:id",
    name:"Detail",
    component:TodoDetail,
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
