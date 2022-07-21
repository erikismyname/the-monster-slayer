<template>
    <section v-if="isGameRunning" id="battle-controls">
        <base-button @click.native="attackMonster(false)">
            ATTACK
        </base-button>

        <base-button
            :disabled="isCurrentRoundNotDivisibleByThree"
            @click.native="attackMonster(true)"
        >
            SPECIAL ATTACK
        </base-button>

        <base-button
            :disabled="isPlayerHealthDisabled"
            @click.native="healPlayer"
        >
            HEAL
        </base-button>

        <base-button @click.native="surrenderToMonster">
            SURRENDER
        </base-button>
    </section>
</template>

<script>
    import BaseButton from "./common/BaseButton.vue";

    export default {
        components: {
            BaseButton,
        },
        props: {
            winner: {
                type: String,
                required: true,
            },
            currentRound: {
                type: Number,
                required: true,
            },
            playerHealth: {
                type: Number,
                required: true,
            },
            playerHealthPotions: {
                type: Number,
                required: true,
            },
        },
        computed: {
            isGameRunning() {
                return !this.winner;
            },
            isCurrentRoundNotDivisibleByThree() {
                return this.currentRound % 3 !== 0;
            },
            isPlayerHealthDisabled() {
                return this.playerHealth === 100 || this.playerHealthPotions <= 0;
            },
        },
        methods: {
            attackMonster(isSpecialAttack) {
                this.$emit("attack-monster", isSpecialAttack);
            },
            healPlayer() {
                this.$emit("heal-player");
            },
            surrenderToMonster() {
                this.$emit("surrender-to-monster");
            },
        },
    };
</script>

<style>
    #battle-controls {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
</style>