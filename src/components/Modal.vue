<template>
    <div>
        <div v-if="isVisible" id="backdrop"></div>

        <transition name="modal" appear>
            <div v-if="isVisible" id="modal">
                <header>
                    <h2>Greetings, Warrior!</h2>
                </header>
                <main>
                    <div>
                        <base-label for="player-name">
                            What is your name?
                        </base-label>
                        <base-input
                            v-model.trim="playerName"
                            :class="invalidClass"
                            id="player-name"
                            placeholder="Please enter your name here"
                        />
                    </div>
                    <div>
                        <base-checkbox
                            v-model="isCheckboxChecked"
                            type="checkbox"
                            id="generate-random-name"
                        />
                        <base-label for="generate-random-name">
                            Generate a random name
                        </base-label>
                    </div>
                    <div id="button-container">
                        <base-button @click.native="setPlayerName">
                            Start Game
                        </base-button>
                    </div>
                </main>
            </div>
        </transition>
    </div>
</template>

<script>
    import getRandomName from "../util/getRandomName.js";

    import BaseLabel from "./BaseLabel.vue";
    import BaseInput from "./BaseInput.vue";
    import BaseCheckbox from "./BaseCheckbox.vue";
    import BaseButton from "./BaseButton.vue";

    export default {
        components: {
            BaseLabel,
            BaseInput,
            BaseCheckbox,
            BaseButton,
        },
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

<style scoped>
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
        top: 7rem;
        left: calc(50% - 15rem);
        width: 30rem;
        z-index: 2;
    }

    header {
        padding: 0.5rem;
        border-top-left-radius: 0.2rem;
        border-top-right-radius: 0.2rem;
    }

    main {
        padding: 1rem;
        border-bottom-left-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
        background-color: white;
    }

    #modal div:first-of-type {
        margin-bottom: 0.5rem;
    }

    #button-container {
        display: flex;
        justify-content: flex-end;
        margin-top: 2rem;
    }

    button {
        width: 6rem;
        padding: 0.5rem;
        margin: 0;
    }

    .modal-enter-active {
        animation: modal 500ms ease-out;
    }

    .modal-leave-active {
        animation: modal 500ms ease-in reverse;
    }

    @keyframes modal {
        from {
            opacity: 0;
            transform: translateY(-7rem);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 480px) {
        #modal {
            width: 20rem;
            left: calc(50% - 10rem);
        }

        #player-name {
            width: 50%;
        }
    }

    @media (max-width: 320px) {
        #modal {
            width: 15rem;
            left: calc(50% - 7.5rem);
            text-align: center;
        }

        #player-name {
            width: 70%;
            margin-top: 0.5rem;
        }
    }
</style>