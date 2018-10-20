import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue'
import Form from './components/Form.vue'
import Opinion from './components/Opinion.vue'
import Login from './components/Login.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },{
            path: '/login',
            name: 'Login',
            component: Login
        },{
            path: '/opinion/:placeId?',
            name: 'Opinion',
            props: true,
            component: Opinion
        }, {
            path: '/putCrime',
            name: 'Crime',
            component: Form,
            props: {
                type: 'crime', options: [
                    {text: 'heavy', val: "1"},
                    {text: 'medium', val: "2"},
                    {text: 'low', val: "3"}
                ]
            }
        }, {
            path: '/putCritic',
            name: 'Critic',
            component: Form,
            props: {
                type: 'critic', options: [
                    {text: "street maintenance", val: "street_maintenance"},
                    {text: "road condition", val: "road_condition"},
                    {text: "public transportation", val: "public_transportation"},
                    {text: "parks", val: "parks"},
                    {text: "sanitation", val: "sanitation"}
                ]
            }
        }
    ]
})