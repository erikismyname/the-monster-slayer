<template>
    <div>
        <contenders-dashboard-card contender="monster">
            <base-h2 class="contender">Monster</base-h2>
        </contenders-dashboard-card>

        <contenders-dashboard-card contender="player">
            <base-h2 class="contender">{{ name }}</base-h2>
        </contenders-dashboard-card>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    import BaseH2 from "@/components/common/BaseH2";
    import ContendersDashboardCard from "@/components/ContendersDashboard/ContendersDashboardCard";

    export default {
        components: {
            BaseH2,
            ContendersDashboardCard,
        },
        computed: mapGetters("player", ["name"]),
    };
</script>