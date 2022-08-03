<template>
    <input 
        type="checkbox" 
        :checked="checked" 
        @change="updateCheckboxValue" 
    />
</template>

<script>
    export default {
        model: {
            prop: "checked",
            event: "change",
        },
        props: {
            checked: {
                type: Boolean,
                required: true,
            },
        },
        methods: {
            updateCheckboxValue(event) {
                this.$emit("change", event.target.checked);
            },
        },
    };
</script>

<style scoped>
    input {
        margin-right: 0.3rem;
    }
</style>