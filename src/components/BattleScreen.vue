<template>
    <div>
        <contenders-dashboard />
        <battle-controls />
        <game-over />
        <battle-log />
    </div>
</template>

<script>
    import BattleControls from "@/components/BattleControls";
    import BattleLog from "@/components/BattleLog/BattleLog";
    import ContendersDashboard from "@/components/ContendersDashboard/ContendersDashboard";
    import GameOver from "@/components/GameOver";

    export default {
        components: {
            BattleControls,
            BattleLog,
            ContendersDashboard,
            GameOver,
        },
    };
</script>