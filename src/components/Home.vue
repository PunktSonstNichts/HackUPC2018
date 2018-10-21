<template>
    <div id="main">
        <div id="intro">
            what do you want to report?
        </div>
        <div id="crime">
            <router-link to="/putCrime" tag="button" id="crime_btn">crime</router-link>
        </div>

        <div id="critic">
            <router-link to="/putCritic" tag="button" id="critic_btn">critic</router-link>
        </div>
        <div id="opinion">
        <router-link to="/opinion" tag="button" id="opinion_btn">opinion</router-link>
    </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 26px;
        max-height: 90%;
    }
    #main > *{
        display: flex;
        align-items: center;
    }
    #intro{
        flex: 0;
        display: inline-block;
        font-size: 2em;
        margin-top: -26px;
        margin-bottom: 26px;
    }
    button{
        border-radius: 100%;
        color: white;
        font-size: 2em;
        box-shadow: 1px 2px 8px 2px #361E57;
        border: none;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 1;
    }
    #crime{
        margin-top: 35px;
    }
    #crime_btn {
        background: #CB2A47;
        margin-right: auto;
        width: 46vmin;
        height: 46vmin;
        max-height: 240px;
        max-width: 240px;
    }
    #critic{
        margin-top: -40px;
    }
    #critic_btn {
        background: #2F8C94;
        margin-left: auto;
        width: 35vmin;
        height: 35vmin;
        max-height: 180px;
        max-width: 180px;
    }
    #opinion {
        margin-top: -60px;
    }
    #opinion_btn{
        background: #B1C212;
        margin-right: auto;
        width: 40vmin;
        height: 40vmin;
        max-height: 200px;
        max-width: 200px;
    }
</style>
