{
    const addFunc = (num1: number, num2: number): number => {
        return num1 + num2
    }
    console.log(addFunc(3,4));
    
    const promiseFunc = (id: number): Promise<number> => {
        // ....
        // ....
        // ....
        return new Promise((resolve, reject) => {
            resolve(id);
        })
    }
    console.log(promiseFunc(1234));
    

    // Optional Parameter
    const printName = (firstName: string, lastName?: string): void => {
        console.log(firstName);
        console.log(lastName);
    }
    printName('kim', 'myunggwan')
    printName('kim myunggwan')

    // Default Parameter
    const printMessage = (message: string = 'default string hahaha'): void => {
        console.log(message);
    }
    printMessage()

    // Rest Parameter
    const addNumber = (s: string, ...numbers: number[]): number => {
        console.log(s);
        return numbers.reduce((a: number, b: number) => a + b)
    }
    console.log(addNumber('hello1', 1,2));
    console.log(addNumber('hello2', 1,2,3));
    console.log(addNumber('hello3', 1,2,3,4));
    
    // readonly - 파라미터로 받는 오브젝트의 불변성을 지켜줘서 값 수정이나 삭제는 안되고 오직 읽을 수만 있다.
    const printArray = (...fruits: readonly string[]): void => {
        // fruits.push('banana') -> 이 코드는 에러가 뜬다.
        for (const fruit of fruits) {
            console.log(fruit);
        }
    }
    printArray('apple', 'grape', 'orange')
}