export default {
    namespaced: true,
    state: {
        round: 0,
        winner: null,
        theme: 'light'
    },
    getters: {
        isCurrentRoundNotDivisibleByThree(state) {
            return state.round % 3 !== 0;
        },
        isOver(state) {
            return state.winner;
        },
        isPlayerWinner(state) {
            return state.winner === "player";
        },
        isMonsterWinner(state) {
            return state.winner === "monster";
        },
        theme(state) {
            return state.theme;
        },
        isThemeLight(state) {
            return state.theme === 'light';
        }
    },
    mutations: {
        INCREMENT_ROUND(state) {
            state.round++;
        },
        SET_WINNER(state, winner) {
            state.winner = winner;
        },
        RESET_GAME_DATA(state) {
            state.round = 0;
            state.winner = null;
        },
        TOGGLE_THEME(state) {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }
    },
    actions: {
        endCurrentRound({ dispatch, commit, rootGetters }) {
            if (rootGetters['monster/health'] <= 0 && rootGetters['player/health'] <= 0) {
                commit('SET_WINNER', 'draw');
            } else if (rootGetters['monster/health'] <= 0) {
                dispatch('monster/processDying', null, { root: true });
            } else if (rootGetters['player/health'] <= 0) {
                dispatch('player/processDying', null, { root: true });
            }

            commit('INCREMENT_ROUND'); // check if even if someone dies it increments the round
        },
        endGame({ commit }) {
            commit('SET_WINNER', 'monster');
        },
        startNewGame({ commit }) {
            commit('monster/RESET_DATA', null, { root: true });
            commit('player/RESET_DATA', null, { root: true });
            commit('battleLog/RESET_ENTRIES_DATA', null, { root: true });
            commit('RESET_GAME_DATA');
        },
        toggleTheme({ commit }) {
            commit('TOGGLE_THEME');
        }
    }
};