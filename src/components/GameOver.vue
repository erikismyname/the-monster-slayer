<template>
    <section v-if="isGameOver" class="container">
        <h2>Game Over</h2>
        
        <h3 v-if="hasPlayerWon">You WON!</h3>
        <h3 v-else-if="hasMonsterWon">You LOST!</h3>
        <h3 v-else>DRAW!</h3>

        <base-button @click.native="startNewGame">
            Start New Game
        </base-button>
    </section>
</template>

<script>
    import BaseButton from './BaseButton.vue';

    export default {
        components: {
            BaseButton,
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

<style>
</style>