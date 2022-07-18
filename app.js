import getRandomValueBetween from './util/getRandomValueBetween.js';
import formatBattleLogEntry from './util/formatBattleLogEntry.js';

Vue.component('the-modal', {
    data() {
        return {
            playerName: ''
        };
    },
    methods: {
        setPlayerName() {
            if (!this.playerName) {
                return;
            }
            
            this.$emit('set-player-name', this.playerName);
        }
    },
    template: `
        <div>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <h2>Welcome to The Monster Slayer</h2>
                </header>
                <main>
                    <div>
                        <label for="username">Please enter you name:</label>
                        <input type="text" id="username" v-model.trim="playerName">
                    </div>
                    <div id="button-container">
                        <button @click="setPlayerName">Start Game</button>
                    </div>
                </main>
            </div>
        </div>
    `
});

Vue.component('health-status-section', {
    props: {
        id: {
            type: String,
            required: true
        },
        health: {
            type: Number,
            required: true
        },
        playerHealthPotions: {
            type: Number,
            required: true
        },
        secondWind: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        isMonsterAvatar() {
            return this.id === 'monster';
        },
        healthbarLevelClass() {
            return {
                high: this.health > 50,
                medium: this.health > 25 && this.health <= 50,
                low: this.health <= 25,
            }
        },
        healthbarWidthStyle() {
            return { width: (this.health > 0 ? this.health : 0) + '%' };
        },
        isSecondWindActivated() {
            return this.secondWind;
        }
    },
    template: `
        <section :id="id" class="container">
            <img
                v-if="isMonsterAvatar" 
                src="./assets/monster.jpg"
                alt="Monster's avatar"
                class="avatar monster"
            />
            <div v-else>
                <img 
                    src="./assets/player.jpg"
                    alt="Player's avatar" 
                    class="avatar player"
                />
                <img
                    src="./assets/health-potion.jpg"
                    alt="A health potion"
                    id="health-potion"
                />
                <span id="health-potion-counter">{{ playerHealthPotions }}</span>    
            </div>

            <span v-if="isSecondWindActivated" class="second-wind">Second Wind</span>

            <slot>Your Health</slot>

            <div class="healthbar">
                <div 
                    class="healthbar-status"
                    :class="healthbarLevelClass"
                    :style="healthbarWidthStyle"
                >
                </div>
                <span class="healthbar-percentage">{{ health }}%</span>
            </div>
        </section>
    `
});

Vue.component('game-over-section', {
    props: {
        winner: {
            type: String,
            required: true
        }
    },
    computed: {
        isGameOver() {
            return this.winner;
        },
        hasPlayerWon() {
            return this.winner === 'player';
        },
        hasMonsterWon() {
            return this.winner === 'monster';
        },
    },
    methods: {
        startNewGame() {
            this.$emit('start-new-game');
        }
    },
    template: `
        <section
            v-if="isGameOver"
            class="container"
        >
            <h2>Game Over</h2>
            <h3 v-if="hasPlayerWon">You WON!</h3>
            <h3 v-else-if="hasMonsterWon">You LOST!</h3>
            <h3 v-else>DRAW!</h3>
            <button @click="startNewGame">Start New Game</button>
        </section>
    `
});

Vue.component('battle-controls-section', {
    props: {
        currentRound: {
            type: Number,
            required: true
        },
        playerHealth: {
            type: Number,
            required: true
        },
        playerHealthPotions: {
            type: Number,
            required: true
        }
    },
    computed: {
        isCurrentRoundNotDivisibleByThree() {
            return this.currentRound % 3 !== 0;
        },
        isPlayerHealthDisabled() {
            return this.playerHealth === 100 || this.playerHealthPotions <= 0;
        },
    },
    methods: {
        attackMonster(isSpecialAttack) {
            this.$emit('attack-monster', isSpecialAttack);
        },
        healPlayer() {
            this.$emit('heal-player');
        },
        surrenderToMonster() {
            this.$emit('surrender-to-monster');
        }
    },
    template: `
        <section id="battle-controls">
            <button @click="attackMonster(false)">ATTACK</button>

            <button
                :disabled="isCurrentRoundNotDivisibleByThree"
                @click="attackMonster(true)" 
            >
                SPECIAL ATTACK
            </button>

            <button 
                :disabled="isPlayerHealthDisabled"
                @click="healPlayer"
            >
                HEAL
            </button>

            <button @click="surrenderToMonster">SURRENDER</button>
        </section>
    `
});

