<template>
    <base-icon
        v-if="isDarkModeOn"
        @click.native="toggleDarkMode"
        class="fa-solid fa-sun"
    />
    <base-icon 
        v-else 
        @click.native="toggleDarkMode" 
        class="fa-solid fa-moon" 
    />
</template>

<script>
    import { mapGetters, mapActions } from "vuex";

    import BaseIcon from "@/components/common/BaseIcon";

    export default {
        components: {
            BaseIcon,
        },
        computed: mapGetters('game', ["isDarkModeOn"]),
        methods: mapActions('game', ["toggleDarkMode"]),
    };
</script>