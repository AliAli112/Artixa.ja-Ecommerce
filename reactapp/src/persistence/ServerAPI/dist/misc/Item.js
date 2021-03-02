"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor(id, name, quantity, desc) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.description = desc;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getQuantity() {
        return this.quantity;
    }
    getDesc() {
        return this.description;
    }
    updateQuantity(amount) {
        this.quantity += amount;
    }
}
exports.Item = Item;
//# sourceMappingURL=Item.js.map