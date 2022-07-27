export default {
    state: {
        currentRound: 0,
        winner: null,
    },
    getters: {
        isCurrentRoundNotDivisibleByThree(state) {
            return state.currentRound % 3 !== 0;
        },
        isGameOver(state) {
            return state.winner;
        },
        isPlayerWinner(state) {
            return state.winner === "player";
        },
        isMonsterWinner(state) {
            return state.winner === "monster";
        },
    },
    mutations: {
        INCREMENT_ROUND(state) {
            state.currentRound++;
        },
        SET_WINNER(state, winner) {
            state.winner = winner;
        },
        RESET_GAME_DATA(state) {
            state.currentRound = 0;
            state.winner = null;
        }
    },
    actions: {
        endCurrentRound({ commit, rootGetters }) {
            if (rootGetters.monsterHealth <= 0 && rootGetters.playerHealth <= 0) {
                commit('SET_WINNER', 'draw');
            } else if (rootGetters.monsterHealth <= 0) {
                // this.processMonsterDying();
                commit('SET_WINNER', 'player');
            } else if (rootGetters.playerHealth <= 0) {
                // this.processPlayerDying();
                commit('SET_WINNER', 'monster');
            }
            
            commit('INCREMENT_ROUND'); // check if even if someone dies it increments the round
        },
        endGame({ commit }) {
            commit('SET_WINNER', 'monster');
        },
        resetGameData({ commit }) {
            commit('RESET_GAME_DATA');
        }
    }
};

// processPlayerDying() {
//     if (this.hasSecondWind("player")) {
//         this.hasPlayerSecondWind = true;
//         this.hasPlayerUsedSecondWind = true;
//         this.playerHealth = 50;

//         return;
//     }

//     this.winner = "monster";
// },
// processMonsterDying() {
//     if (this.hasSecondWind("monster")) {
//         this.hasMonsterSecondWind = true;
//         this.hasMonsterUsedSecondWind = true;
//         this.monsterHealth = 50;

//         return;
//     }

//     this.winner = "player";
// },
// hasSecondWind(contender) {
//     const hasContenderUsedSecondWind =
//         contender === "player"
//             ? this.hasPlayerUsedSecondWind
//             : this.hasMonsterUsedSecondWind;

//     return !hasContenderUsedSecondWind && Math.random() > 0.5;
// },