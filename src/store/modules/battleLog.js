import formatEntry from "@/utils/formatEntry";

export default {
    state: {
        battleLog: [],
        battleLogEntriesOrder: 'descending',
    },
    getters: {
        battleLog(state) {
            return state.battleLog;
        },
        isBattleLogEntriesOrderDescending(state) {
            return state.battleLogEntriesOrder === 'descending';
        }
    },
    mutations: {
        ADD_ENTRY_TO_BATTLE_LOG(state, entry) {
            state.battleLog.unshift(formatEntry(entry));
        },
        CHANGE_BATTLE_LOG_ENTRIES_ORDER(state) {
            state.battleLogEntriesOrder =
                state.battleLogEntriesOrder === 'descending'
                    ? 'ascending'
                    : 'descending';
            // separate func for below logic?
            const sortedBattleLog = [];
            for (let i = 0; i < state.battleLog.length; i += 2) {
                sortedBattleLog.unshift(
                    state.battleLog[i],
                    state.battleLog[i + 1]
                );
            }
            state.battleLog = sortedBattleLog;
        },
        RESET_BATTLE_LOG_DATA(state) {
            state.battleLog = [];
            state.battleLogEntriesOrder = 'descending'; // check how it behaves without this
        }
    },
    actions: {
        addEntryToBattleLog({ commit }, entry) {
            commit('ADD_ENTRY_TO_BATTLE_LOG', entry);
        },
        changeBattleLogEntriesOrder({ commit }) {
            commit('CHANGE_BATTLE_LOG_ENTRIES_ORDER');
        },
        resetBattleLogData({ commit }) {
            commit('RESET_BATTLE_LOG_DATA');
        }
    }
};