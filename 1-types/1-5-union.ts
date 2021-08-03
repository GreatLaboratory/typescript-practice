{
    // Union Types
    type Direction = 'left' | 'right' | 'up' | 'down';
    const move = (direction: Direction): void => {
        console.log(`go ${direction}!!`);
    }
    move('right');
    // move('north'); -> Direction Type에 해당되지 않기 때문에 에러가 뜬다.

    type TileSize = 2 | 4 | 8 | 16 | 32;
    const tile1: TileSize = 4;
    // const tile2: TileSize = 3; -> TileSize Type에 해당되지 않기 때문에 에러가 뜬다.

    type SuccessState = {
        response: {
            body: string;
            code: number;
        }
    }
    type FailState = {
        reason: string;
    }
    type LoginState = SuccessState | FailState;
    const login = (password: string): Promise<LoginState> => {
        const realPassword: string = '1234';
        return new Promise((resolve, reject) => {
            if (realPassword === password) {
                resolve({
                    response: {
                        body: 'logged in!!',
                        code: 200,
                    }
                })
            } else {
                reject({
                    reason: 'Unauthorization',
                })
            }
        });
    }
    console.log(login('1234'));
    console.log(login('1235'));
    
    const printLoginState = (state: LoginState) => {
        if('response' in state) { // 매우 좋지 않은 코드이다.
            console.log(`${state.response.body} !!!`);
        } else {
            console.log(`${state.reason} !!`);
            
        }
    }
    printLoginState({ reason: 'UnAuthorized' })
}