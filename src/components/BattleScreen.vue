<template>
    <div>
        <health-dashboard
            contender="monster"
            :contender-health="monsterHealth"
            :has-contender-second-wind="hasMonsterSecondWind"
        >
            <h2>Monster</h2>
        </health-dashboard>

        <health-dashboard
            contender="player"
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
    import { mapGetters } from 'vuex';

    import config from "../config";
    import getRandomValueBetween from "../utils/getRandomValueBetween.js";
    import formatEntry from "../utils/formatEntry.js";

    import BattleControls from "./BattleControls.vue";
    import BattleLog from "./BattleLog/BattleLog.vue";
    import GameOver from "./GameOver.vue";
    import HealthDashboard from "./HealthDashboard/HealthDashboard.vue";

    export default {
        components: {
            BattleControls,
            BattleLog,
            GameOver,
            HealthDashboard,
        },
        data() {
            return {
                monsterHealth: 100,
                hasMonsterSecondWind: false,
                hasMonsterUsedSecondWind: false,
                playerHealth: 100,
                playerHealthPotions: config.PLAYER_HEALTH_POTIONS_NUMBER,
                hasPlayerSecondWind: false,
                hasPlayerUsedSecondWind: false,
                currentRound: 0,
                winner: "",
                battleLog: [],
                battleLogEntriesOrder: "descending",
            };
        },
        computed: {
            ...mapGetters(['playerName'])
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
            attackMonster(isSpecialAttack) {
                const playerAttackPoints = isSpecialAttack
                    ? getRandomValueBetween(
                          config.PLAYER_MIN_SPECIAL_ATTACK_POINTS,
                          config.PLAYER_MAX_SPECIAL_ATTACK_POINTS
                      )
                    : getRandomValueBetween(
                          config.PLAYER_MIN_ATTACK_POINTS,
                          config.PLAYER_MAX_ATTACK_POINTS
                      );
                this.monsterHealth -= playerAttackPoints;

                this.addEntryToBattleLog({
                    contender: "Player",
                    action: "attack",
                    points: playerAttackPoints,
                });

                this.attackPlayer();
            },
            attackPlayer() {
                const monsterAttackPoints = getRandomValueBetween(
                    config.MONSTER_MIN_ATTACK_POINTS,
                    config.MONSTER_MAX_ATTACK_POINTS
                );
                this.playerHealth -= monsterAttackPoints;

                this.addEntryToBattleLog({
                    contender: "Monster",
                    action: "attack",
                    points: monsterAttackPoints,
                });

                this.endCurrentRound();
            },
            healPlayer() {
                const playerHealPoints = getRandomValueBetween(
                    config.PLAYER_MIN_HEAL_POINTS,
                    config.PLAYER_MAX_HEAL_POINTS
                );
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
                this.playerHealthPotions = config.PLAYER_HEALTH_POTIONS_NUMBER;
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