<template>
    <base-icon
        v-if="isScrollToTopIconVisible"
        @click.native="scrollToTop"
        :class="classes"
        data-testid="scroll-to-top"
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
            ...mapGetters("game", ["isDarkModeOn"]),
            classes() {
                return {
                    "fa-solid": true,
                    "fa-circle-arrow-up": true,
                    dark: this.isDarkModeOn,
                };
            },
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