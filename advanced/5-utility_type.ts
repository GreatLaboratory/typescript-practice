{
    type Todo = {
        id: number;
        title: string;
        description: string;
        priority: 'high' | 'low';
    };
    const todoToday: Todo = {
        id: 1,
        title: 'study',
        description: 'study hard',
        priority: 'high',
    };

    // 1. Readonly - 타입으로 만든 객체의 데이터들을 읽기전용으로 수정하지 못하게 할 때 사용
    const displayTodo = (todo: Readonly<Todo>): Todo => {
        // todo.title = 'asdf'; -> Cannot assign to 'title' because it is a read-only property
        return todo;
    };
    console.log(displayTodo(todoToday));

    // 2. Partial - 필드들을 무작위로 optional하게 뽑아서 타입으로 정의
    const updateTodo = (todo: Todo, fieldsToUpdate: Partial<Todo>): Todo => {
        return { ...todo, ...fieldsToUpdate };
    };
    console.log(updateTodo(todoToday, { priority: 'low' }));

    // 3. Pick - 특정 필드들만 뽑아서 타입으로 정의
    type TodoMetaData1 = Pick<Todo, 'id' | 'priority'>;
    const getTodoMetaData1 = (todo: Todo): TodoMetaData1 => {
        const { id, priority } = todo;
        return { id, priority };
    };
    console.log(getTodoMetaData1(todoToday));

    // 3. Omit - 특정 필드들만 제외해서 타입으로 정의
    type TodoMetaData2 = Omit<Todo, 'title' | 'description'>;
    const getTodoMetaData2 = (todo: Todo): TodoMetaData2 => {
        const { id, priority } = todo;
        return { id, priority };
    };
    console.log(getTodoMetaData2(todoToday));

    // 5. Record -> 2개의 인자를 받고 앞의 인자은 key타입으로, 뒤의 인자는 value타입인 타입 정의
    type PageInfo = {
        title: string;
    };
    type Page = 'home' | 'about' | 'contact';
    const navigation: Record<Page, PageInfo> = {
        home: { title: 'this is home page' },
        about: { title: 'this is about page' },
        contact: { title: 'this is contact page' },
    };
    console.log(navigation);
}
