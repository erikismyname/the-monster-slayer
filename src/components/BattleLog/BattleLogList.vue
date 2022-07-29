<template>
    <transition-group tag="ul" name="entry">
        <battle-log-list-item
            v-for="entry in entries"
            :key="entry.id"
            :text="entry.text"
        />
    </transition-group>
</template>

<script>
    import BattleLogListItem from "./BattleLogListItem.vue";

    export default {
        components: {
            BattleLogListItem,
        },
        props: {
            entries: {
                type: Array,
                required: true,
            },
        },
    };
</script>

<style scoped>
    .entry-enter {
        opacity: 0;
    }

    .entry-enter-active {
        transition: opacity 1s linear;
    }

    .entry-enter-to {
        opacity: 1;
    }

    .entry-move {
        transition: transform 0.3s ease-out;
    }
</style>