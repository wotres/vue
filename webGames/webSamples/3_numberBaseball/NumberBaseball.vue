<template>
    <div>
        <h1>{{result}}</h1>
        <form @submit.prevent="onSubmitForm">
            <input ref="answer" minlength="4" maxlength="4" v-model="value" />
            <button type="submit">입력</button>
        </form>
        <div>힌트 : {{answer}}</div>
        <div>시도 : {{tries.length}}</div>
        <ul>
            <li v-for="t in tries">
                <div>{{t.try}}</div>
                <div>{{t.result}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    const getNumbers=()=>{
        const candidates = [1,2,3,4,5,6,7,8,9];
        const array = [];
        for (let i =0; i < 4; i+=1){
            const chosen = candidates.splice(Math.floor(Math.random() * (9-i)),1)[0];
            array.push(chosen)
        }
        return array;
    }
    const initData=(e)=> {
        e.value = '';
        e.answer = getNumbers();
        e.tries = [];
        e.$refs.answer.focus();   
    }
    export default {
        data() {
            return {
                answer: getNumbers(),
                tries:[],
                value:'',
                result:''
            }
        },
        methods: {
            onSubmitForm() {
                if (this.value === this.answer.join('')) { // 정답
                    this.tries.push({
                        try: this.value,
                        result: '홈런',
                    });
                    this.result = '홈런';
                    alert('게임 재시작');
                    initData(this);
                } else { // 정답 틀렸을떄 
                    if(this.tries.length >= 4){
                        this.result = `5번 넘게 실패, 답은 ${this.answer.join(',')}`;
                        alert('다시시작')
                        initData(this)
                        return;
                    }
                    // 화면에 보여지면 데이터, 나머지는 변수
                    let strike = 0;
                    let ball = 0;

                    // 문자열을 숫자 배열로 바꾸는 코드
                    const answerArray = this.value.split('').map(v => parseInt(v));
                    for (let i =0; i<4; i +=1){
                        // 숫자 자리수 모두 정담
                        if (answerArray[i] === this.answer[i]){
                            strike++;
                        } else if (this.answer.includes(answerArray[i])) { // 숫자만 정답
                            ball++;
                        }
                    }
                    this.tries.push({
                        try: this.value,
                        result: `${strike} 스트라이크, ${ball} 볼`
                    })
                    this.value = '';
                    this.$refs.answer.focus();
                }
            }
        }
    }
</script>