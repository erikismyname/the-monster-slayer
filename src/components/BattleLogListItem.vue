<template>
    <li>{{ text }}</li>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                required: true,
            },
        },
    };
</script>

<style scoped>
    li {
        margin: 0.5rem 0;
        list-style: none;
    }

    li:nth-child(even) {
        background-color: black;
        color: white;
    }
</style>