{
    type CoffeCup = {
        shots: number;
        hasMilk: boolean;
        hasSugar: boolean;
    };

    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeCup;
    }

    class CoffeeMakerImpl implements CoffeeMaker {
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
        protected extract(shots: number): CoffeCup {
            console.log(`===pulling up ${shots} shots...`);
            return {
                shots,
                hasMilk: false,
                hasSugar: false,
            };
        }

        public makeCoffee(shots: number): CoffeCup {
            this.grindBeans(shots);
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

    class CaffeLatteMaker extends CoffeeMakerImpl {
        constructor(beans: number, public readonly grade: string) {
            super(beans);
        }
        private steamMilk(): void {
            console.log('=Steaming milk...');
        }
        public makeCoffee(shots: number): CoffeCup {
            const coffee: CoffeCup = super.makeCoffee(shots);
            this.steamMilk();
            return { ...coffee, hasMilk: true };
        }
    }

    class SweetCoffeeMaker extends CoffeeMakerImpl {
        constructor(beans: number, public readonly grade: string) {
            super(beans);
        }
        private addSugar(): void {
            console.log('=Adding sugar...');
        }
        public makeCoffee(shots: number): CoffeCup {
            const coffee: CoffeCup = super.makeCoffee(shots);
            this.addSugar();
            return { ...coffee, hasSugar: true };
        }
    }

    // 자식 클래스들이 하나의 인터페이스를 전부 구현했거나 하나의 부모클래스를 전부 상속받았을 때
    // 어떤 클래스로 만들어진 인스턴스인지 구분없이 다 같은(동시에 각 자식 클래스에서 새롭게 오버라이딩해서 다양한) 메소드들을 사용할 수 있다는 개념이 다형성이다.
    const machines: CoffeeMaker[] = [
        new CoffeeMakerImpl(32),
        new CaffeLatteMaker(32, 'S+'),
        new SweetCoffeeMaker(32, 'S+'),
        new CoffeeMakerImpl(16),
        new CaffeLatteMaker(16, 'A+'),
        new SweetCoffeeMaker(16, 'A+'),
    ];
    for (const machine of machines) {
        console.log('====================================');
        const coffee: CoffeCup = machine.makeCoffee(2);
        console.log(coffee);
    }
}
