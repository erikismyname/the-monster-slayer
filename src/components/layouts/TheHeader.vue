<template>
    <header>
        <base-image 
            :src="imagePath" 
            :alt="imageAlt" 
        />
        <h1>The Monster Slayer</h1>
        <base-image 
            :src="imagePath" 
            :alt="imageAlt" 
        />
        <toggle-theme />
    </header>
</template>

<script>
    import BaseImage from "@/components/common/BaseImage";
    import ToggleTheme from "@/components/ToggleTheme";

    export default {
        components: {
            BaseImage,
            ToggleTheme,
        },
        computed: {
            imagePath() {
                return require("@/assets/fire-torch.jpg");
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