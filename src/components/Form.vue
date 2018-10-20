<template>
    <div id="formWrapper">
        <div id="header" :class="[type]">
            <span>submit a {{type}}</span>
            <button @click="toggleAnonymity()"><i class="fa"
                                                  :class="{'fa-lock': isAnonymous, 'fa-unlock': !isAnonymous}"
                                                  aria-hidden="true"></i> make it anonymous
            </button>
        </div>
        <form id="form">
            <select v-model="input.category">
                <option v-for="(option, index) in options" v-bind:value="option.text"
                        :key="index">
                    {{ option.text }}
                </option>
            </select>
            <textarea v-model="input.description">

            </textarea>
            <div>
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                <span class=""> current location</span>
            </div>
            <div>
                <i class="fa fa-clock-o" aria-hidden="true"></i>
                <span> right now</span>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Form",
        props: ['type', 'options'],
        data: function () {
            return {
                isAnonymous: false,
                input: {
                    category: null,
                    description: null
                }
            }
        },
        methods: {
            toggleAnonymity: function () {
                this.isAnonymous = !this.isAnonymous;
            },
            init: function () {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(displayLocationInfo);
                }

                function displayLocationInfo(position) {
                    const lng = position.coords.longitude;
                    const lat = position.coords.latitude;

                    console.log(`longitude: ${ lng } | latitude: ${ lat }`);
                }
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
    }

    #header {
        font-weight: bold;
        font-size: 1.2em;
        padding: 14px 8px;
        display: flex;
        justify-content: space-between;
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
        margin: 12px 8px;
        color: #000;
    }

    #form > * {
        margin: 5px;
    }

    textarea {
        resize: none;
        border: 1px solid;
        min-height: 42px;
        padding: 5px;
        overflow: hidden;
    }
</style>