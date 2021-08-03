{
    // interface 또는 private생성자로 외부에선 몰라도 되는 동작의 메소드를 추상화시킨다.

    type CoffeCup = {
        shots: number;
        hasMilk: boolean;
    };

    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeCup;
    }
    interface CommercialCoffeeMaker {
        makeCoffee(shots: number): CoffeCup;
        addCoffeBeans(beans: number): void;
        clean(): void;
    }

    class CoffeeMakerImpl implements CoffeeMaker, CommercialCoffeeMaker {
        private static COFFEBEANS_PER_SHOT: number = 7;

        constructor(private coffeeBeans: number) {
            this.coffeeBeans = coffeeBeans;
        }

        public getCoffeeBeans() {
            return this.coffeeBeans;
        }
        private grindBeans(shots: number): void {
            console.log('===============grinding cofffee beans....');
            if (this.coffeeBeans < shots * CoffeeMakerImpl.COFFEBEANS_PER_SHOT)
                throw new Error('There are not enough coffe beans...');
            this.coffeeBeans -= shots * CoffeeMakerImpl.COFFEBEANS_PER_SHOT;
        }
        private preheat(): void {
            console.log('=======heating up....');
        }
        private extract(shots: number): CoffeCup {
            console.log(`===pulling up ${shots} shots...`);
            return {
                shots,
                hasMilk: false,
            };
        }

        public makeCoffee(shots: number): CoffeCup {
            this.grindBeans(shots); // 외부에서 사용하는 메소드엔 public을 붙여주고, 외부에선 몰라도 되고 객체 내부에서의 동작 메소드는 private으로 감춘다.
            this.preheat();
            return this.extract(shots);
        }

        public addCoffeBeans(beans: number): void {
            if (beans < 0) {
                throw new Error('음수는 받을 수 없습니다.');
            }
            this.coffeeBeans += beans;
        }
        public clean(): void {
            this.coffeeBeans = 0;
        }
    }

    const coffeeMachine1: CoffeeMaker = new CoffeeMakerImpl(32);
    console.log(coffeeMachine1);
    console.log(coffeeMachine1.makeCoffee(2));
    console.log(coffeeMachine1);
    // coffeeMachine1.addCoffeBeans(999); -> interface인 CoffeeMaker에 정의되지 않은 메소드는 호출 못함. 그래서 error

    const coffeeMachine2: CommercialCoffeeMaker = new CoffeeMakerImpl(33);
    console.log(coffeeMachine2);
    console.log(coffeeMachine2.makeCoffee(2));
    console.log(coffeeMachine2);
    coffeeMachine2.addCoffeBeans(999);
    console.log(coffeeMachine2);
    coffeeMachine2.clean();
    console.log(coffeeMachine2);

    class AmatuerCoffeeUser {
        constructor(private machine: CoffeeMaker) {}
        makeCoffee(shots: number): CoffeCup {
            const coffee: CoffeCup = this.machine.makeCoffee(shots);
            return coffee;
        }
    }
    class ProBarista {
        constructor(private machine: CommercialCoffeeMaker) {}
        makeCoffee(shots: number): CoffeCup {
            const coffee: CoffeCup = this.machine.makeCoffee(shots);
            this.machine.addCoffeBeans(123);
            this.machine.clean();
            return coffee;
        }
    }

    const coffeeMachine3: CoffeeMakerImpl = new CoffeeMakerImpl(42);
    const amatuer: AmatuerCoffeeUser = new AmatuerCoffeeUser(coffeeMachine3);
    const pro: ProBarista = new ProBarista(coffeeMachine3);
    console.log(amatuer.makeCoffee(3));
    console.log(coffeeMachine3.getCoffeeBeans());
    console.log(pro.makeCoffee(3));
    console.log(coffeeMachine3.getCoffeeBeans());
}
