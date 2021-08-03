{
    // Type Assertion
    // 왠만하면 비추
    const strFunc = (): any => {
        return 'hello';
    }
    const result1 = strFunc();
    // result1는 문자열의 함수를 쓰지 못하고 취급받지 못한다. 하지만 나는 result1가 무조건 문자열이란걸 장담할 수 있다..
    // 이럴 때 쓰는게 Type Assertion 이다.
    const result2 = strFunc() as string;
    // result2는 문자열로 취급받아서 문자열 관련 api를 전부 쓸 수 있따.
    // 진짜 확실하게 100%로 확신할 때만 이런 as를 사용한 Type Assertion을 사용한다.

    const wrong: any = 12;
    // console.log((wrong as Array<number>).push(122)); // 해당 코드는 에러를 뿜는다.

    const findNum = (): number[] | undefined => {
        return undefined;
    }
    const numbers = findNum();
    numbers?.push(3); // 이건 numbers가 배열이면 실행하고 아님 실행하지말고 일 때 사용하는거다. 그래서 이 라인은 그냥 넘어가고 아래에서 에러를 뿜는다.
    numbers!.push(3); // 이건 numbers가 정말 무조건 undefined가 아님을 무조건 확신할 때 쓰는거고.. 그래서 이 라인은 에러를 뿜는다.
    
    const numbers2 = findNum()!; // 이렇게 쓸 수도 있다.
    numbers2.push(123)
}