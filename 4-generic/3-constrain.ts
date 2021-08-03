{
    interface Employee {
        pay: () => void;
    }

    class FullTimeEmployee implements Employee {
        pay() {
            console.log('full time!!!');
        }
        fullTimeWork() {}
    }
    class PartTimeEmployee implements Employee {
        pay() {
            console.log('part time!!!');
        }
        partTimeWork() {}
    }

    function pay(person: Employee): Employee {
        person.pay();
        return person;
    }

    const john = new FullTimeEmployee();
    const susan = new PartTimeEmployee();
    const johnAfterPay = pay(john);
    const susanAfterPay = pay(susan);
    // johnAfterPay. -> 여기선 pay밖에 못 쓴다... fullTimeWork()를 쓰고 싶은데... 이럴 때 쓰는게 제네릭

    function pay2<T extends Employee>(person: T): T {
        return person;
    }
    // const johnAfterPay2 = pay2(1233); -> Employee를 구현한 클래스타입만 가능해짐.
    const johnAfterPay2 = pay2(john);
    const susanAfterPay2 = pay2(susan);
    johnAfterPay2.fullTimeWork();
    susanAfterPay2.partTimeWork();

    //========================================================================================
    const obj = {
        name: 'mg',
        age: 123,
    };
    const obj2 = {
        die: false,
    };

    function getValue<T, K extends keyof T>(args: T, key: K): T[K] {
        return args[key];
    }
    console.log(getValue(obj, 'age'));
    console.log(getValue(obj, 'name'));
    console.log(getValue(obj2, 'die'));
}
