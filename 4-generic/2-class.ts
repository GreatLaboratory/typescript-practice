{
    interface Either<L, R> {
        getLeft: () => L;
        getRight: () => R;
    }

    class SimpleEither<L, R> implements Either<L, R> {
        constructor(private left: L, private right: R) {}
        getLeft(): L {
            return this.left;
        }
        getRight(): R {
            return this.right;
        }
    }

    const either: Either<number, string> = new SimpleEither(123, 'qwer');
    console.log(either.getLeft());
    console.log(either.getRight());
}
