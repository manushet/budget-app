<template>
    <TotalBalance :total='totalBalance'/>
    <FormBudget @addItemForm='onAddNewItem'/>
    <BudgetList/>
</template>

<script>
import BudgetList from '@/components/BudgetList.vue';
import TotalBalance from '@/components/TotalBalance.vue';
import FormBudget from '@/components/FormBudget.vue';

export default {
    name: 'App',
    components: {
        BudgetList,
        TotalBalance,
        FormBudget,
    },
    data: () => ({}),
    computed: {
        totalBalance() {
            return Object.values(this.$store.getters.operationList).reduce((acc, item) => {
                let amount = item.amount;
                if (item.type === 'OUT') {
                    amount = -1 * amount;
                }
                return acc + amount;
            }, 0);
        }
    },
    methods: {
        onDeleteItem(id) {
            delete this.$store.getters.operationList[id];
        },
    }
}
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .box-card {
        width: 480px;
        margin: 1em auto;

    } 

    .w100 {
        width: 100%;
    }

    .red-text {
        color: #ff0000!important;
    }

    .green-text {
        color: #009b00!important;
    }    
</style>
