<template>
    <button>
        <slot></slot>
    </button>
</template>

<script>
    export default {};
</script>

<style scoped>
    button {
        width: 9rem;
        margin: 0.5rem 0;
        padding: 1rem;
        border: none;
        font-family: inherit;
        font-size: inherit;
        outline: none;
    }

    button:hover {
        cursor: pointer;
        color: black;
        background-color: white;
    }

    button:disabled {
        background-color: #b5b5b5;
        color: #3f3f3f;
        cursor: not-allowed;
    }
</style>