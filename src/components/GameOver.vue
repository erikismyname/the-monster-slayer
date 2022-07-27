<template>
    <section v-if="isGameOver" class="container">
        <h2>Game Over</h2>

        <h3 v-if="isPlayerWinner">
            You WON!
            <base-icon class="fa-solid fa-face-smile" />
        </h3>
        <h3 v-else-if="isMonsterWinner">
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
    import { mapGetters } from "vuex";

    import BaseButton from "./common/BaseButton.vue";
    import BaseIcon from "./common/BaseIcon.vue";

    export default {
        components: {
            BaseButton,
            BaseIcon,
        },
        computed: {
            ...mapGetters(["isGameOver", "isPlayerWinner", "isMonsterWinner"]),
        },
        methods: {
            startNewGame() {
                this.$store.dispatch("resetMonsterData");
                this.$store.dispatch("resetPlayerData");
                this.$store.dispatch("resetBattleLogData");
                this.$store.dispatch("resetGameData");
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