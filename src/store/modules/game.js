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
        endCurrentRound({ dispatch, commit, rootGetters }) {
            if (rootGetters['monster/health'] <= 0 && rootGetters['player/health'] <= 0) {
                commit('SET_WINNER', 'draw');
            } else if (rootGetters['monster/health'] <= 0) {
                dispatch('monster/processDying');
            } else if (rootGetters['player/health'] <= 0) {
                dispatch('player/processDying');
            }

            commit('INCREMENT_ROUND'); // check if even if someone dies it increments the round
        },
        endGame({ commit }) {
            commit('SET_WINNER', 'monster');
        },
        startNewGame({ commit }) {
            commit('monster/RESET_DATA');
            commit('player/RESET_DATA');
            commit('RESET_ENTRIES_DATA');
            commit('RESET_GAME_DATA');
        }
    }
};