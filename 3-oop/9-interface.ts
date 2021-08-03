{
    /*
        앞서 8-composition.ts에선 깊은 상속구조 문제를 해결했지만 또다른 문제가 발생했는데 바로 coupling이다. 
        composition으로 주입받은 클래스간의 결합도가 너무 tight한 문제이다.
        이를 해결하기 위한 것이 interface이며 이것이 decoupling의 핵심이다.
    */

    type CoffeCup = {
        shots: number;
        hasMilk: boolean;
        hasSugar: boolean;
    };

    interface CoffeeMaker {
        makeCoffee(shots: number): CoffeCup;
    }

    interface MilkSteamer {
        addMilk(coffee: CoffeCup): CoffeCup;
    }
    interface SugarMaker {
        addSugar(coffee: CoffeCup): CoffeCup;
    }

    class CheapMilkSteamer implements MilkSteamer {
        private steamMilk(): boolean {
            console.log('=Steaming cheap milk...');
            return true;
        }
        public addMilk(coffee: CoffeCup): CoffeCup {
            return {
                ...coffee,
                hasMilk: this.steamMilk(),
            };
        }
    }
    class PremiumMilkSteamer implements MilkSteamer {
        private steamMilk(): boolean {
            console.log('=Steaming $$PREMIUM$$ milk...');
            return true;
        }
        public addMilk(coffee: CoffeCup): CoffeCup {
            return {
                ...coffee,
                hasMilk: this.steamMilk(),
            };
        }
    }
    class NoMilk implements MilkSteamer {
        public addMilk(coffee: CoffeCup): CoffeCup {
            return coffee;
        }
    }
    class AutoSugarMaker implements SugarMaker {
        private getSugar(): boolean {
            console.log('=Adding commercial sugar...');
            return true;
        }
        public addSugar(coffee: CoffeCup): CoffeCup {
            return {
                ...coffee,
                hasSugar: this.getSugar(),
            };
        }
    }
    class HandmadeSugarMaker implements SugarMaker {
        private getSugar(): boolean {
            console.log('=Adding $$HAND_MADE$$ sugar...');
            return true;
        }
        public addSugar(coffee: CoffeCup): CoffeCup {
            return {
                ...coffee,
                hasSugar: this.getSugar(),
            };
        }
    }
    class NoSugar implements SugarMaker {
        public addSugar(coffee: CoffeCup): CoffeCup {
            return coffee;
        }
    }

    class CoffeeMakerImpl implements CoffeeMaker {
        private static COFFEBEANS_PER_SHOT: number = 7;

        constructor(
            private coffeeBeans: number,
            public readonly grade: string,
            private milkSteamer: MilkSteamer, // 클래스를 주입받는 것이 아니라 인터페이스를 주입받는다. (decoupling)
            private sugarMaker: SugarMaker // 클래스를 주입받는 것이 아니라 인터페이스를 주입받는다. (decoupling)
        ) {
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
            let coffee: CoffeCup = this.extract(shots);
            coffee = this.milkSteamer.addMilk(coffee);
            coffee = this.sugarMaker.addSugar(coffee);
            return coffee;
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

    /*  이제 SweetCaffeLatteMaker, CaffeLatteMaker, SweetCoffeeMaker 클래스는 필요가 없어진다. CoffeeMakerImpl에서 주입을 받아서 해결이 가능하다.
        class CaffeLatteMaker extends CoffeeMakerImpl {
            constructor(
                beans: number,
                public readonly grade: string,
                private milkSteamer: MilkSteamer
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
                private sugarMaker: SugarMaker
            ) {
                super(beans);
            }
            public makeCoffee(shots: number): CoffeCup {
                const coffee: CoffeCup = super.makeCoffee(shots);
                return this.sugarMaker.addSugar(coffee);
            }
        }

        class SweetCaffeLatteMaker extends CoffeeMakerImpl {
            constructor(
                beans: number,
                public readonly grade: string,
                private milkSteamer: MilkSteamer,
                private sugarMaker: SugarMaker
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
    */

    // Sugar
    const autoSugarMaker: SugarMaker = new AutoSugarMaker();
    const handmadeSugarMaker: SugarMaker = new HandmadeSugarMaker();
    const noSugar: SugarMaker = new NoSugar();

    // Milk
    const cheapMilkSteamer: MilkSteamer = new CheapMilkSteamer();
    const premiumMilkSteamer: MilkSteamer = new PremiumMilkSteamer();
    const noMilk: MilkSteamer = new NoMilk();

    // Coffee Machines
    // 다양한 종류의 설탕, 우유 생성을 할 수 있어진다. -> 클래스 간의 결합도를 낮췄다.
    // CoffeeMakerImpl 클래스로 하나만으로 SugarMaker, MilkMaker 인터페이스를 활용하여 다양한 종류의 클래스들을 만들어낸다.
    const machines: CoffeeMaker[] = [
        new CoffeeMakerImpl(32, 'A', noMilk, noSugar),
        new CoffeeMakerImpl(32, 'A+', cheapMilkSteamer, noSugar),
        new CoffeeMakerImpl(32, 'A+', noMilk, autoSugarMaker),
        new CoffeeMakerImpl(32, 'A+', cheapMilkSteamer, autoSugarMaker),
        new CoffeeMakerImpl(32, 'S+', premiumMilkSteamer, noSugar),
        new CoffeeMakerImpl(32, 'S+', noMilk, handmadeSugarMaker),
        new CoffeeMakerImpl(32, 'S+', premiumMilkSteamer, handmadeSugarMaker),
    ];
    for (const machine of machines) {
        console.log('====================================');
        const coffee: CoffeCup = machine.makeCoffee(2);
        console.log(coffee);
    }
}
