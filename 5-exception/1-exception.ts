{
    // Java : Exception 클래스로 표현
    // Javascript, Typescript : Error 클래스로 표현

    // const arr = new Array(1000000000000000000000000000000000000); RangeError -> Error 클래스를 상속받은 클래스

    function readFile(fileName: string) {
        if (fileName === '?') {
            throw new Error('this is invalid file...');
        }
        console.log('successfully read file!');
    }

    function closeFile() {
        console.log('closed!!');
    }

    function run(file1: string) {
        try {
            readFile(file1);
        } catch (error) {
            console.log('catched... error detected');
            return;
        } finally {
            closeFile(); // 무조건 실행되어야하는 코드
        }
        // closeFile(); -> 만약 catch에서 return이 되어버리면 이 함수는 실행이 안되기 때문에 finally에 넣어야한다.
    }
    run('file1');
    run('?');
}
