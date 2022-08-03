<template>
    <section 
        v-if="isGameOver" 
        :class="classes"
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

    import BaseButton from "@/components/common/BaseButton";
    import BaseH2 from "@/components/common/BaseH2";
    import BaseH3 from "@/components/common/BaseH3";
    import BaseIcon from "@/components/common/BaseIcon";

    export default {
        components: {
            BaseButton,
            BaseH2,
            BaseH3,
            BaseIcon,
        },
        computed: {
            ...mapGetters("game", [
                "isGameOver",
                "isDarkModeOn",
                "isPlayerWinner",
                "isMonsterWinner",
            ]),
            classes() {
                return {
                    container: true,
                    dark: this.isDarkModeOn,
                };
            },
        },
        methods: {
            startNewGame() {
                this.$store.dispatch("game/restart");
            },
        },
    };
</script>