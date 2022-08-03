import formatEntry from "@/utils/formatEntry";

export default {
    namespaced: true,
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
        TOGGLE_ENTRIES_ORDER(state) {
            state.entriesOrder =
                state.entriesOrder === 'descending'
                    ? 'ascending'
                    : 'descending';
        },
        ORDER_ENTRIES(state) {
            const sortedEntries = [];

            for (let i = 0; i < state.entries.length; i += 2) {
                sortedEntries.unshift(
                    state.entries[i],
                    state.entries[i + 1]
                );
            }

            state.entries = sortedEntries;
        },
        RESET_ENTRIES_DATA(state) {
            state.entries = [];
            state.entriesOrder = 'descending';
        }
    },
    actions: {
        changeEntriesOrder({ commit }) {
            commit('TOGGLE_ENTRIES_ORDER');
            commit('ORDER_ENTRIES');
        },
    }
};