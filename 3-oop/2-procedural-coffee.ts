{
    // 절차지향적으로 코딩
    // 필요한 상수, 변수, 함수들이 밖에서 서로 뒹굴고 있다... 너무 지저분
    // 이제 이걸 객체지향적으로 개선할거다.

    type CoffeCup = {
        shots: number,
        hasMilk: boolean,
    }

    const COFFEBEANS_PER_SHOT: number = 7;
    let coffeeBeans: number = 0;
    const makeCoffe = (shots: number): CoffeCup => {
        if(coffeeBeans < shots * COFFEBEANS_PER_SHOT) throw new Error('There are not enough coffe beans...');
        coffeeBeans -= shots * COFFEBEANS_PER_SHOT;
        return {
            shots,
            hasMilk: false,
        }
    }

    coffeeBeans += 16
    console.log(makeCoffe(2));
    console.log(`남아있는 커피콩의 수 : ${coffeeBeans}`);
}