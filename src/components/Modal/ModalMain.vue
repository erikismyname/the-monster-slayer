<template>
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
        <base-span>* Note that the name can only contain letters</base-span>
        <div class="button-container">
            <base-button 
                @click.native="startGame" 
                data-testid="start-game"
            >
                Start Game
            </base-button>
        </div>
    </main>
</template>

<script>
    import getRandomName from "@/utils/getRandomName";

    import BaseButton from "@/components/common/BaseButton";
    import BaseCheckbox from "@/components/common/BaseCheckbox";
    import BaseInput from "@/components/common/BaseInput";
    import BaseLabel from "@/components/common/BaseLabel";
    import BaseSpan from "@/components/common/BaseSpan";

    export default {
        components: {
            BaseButton,
            BaseCheckbox,
            BaseInput,
            BaseLabel,
            BaseSpan,
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
                return this.isPlayerNameInvalid
                    ? "Why play the rebel?"
                    : "Please enter your name here";
            },
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

                this.$store.dispatch("player/setName", this.playerName);
            },
            isPlayerNameNotValid() {
                return !this.playerName || !this.playerName.match(/^[a-zA-Z]+$/)
                    ? true
                    : false;
            },
        },
    };
</script>

<style scoped>
    main {
        padding: 1rem;
        border-bottom-left-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
        background-color: white;
    }

    .modal div:not(.button-container) {
        margin-bottom: 0.5rem;
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
</style>