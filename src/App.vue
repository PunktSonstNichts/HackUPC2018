<template>
    <div id="app">
        <div id="bg"></div>
        <a id="greeting" href="/">
            Hello {{user.name}},
        </a>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data: function () {
            return {
                user: {
                    name: null,
                    uid: null
                }
            }
        },
        watch:{
            $route (to, from){
                if (localStorage.getItem('user')) this.user = JSON.parse(localStorage.getItem('user'));
            }
        },
        mounted() {
            if (localStorage.getItem('user')) this.user = JSON.parse(localStorage.getItem('user'));
            if (!this.user.name) {
                this.$router.push('Login');
            }
        }
    }
</script>

<style>
    head, body {
        margin: 0px;
        padding: 0px;
        overflow: hidden;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: white;
        background: rgba(74, 36, 152, 0.42);
        height: 100vh;
        width: 100vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        box-shadow: inset 0px 0px 20px #361E57;
    }

    #greeting {
        font-size: 3.4em;
        text-shadow: 2px 3px 1px #361E57;
        padding: 20px 20px 0px;
        color: white;
        text-decoration: none;
    }

    #bg {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: url('assets/bg.jpg') no-repeat center center fixed;
        background-size: cover;
        z-index: -1;
    }

</style>
