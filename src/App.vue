<template>
    <div :class="classes">
        <modal />
        <the-header />
        <battle-screen />
        <scroll-to-top />
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    import BattleScreen from "@/components/BattleScreen";
    import Modal from "@/components/Modal/Modal";
    import ScrollToTop from "@/components/ScrollToTop";
    import TheHeader from "@/components/layouts/TheHeader";

    export default {
        components: {
            BattleScreen,
            Modal,
            ScrollToTop,
            TheHeader,
        },
        computed: {
            ...mapGetters("game", ["isDarkModeOn"]),
            classes() {
                return {
                    app: true,
                    dark: this.isDarkModeOn,
                };
            },
        },
    };
</script>

<style>
    @import "@/assets/styles/main.css";
</style>