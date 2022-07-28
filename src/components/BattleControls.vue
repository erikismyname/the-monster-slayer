<template>
    <section v-if="!isGameOver" class="battle-controls">
        <base-button
            @click.native="processRound('attack', false)"
            data-testid="attack-btn"
        >
            ATTACK
        </base-button>

        <base-button
            :disabled="isCurrentRoundNotDivisibleByThree"
            @click.native="processRound('attack', true)"
            data-testid="special-attack-btn"
        >
            SPECIAL ATTACK
        </base-button>

        <base-button
            :disabled="isPlayerHealthDisabled"
            @click.native="processRound('heal')"
            data-testid="heal-btn"
        >
            HEAL
        </base-button>

        <base-button 
            @click.native="surrender" 
            data-testid="surrender-btn"
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
            ...mapGetters([
                "isGameOver",
                "isCurrentRoundNotDivisibleByThree",
                "isPlayerHealthDisabled",
            ]),
        },
        methods: {
            processRound(action, isSpecialAttack) {
                this.$store.dispatch("processPlayerAction", {
                    action,
                    isSpecialAttack,
                });
                this.$store.dispatch("processMonsterAction");
                this.$store.dispatch("endCurrentRound");
            },
            surrender() {
                this.$store.dispatch("endGame");
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