<template>
    <div id="formWrapper">
        <div id="header" class="create">
            <span>create an account</span>
        </div>
        <div id="form">
            <input type="text" v-model="input.name" placeholder="your name"/>

            <div style="flex: 1;"></div>
            <div id="errorfield">{{errorMsg}}</div>
            <div id="submitArea" >
                <button @click="onSubmit(false)">create</button>
            </div>
        </div>
    </div>
</template>

<script>
    import AWS from "aws-sdk";

    export default {
        name: "Login",
        data: function () {
            return {
                docClient: null,
                errorMsg: null,
                input: {
                    name: null,
                }
            }
        },
        methods: {
            init: function () {
                const scope = this;

                AWS.config.update({
                    "accessKeyId": "AKIAJGAJK2YIN3GUJTIA",
                    "secretAccessKey": "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",
                    "region": "eu-central-1"
                });

                scope.docClient = new AWS.DynamoDB.DocumentClient();
            },
            onSubmit: function (opinion) {
                const scope = this;
                if(!scope.input.name){
                    scope.errorMsg = "C'mon, its only one input...";
                    return;
                }
                function fake_guid() {
                    return "ss-s-s-s-sss".replace(/s/g, s4);
                }

                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }

                localStorage.setItem('user', JSON.stringify({name: scope.input.name, uid: fake_guid()}));

                this.$router.push('/');
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style scoped>
    #formWrapper {
        background: white;
        flex: 1;
        border-radius: 12px;
        margin: 20px;
        border: 2px solid #361E57;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    #header {
        font-weight: bold;
        font-size: 1.2em;
        padding: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.7);
    }


    .create {
        background: #B1C212;
        border-bottom: 1px solid #6f790c;
    }


    #form {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        margin: 18px 14px;
        padding: 8px;
        color: #212121;
        flex: 1;
        border: 1px solid rgba(1,1,1,0);
    }

    #form > * {
        margin: 8px 5px;
    }
    #form input {
        background: none;
        border: 1px solid;
        padding: 3px;
        font-size: 1.4em;
        border-radius: 4px;
    }

    button {
        background: none;
        border: 1px solid;
        padding: 5px 8px;
    }
    #submitArea{
        display: flex;
    }
    #submitArea > *{
        flex: 1;
    }
</style>