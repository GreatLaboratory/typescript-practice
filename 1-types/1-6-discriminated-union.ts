{
    // Discriminated Union Types
    type SuccessState = {
        result: 'success'; // 각각 유니온 안에 동일되는 키(result)와 차별되는 값('success' | 'fail')을 가지게 한다.
        response: {
            body: string;
            code: number;
        }
    }
    type FailState = {
        result: 'fail'; // 각각 유니온 안에 동일되는 키(result)와 차별되는 값('success' | 'fail')을 가지게 한다.
        reason: string;
    }
    type LoginState = SuccessState | FailState;
    
    const printLoginState = (state: LoginState) => {
        if(state.result == 'success') { // 'response' in state 보다 훨씬 개선된 코드이다.
            console.log(`${state.response.code} ${state.response.body} !!!`);
        } else {
            console.log(`${state.reason} !!`);
        }
    }
    printLoginState({ result: 'fail', reason: 'UnAuthorized' })
    printLoginState({ result: 'success', response: { body: 'logged in', code: 200 } })
}