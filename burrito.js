const Order = require("./order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    SIZE: Symbol("size"),
    TOPPINGS: Symbol("toppings"),
    DRINKS: Symbol("drinks"),
    EXTRA: Symbol("extra")
});

module.exports = class Burrito extends Order {
    constructor() {
        super();
        this.currState = OrderState.WELCOMING;
        this.Name = "";
        this.Size = "";
        this.Toppings = "";
        this.Drinks = "";
        this.Extra = "";
        this.Item = "burrito";
    }
    handleInput(input) {
        var reply = [];
        var total = 0;
        var tax = 0;
        switch (this.currState) {
            case OrderState.WELCOMING:
                this.currState = OrderState.NAME;
                reply.push("Welcome to DK's Burrito.");
                reply.push("May I know name for the order?");
                break;
            case OrderState.NAME:
                this.currState = OrderState.SIZE
                this.Name = input;
                reply.push("Okay " + this.Name + " What Size would you like?");
                break;
            case OrderState.SIZE:
                this.currState = OrderState.TOPPINGS
                this.Size = input;
                reply.push("What toppings would you like?");
                break;
            case OrderState.TOPPINGS:
                this.currState = OrderState.EXTRA
                this.Toppings = input;
                reply.push("Would you like chips and salsa on the side?");
                break;
            case OrderState.EXTRA:
                this.currState = OrderState.DRINKS
                this.Extra = input;
                reply.push("Would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if (input.toLowerCase() != "no") {
                    this.Drinks = input;
                }
                reply.push("Thank you " + this.Name + " your order is");

                // reply.push(this.Size + " " + this.Item + " with " + this.Toppings);
                // if (this.Extra.toLowerCase() != "no") {
                //     reply.push("including chips and salsa on side");
                // }
                // if (this.Drinks) {
                //     reply.push("and " + this.Drinks);
                // }
                //reply.push("your total will be");

                if (this.Size.toLowerCase() == "small") {
                    reply.push("small burrito  with " + this.Toppings + " : $8.00");
                    total += 8.00;
                } else if (this.Size.toLowerCase() == "medium") {
                    reply.push("medium burrito with " + this.Toppings + " : $9.00");
                    total += 9.00;
                } else if (this.Size.toLowerCase() == "large") {
                    reply.push("large burrito  with " + this.Toppings + " : $10.00");
                    total += 10.00;
                } else {
                    reply.push("custom size burrito with " + this.Toppings + " : $12.00");
                    total += 12.00;
                }
                if (this.Extra.toLowerCase() != "no") {
                    reply.push("chips and salsa : $3.00");
                    total += 3.00;
                }
                if (this.Drinks) {
                    reply.push("can of pop (" + this.Drinks + ") : $2.00");
                    total += 2.00;
                }
                tax = total * 0.13;
                total += tax;
                reply.push("Order total with tax is $ " + total.toFixed(2));

                var currTime = new Date();
                currTime.setMinutes(currTime.getMinutes() + 20);
                reply.push("Please pick your order at " + currTime.toTimeString());
                break;
        }
        return reply;
    }
}