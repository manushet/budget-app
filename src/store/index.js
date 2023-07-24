import { createStore } from "vuex";

export default createStore({
    namespaced: true,
    state: {
        operations: {
            1: {
                type: "IN",
                amount: 100,
                notes: "Some INCOME comments",
                id: 1
            },
            2: {
                type: "OUT",
                amount: 25,
                notes: "Some OUTCOME comments",
                id: 2
            },            
        }
    },
    getters: {
        operationList: ({operations}) => Object.values(operations),
    },
    mutations: {
        ADD_OPERATION({operations}, operation) {
            operations[operation.id] = operation;
        },
        DELETE_OPERATION({operations}, id) {
            delete operations[id];
        }
    },
    actions: {
        addOperation({commit}, operation) {
            const newId = String(parseInt(Math.random() * 1000));
            const newOperation = {
                ...operation,
                id: newId,
                amount: Math.abs(operation.amount),
            };
            commit('ADD_OPERATION', newOperation);
        },
        deleteOperation({commit}, id) {
            commit('DELETE_OPERATION', id);
        },        
    },
    modules: {},
});
