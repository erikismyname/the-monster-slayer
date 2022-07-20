<template>
    <div>
        <!-- <modal 
            :is-visible="isModalVisible" 
            @set-player-name="setPlayerName"
        >
        </modal> -->

        <health-status
            id="monster"
            :health="monsterHealth"
            :second-wind="hasMonsterSecondWind"
        >
            <h2>Monster Health</h2>
        </health-status>

        <health-status
            id="player"
            :health="playerHealth"
            :player-health-potions="playerHealthPotions"
            :second-wind="hasPlayerSecondWind"
        >
            <h2>{{ playerName || "Your Health" }}</h2>
        </health-status>

        <game-over :winner="winner" @start-new-game="startNewGame">
        </game-over>

        <battle-controls
            :current-round="currentRound"
            :player-health="playerHealth"
            :player-health-potions="playerHealthPotions"
            :winner="winner"
            @attack-monster="attackMonster"
            @heal-player="healPlayer"
            @surrender-to-monster="surrenderToMonster"
        >
        </battle-controls>

        <battle-log
            :battle-log="battleLog"
            :battle-log-entries-order="battleLogEntriesOrder"
            @change-battle-log-entries-order="changeBattleLogEntriesOrder"
        >
        </battle-log>
    </div>
</template>

<script>
    import getRandomValueBetween from "./util/getRandomValueBetween.js";
    import formatEntry from "./util/formatEntry.js";

    import Modal from "./components/Modal.vue";
    import HealthStatus from "./components/HealthStatus.vue";
    import GameOver from "./components/GameOver.vue";
    import BattleControls from "./components/BattleControls.vue";
    import BattleLog from "./components/BattleLog.vue";

    export default {
        components: {
            Modal,
            HealthStatus,
            GameOver,
            BattleControls,
            BattleLog,
        },
        data() {
            return {
                isModalVisible: true,
                monsterHealth: 100,
                hasMonsterSecondWind: false,
                hasMonsterUsedSecondWind: false,
                playerName: "",
                playerHealth: 100,
                playerHealthPotions: 5,
                hasPlayerSecondWind: false,
                hasPlayerUsedSecondWind: false,
                currentRound: 0,
                winner: "",
                battleLog: [],
                battleLogEntriesOrder: "descending",
            };
        },
        watch: {
            monsterHealth(newHealth) {
                if (newHealth < 0) {
                    this.monsterHealth = 0;
                }
            },
            playerHealth(newHealth) {
                if (newHealth < 0) {
                    this.playerHealth = 0;
                }
            },
            battleLogEntriesOrder() {
                const sortedBattleLog = [];

                for (let i = 0; i < this.battleLog.length; i += 2) {
                    sortedBattleLog.unshift(
                        this.battleLog[i],
                        this.battleLog[i + 1]
                    );
                }

                this.battleLog = sortedBattleLog;
            },
        },
        methods: {
            setPlayerName(playerName) {
                this.playerName = playerName;
                this.isModalVisible = false;
            },
            attackMonster(isSpecialAttack) {
                const playerAttackPoints = isSpecialAttack
                    ? getRandomValueBetween(9, 14)
                    : getRandomValueBetween(5, 10);
                this.monsterHealth -= playerAttackPoints;

                this.addEntryToBattleLog({
                    contender: "Player",
                    action: "attack",
                    points: playerAttackPoints,
                });

                this.attackPlayer();
            },
            attackPlayer() {
                const monsterAttackPoints = getRandomValueBetween(7, 12);
                this.playerHealth -= monsterAttackPoints;

                this.addEntryToBattleLog({
                    contender: "Monster",
                    action: "attack",
                    points: monsterAttackPoints,
                });

                this.endCurrentRound();
            },
            healPlayer() {
                const playerHealPoints = getRandomValueBetween(8, 11);
                this.playerHealth += playerHealPoints;

                if (this.playerHealth > 100) {
                    this.playerHealth = 100;
                }

                this.playerHealthPotions--;

                this.addEntryToBattleLog({
                    contender: "Player",
                    action: "heal",
                    points: playerHealPoints,
                });

                this.attackPlayer();
            },
            endCurrentRound() {
                if (this.monsterHealth <= 0 && this.playerHealth <= 0) {
                    this.winner = "draw";
                } else if (this.monsterHealth <= 0) {
                    this.processMonsterDying();
                } else if (this.playerHealth <= 0) {
                    this.processPlayerDying();
                }

                this.currentRound++;
            },
            processPlayerDying() {
                if (this.hasSecondWind("player")) {
                    this.hasPlayerSecondWind = true;
                    this.hasPlayerUsedSecondWind = true;
                    this.playerHealth = 50;

                    return;
                }

                this.winner = "monster";
            },
            processMonsterDying() {
                if (this.hasSecondWind("monster")) {
                    this.hasMonsterSecondWind = true;
                    this.hasMonsterUsedSecondWind = true;
                    this.monsterHealth = 50;

                    return;
                }

                this.winner = "player";
            },
            hasSecondWind(contender) {
                const hasContenderUsedSecondWind =
                    contender === "player"
                        ? this.hasPlayerUsedSecondWind
                        : this.hasMonsterUsedSecondWind;

                return !hasContenderUsedSecondWind && Math.random() > 0.5;
            },
            startNewGame() {
                this.monsterHealth = 100;
                this.hasMonsterSecondWind = false;
                this.hasMonsterUsedSecondWind = false;

                this.playerHealth = 100;
                this.hasPlayerSecondWind = false;
                this.hasPlayerUsedSecondWind = false;

                this.currentRound = 0;
                this.winner = "";
                this.battleLog = [];
            },
            surrenderToMonster() {
                this.winner = "monster";
            },
            addEntryToBattleLog(entry) {
                const formattedEntry = formatEntry(entry);
                this.battleLog.unshift(formattedEntry);
            },
            changeBattleLogEntriesOrder() {
                this.battleLogEntriesOrder =
                    this.battleLogEntriesOrder === "descending"
                        ? "ascending"
                        : "descending";
            },
        },
    };
