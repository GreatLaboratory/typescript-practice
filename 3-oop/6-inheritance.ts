{
    type CoffeCup = {
        shots: number;
        hasMilk: boolean;
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
            // 자식클래스에서 생성자를 만드려면
            super(beans); // 무조건 부모클래스의 생성자인 super()를 구현해야 한다.
        }
        private steamMilk(): void {
            console.log('=Steaming milk...');
        }
        public makeCoffee(shots: number): CoffeCup {
            // 부모 클래스의 메소드를 오버라이딩한다.
            const coffee: CoffeCup = super.makeCoffee(shots); // 부모 클래스의 메소드를 사용할 수도 있다.
            this.steamMilk();
            return { ...coffee, hasMilk: true };
        }
    }

    const coffeeMaker: CoffeeMakerImpl = new CoffeeMakerImpl(32);
    const normal_coffee: CoffeCup = coffeeMaker.makeCoffee(2);
    console.log(normal_coffee);

    const caffeLatteMaker: CaffeLatteMaker = new CaffeLatteMaker(32, 'S+');
    console.log('Caffe Latte Maker Grade : ' + caffeLatteMaker.grade);
    const latte_coffee: CoffeCup = caffeLatteMaker.makeCoffee(2);
    console.log(latte_coffee);

    // 부모 클래스의 모든 메소드 사용 가능(물론 public만)
    console.log('Before adding beans : ' + caffeLatteMaker.getCoffeeBeans());
    caffeLatteMaker.addCoffeBeans(11);
    console.log('After adding beans : ' + caffeLatteMaker.getCoffeeBeans());
    caffeLatteMaker.clean();
    console.log('After removing beans : ' + caffeLatteMaker.getCoffeeBeans());
}
