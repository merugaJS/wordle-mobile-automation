declare module 'allure-commandline' {
    class AllureCommandline {
        constructor(args: string[]);
        on(event: 'exit', listener: (code: number) => void): this;
    }
    export default AllureCommandline;
} 