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
    import BaseIcon from "./ui/BaseIcon.vue";
    import BattleLogList from "./BattleLogList.vue";

    export default {
        components: {
            BaseIcon,
            BattleLogList,
        },
        props: {
            battleLog: {
                type: Array,
                required: true,
            },
            battleLogEntriesOrder: {
                type: String,
                required: true,
            },
        },
        computed: {
            isBattleLogEntriesOrderDescending() {
                return this.battleLogEntriesOrder === "descending";
            },
        },
        methods: {
            changeBattleLogEntriesOrder() {
                this.$emit("change-battle-log-entries-order");
            },
        },
    };
</script>

<style scoped>
    h2 {
        margin-bottom: 1rem;
    }
</style>