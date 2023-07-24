<template>
    <div class='budget-description'>
        <template v-if="isAmountPositive">
            <el-icon><Plus class='green-text'/></el-icon>
        </template>
        <template v-else>
            <el-icon class='red-text'><Minus /></el-icon>
        </template>        
        <span class="budget-comment">{{ item.notes }}</span>
        <span class="budget-value" :class='amountClass'>{{ item.amount }}</span>
    </div>  
    <el-popconfirm
        confirm-button-text="Yes"
        cancel-button-text="No"
        :icon="InfoFilled"
        icon-color="#626AEF"
        title="Are you sure to delete this?"
        @confirm="confirmEvent(item.id)"
        @cancel="cancelEvent"
      >
        <template #reference>
            <el-button type="danger delete-item-btn" :icon="Delete"/>
        </template>
    </el-popconfirm>
</template>

<script setup>
import { mapActions } from 'vuex';
import { Delete } from '@element-plus/icons-vue';
import { InfoFilled } from '@element-plus/icons-vue';
</script>

<script>
export default {
    name: 'BudgetListItem',
    props: {
        item: {
            type: Object,
            default: () => ({})
        },
        filter: String,      
    },
    computed: {
        isAmountPositive() {
            return this.item.type === 'IN' ? true : false;
        },
        amountClass() {
            return this.item.type === "IN" ? 'green-text' : 'red-text';
        },
    },
    methods: {
        ...mapActions([
            'deleteOperation', 
        ]),        
        confirmEvent(id) {
            this.deleteOperation(id);
        },
        cancelEvent() {
            return;
        }        
    },
}
</script>

<style scoped>
    .budget-description {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        align-items: center;
    }
  
    .budget-value {
        font-weight: 600;
    }

    .delete-item-btn {
        margin-left: 1em;
    }
</style>