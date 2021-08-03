{
    type Check<T> = T extends string ? boolean : number;
    type Type1 = Check<string>; // boolean
    type Type2 = Check<Function>; // number

    type TypeName<T> = T extends string
        ? 'string'
        : T extends number
        ? 'number'
        : T extends boolean
        ? 'boolean'
        : T extends undefined
        ? 'undefined'
        : T extends Function
        ? 'Function'
        : object;

    type Type3 = TypeName<'qwer'>; // 'string'
    type Type4 = TypeName<string>; // 'string'
    type Type5 = TypeName<() => void>; // 'Function'
}
