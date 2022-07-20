<template>
    <div>
        <transition appear name="fade">
            <div v-if="isVisible" id="backdrop"></div>
        </transition>
        <transition appear>
            <div v-if="isVisible" id="modal">
                <header>
                    <h2>Greetings, Warrior!</h2>
                </header>
                <main>
                    <div>
                        <label for="username">What is your name?</label>
                        <input
                            type="text"
                            id="username"
                            v-model.trim="playerName"
                            placeholder="Please enter your name here"
                            :class="invalidClass"
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="generate-random-name"
                            v-model="isCheckboxChecked"
                        />
                        <label for="generate-random-name"
                            >Generate a random name</label
                        >
                    </div>
                    <div id="button-container">
                        <button @click="setPlayerName">Start Game</button>
                    </div>
                </main>
            </div>
        </transition>
    </div>
</template>

<script>
    import getRandomName from "../util/getRandomName.js";

    export default {
        props: {
            isVisible: {
                type: Boolean,
                required: true,
            },
        },
        data() {
            return {
                playerName: "",
                isPlayerNameInvalid: false,
                isCheckboxChecked: false,
            };
        },
        computed: {
            invalidClass() {
                return { invalid: this.isPlayerNameInvalid };
            },
        },
        watch: {
            isCheckboxChecked(isChecked) {
                this.playerName = isChecked ? getRandomName() : "";
                this.isPlayerNameInvalid = isChecked ? false : true;
            },
        },
        methods: {
            setPlayerName() {
                if (!this.playerName) {
                    this.isPlayerNameInvalid = true;
                    return;
                }

                this.$emit("set-player-name", this.playerName);
            },
        },
    };
</script>

<style>
</style>