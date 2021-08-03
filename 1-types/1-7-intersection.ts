{
    // Intersection Types
    // Union Types가 몇개 중 하나를 골라서 그 타입을 사용하는거라면
    // Intersection Types은 몇개의 타입들을 전부 사용하는 타입이다.

    type Student = {
        name: string;
        age: number;
    }
    type Worker = {
        employeeId: number;
        work: () => void;
    }
    const interWork = (intern: Student & Worker) => {
        console.log(intern.name);
        console.log(intern.age);
        console.log(intern.employeeId);
        intern.work();
    }
    interWork({
        name: 'mg',
        age: 27,
        employeeId: 1234,
        work: () => {
            console.log("I'm Dobby");
        }
    })
}