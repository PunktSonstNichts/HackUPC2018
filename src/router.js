import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue'
import Form from './components/Form.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        }, {
            path: '/putCrime',
            name: 'Crime',
            component: Form,
            props: {
                type: 'crime', options: [
                    {text: 'heavy'},
                    {text: 'medium'},
                    {text: 'low'}
                ]
            }
        }, {
            path: '/putCritic',
            name: 'Critic',
            component: Form,
            props: {
                type: 'critic', options: [
                    {text: "street"},
                    {text: "parks"}
                ]
            }
        }
    ]
})