<template>
    <div class="budget-list-wrap">
        <el-card class="box-card" shadow="always">
            <template v-if="!isEmpty">
                <div class="card-header">
                    <span>{{ header }}</span>
                </div>
                <el-button-group class='btn-group'>
                    <el-button @click="applyFilter()">All</el-button>
                    <el-button type="success" @click="applyFilter('IN')">Income</el-button>
                    <el-button type="danger" @click="applyFilter('OUT')">Outcome</el-button>
                </el-button-group>                
                <div v-for="(item, prop) in filteredList" :key="prop" class="list-item text">
                    <BudgetListItem :item='item' @deleteItem='onDeleteItem'/>
                </div>                    
            </template>
            <template v-else>
                <el-alert :title="emptyListTitle" type="error" show-icon />
            </template>
        </el-card>        
    </div>
</template>

<script>
import BudgetListItem from '@/components/BudgetListItem.vue';

export default {
    name: 'BudgetList',
    components: {
        BudgetListItem,
    },    
    props: {
        list: {
            type: Object,
            default: () => ({})
        }
    },
    data: () => ({
        header: "Budget List",
        emptyListTitle: 'No records have been found...',
        activeName: 'in',
        filterType: null,        
    }),
    computed: {
        isEmpty() {
            return !Object.keys(this.list).length;
        },
        filteredList() {
            if (!this.filterType) {
                return this.list;
            }
            return Object.fromEntries(Object.entries(this.list).filter(([, value]) => {
                return value.type === this.filterType;
            }));
        },
    },  
    methods: {
        onDeleteItem(id) {
            this.$emit('deleteItem', id);
        },
        applyFilter(type = null) {
            this.filterType = type;  
        },
    }    
}

</script>

<style scoped>
    .card-header {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        font-weight: 600;
        margin: 20px 0;
    }

    .demo-tabs > .el-tabs__content {
        padding: 32px;
        color: #6b778c;
        font-size: 32px;
        font-weight: 600;
    }      

    .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        margin-bottom: 18px;
    }

    .btn-group {
        margin: 1em auto 2em;
    }

    .el-alert {
        margin: 20px 0 0;
    }
    .el-alert:first-child {
        margin: 0;
    }
</style>
