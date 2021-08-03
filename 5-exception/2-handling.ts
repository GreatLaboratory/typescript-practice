{
    class ClientNetwork {
        tryConnect() {
            throw new Error('no network');
        }
    }
    class UserService {
        constructor(private client: ClientNetwork) {}
        login() {
            this.client.tryConnect();
            // 여기서 catch에 걸리게 하는것보다 App에서 걸리게 하는게 더 좋다.
            // try {
            //     this.client.tryConnect();
            // } catch (error) {
            //     console.log('catched..');
            // }
        }
    }
    class App {
        constructor(private service: UserService) {}
        run() {
            try {
                this.service.login();
            } catch (error) {
                console.log('catched..');
                // 에러처리 응답을 여기서 해야함.
            }
        }
    }
    const client: ClientNetwork = new ClientNetwork();
    const service: UserService = new UserService(client);
    const app: App = new App(service);
    app.run();
}
