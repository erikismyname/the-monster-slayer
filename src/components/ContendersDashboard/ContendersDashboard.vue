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

    import BaseH2 from "../common/BaseH2.vue";
    import ContendersDashboardCard from "./ContendersDashboardCard.vue";

    export default {
        components: {
            BaseH2,
            ContendersDashboardCard,
        },
        computed: {
            ...mapGetters("player", ["name"]),
        },
    };
</script>

<style>
</style>