<template>
    <base-icon
        v-if="isScrollToTopIconVisible"
        @click.native="scrollToTop"
        :class="theme"
        class="fa-solid fa-circle-arrow-up"
    />
</template>

<script>
    import { mapGetters } from "vuex";

    import BaseIcon from "@/components/common/BaseIcon";

    export default {
        components: {
            BaseIcon,
        },
        data() {
            return { scrollY: 0 };
        },
        computed: {
            ...mapGetters('game', ["theme"]),
            isScrollToTopIconVisible() {
                return this.scrollY >= 250;
            },
        },
        mounted() {
            window.addEventListener("scroll", this.setScrollY);
        },
        beforeDestroy() {
            window.removeEventListener("scroll", this.setScrollY);
        },
        methods: {
            setScrollY(event) {
                this.scrollY = event.target.defaultView.scrollY;
            },
            scrollToTop() {
                window.scrollTo({ top: 0, behavior: "smooth" });
            },
        },
    };
</script>