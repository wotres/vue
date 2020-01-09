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
    import EventBus from './EventBus';

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
                // Vue.set(this.table[1], 0, 'X')
                this.$set(this.tableData[1], 0, 'X')
            },
            onClickTd(rowIndex, cellIndex) {
                this.$set(this.tableData[rowIndex], cellIndex, this.turn);
                
                let win = false;
                if (this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2] === this.turn) {
                    win = true;
                }
                if (this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex] === this.turn) {
                    win = true;
                }
                if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn) {
                    win = true;
                }
                if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn) {
                    win = true;
                }
                if (win){
                    this.winner =this.turn;
                    this.turn = 'O';
                    this.tableData= [
                        ['', '', ''], 
                        ['', '', ''],
                        ['', '', ''],
                    ]
                } else {
                    // 무승부
                    let all = true;
                    // 무승부 검사
                    this.tableData.forEach((row) => {
                        row.forEach((cell) => {
                            if(!cell) {
                                all = false;
                            }
                        })
                    })
                    if(all) {
                        this.winner ='무승부';
                        this.turn = 'O';
                        this.tableData= [
                            ['', '', ''], 
                            ['', '', ''],
                            ['', '', ''],
                        ]
                    } else {
                        this.turn = this.turn == 'O' ? 'X' : 'O';
                    }
                }
            }
        },
        // 모든 이벤트를 메인에서 관리 -> EventBus
        created() {
            EventBus.$on('clickTd', this.onClickTd);
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