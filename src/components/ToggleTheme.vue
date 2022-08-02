<template>
    <base-icon
        v-if="isThemeLight"
        @click.native="setTheme"
        class="fa-solid fa-sun"
    />
    <base-icon 
        v-else 
        @click.native="setTheme" 
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
        computed: mapGetters(["isThemeLight"]),
        methods: mapActions(["setTheme"]),
    };
</script>