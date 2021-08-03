{
       //getter && setter
       class User {
        constructor(private _firstName: string, private _lastName: string, private _age: number) {}
        public get fullName() : string {
            return this.firstName + ' ' + this.lastName;
        }
        
        public get firstName(): string {
            return this._firstName;
        }
        public set firstName(value: string) {
                this._firstName = value;
        }
        public get lastName(): string {
            return this._lastName;
        }
        public set lastName(value: string) {
                this._lastName = value;
        }
        public get age() : number {
            return this._age;
        }
        public set age(v : number) {
            if (v < 0) throw new Error('value must be greater than zero.');
            this._age = v;
        }
    }
    const user: User = new User('kim', 'myung-gwan', 27);
    console.log(user.fullName);
    console.log(user.age);
    user.age = 29;
    console.log(user.age);
    // user.age = -99; -> setter함수의 조건으로 인한 error
}