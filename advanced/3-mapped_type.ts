{
    type Video = {
        title: string;
        author: string;
    };

    // 아래처럼 이렇게 따로 항상 만들어주고 변경사항이 있을 때마다 바꾸는게 너무 귀찮다.
    // type VideoOptional = {
    //     title?: string;
    //     author?: string;
    // };
    // type VideoReadonly = {
    //     readonly title: string;
    //     readonly author: string;
    // };

    // T의 key값들을 순환하며 각 key값인 P를 ?로 optional하게 만든다.
    type Optional<T> = {
        [P in keyof T]?: T[P]; // for ... in
    };

    // T의 key값들을 순환하며 각 key값인 P를 ?로 readonly로 만든다.
    type Readonly<T> = {
        readonly [P in keyof T]: T[P]; // for ... in
    };

    // T의 key값들을 순환하며 각 key값인 P에 null값도 허용해준다.
    type Nullable<T> = {
        readonly [P in keyof T]: T[P] | null; // for ... in
    };

    // mapped types로 굉장히 간단해졌다.
    type VideoOptional = Optional<Video>;
    type VideoReadonly = Readonly<Video>;
    type VideoNullable = Nullable<Video>;

    type Proxy<T> = {
        get(): T;
        set(value: T): void;
    };
    type Proxify<T> = {
        [P in keyof T]: Proxy<T[P]>;
    };

    const proxifedVideo: Proxify<Video> = {
        title: {
            get() {
                return 'title1';
            },
            set(newTitle: string) {},
        },
        author: {
            get() {
                return 'author1';
            },
            set(newAuthor: string) {},
        },
    };
}
