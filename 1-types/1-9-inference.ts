{
    // Type Inference
    // 타입을 명시하지 않고 나중에 그 변수를 사용할 때 알아서 typescript가 그 변수의 타입을 추론하는거

    let text = 'hello';
    // text = 123; -> 이게 바로 Type Inference로 인한 에러이다.
    
    const print = (msg = 'default message') => {
        console.log(msg);
    }
    print('asdf');
    // print(123) -> Type Inference로 인한 에러이다.

    const add = (a: number, b: number) => {
        return a + b;
    }
    const result = add(1,3) // -> Type Inference

    // Type Inference는 왠만하면 쓰지 않는게 좋다. 다 명시를 해주자.
}