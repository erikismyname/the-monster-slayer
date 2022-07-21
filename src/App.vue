<template>
    <div>
        <the-header />

        <modal 
            :is-visible="isModalVisible" 
            @set-player-name="setPlayerName" 
        />

        <health-dashboard
            :contender-health="monsterHealth"
            :has-contender-second-wind="hasMonsterSecondWind"
        >
            <h2>Monster</h2>
        </health-dashboard>

        <health-dashboard
            :contender-health="playerHealth"
            :contender-health-potions="playerHealthPotions"
            :has-contender-second-wind="hasPlayerSecondWind"
        >
            <h2>{{ playerName }}</h2>
        </health-dashboard>

        <game-over 
            :winner="winner" 
            @start-new-game="startNewGame" 
        />

        <battle-controls
            :current-round="currentRound"
            :player-health="playerHealth"
            :player-health-potions="playerHealthPotions"
            :winner="winner"
            @attack-monster="attackMonster"
            @heal-player="healPlayer"
            @surrender-to-monster="surrenderToMonster"
        />

        <battle-log
            :battle-log="battleLog"
            :battle-log-entries-order="battleLogEntriesOrder"
            @change-battle-log-entries-order="changeBattleLogEntriesOrder"
        />
    </div>
</template>

<script>
    import getRandomValueBetween from "./util/getRandomValueBetween.js";
    import formatEntry from "./util/formatEntry.js";

    import BattleControls from "./components/BattleControls.vue";
    import BattleLog from "./components/BattleLog.vue";
    import GameOver from "./components/GameOver.vue";
    import HealthDashboard from "./components/HealthDashboard.vue";
    import Modal from "./components/Modal.vue";
    import TheHeader from "./components/layouts/TheHeader.vue";

    export default {
        components: {
            BattleControls,
            BattleLog,
            GameOver,
            HealthDashboard,
            Modal,
            TheHeader,
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
                
                this.closeModal();
            },
            closeModal() {
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

    header,
    button,
    .second-wind-badge,
    #health-potions-counter,
    li:nth-child(even) {
        background-color: black;
        color: white;
    }

    header,
    button,
    #modal,
    section:not(#battle-controls) {
        box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.6);
    }

    input,
    button,
    section,
    .healthbar,
    .healthbar-status,
    li {
        border-radius: 0.2rem;
    }

    section {
        max-width: 40rem;
        margin: 2rem auto;
    }

    section:not(#battle-controls) {
        padding: 2rem;
        text-align: center;
    }
</style>