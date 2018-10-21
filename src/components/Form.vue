<template>
    <div id="formWrapper">
        <div id="header" :class="[type]">
            <span>submit a {{type}}</span>
            <button @click="toggleAnonymity()">
                <i class="fa" :class="{'fa-lock': isAnonymous, 'fa-unlock': !isAnonymous}" aria-hidden="true"></i>
                post it anonymous
            </button>
        </div>
        <div id="form" :class="{'secure': isAnonymous}">
            <select v-model="input.category">
                <option v-for="(option, index) in options" v-bind:value="option.val"
                        :key="index">
                    {{ option.text }}
                </option>
            </select>
            <textarea v-model="input.description" placeholder="optional">

            </textarea>
            <div>
                <i class="fa fa-map-marker icon" aria-hidden="true"></i>
                <span class="" v-if="gotLocation"> current location</span>
                <span class="" v-if="!gotLocation"> fetching location ...
                    <i class="fa fa-circle-o-notch fa-pulse" aria-hidden="true"></i></span>
            </div>
            <div>
                <i class="fa fa-clock-o icon" aria-hidden="true"></i>
                <span> right now</span>
            </div>
            <div class="flex"></div>
            <div id="errorfield">{{errorMsg}}</div>
            <div id="submitArea">
                <button v-if="type === 'critic'" @click="onSubmit(false)" id="thumbDown"><i class="fa fa-thumbs-down"
                                                                                            aria-hidden="true"></i>
                </button>
                <button v-if="type === 'critic'" @click="onSubmit(true)" id="thumbUp"><i class="fa fa-thumbs-up"
                                                                                         aria-hidden="true"></i>
                </button>
                <button v-if="type === 'crime'" @click="onSubmit(false)">submit</button>
            </div>
        </div>
    </div>
</template>

<script>
    import AWS from "aws-sdk";

    export default {
        name: "Form",
        props: ['type', 'options'],
        data: function () {
            return {
                isAnonymous: false,
                docClient: null,
                gotLocation: false,
                errorMsg: null,
                input: {
                    category: null,
                    description: null,
                    lat: null,
                    lng: null
                },
                user: {
                    name: null,
                    uid: null
                }
            }
        },
        methods: {
            toggleAnonymity: function () {
                this.isAnonymous = !this.isAnonymous;
            },
            init: function () {
                const scope = this;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(displayLocationInfo, showLocationError);
                }

                function displayLocationInfo(position) {
                    scope.gotLocation = true;
                    scope.input.lng = position.coords.longitude;
                    scope.input.lat = position.coords.latitude;
                }

                function showLocationError() {
                    scope.errorMsg = "location needed";
                }

                AWS.config.update({
                    "accessKeyId": "AKIAJ3LD3LZB7Y6AHOYA",
                    "secretAccessKey": "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",
                    "region": "eu-central-1"
                });

                scope.docClient = new AWS.DynamoDB.DocumentClient();


                if (localStorage.getItem('user')) scope.user = JSON.parse(localStorage.getItem('user'));
            },
            onSubmit: function (opinion) {
                const scope = this;
                if (!scope.gotLocation) {
                    scope.errorMsg = "We really need a location";
                    return;
                }
                if (!scope.input.category) {
                    scope.errorMsg = "Please select a category";
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

                var params = {
                    TableName: "InhabitantOpinion",
                    Item: {
                        "id": fake_guid(),
                        "uid": scope.isAnonymous ? null : scope.user.uid,
                        "type": scope.type,
                        "lng": scope.input.lng,
                        "lat": scope.input.lat,
                        "category": scope.input.category,
                        "timestamp": Math.round((new Date()).getTime() / 1000),
                        "description": scope.input.description ? scope.input.description : null,
                        "opinion": opinion
                    }
                };

                this.docClient.put(params, function (err) {
                    if (err) {
                        scope.errorMsg = "Server Error :/";
                    } else {
                        scope.input.category = null;
                        scope.input.description = null;
                        scope.errorMsg = null;
                    }
                });
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
        margin: 20px 20px 48px;
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

    #header > button {
        color: white;
        margin-left: 26px
    }

    .crime {
        background: #CB2A47;
        border-bottom: 1px solid #881c2f;
    }

    .critic {
        background: #2F8C94;
        border-bottom: 1px solid #1f5a5f;
    }

    #form {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        margin: 18px 14px;
        padding: 8px;
        color: #212121;
        flex: 1;
        border: 1px solid rgba(1, 1, 1, 0);
        transition: all 0.375s cubic-bezier(0.37, 0.09, 0.25, 1);
    }

    #form.secure {
        border: 1px solid #361E57;
        border-radius: 6px;
        box-shadow: 0px 0px 0px 1px rgb(74, 36, 152);
    }

    #form > * {
        margin: 8px 5px;
    }

    #form select {
        background: none;
        border: 1px solid;
        padding: 3px;
        font-size: 1.4em;
        border-radius: 4px;
    }

    #form .icon {
        color: #361E57;
        width: 24px;
        text-align: center;
    }

    textarea {
        resize: none;
        border: 1px solid;
        min-height: 42px;
        padding: 5px;
        overflow: hidden;
        border-radius: 4px;
    }

    button {
        background: none;
        border: 1px solid;
        padding: 5px 8px;
    }

    #submitArea {
        display: flex;
        height: 42px;
    }

    #submitArea > * {
        flex: 1;
    }

    #thumbDown {
        background: #881c2f;
        color: white;
        border: none;
    }

    #thumbUp {
        background: #6f790c;
        color: white;
        border: none;
    }
</style>