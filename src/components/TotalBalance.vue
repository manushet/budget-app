<template>
    <div class='total-value'>Total Balance: <span :class='balanceClass'>{{ total }}</span></div>
</template>

<script>
export default {
    name: 'TotalBalance',
    props: {
        total: {
            type: Number,
            default: 0
        },
    },
    data: () => ({ 

    }),
    computed: {
        balanceClass() {
            console.log(this.total);
            if (this.total === 0) {
                return;
            }
            return this.total > 0 ? 'green-text' : 'red-text';
        }
    }
};
</script>

<style scoped>
    .total-value {
        font-size: 26px;
        text-transform: uppercase;
        padding: 20px;
        text-align: center;
    }
</style>
