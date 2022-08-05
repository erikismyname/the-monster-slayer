<template>
    <div>
        <contenders-dashboard-card contender="monster" />
        <contenders-dashboard-card contender="player" />
    </div>
</template>

<script>
    import ContendersDashboardCard from "@/components/ContendersDashboard/ContendersDashboardCard";

    export default {
        components: {
            ContendersDashboardCard,
        },
    };
</script>