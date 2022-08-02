<template>
    <div 
        :class="theme" 
        class="app"
    >
        <modal />
        <the-header />
        <battle-screen />
        <scroll-to-top />
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    import BattleScreen from "./components/BattleScreen.vue";
    import Modal from "./components/Modal/Modal.vue";
    import ScrollToTop from "./components/ScrollToTop.vue";
    import TheHeader from "./components/layouts/TheHeader.vue";

    export default {
        components: {
            BattleScreen,
            Modal,
            ScrollToTop,
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