{
    /*
        primitive : number, string, boolean, bigint, symbol, undefined, null
        object : function, array...
    
        undefined vs null
        undefined : 값이 있는지 없는지 아무것도 결정되지 않은 상태
        null : 값이 없다는 것이 결정된 상태
        타입으로 number | null 보단 number | undefined를 더 많이 쓴다.
        
        
    */

    const num: number | undefined = 1;
    const find = (): number | undefined => {
        return undefined;
    }

    // unknown
    // 어떤 종류의 타입이 들어올지 알 수 없다는 뜻 (가능하면 쓰지 말자)
    let notSure: unknown = 0;
    notSure = 'he';
    notSure = true;
    
    // any
    // 어떤 종류의 타입이 들어와도 되는 타입 (가능하면 쓰지 말자)
    let anything: any = 0; 
    anything = 'he';
    anything = true;

    // void
    // 함수에서 아무것도 리턴하지 않을 때 사용
    // 변수 선언에서 쓰진 않는다.
    const f = (): void => {
        console.log('hello');
    }

    // never
    // 이 함수를 호출하면 난 리턴할 계획이 전혀 없으니까 감안하렴
    // 리턴을 절대 못하는 함수를 선언할 때 쓴다. 주로 에러를 던지거나 while true를 사용할 때
    const throwError = (message: string): never => {
        throw new Error(message);
    }

    // object
    // 어떤 오브젝트가 와도 전부 ok (가능하면 쓰지 말자)
    const acceptSomeObject = (obj: object): number => {
        return 1;
    }
    acceptSomeObject({ name: 'hi' });
    acceptSomeObject({ age: 123 });
}