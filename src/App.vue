<template>
    <div>
        <the-header />
        <modal />
        <battle-screen />
    </div>
</template>

<script>
    import BattleScreen from "./components/BattleScreen.vue";
    import Modal from "./components/Modal/Modal.vue";
    import TheHeader from "./components/layouts/TheHeader.vue";

    export default {
        components: {
            BattleScreen,
            Modal,
            TheHeader,
        },
    };
</script>

<style>
    @import "@/assets/styles/main.css";
</style>