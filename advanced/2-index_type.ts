{
    type Person = {
        name: string;
        age: number;
        gender: 'male' | 'female';
    };
    const p: Person = {
        name: 'mg',
        age: 24,
        gender: 'male',
    };
    console.log(p.name);
    console.log(p['name']);

    type Name = Person['name'];
    // const name: Name = 123; // error
    const name: Name = 'mg';

    type Gender = Person['gender'];
    // const gender: Gender = 'qwer'; // error
    const gender: Gender = 'male';

    type Keys = keyof Person;
    const keys1: Keys = 'age';
    const keys2: Keys = 'gender';
    const keys3: Keys = 'name';
    // const keys4: Keys = 'qwer' // error

    type Animal = {
        type: string;
        gender: Person['gender'];
    };
}
