<template>
    <img :src="src" :alt="alt" />
</template>

<script>
    export default {
        props: {
            src: {
                type: String,
                required: true,
            },
            alt: {
                type: String,
                required: true,
            },
        },
    };
</script>

<style scoped>
    img {
        height: 2.5rem;
        vertical-align: middle;
    }

    .player-avatar {
        margin-right: .1rem;
    }
</style>