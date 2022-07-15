import getRandomValueBetween from './util/getRandomValueBetween.js';

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
    },
    computed: {
        healthbarWidth() {
            return { width: (this.health > 0 ? this.health : 0) + '%' };
        },
        healthbarClass() {
            return {
                low: this.health <= 25,
                medium: this.health > 25 && this.health <= 50,
                high: this.health > 50,
            }
        },
        isMonster() {
            return this.id === 'monster';
        }
    },
    template: `
        <section :id="id" class="container">
            <img
                v-if="isMonster" 
                src="./assets/monster.jpg"
                class="avatar monster"
                alt="Monster"
            />
            <img 
                v-else 
                src="./assets/warrior.jpg"
                class="avatar player"
                alt="Warrior" 
            />

            <slot></slot>

            <div class="healthbar">
                <div 
                    class="healthbar-status"
                    :class="healthbarClass"
                    :style="healthbarWidth"
                ></div>
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
        playerHealth: {
            type: Number,
            required: true
        },
        currentRound: {
            type: Number,
            required: true
        }
    },
    computed: {
        isCurrentRoundNotDivisibleByThree() {
            return this.currentRound % 3 !== 0;
        },
        isPlayerHealthFull() {
            return this.playerHealth === 100;
        },
    },
    methods: {
        attackMonster(isSpecialAttack) {
            console.log(isSpecialAttack);
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
            @click="attackMonster(true)" :disabled="isCurrentRoundNotDivisibleByThree"
        >
            SPECIAL ATTACK
        </button>
        <button 
            @click="healPlayer"
            :disabled="isPlayerHealthFull"
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
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: '',
            battleLog: [],
            battleLogEntriesOrder: 'descending'
        };
    },
    methods: {
        attackMonster(isSpecialAttack) {
            const playerAttackPoints = isSpecialAttack ? getRandomValueBetween(9, 14) : getRandomValueBetween(5, 10);
            this.monsterHealth -= playerAttackPoints;
            this.addToBattleLog({ target: 'Player', action: 'attack', points: playerAttackPoints });

            this.attackPlayer();
        },
        attackPlayer() {
            const monsterAttackPoints = getRandomValueBetween(7, 12);
            this.playerHealth -= monsterAttackPoints;
            this.addToBattleLog({ target: 'Monster', action: 'attack', points: monsterAttackPoints });

            this.endCurrentRound();
        },
        healPlayer() {
            const playerHealPoints = getRandomValueBetween(8, 11);
            this.playerHealth += playerHealPoints;

            if (this.playerHealth > 100) {
                this.playerHealth = 100;
            }

            this.addToBattleLog({ target: 'Player', action: 'heal', points: playerHealPoints });

            this.attackPlayer();
        },
        endCurrentRound() {
            if (this.playerHealth <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (this.playerHealth <= 0) {
                this.winner = 'monster';
            } else if (this.monsterHealth <= 0) {
                this.winner = 'player';
            }

            this.currentRound++;
        },
        startNewGame() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentRound = 0;
            this.winner = '';
            this.battleLog = [];
        },
        surrenderToMonster() {
            this.winner = 'monster';
        },
        addToBattleLog(entry) {
            this.battleLog.unshift(`${entry.target} ${entry.action}ed for ${entry.points} points.`);
        },
        changeBattleLogEntriesOrder() {
            this.battleLogEntriesOrder = this.battleLogEntriesOrder === 'descending' ? 'ascending' : 'descending';
        }
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
    }
});