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
            @click.native="surrenderToMonster"
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
                "lastPlayerDamagePointsTaken",
                "lastPlayerHealthPointsGained",
                "lastMonsterDamagePointsTaken",
            ]),
        },
        methods: {
            processRound(action, isSpecialAttack) {
                let playerActionPoints;
                // ternary below?
                if (action === "attack") {
                    this.$store.dispatch("attackMonster", isSpecialAttack);
                    playerActionPoints = this.lastMonsterDamagePointsTaken;
                } else {
                    this.$store.dispatch("healPlayer");
                    playerActionPoints = this.lastPlayerHealthPointsGained;
                }

                this.$store.dispatch("addEntryToBattleLog", {
                    contender: "Player",
                    action,
                    points: playerActionPoints,
                });

                this.$store.dispatch("attackPlayer");
                this.$store.dispatch("addEntryToBattleLog", {
                    contender: "Monster",
                    action: "attack",
                    points: this.lastPlayerDamagePointsTaken,
                });

                this.$store.dispatch("endCurrentRound");
            },
            surrenderToMonster() {
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