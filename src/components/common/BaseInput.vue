<template>
    <input 
        type="text" 
        :value="value" 
        @input="updateInputValue" 
    />
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

    .invalid::placeholder {
        color: #880808;
        opacity: 1; /* Firefox fix (adds lower opacity by default) */
    }

    @media (max-width: 30rem) {
        input {
            width: 50%;
        }
    }

    @media (max-width: 20rem) {
        input {
            width: 70%;
            margin-top: 0.5rem;
        }
    }
</style>