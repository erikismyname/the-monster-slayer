<template>
    <div 
        :class="theme" 
        class="app"
    >
        <the-header />
        <modal />
        <battle-screen />
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    import BattleScreen from "./components/BattleScreen.vue";
    import Modal from "./components/Modal/Modal.vue";
    import TheHeader from "./components/layouts/TheHeader.vue";

    export default {
        components: {
            BattleScreen,
            Modal,
            TheHeader,
        },
        computed: {
            ...mapGetters(["theme"]),
        },
    };
</script>

<style>
    @import "@/assets/styles/main.css";
</style>