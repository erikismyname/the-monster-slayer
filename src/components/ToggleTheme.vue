<template>
    <base-icon
        v-if="isDarkModeOn"
        @click.native="toggleDarkMode"
        class="fa-solid fa-sun"
        data-testid="light-mode"
    />
    <base-icon
        v-else
        @click.native="toggleDarkMode"
        class="fa-solid fa-moon"
        data-testid="dark-mode"
    />
</template>

<script>
    import { mapGetters, mapActions } from "vuex";

    import BaseIcon from "@/components/common/BaseIcon";

    export default {
        components: {
            BaseIcon,
        },
        computed: mapGetters("game", ["isDarkModeOn"]),
        methods: mapActions("game", ["toggleDarkMode"]),
    };
</script>