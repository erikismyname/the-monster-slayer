import formatEntry from "@/utils/formatEntry";

export default {
    state: {
        entries: [],
        entriesOrder: 'descending',
    },
    getters: {
        entries(state) {
            return state.entries;
        },
        isEntriesOrderDescending(state) {
            return state.entriesOrder === 'descending';
        }
    },
    mutations: {
        ADD_ENTRY(state, entry) {
            state.entries.unshift(formatEntry(entry));
        },
        CHANGE_ENTRIES_ORDER(state) {
            state.entriesOrder =
                state.entriesOrder === 'descending'
                    ? 'ascending'
                    : 'descending';
            // separate func for below logic?
            // use map? more elegant?
            const sortedBattleLog = [];
            for (let i = 0; i < state.entries.length; i += 2) {
                sortedBattleLog.unshift(
                    state.entries[i],
                    state.entries[i + 1]
                );
            }
            state.entries = sortedBattleLog;
        },
        RESET_ENTRIES_DATA(state) {
            state.entries = [];
            state.entriesOrder = 'descending';
        }
    },
    actions: {
        addEntry({ commit }, entry) {
            commit('ADD_ENTRY', entry);
        },
        changeEntriesOrder({ commit }) {
            commit('CHANGE_ENTRIES_ORDER');
        },
    }
};