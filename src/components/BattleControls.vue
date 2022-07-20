<template>
    <section v-if="isGameRunning" id="battle-controls">
        <button @click="attackMonster(false)">ATTACK</button>

        <button
            :disabled="isCurrentRoundNotDivisibleByThree"
            @click="attackMonster(true)"
        >
            SPECIAL ATTACK
        </button>

        <button :disabled="isPlayerHealthDisabled" @click="healPlayer">
            HEAL
        </button>

        <button @click="surrenderToMonster">SURRENDER</button>
    </section>
</template>

<script>
    export default {
        props: {
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
            winner: {
                type: String,
                required: true,
            },
        },
        computed: {
            isCurrentRoundNotDivisibleByThree() {
                return this.currentRound % 3 !== 0;
            },
            isPlayerHealthDisabled() {
                return this.playerHealth === 100 || this.playerHealthPotions <= 0;
            },
            isGameRunning() {
                return !this.winner;
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
</style>