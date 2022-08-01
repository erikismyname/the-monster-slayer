<template>
    <section 
        v-if="isGameOver" 
        :class="theme" 
        class="container"
    >
        <base-h2>Game Over</base-h2>

        <base-h3 v-if="isPlayerWinner">
            You WON!
            <base-icon class="fa-solid fa-face-smile" />
        </base-h3>
        <base-h3 v-else-if="isMonsterWinner">
            You LOST!
            <base-icon class="fa-solid fa-face-frown" />
        </base-h3>
        <base-h3 v-else>
            DRAW!
            <base-icon class="fa-solid fa-face-meh" />
        </base-h3>

        <base-button @click.native="startNewGame">
            Start New Game
        </base-button>
    </section>
</template>

<script>
    import { mapGetters } from "vuex";

    import BaseButton from "./common/BaseButton.vue";
    import BaseH2 from "./common/BaseH2.vue";
    import BaseH3 from "./common/BaseH3.vue";
    import BaseIcon from "./common/BaseIcon.vue";

    export default {
        components: {
            BaseButton,
            BaseH2,
            BaseH3,
            BaseIcon,
        },
        computed: {
            ...mapGetters([
                "isGameOver",
                "isPlayerWinner",
                "isMonsterWinner",
                "theme",
            ]),
        },
        methods: {
            startNewGame() {
                this.$store.dispatch("startNewGame");
            },
        },
    };
</script>