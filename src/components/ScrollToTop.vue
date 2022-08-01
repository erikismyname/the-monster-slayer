<template>
    <base-icon
        v-if="isScrollToTopIconVisible"
        @click.native="scrollToTop"
        class="fa-solid fa-circle-arrow-up"
    />
</template>

<script>
    import BaseIcon from "./common/BaseIcon.vue";

    export default {
        components: {
            BaseIcon,
        },
        data() {
            return { scrollY: 0 };
        },
        computed: {
            isScrollToTopIconVisible() {
                return this.scrollY > 300;
            },
        },
        mounted() {
            addEventListener("scroll", this.setScrollY);
        },
        methods: {
            setScrollY() {
                this.scrollY = scrollY;
            },
            scrollToTop() {
                scrollTo({ top: 0, behavior: "smooth" });
            },
        },
    };
</script>