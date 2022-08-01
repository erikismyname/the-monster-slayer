<template>
    <div>
        <health-dashboard contender="monster">
            <base-h2 class="contender">Monster</base-h2>
        </health-dashboard>

        <health-dashboard contender="player">
            <base-h2 class="contender">{{ name }}</base-h2>
        </health-dashboard>

        <battle-controls />
        <game-over />
        <battle-log />
        <scroll-to-top />
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    import BaseH2 from './common/BaseH2.vue';
    import BattleControls from "./BattleControls.vue";
    import BattleLog from "./BattleLog/BattleLog.vue";
    import GameOver from "./GameOver.vue";
    import HealthDashboard from "./HealthDashboard/HealthDashboard.vue";
    import ScrollToTop from "./ScrollToTop.vue";

    export default {
        components: {
            BaseH2,
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