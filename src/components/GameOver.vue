<template>
    <section v-if="isGameOver" class="container">
        <h2>Game Over</h2>
        <h3 v-if="hasPlayerWon">You WON!</h3>
        <h3 v-else-if="hasMonsterWon">You LOST!</h3>
        <h3 v-else>DRAW!</h3>
        <button @click="startNewGame">Start New Game</button>
    </section>
</template>

<script>
    export default {
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