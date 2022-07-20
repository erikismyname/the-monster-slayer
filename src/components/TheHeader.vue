<template>
    <header>
        <base-image :src="imagePath" :alt="imageAlt" />
        <h1>The Monster Slayer</h1>
        <base-image :src="imagePath" :alt="imageAlt" />
    </header>
</template>

<script>
    import BaseImage from "./BaseImage.vue";

    export default {
        components: {
            BaseImage,
        },
        computed: {
            imagePath() {
                return require("../assets/fire-torch.jpg");
            },
            imageAlt() {
                return "A burning fire torch";
            },
        },
    };
</script>

<style scoped>
    header {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        text-align: center;
    }

    h1 {
        margin: 0 0.5rem;
    }
</style>