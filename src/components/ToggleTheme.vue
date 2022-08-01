<template>
    <transition>
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
    </transition>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";

    import BaseIcon from "./common/BaseIcon.vue";

    export default {
        components: {
            BaseIcon,
        },
        computed: {
            ...mapGetters(["isThemeLight"]),
        },
        methods: {
            ...mapActions(["setTheme"]),
        },
    };
</script>