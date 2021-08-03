{
    // Typescript의 꽃!!
    // Type Aliases -> 새로운 타입을 직접 정의할 수 있다는 뜻
    type Text = string;
    const name1: string = 'hi';
    const name2: Text = 'hello';

    type Student = {
        name: string,
        age: number,
    }
    const student1: Student = {
        name: 'mg',
        age: 27,
        // animal: 'dog', -> 이건 정의되지 않았기 때문에 에러뜬다.
    }

    // String Literal Types
    // 값을 타입으로 지정 ㄷㄷㄷ 신기하넴
    type Json = 'json';
    const j1: Json = 'json';
    // const j2: Json = 'xml'; -> 무조건 문자열 json이 와야하므로 에러가 뜬다.
}