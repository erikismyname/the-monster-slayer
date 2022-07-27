<template>
    <div>
        <health-dashboard contender="monster">
            <h2>Monster</h2>
        </health-dashboard>

        <health-dashboard contender="player">
            <h2>{{ playerName }}</h2>
        </health-dashboard>

        <battle-controls />

        <game-over />

        <battle-log />
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    import BattleControls from "./BattleControls.vue";
    import BattleLog from "./BattleLog/BattleLog.vue";
    import GameOver from "./GameOver.vue";
    import HealthDashboard from "./HealthDashboard/HealthDashboard.vue";

    export default {
        components: {
            BattleControls,
            BattleLog,
            GameOver,
            HealthDashboard,
        },
        computed: {
            ...mapGetters(["playerName", "playerHealth", "monsterHealth"]),
        },
        watch: {
            // monsterHealth(newHealth) {
            //     if (newHealth < 0) {
            //         this.monsterHealth = 0;
            //     }
            //     // in monster store: monsterHealth -= attackPoints ; if monsterHealth < 0 monsterHealth = 0
            // },
            // playerHealth(newHealth) {
            //     if (newHealth < 0) {
            //         this.playerHealth = 0;
            //     }
            // },
            // battleLogEntriesOrder() {
            //     const sortedBattleLog = [];
            //     for (let i = 0; i < this.battleLog.length; i += 2) {
            //         sortedBattleLog.unshift(
            //             this.battleLog[i],
            //             this.battleLog[i + 1]
            //         );
            //     }
            //     this.battleLog = sortedBattleLog;
            // },
        },
    };
</script>