import Vue from 'vue'
import VueRouter from 'vue-router'
import Lead from '../views/Lead.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/lead',
    name: 'Pipeline Leads',
    component: Lead
  },
  {
    path: '/cotacao',
    name: 'Pipeline Cotação',
    component: () => import('../views/Cotacao.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
