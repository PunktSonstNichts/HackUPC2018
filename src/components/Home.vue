<template>
    <div id="main">
        <div id="crime">
            <router-link to="/putCrime" tag="button" id="crime_btn">crime</router-link>
        </div>

        <div id="opinion">
            <router-link to="/putCritic" tag="button" id="opinion_btn">opinion</router-link>
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
    }
    #main > *{
        flex: 1;
        display: flex;
        align-items: center;
    }
    button{
        border-radius: 100%;
        color: white;
        font-size: 2em;
        border: 4px solid #361E57;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #crime_btn {
        background: #CB2A47;
        margin-right: auto;
        width: 46vmin;
        height: 46vmin;
    }

    #opinion_btn {
        background: #2F8C94;
        margin-left: auto;
        width: 35vmin;
        height: 35vmin;
    }
    #qr_code{
        background: #B1C212;
    }
</style>
