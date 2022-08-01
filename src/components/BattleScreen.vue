<template>
    <div>
        <health-dashboard contender="monster">
            <h2>Monster</h2>
        </health-dashboard>

        <health-dashboard contender="player">
            <h2>{{ name }}</h2>
        </health-dashboard>

        <battle-controls />
        <game-over />
        <battle-log />
        <scroll-to-top />
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    import BattleControls from "./BattleControls.vue";
    import BattleLog from "./BattleLog/BattleLog.vue";
    import GameOver from "./GameOver.vue";
    import HealthDashboard from "./HealthDashboard/HealthDashboard.vue";
    import ScrollToTop from "./ScrollToTop.vue";

    export default {
        components: {
            BattleControls,
            BattleLog,
            GameOver,
            HealthDashboard,
            ScrollToTop,
        },
        computed: {
            ...mapGetters("player", ["name"]),
        },
    };
</script>