Vue.component('battle-log-section', {
    props: {
        battleLog: {
            type: Array,
            required: true
        },
        battleLogEntriesOrder: {
            type: String,
            required: true
        }
    },
    computed: {
        isBattleLogEntriesOrderDescending() {
            return this.battleLogEntriesOrder === 'descending';
        }
    },
    methods: {
        changeBattleLogEntriesOrder() {
            this.$emit('change-battle-log-entries-order');
        }
    },
    template: `
        <section id="battle-log">
            <h2>
                Battle Log
                <i 
                    v-if="isBattleLogEntriesOrderDescending" @click="changeBattleLogEntriesOrder" 
                    class="fa-solid fa-arrow-down"
                >
                </i>
                <i 
                    v-else 
                    @click="changeBattleLogEntriesOrder" 
                    class="fa-solid fa-arrow-up"
                >
                </i>
            </h2>
            <ul>
                <li v-for="(entry, index) in battleLog" :key="index">
                    {{entry}}
                </li>
            </ul>
        </section>
    `
});

new Vue({
    el: '#app',
    data() {
        return {
            isModalVisible: true,
            monsterHealth: 100,
            hasMonsterSecondWind: false,
            hasMonsterUsedSecondWind: false,
            playerName: '',
            playerHealth: 100,
            playerHealthPotions: 5,
            hasPlayerSecondWind: false,
            hasPlayerUsedSecondWind: false,
            currentRound: 0,
            winner: '',
            battleLog: [],
            battleLogEntriesOrder: 'descending'
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
                sortedBattleLog.unshift(this.battleLog[i], this.battleLog[i + 1]);
            }

            this.battleLog = sortedBattleLog;
        }
    },
    methods: {
        setPlayerName(playerName) {
            this.playerName = playerName;
            this.isModalVisible = false;
        },
        attackMonster(isSpecialAttack) {
            const playerAttackPoints = isSpecialAttack ? getRandomValueBetween(9, 14) : getRandomValueBetween(5, 10);
            this.monsterHealth -= playerAttackPoints;

            this.addEntryToBattleLog({ contender: 'Player', action: 'attack', points: playerAttackPoints });

            this.attackPlayer();
        },
        attackPlayer() {
            const monsterAttackPoints = getRandomValueBetween(7, 12);
            this.playerHealth -= monsterAttackPoints;

            this.addEntryToBattleLog({ contender: 'Monster', action: 'attack', points: monsterAttackPoints });

            this.endCurrentRound();
        },
        healPlayer() {
            const playerHealPoints = getRandomValueBetween(8, 11);
            this.playerHealth += playerHealPoints;

            if (this.playerHealth > 100) {
                this.playerHealth = 100;
            }

            this.playerHealthPotions--;

            this.addEntryToBattleLog({ contender: 'Player', action: 'heal', points: playerHealPoints });

            this.attackPlayer();
        },
        endCurrentRound() {
            if (this.monsterHealth <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if (this.monsterHealth <= 0) {
                this.processMonsterDying();
            } else if (this.playerHealth <= 0) {
                this.processPlayerDying();
            }

            this.currentRound++;
        },
        processPlayerDying() {
            if (this.hasSecondWind('player')) {
                this.hasPlayerSecondWind = true;
                this.hasPlayerUsedSecondWind = true;
                this.playerHealth = 50;

                return;
            }

            this.winner = 'monster';
        },
        processMonsterDying() {
            if (this.hasSecondWind('monster')) {
                this.hasMonsterSecondWind = true;
                this.hasMonsterUsedSecondWind = true;
                this.monsterHealth = 50;

                return;
            }

            this.winner = 'player';
        },
        hasSecondWind(contender) {
            const hasContenderUsedSecondWind = contender === 'player' ? this.hasPlayerUsedSecondWind : this.hasMonsterUsedSecondWind;

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
            this.winner = '';
            this.battleLog = [];
        },
        surrenderToMonster() {
            this.winner = 'monster';
        },
        addEntryToBattleLog(entry) {
            const formattedEntry = formatBattleLogEntry(entry);
            this.battleLog.unshift(formattedEntry);
        },
        changeBattleLogEntriesOrder() {
            this.battleLogEntriesOrder = this.battleLogEntriesOrder === 'descending' ? 'ascending' : 'descending';
        }
    }
});