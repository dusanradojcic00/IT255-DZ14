export class ConsoleSpy {
    public logs: string[] = [];
    log(...args) {
        this.logs.push(args.join(' '));
    }
    warn(...args) {
        this.log(...args);
    }
}