<template>
    <header>
        <base-h2>Greetings, Warrior!</base-h2>
    </header>
</template>

<script>
    import BaseH2 from "../common/BaseH2.vue";

    export default {
        components: {
            BaseH2,
        },
    };
</script>

<style scoped>
    header {
        padding: 0.5rem;
        border-top-left-radius: 0.2rem;
        border-top-right-radius: 0.2rem;
    }
</style>