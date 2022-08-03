<template>
    <section :class="classes">
        <base-h2>
            Battle Log

            <base-icon
                v-if="isEntriesOrderDescending"
                @click.native="changeEntriesOrder"
                class="fa-solid fa-arrow-down"
            />
            <base-icon
                v-else
                @click.native="changeEntriesOrder"
                class="fa-solid fa-arrow-up"
            />
        </base-h2>
        <battle-log-list :entries="entries" />
    </section>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";

    import BaseH2 from "@/components/common/BaseH2";
    import BaseIcon from "@/components/common/BaseIcon";
    import BattleLogList from "@/components/BattleLog/BattleLogList";

    export default {
        components: {
            BaseH2,
            BaseIcon,
            BattleLogList,
        },
        computed: {
            ...mapGetters("battleLog", ["entries", "isEntriesOrderDescending"]),
            ...mapGetters("game", ["isDarkModeOn"]),
            classes() {
                return {
                    container: true,
                    dark: this.isDarkModeOn,
                };
            },
        },
        methods: mapActions("battleLog", ["changeEntriesOrder"]),
    };
</script>

<style scoped>
    section {
        margin-bottom: 0;
    }
</style>