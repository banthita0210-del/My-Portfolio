import {
  createRouter,
  createWebHashHistory
} from "vue-router"

import TheHome from "./components/TheHome.vue"
import StudentResume from "./components/StudentResume.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: TheHome
  },
  {
    path: "/resume/:id",
    name: "resume",
    component: StudentResume
  }
]

const router = createRouter({
  history: createWebHashHistory(
    import.meta.env.BASE_URL
  ),
  routes
})

export default router