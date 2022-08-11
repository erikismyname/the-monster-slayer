export default {
    namespaced: true,
    state: {
        round: 0,
        winner: null,
        isDarkModeOn: false
    },
    getters: {
        isCurrentRoundNotDivisibleByThree(state) {
            return state.round % 3 !== 0;
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
        isDarkModeOn(state) {
            return state.isDarkModeOn;
        }
    },
    mutations: {
        INCREMENT_ROUND(state) {
            state.round++;
        },
        SET_WINNER(state, winner) {
            state.winner = winner;
        },
        RESET_DATA(state) {
            state.round = 0;
            state.winner = null;
        },
        TOGGLE_DARK_MODE(state) {
            state.isDarkModeOn = !state.isDarkModeOn;
        }
    },
    actions: {
        endRound({ rootGetters, commit, dispatch }) {
            const monsterHealth = rootGetters['monster/health'];
            const playerHealth = rootGetters['player/health'];

            if (monsterHealth === 0 && playerHealth === 0) {
                commit('SET_WINNER', 'draw');
            } else if (monsterHealth === 0) {
                dispatch('monster/processDying', null, { root: true });
            } else if (playerHealth === 0) {
                dispatch('player/processDying', null, { root: true });
            }

            commit('INCREMENT_ROUND');
        },
        endBattle({ commit }) {
            commit('SET_WINNER', 'monster');
        },
        restart({ commit }) {
            commit('monster/RESET_DATA', null, { root: true });
            commit('player/RESET_DATA', null, { root: true });
            commit('battleLog/RESET_DATA', null, { root: true });
            commit('RESET_DATA');
        },
        toggleDarkMode({ commit }) {
            commit('TOGGLE_DARK_MODE');
        }
    }
};