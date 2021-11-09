module.exports = class Order {
    constructor() {
        this.done = false;
    }
    isDone(done) {
        if (done) {
            this.done = done;
        }
        return this.done;
    }
}