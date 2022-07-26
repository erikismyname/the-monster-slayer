<template>
    <div>
        <the-header />

        <modal 
            :is-visible="isModalVisible" @set-player-name="setPlayerName" 
        />

        <battle-screen :player-name="playerName" />
    </div>
</template>

<script>
    import BattleScreen from "./components/BattleScreen.vue";
    import Modal from "./components/Modal.vue";
    import TheHeader from "./components/layouts/TheHeader.vue";

    export default {
        components: {
            BattleScreen,
            Modal,
            TheHeader,
        },
        data() {
            return {
                isModalVisible: true,
                playerName: "",
            };
        },
        methods: {
            setPlayerName(playerName) {
                this.playerName = playerName;

                this.closeModal();
            },
            closeModal() {
                this.isModalVisible = false;
            },
        },
    };
</script>

<style>
    @import "@/assets/styles/main.css";
</style>