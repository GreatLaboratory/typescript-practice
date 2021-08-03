{
    type PositionType = {
        x: number;
        y: number;
    };

    interface PositionInterface {
        x: number;
        y: number;
    }

    // 공통점 1. 둘 다 객체의 타입으로 쓰일 수 있다.
    const obj1: PositionType = {
        x: 1,
        y: 1,
    };
    const obj2: PositionInterface = {
        x: 1,
        y: 1,
    };

    // 공통점 2. class의 구현체로 쓰일 수 있다.
    class Pos1 implements PositionType {
        constructor(public x: number, public y: number) {}
    }
    class Pos2 implements PositionInterface {
        constructor(public x: number, public y: number) {}
    }

    // 공통점 3. extends 확장을 할 수 있다.
    interface ZPositionInterface extends PositionInterface {
        z: number;
    }
    type ZPositionType = PositionType & { z: number };

    // 차이점 only interface can be merged.
    interface PersonInterface {
        name: string;
        age: number;
    }
    interface PersonInterface {
        address: string;
    }

    // 차이점 only type alias can use computed properties.
    type PersonType = {
        name: string;
        age: number;
    };
    type Name = PersonType['name']; // string
    type Direction = 'left' | 'right';

    // 결론 : interface는 class에서 구현되는 목적으로 생성. type alias는 변수에 데이터를 담을 목적으로 생성.
}
