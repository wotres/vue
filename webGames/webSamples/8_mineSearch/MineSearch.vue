<template>
    <div>
        <mine-form/>
        <div>{{timer}}</div>
        <table-component/>
        <div>{{result}}</div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import store, { INCREMENT_TIMER } from './store';
    import TableComponent from './TableComponent';
    import MineForm from './MineForm';

    let interval;
    export default {
        store,
        components: {
            TableComponent,
            MineForm
        },
        computed: {
            ...mapState(['timer', 'result', 'halted'])
        },
        watch: {
            halted(value, oldValue){
                // 게임 시작
                // 자바스크립트 타이머는 정확하지않음으로 new Data() 와 같은 시간 사용
                if (value == false){
                    interval = setInterval(() => {
                        this.$store.commit(INCREMENT_TIMER);
                    }, 1000)
                } else { // 게임 끝
                    clearInterval(interval)
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
