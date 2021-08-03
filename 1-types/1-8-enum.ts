{
    // Enum
    // 여러가지의 상수값들을 모아서 정의해놓는 곳 (왠만하면 사용ㄴㄴ)

    enum Days {
        Monday = 1, // default는 0이지만 따로 넣어주고 싶으면 이런 식으로 하면된다. 그럼 뒤에 있는건 알아서 1씩 증가한다.
        Tuesday,
        Wednesday,
        Tursday,
        Friday,
        Saturday,
        Sunday,
    }
    console.log(Days.Tuesday);
    console.log(Days.Sunday);

    let day: Days = Days.Friday;
    day = 1234 // 에러를 뿜지 않는다. 이렇게 타입이 정확하게 보장이 안된다. 그래서 사용 안하는게 좋음.

    // Enum을 사용하지 않고 Union Type을 쓰는게 훨씬 좋다. 더 안전하다.
    type Dayss = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'
    let dayy: Dayss = 'Monday';
    // dayy = 'asdf' -> 지정한 값타입이 아니기에 컴파일 에러가 뜬다. 굿굿
}