/*
<ts 장점>

1. 타입 안정성
코딩 -> 컴파일 환경 -> 런타임 환경
js는 런타임 환경에서 타입이 결정되고 타입실수로 인한 에러가 런타임 에러로 잡혀지는데
ts는 컴파일 환경에서 미리 타입에러를 잡고 들어가서 런타임 환경에선 타입실수로 인한 에러가 발생하지 않는다.


2. OOP
모듈별로 분리
재사용성
객체 단위로 확장할 수 있는 확장성
유지보수성

*/
{
    const user = {
        first_name: 'myung-gwan',
        last_name: 'kim',
        age: 26,
    }
    
    console.log(user.age);
    
    class Car {
        speed: number;
        sayHello: () => void;
        constructor(speed: number) {
            this.speed = speed;
            this.sayHello = () => {
                console.log('Hello World');
            }
        }
    }
    
    const car: Car = new Car(123);
    console.log(car.speed);
    car.sayHello();
}
