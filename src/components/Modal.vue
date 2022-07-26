<template>
    <div>
        <div 
            v-if="isVisible" 
            class="backdrop" 
            data-testid="backdrop"
        >
        </div>

        <transition 
            name="move-fade" 
            appear
        >
            <div 
                v-if="isVisible" 
                class="modal" 
                data-testid="modal"
            >
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
                            :placeholder="playerNameInputPlaceholder"
                            id="player-name"
                            data-testid="player-name"
                        />
                    </div>
                    <div>
                        <base-checkbox
                            v-model="isCheckboxChecked"
                            id="generate-random-name"
                            data-testid="generate-random-name"
                        />
                        <base-label for="generate-random-name">
                            Generate a random name
                        </base-label>
                    </div>
                    <span>* Note that the name can only contain letters</span>
                    <div class="button-container">
                        <base-button
                            @click.native="startGame"
                            data-testid="start-game"
                        >
                            Start Game
                        </base-button>
                    </div>
                </main>
            </div>
        </transition>
    </div>
</template>

<script>
    import getRandomName from "../utils/getRandomName.js";

    import BaseButton from "./common/BaseButton.vue";
    import BaseCheckbox from "./common/BaseCheckbox.vue";
    import BaseInput from "./common/BaseInput.vue";
    import BaseLabel from "./common/BaseLabel.vue";

    export default {
        components: {
            BaseButton,
            BaseCheckbox,
            BaseInput,
            BaseLabel,
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
            playerNameInputPlaceholder() {
                return this.isPlayerNameInvalid ? 'Why play the rebel?' : 'Please enter your name here'
            }
        },
        watch: {
            isCheckboxChecked(isChecked) {
                this.playerName = isChecked ? getRandomName() : "";
                this.isPlayerNameInvalid = isChecked ? false : true;
            },
        },
        methods: {
            startGame() {
                if (this.isPlayerNameNotValid()) {
                    this.isPlayerNameInvalid = true;
                    return;
                }

                this.$emit("start-game", this.playerName);
            },
            isPlayerNameNotValid() {
                if (!this.playerName || !this.playerName.match(/^[a-zA-Z]+$/)) {
                    return true;
                } 

                return false;
            }
        },
    };
</script>

<style scoped>
    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: black;
        opacity: 0.5;
        z-index: 1;
    }

    .modal {
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

    .modal div:not(.button-container) {
        margin-bottom: 0.5rem;
    }

    .invalid::placeholder {
        color: #880808;
        opacity: 1; /* Firefox fix (adds lower opacity by default) */
    }   

    .button-container {
        display: flex;
        justify-content: flex-end;
        margin-top: 1.5rem;
    }

    button {
        width: 6rem;
        padding: 0.5rem;
        margin: 0;
    }

    .move-fade-enter-active {
        animation: modal 500ms ease-out;
    }

    .move-fade-leave-active {
        animation: modal 500ms ease-in reverse;
    }

    @keyframes modal {
        from {
            opacity: 0;
            transform: translateY(-7rem);
        }

        to {
            transform: translateY(0);
        }
    }

    @media (max-width: 30rem) {
        .modal {
            width: 20rem;
            left: calc(50% - 10rem);
        }

        #player-name {
            width: 50%;
        }
    }

    @media (max-width: 20rem) {
        .modal {
            width: 15rem;
            top: 9.9rem;
            left: calc(50% - 7.5rem);
            text-align: center;
        }

        #player-name {
            width: 70%;
            margin-top: 0.5rem;
        }
    }
</style>