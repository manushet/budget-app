<template>
    <el-card class="box-card" shadow="always">
        <el-form
        ref="addItemForm"
        label-position="top"
        label-width="100px"
        :model="formData"
        :rules="rules"
        style="max-width: 460px"
        status-icon
        >
            <el-form-item label="Type of operation" prop='type'>
                <el-select class="w100" v-model="formData.type" placeholder="please select operation type">
                    <el-option label="Income" value="IN" />
                    <el-option label="Outcome" value="OUT" />
                </el-select>
            </el-form-item>
            <el-form-item label="Additional Details" prop='notes'>
                <el-input
                    v-model="formData.notes"
                    :rows="2"
                    type="textarea"
                    placeholder="Please input additional details"
                />
            </el-form-item>
            <el-form-item label="Amount" prop='amount'>
                <el-input-number 
                    v-model="formData.amount" 
                    :step="10"
                    :min='0'
                    :max='999999' />
            </el-form-item>
            <el-button type="primary" @click='addItem'>Add new record</el-button>
        </el-form>
    </el-card>       
</template>

<script>
    import { mapActions } from 'vuex';

    const checkAmount = (rule, value, callback) => { 
        if (!value) {
            return callback(new Error('Please input the operation amount'));
        }
        callback();
    }

    export default {
        name: 'FormBudget',
        props: {    },
        data: () => ({
            formData: {
                type: 'IN',
                notes: null,
                amount: 0,
            },
            rules: {
                type: [
                    {
                        required: true,
                        message: 'Please provide the additional details',
                        trigger: 'blur',
                    }
                ],             
                notes: [
                    {
                        required: true,
                        message: 'Please provide the additional details',
                        trigger: 'submit',
                    }
                ],            
                amount: [
                    {
                        required: true,
                        message: 'Please input the operation amount',
                        trigger: 'submit',
                    },
                    {
                        type: 'number',
                        message: 'Value must be a number',
                        trigger: 'submit',
                    },
                    { 
                        validator: checkAmount, 
                        trigger: 'submit' 
                    }        
                ],
            }
        }),
        methods: {
            ...mapActions([
                'addOperation',
            ]),        
            addItem() {
                this.$refs.addItemForm.validate(isValid => {
                    if (isValid) {
                        this.addOperation({ ...this.formData });
                        this.$refs.addItemForm.resetFields();
                    }                 
                });       
            }, 
        },
    };
</script>

<style scoped>
</style>