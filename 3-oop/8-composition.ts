{
    /*
        상속의 문제점 : 족보가 꼬인다.
        부모 클래스 밑에 깊은 레벨로 많은 자식 클래스가 있는데, 부모 클래스의 메소드를 수정하면 모든 자식 클래스의 사용에 영향을 미치게 된다.
        새로운 자식 클래스나 새로운 기능을 추가할 때 어떻게 상속의 구조를 가져가야 하는지 복잡해짐
        ex) 차가운 우유를 넣은 아이스라떼 머신도 만들고 싶고, 흑설탕을 이용한 머신도 만들고 싶은데 상속의 구조는??
            class SweetCaffeLatteMaker extends SweetCoffeeMaker, CaffeLatteMaker {} -> error.. why??
            beacause : typescript에선 한가지 이상의 부모클래스를 상속받을 수 없다. Classes can only extend a single class.

        이를 해결하기 위해 나온 것이 Composition -> Favor Composition Over Inheritance!!
        깊은 상속구조는 피하자.
    */

    type CoffeCup = {
        shots: number;
        hasMilk: boolean;
        hasSugar: boolean;
    };

    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeCup;
    }

    class CheapMilkSteamer {
        private steamMilk(): boolean {
            console.log('=Steaming milk...');
            return true;
        }
        public addMilk(coffee: CoffeCup): CoffeCup {
            return {
                ...coffee,
                hasMilk: this.steamMilk(),
            };
        }
    }
    class AutoSugarMaker {
        private getSugar(): boolean {
            console.log('=Adding sugar...');
            return true;
        }
        public addSugar(coffee: CoffeCup): CoffeCup {
            return {
                ...coffee,
                hasSugar: this.getSugar(),
            };
        }
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
        constructor(
            beans: number,
            public readonly grade: string,
            private milkSteamer: CheapMilkSteamer // 다른 클래스를 생성자로 주입받아서 쓴다. nestjs방식이네..
        ) {
            super(beans);
        }
        public makeCoffee(shots: number): CoffeCup {
            const coffee: CoffeCup = super.makeCoffee(shots);
            return this.milkSteamer.addMilk(coffee);
        }
    }

    class SweetCoffeeMaker extends CoffeeMakerImpl {
        constructor(
            beans: number,
            public readonly grade: string,
            private sugarMaker: AutoSugarMaker // 다른 클래스를 생성자로 주입받아서 쓴다.
        ) {
            super(beans);
        }
        public makeCoffee(shots: number): CoffeCup {
            const coffee: CoffeCup = super.makeCoffee(shots);
            return this.sugarMaker.addSugar(coffee);
        }
    }

    class SweetCaffeLatteMaker extends CoffeeMakerImpl {
        // SweetCoffeeMaker와 CaffeLatteMaker 2가지의 클래스를 상속받을 필요없이 생성자에 DI로 해결
        constructor(
            beans: number,
            public readonly grade: string,
            private milkSteamer: CheapMilkSteamer, // 다른 클래스를 생성자로 주입받아서 쓴다.
            private sugarMaker: AutoSugarMaker // 다른 클래스를 생성자로 주입받아서 쓴다.
        ) {
            super(beans);
        }
        public makeCoffee(shots: number): CoffeCup {
            let coffee: CoffeCup = super.makeCoffee(shots);
            coffee = this.milkSteamer.addMilk(coffee);
            coffee = this.sugarMaker.addSugar(coffee);
            return coffee;
        }
    }
    const sugarMaker: AutoSugarMaker = new AutoSugarMaker();
    const milkSteamer: CheapMilkSteamer = new CheapMilkSteamer();
    const machines: CoffeeMaker[] = [
        new CoffeeMakerImpl(32),
        new CaffeLatteMaker(32, 'S+', milkSteamer),
        new SweetCoffeeMaker(32, 'S+', sugarMaker),
        new SweetCaffeLatteMaker(32, 'S+', milkSteamer, sugarMaker),
    ];
    for (const machine of machines) {
        console.log('====================================');
        const coffee: CoffeCup = machine.makeCoffee(2);
        console.log(coffee);
    }

    /*
        하지만 이렇게 되면 모든 다양한 종류의 모든 커피메이커들은 싸구려우유와 자동설탕 생성기를 계속 사용하게 된다.
        만약 프리미엄우유와 수제설탕 생성기를 사용하려면 주입받은 모든 클래스에서 다 수정해줘야한다.
        이를 클래스들간의 결합도(coupling)이 심해지는 현상인데 이를 인터페이스로 해결할 수 있다.
    */
}
