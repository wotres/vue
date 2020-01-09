<template>
    <table>
        <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
            <td
            v-for="(cellData, cellIndex) in rowData"
            :key="cellIndex"
            :style="cellDataStyle(rowIndex, cellIndex)"
            @click="onClickTd(rowIndex, cellIndex)"
            @contextmenu.prevent="onRightClickTd(rowIndex, cellIndex)"
            >
            {{cellDataText(rowIndex, cellIndex)}}
            </td>
        </tr>
    </table>
</template>

<script>
    import { mapState } from 'vuex';
    import { CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL } from './store';

    export default {
        computed: {
            ...mapState(['tableData', 'halted']),
            // 화살표 사용하면 this 사용 안됨
            // style을 함수로 정의 가능 / style을 클래스 명등을 추가하여 변경 가능
            // 클릭시 셀 스타일 변경
            cellDataStyle(state) {
                return (row, cell) => {
                    switch (this.$store.state.tableData[row][cell]) {
                        case CODE.NORMAL:
                        case CODE.MINE:
                            return {
                                background: '#444',
                            };
                        // 연칸
                        case CODE.CLICKED_MINE:
                        case CODE.OPENED:
                            return {
                                background: 'white',
                            };
                        // 깃발 있는 경우
                        case CODE.FALG:
                        case CODE.FALG_MINE:
                            return {
                                background: 'red',
                            };
                        // 긴가민가
                        case CODE.QUESTION:
                        case CODE.QUESTION_MINE:
                            return {
                                background: 'yellow',
                            };
                        default:
                            return {};
                    }
                }
            },
            cellDataText() {
                return (row, cell) => {
                    switch(this.$store.state.tableData[row][cell]) {
                        // 지뢰
                        case CODE.MINE:
                            return 'X';
                        case CODE.NORMAL:
                            return '';
                        case CODE.FLAG_MINE:
                        case CODE.FLAG:
                            return '!';
                        case CODE.QUESTION_MINE:
                        case CODE.QUESTION:
                            return '?';
                        case CODE.CLICKED_MINE:
                            return '펑';
                        default:
                            return this.$store.state.tableData[row][cell] || '';
                    }
                }
            }
        },
        methods: {
            onClickTd(row, cell) {
                if(this.halted){
                    return;
                }
                switch (this.tableData[row][cell]){
                    case CODE.NORMAL:
                        return this.$store.commit(OPEN_CELL, {row, cell})
                    case CODE.MINE:
                        return this.$store.commit(CLICK_MINE, {row, cell})
                    default:
                        return;                    
                }
            }, 
            onRightClickTd(row, cell) {
                if(this.halted){
                    return;
                }
                switch (this.tableData[row][cell]){
                    case CODE.NORMAL:
                    case CODE.MINE:
                        this.$store.commit(FLAG_CELL, { row, cell })
                        return;
                    case CODE.FLAG_MINE:
                    case CODE.FLAG:
                        this.$store.commit(QUESTION_CELL, { row, cell })
                        return;
                    case CODE.QUESTION_MINE:
                    case CODE.QUESTION:
                        this.$store.commit(NORMALIZE_CELL, { row, cell })
                        return;
                    default:
                        return;
                }
            }
        }
    }

</script>