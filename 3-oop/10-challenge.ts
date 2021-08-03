{
    // 자료구조 stack구현하기

    interface IStack {
        readonly size: number;
        push(value: string): void;
        pop(): string;
    }

    type Node = {
        readonly value: string;
        readonly prior?: Node; // 현재 노드에서 밑에 있는 노드 (빈 스택일 경우는 null)
    };

    class Stack implements IStack {
        private _size: number = 0;
        private head?: Node;
        constructor(private capacity: number) {}
        public get size(): number {
            return this._size;
        }
        public push(value: string): void {
            if (this.size == this.capacity)
                throw new Error('exceed max capacity..');
            const node: Node = { value, prior: this.head };
            this.head = node;
            this._size++;
        }
        public pop(): string {
            if (this.head == null) throw new Error('Stack is empty..');
            const node: Node = this.head;
            this.head = node.prior;
            this._size--;
            return node.value;
        }
    }
    const stack: Stack = new Stack(10);
    for (let i = 1; i <= 3; i++) {
        stack.push(i.toString());
    }
    console.log(stack.size);
    for (let i = 1; i <= 3; i++) {
        console.log(stack.pop());
    }
    console.log(stack.size);
}
