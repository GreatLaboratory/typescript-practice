{
    // 객체지향 커피머신
    // public, private, protected로 캡슐화를 한다.

    type CoffeCup = {
        shots: number,
        hasMilk: boolean,
    }

    class CoffeeMaker {
        // 인스턴스가 만들어질 때마다 항상 같은 숫자로 만들어지고 모든 인스턴스들이 다 같은 값을 가질 때 static 변수로 선언한다.
        // 이건 클래스 레벨의 변수
        private static COFFEBEANS_PER_SHOT: number = 7;
        
        // 이건 인스턴스가 만들어질 때마다 각 인스턴스들이 가지게될 값이 달라지므로 그냥 변수로 선언한다.
        // 이건 인스턴스 레벨의 변수
        private coffeeBeans: number = 0;
        
        constructor(coffeeBeans: number) {
            // 인스턴스가 만들어질 때 항상 호출되는 생성자
            this.coffeeBeans = coffeeBeans;
        }
        public makeCoffe(shots: number): CoffeCup {
            if(this.coffeeBeans < shots * CoffeeMaker.COFFEBEANS_PER_SHOT) throw new Error('There are not enough coffe beans...');
            this.coffeeBeans -= shots * CoffeeMaker.COFFEBEANS_PER_SHOT;
            return {
                shots,
                hasMilk: false,
            }
        }

        // 외부에서 인스턴스의 멤버변수인 coffeeBeans에 직접 접근하여 값을 바꾸게 하는것보단
        // 이런식으로 메소드로 바꾸게 해야한다. (캡슐화)
        public addCoffeBeans(beans: number) {
            if (beans < 0) {
                throw new Error('음수는 받을 수 없습니다.');
            }
            this.coffeeBeans += beans;
        }
    }

    const coffeMachine: CoffeeMaker = new CoffeeMaker(32);
    console.log(coffeMachine);
    console.log(coffeMachine.makeCoffe(2));
    console.log(coffeMachine);
    // coffeMachine.addCoffeBeans(-11); -> addCoffeBeans 함수의 조건으로 인한 error
    // coffeMachine.coffeeBeans = 9 -> private 변수에 접근했을 때의 error
    coffeMachine.addCoffeBeans(999);
    console.log(coffeMachine);
}