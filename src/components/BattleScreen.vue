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
            ...mapGetters(["playerName"]),
        },
    };
</script>