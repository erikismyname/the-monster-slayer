<template>
    <section 
        v-if="!isGameOver" 
        class="battle-controls"
    >
        <base-button
            @click.native="processRound('attack')"
            data-testid="attack-button"
        >
            ATTACK
        </base-button>

        <base-button
            :disabled="isCurrentRoundNotDivisibleByThree"
            @click.native="processRound('specialAttack')"
            data-testid="special-attack-button"
        >
            SPECIAL ATTACK
        </base-button>

        <base-button
            :disabled="isPlayerHealingDisabled"
            @click.native="processRound('heal')"
            data-testid="heal-button"
        >
            HEAL
        </base-button>

        <base-button 
            @click.native="surrender" 
            data-testid="surrender-button"
        >
            SURRENDER
        </base-button>
    </section>
</template>

<script>
    import { mapGetters } from "vuex";

    import BaseButton from "./common/BaseButton.vue";

    export default {
        components: {
            BaseButton,
        },
        computed: {
            ...mapGetters("game", [
                "isGameOver",
                "isCurrentRoundNotDivisibleByThree",
            ]),
            ...mapGetters("player", {
                isPlayerHealingDisabled: "isHealingDisabled",
            }),
        },
        methods: {
            processRound(action) {
                this.$store.dispatch("player/processAction", action);
                this.$store.dispatch("monster/processAction");
                this.$store.dispatch("game/endRound");
            },
            surrender() {
                this.$store.dispatch("game/endBattle");
            },
        },
    };
</script>

<style>
    .battle-controls {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
</style>