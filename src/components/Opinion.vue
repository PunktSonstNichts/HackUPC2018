<template>
    <div id="formWrapper">
        <div id="header" class="opinion">
            <span>show your Opinion</span>
            <button @click="toggleAnonymity()" v-if="currentTarget"><i class="fa"
                                                                       :class="{'fa-lock': isAnonymous, 'fa-unlock': !isAnonymous}"
                                                                       aria-hidden="true"></i> make it anonymous
            </button>
        </div>

        <div v-if="!currentTarget" id="preselect">
            <span>{{errorMsg}}</span>
            <input type="text" placeholder="ID" v-model="mutablePlaceId"/>
            <button @click="checkPlaceID()">goto</button>
        </div>

        <div id="form" :class="{'secure': isAnonymous}" v-if="currentTarget">
            <div id="title">{{currentTarget.title}}</div>
            <div id="description">{{currentTarget.description}}</div>
            <div class="flex"></div>
            <div id="errorfield">{{errorMsg}}</div>
            <div id="submitArea">
                <button @click="onSubmit(false)" id="thumbDown"><i class="fa fa-thumbs-down" aria-hidden="true"></i>
                </button>
                <button @click="onSubmit(true)" id="thumbUp"><i class="fa fa-thumbs-up" aria-hidden="true"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
    import AWS from "aws-sdk";

    export default {
        name: "Opinion",
        props: ["placeId"],
        data: function () {
            return {
                mutablePlaceId: this.placeId,
                isAnonymous: false,
                docClient: null,
                currentTarget: null,
                errorMsg: null,
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
            checkPlaceID: function () {
                const scope = this;
                if (scope.mutablePlaceId) {
                    scope.$router.replace('/opinion/' + scope.mutablePlaceId);
                    const params = {
                        TableName: "InhabitantOpinion",
                        ProjectionExpression: "pid, category, title, description, lat, lng, #tp",
                        FilterExpression: "#tp = :place AND pid = :s_pid",
                        ExpressionAttributeNames: {
                            "#tp": "type"
                        },
                        ExpressionAttributeValues: {
                            ":place": "place",
                            ":s_pid": parseInt(scope.mutablePlaceId)
                        }
                    };
                    console.log(params);
                    scope.docClient.scan(params, function (err, data) {
                        if (err) {
                            scope.errorMsg = "Server Error :/";
                            return;
                        }
                        console.log(data);
                        if (data.Count !== 1) {
                            scope.errorMsg = "didn't find a matching place. Maybe a typo?";
                            return;
                        }
                        scope.currentTarget = data.Items[0];

                    });
                }
            },
            init: function () {
                const scope = this;

                AWS.config.update({
                    "accessKeyId": "AKIAJ3LD3LZB7Y6AHOYA",
                    "secretAccessKey": "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",
                    "region": "eu-central-1"
                });

                scope.docClient = new AWS.DynamoDB.DocumentClient();


                if (localStorage.getItem('user')) scope.user = JSON.parse(localStorage.getItem('user'));

                this.checkPlaceID();

            },
            onSubmit: function (opinion) {
                const scope = this;

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
                        "type": "place_opinion",
                        "uid": scope.isAnonymous ? null : scope.user.uid,
                        "pid": parseInt(scope.mutablePlaceId),
                        "timestamp": Math.round((new Date()).getTime() / 1000),
                        "opinion": opinion
                    }
                };
                console.log(params);

                this.docClient.put(params, function (err) {
                    if (err) {
                        scope.errorMsg = "Server Error :/";
                    } else {
                        scope.$router.push('/');
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

    #header > button {
        color: white;
        margin-left: 26px
    }

    .opinion {
        background: #B1C212;
        border-bottom: 1px solid #6f790c;
    }

    #form, #preselect {
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
    }

    #form > *, #preselect > * {
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