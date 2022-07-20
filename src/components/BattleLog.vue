<template>
    <section id="battle-log">
        <h2>
            Battle Log
            <i
                v-if="isBattleLogEntriesOrderDescending"
                @click="changeBattleLogEntriesOrder"
                class="fa-solid fa-arrow-down"
            >
            </i>
            <i
                v-else
                @click="changeBattleLogEntriesOrder"
                class="fa-solid fa-arrow-up"
            >
            </i>
        </h2>
        <transition-group tag="ul" name="entry">
            <li v-for="entry in battleLog" :key="entry.id">
                {{ entry.text }}
            </li>
        </transition-group>
    </section>
</template>

<script>
    export default {
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

<style>
</style>