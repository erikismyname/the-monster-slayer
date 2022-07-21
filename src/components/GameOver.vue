<template>
    <section v-if="isGameOver" class="container">
        <h2>Game Over</h2>

        <h3 v-if="hasPlayerWon">
            You WON!
            <base-icon class="fa-solid fa-face-smile" />
        </h3>
        <h3 v-else-if="hasMonsterWon">
            You LOST!
            <base-icon class="fa-solid fa-face-frown" />
        </h3>
        <h3 v-else>
            DRAW!
            <base-icon class="fa-solid fa-face-meh" />
        </h3>

        <base-button @click.native="startNewGame">
            Start New Game
        </base-button>
    </section>
</template>

<script>
    import BaseButton from "./common/BaseButton.vue";
    import BaseIcon from "./common/BaseIcon.vue";

    export default {
        components: {
            BaseButton,
            BaseIcon,
        },
        props: {
            winner: {
                type: String,
                required: true,
            },
        },
        computed: {
            isGameOver() {
                return this.winner;
            },
            hasPlayerWon() {
                return this.winner === "player";
            },
            hasMonsterWon() {
                return this.winner === "monster";
            },
        },
        methods: {
            startNewGame() {
                this.$emit("start-new-game");
            },
        },
    };
</script>

<style scoped>
    h2,
    h3 {
        margin-bottom: 1rem;
    }
</style>