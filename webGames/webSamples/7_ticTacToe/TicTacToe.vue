<template>
    <div>
        <div>{{turn}} 턴</div>
        <table-component :table-data="tableData"/>
        <div v-if="winner">
            <div v-if="winner=='O' || winner=='X'"> {{ winner }} 승리!</div>
            <div v-else> {{winner}}</div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import TableComponent from './TableComponent';
    export default {
        components: {
            TableComponent
        },
        data() {
            return {
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']
                ],
                turn: 'O',
                winner: ''
            }
        },
        methods: {
            onChangeData() {
                // 배열의 경우에는 인덱스로 바로 값 설정 불가-
                // -> 아래와 같이 Vue.set으로 입력하거나 $set사용
                Vue.set(this.table[1], 0, 'X')
                this.$set(this.tableData[1], 0, 'X')
            }
        }
    }
</script>
<style>
    table {
        border-collapse: collapse;
    }
    td { 
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }
</style>