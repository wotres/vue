<template>
    <div>
        <div>{{turn}} 턴</div>
        <table-component>
            <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
                <td @click="onClickTd(rowIndex, cellIndex)" v-for="(cellData, cellIndex) in rowData" :key="cellIndex">{{cellData}}</td>
            </tr>
        </table-component>
        <div v-if="winner">
            <div v-if="winner=='O' || winner=='X'"> {{ winner }} 승리!</div>
            <div v-else> {{winner}}</div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import TableComponent from './TableComponent';
    import store, { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER } from './store';

    export default {
        store,
        components: {
            TableComponent
        },
        computed: {
            // winner(){ return this.$state.state.winner} 이런 식으로 쓰기보다는 
            // mapState를 사용하여 state와 computed를 편하게 연결
            ...mapState(['winner', 'turn', 'tableData'])
        },
        methods: {
            onClickTd(rowIndex, cellIndex) {
                console.log(this.cellData)
                if(this.cellData) return;

                this.$store.commit(CLICK_CELL, { row: rowIndex, cell: cellIndex});
                
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
                    this.$store.commit(SET_WINNER, this.turn);
                    this.$store.commit(RESET_GAME);
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
                        this.$store.commit(NO_WINNER);
                        this.$store.commit(RESET_GAME);
                    } else {
                        this.$store.commit(CHANGE_TURN);
                    }
                }
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