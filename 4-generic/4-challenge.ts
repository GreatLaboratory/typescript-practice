{
    // Generic을 이요한 자료구조 stack구현하기

    interface IStack<T> {
        readonly size: number;
        push(value: T): void;
        pop(): T;
    }

    type Node<T> = {
        readonly value: T;
        readonly prior?: Node<T>; // 현재 노드에서 밑에 있는 노드 (빈 스택일 경우는 null)
    };

    class Stack<T> implements IStack<T> {
        private _size: number = 0;
        private head?: Node<T>;
        constructor(private capacity: number) {}
        public get size(): number {
            return this._size;
        }
        public push(value: T): void {
            if (this.size == this.capacity)
                throw new Error('exceed max capacity..');
            const node: Node<T> = { value, prior: this.head };
            this.head = node;
            this._size++;
        }
        public pop(): T {
            if (this.head == null) throw new Error('Stack is empty..');
            const node: Node<T> = this.head;
            this.head = node.prior;
            this._size--;
            return node.value;
        }
    }
    const stack: Stack<number> = new Stack(10);
    console.log('before push to stack length : ' + stack.size);
    for (let i = 1; i <= 3; i++) {
        console.log('push : ', i);
        stack.push(i);
    }
    console.log('after push to stack length : ' + stack.size);
    for (let i = 1; i <= 3; i++) {
        console.log('pop : ' + stack.pop());
    }
    console.log('after pop to stack length : ' + stack.size);
}
