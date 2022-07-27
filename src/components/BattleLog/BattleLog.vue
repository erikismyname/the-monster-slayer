<template>
    <section>
        <h2>
            Battle Log

            <base-icon
                v-if="isBattleLogEntriesOrderDescending"
                @click.native="changeBattleLogEntriesOrder"
                class="fa-solid fa-arrow-down"
            />
            <base-icon
                v-else
                @click.native="changeBattleLogEntriesOrder"
                class="fa-solid fa-arrow-up"
            />
        </h2>
        <battle-log-list :battle-log="battleLog" />
    </section>
</template>

<script>
    import { mapGetters } from 'vuex';

    import BaseIcon from "../common/BaseIcon.vue";
    import BattleLogList from "./BattleLogList.vue";

    export default {
        components: {
            BaseIcon,
            BattleLogList,
        },
        computed: {
            ...mapGetters(['battleLog', 'isBattleLogEntriesOrderDescending']),
        },
        methods: {
            changeBattleLogEntriesOrder() {
                this.$store.dispatch('changeBattleLogEntriesOrder');
            },
        },
    };
</script>

<style scoped>
    h2 {
        margin-bottom: 1rem;
    }
</style>