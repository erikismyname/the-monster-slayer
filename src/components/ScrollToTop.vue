<template>
    <base-icon
        v-if="isScrollToTopIconVisible"
        @click.native="scrollToTop"
        :class="classes"
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
            ...mapGetters('game', ["isDarkModeOn"]),
            isScrollToTopIconVisible() {
                return this.scrollY >= 250;
            },
            classes() {
                return {
                    'fa-solid': true,
                    'fa-circle-arrow-up': true,
                    dark: this.isDarkModeOn
                };
            }
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