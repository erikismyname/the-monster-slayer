<template>
    <div>
        <contenders-dashboard />
        <battle-controls />
        <game-over />
        <battle-log />
    </div>
</template>

<script>
    import BattleControls from "./BattleControls.vue";
    import BattleLog from "./BattleLog/BattleLog.vue";
    import ContendersDashboard from "./ContendersDashboard/ContendersDashboard.vue";
    import GameOver from "./GameOver.vue";

    export default {
        components: {
            BattleControls,
            BattleLog,
            ContendersDashboard,
            GameOver,
        },
    };
</script>