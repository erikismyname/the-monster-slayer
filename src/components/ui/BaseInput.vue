<template>
    <input type="text" :value="value" @input="updateInputValue" />
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                required: true,
            },
        },
        methods: {
            updateInputValue(event) {
                this.$emit("input", event.target.value);
            },
        },
    };
</script>

<style scoped>
    input {
        padding: 0.2rem;
        font-family: inherit;
        border: 0.1rem solid black;
        width: 40%;
    }

    .invalid {
        border-color: #880808;
    }
</style>