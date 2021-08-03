{
    class Student {
        constructor(private name: string, private age: number) {}
    }
    const s1: Student = new Student('mg', 27);

    function checkNotNull<T>(arg: T | null): T {
        if (arg == null) {
            throw new Error('not valid argument');
        }
        return arg;
    }
    console.log(checkNotNull(123));
    console.log(checkNotNull('asdf'));
    console.log(checkNotNull(true));
    console.log(checkNotNull(s1));
    console.log(checkNotNull(null));
}