</script>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap");

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html {
        font-family: "Oswald", sans-serif;
    }

    #main-header {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        text-align: center;
    }

    #main-header img {
        margin: 0 0.5rem;
        height: 2.5rem;
    }

    #main-header,
    button {
        background-color: black;
        color: white;
    }

    #main-header,
    section:not(#battle-controls),
    button {
        box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.6);
    }

    section,
    .healthbar,
    .healthbar-status,
    button,
    li,
    #modal input {
        border-radius: 0.2rem;
    }

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

    section {
        max-width: 40rem;
        margin: 2rem auto;
        overflow: hidden;
    }

    section:not(#battle-controls) {
        padding: 2rem;
        text-align: center;
    }

    section h2,
    section h3 {
        margin-bottom: 1rem;
    }

    .container {
        position: relative;
    }

    .avatar,
    #health-potion {
        position: absolute;
        height: 2.5rem;
    }

    .avatar.monster {
        right: 13rem;
        top: 1.9rem;
    }

    .avatar.player {
        right: 13.6rem;
        top: 2rem;
    }

    #health-potion {
        right: 11rem;
    }

    #health-potion-counter {
        position: absolute;
        right: 11.5rem;
        top: 1.5rem;
        color: white;
        background-color: black;
        border-radius: 50%;
        width: 1rem;
        font-size: 0.6rem;
    }

    .second-wind {
        position: absolute;
        top: 0;
        right: 0px;
        background-color: black;
        color: white;
        padding: 0.1rem;
        transform: rotateZ(45deg) translateX(2.2rem) translateY(-0.3rem);
        width: 8rem;
    }

    .healthbar {
        height: 2rem;
        border: 0.1rem solid black;
        position: relative;
    }

    .healthbar-status {
        height: 100%;
        transition: width 500ms ease-out;
    }

    .healthbar-percentage {
        position: absolute;
        top: 0;
        transform: translateX(-50%);
    }

    .high {
        background-color: #006400;
    }

    .medium {
        background-color: #ff8c00;
    }

    .low {
        background-color: #880808;
    }

    #battle-controls {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .fa-solid {
        font-size: 1.2rem;
    }

    .fa-solid:hover {
        cursor: pointer;
    }

    #battle-log ul {
        list-style: none;
    }

    #battle-log ul li {
        margin: 0.5rem 0;
    }

    li:nth-child(even) {
        background-color: black;
        color: white;
    }

    #backdrop {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: black;
        opacity: 0.5;
        z-index: 1;
    }

    #modal {
        position: fixed;
        left: calc(50% - 15rem);
        z-index: 2;
        width: 30rem;
    }

    #modal header,
    #modal main {
        padding: 0.5rem;
    }

    #modal header {
        background-color: black;
        color: white;
        border-top-left-radius: 0.2rem;
        border-top-right-radius: 0.2rem;
    }

    #modal main {
        background-color: white;
        border-bottom-left-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
        padding: 1rem;
    }

    #modal div:first-of-type {
        margin-bottom: 0.3rem;
    }

    #modal input[type="text"] {
        padding: 0.2rem;
        font-family: inherit;
        border: 0.1rem solid black;
        width: 40%;
    }

    #modal input.invalid {
        border-color: #880808;
    }

    #modal input#generate-random-name {
        margin-right: 0.3rem;
    }

    #modal button {
        width: 6rem;
        padding: 0.5rem;
        margin: 0;
    }

    #button-container {
        margin-top: 2rem;
        display: flex;
        justify-content: flex-end;
    }

    .v-enter-active {
        animation: modal 500ms ease-out;
    }

    .v-leave-active {
        animation: modal 500ms ease-in reverse;
    }

    .entry-enter {
        opacity: 0;
    }

    .entry-enter-active {
        transition: opacity 1s linear;
    }

    .entry-enter-to {
        opacity: 1;
    }

    .entry-move {
        transition: transform 0.3s ease-out;
    }

    @keyframes modal {
        from {
            opacity: 0;
            transform: translateY(-6rem);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>