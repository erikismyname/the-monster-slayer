<template>
    <header id="main-header">
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