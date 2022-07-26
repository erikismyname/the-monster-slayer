<template>
    <div>
        <the-header />

        <modal 
            :is-visible="isModalVisible" 
            @begin-game="beginGame" 
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
            beginGame(playerName) {
                this.setPlayerName(playerName);
                this.closeModal();
            },
            setPlayerName(playerName) {
                this.playerName = playerName;
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