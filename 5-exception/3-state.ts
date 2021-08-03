{
    type SuccessState = {
        result: 'success';
    };

    type FailState = {
        result: 'fail';
        reason: 'offline' | 'server_down' | 'timeout';
    };

    type ResultState = SuccessState | FailState;

    class ClientNetwork {
        constructor(private network: string) {}
        tryConnect(): ResultState {
            // throw new Error('no network'); -> 이러면 나중에 catch문에서 받을 때 어떤 에러인지 판단이 어려움. 무조건 any type으로 받기 때문에
            if (this.network === 'network1') {
                return {
                    result: 'success',
                };
            }
            return {
                result: 'fail',
                reason: 'offline',
            };
        }
    }
    class UserService {
        constructor(private client: ClientNetwork) {}
        login(): ResultState {
            return this.client.tryConnect();
        }
    }
    class App {
        constructor(private service: UserService) {}
        run() {
            // try catch로 에러를 받으면 error가 any타입이라 접근할 수 없지만 이렇게 에러를 커스터마이징해서 타입화시켜놓으면 더 좋음.
            const loginState: ResultState = this.service.login();
            if (loginState.result === 'fail') {
                console.log(loginState.reason + ' fail...');
            } else {
                console.log(loginState.result + '!!!');
            }
        }
    }
    const client1: ClientNetwork = new ClientNetwork('network999');
    const service1: UserService = new UserService(client1);
    const app1: App = new App(service1);
    app1.run();
    const client2: ClientNetwork = new ClientNetwork('network1');
    const service2: UserService = new UserService(client2);
    const app2: App = new App(service2);
    app2.run();
}
