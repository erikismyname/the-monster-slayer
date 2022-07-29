<template>
    <section>
        <h2>
            Battle Log

            <base-icon
                v-if="isEntriesOrderDescending"
                @click.native="changeEntriesOrder"
                class="fa-solid fa-arrow-down"
            />
            <base-icon
                v-else
                @click.native="changeEntriesOrder"
                class="fa-solid fa-arrow-up"
            />
        </h2>
        <battle-log-list :entries="entries" />
    </section>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";

    import BaseIcon from "../common/BaseIcon.vue";
    import BattleLogList from "./BattleLogList.vue";

    export default {
        components: {
            BaseIcon,
            BattleLogList,
        },
        computed: {
            ...mapGetters(["entries", "isEntriesOrderDescending"]),
        },
        methods: {
            ...mapActions(["changeEntriesOrder"]),
        },
    };
</script>

<style scoped>
    h2 {
        margin-bottom: 1rem;
    }
</style>