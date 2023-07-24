<template>
    <TotalBalance :total='totalBalance'/>
    <FormBudget @addItemForm='onAddNewItem'/>
    <BudgetList :list="list" @deleteItem='onDeleteItem'/>
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
    data: () => ({
        list:{
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
    }),
    computed: {
        totalBalance() {
            return Object.values(this.list).reduce((acc, item) => {
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
            delete this.list[id];
        },
        onAddNewItem(data) {
            const newId = String(parseInt(Math.random() * 1000));
            const newItem = {
                ...data,
                id: newId,
                amount: Math.abs(data.amount)
            };
            this.list[newId] = newItem;
        }
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
