export class ImagineHandCard {
    constructor(value, accurate, isNot = [], suit) {
        this.value = value;
        this.accurate = accurate;
        this.isNot = isNot;
        if (suit) {
            this.accurate = true;
            this.suit = suit;
        }
    }
}
