export default class Queue {
    private items: number[];

    constructor() {
        this.items = [];
    }

    public enqueue(item: number): void {
        this.items.push(item);
    }

    public dequeue(): number | undefined {
        return this.items.shift();
    }

    public isEmpty(): boolean {
        return this.items.length === 0;
    }

    public printQ(): void {
        console.log(this.items.join(", "));
    }
}