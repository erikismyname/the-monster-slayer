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
    #backdrop {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: black;
        opacity: 0.5;
        z-index: 1;
    }

    #modal {
        position: fixed;
        left: calc(50% - 15rem);
        z-index: 2;
        width: 30rem;
    }

    #modal header,
    #modal main {
        padding: 0.5rem;
    }

    #modal header {
        background-color: black;
        color: white;
        border-top-left-radius: 0.2rem;
        border-top-right-radius: 0.2rem;
    }

    #modal main {
        background-color: white;
        border-bottom-left-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
        padding: 1rem;
    }

    #modal div:first-of-type {
        margin-bottom: 0.3rem;
    }

    #modal input[type="text"] {
        padding: 0.2rem;
        font-family: inherit;
        border: 0.1rem solid black;
        width: 40%;
    }

    #modal input.invalid {
        border-color: #880808;
    }

    #modal input#generate-random-name {
        margin-right: 0.3rem;
    }

    #modal button {
        width: 6rem;
        padding: 0.5rem;
        margin: 0;
    }

    #button-container {
        margin-top: 2rem;
        display: flex;
        justify-content: flex-end;
    }

    .v-enter-active {
        animation: modal 500ms ease-out;
    }

    .v-leave-active {
        animation: modal 500ms ease-in reverse;
    }

    @keyframes modal {
        from {
            opacity: 0;
            transform: translateY(-6rem);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>