export default {
    state: {
        playerName: null,
    },
    getters: {
        playerName(state) {
            return state.playerName;
        }
    },
    mutations: {
        SET_PLAYER_NAME(state, playerName) {
            state.playerName = playerName;
        }
    },
    actions: {
        setPlayerName({ commit }, playerName) {
            commit('SET_PLAYER_NAME', playerName);
        }
    }
}