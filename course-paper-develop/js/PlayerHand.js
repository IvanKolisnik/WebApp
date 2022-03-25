export class PlayerHand {
    constructor(deck) {
        this.cards = [];
        this.chestsNum = 0;
        this.chestsArr = [];
        for (let i = 0; i < 4; i++) {
            this.cards.push(deck.takeCard());
        }
    }
    get numberOfCards() {
        return this.cards.length;
    }
    get cardValues() {
        let cardValuesArr = this.cards.map((item) => {
            return item.value;
        });
        return cardValuesArr;
    }
    checkCardValue(value) {
        const found = this.cardValues.find((item) => item == value);
        return found;
    }
    countNumberOfCard(value) {
        let result = 0;
        this.cardValues.filter((item) => {
            if (item == value) {
                result++;
                return item;
            }
        });
        return result;
    }
    getCardSuits(value) {
        return this.cards.map((item) => {
            if (item.value == value) {
                return item.suit;
            }
        });
    }
    checkCard(value, suit) {
        for (let i in this.cards) {
            if (this.cards[i].value == value && this.cards[i].suit == suit) {
                return true;
            }
        }
        return false;
    }
    getCard(value, suit) {
        for (let i in this.cards) {
            if (this.cards[i].value == value && this.cards[i].suit == suit) {
                let toReturn = this.cards[i];
                this.cards.splice(i, 1);
                return toReturn;
            }
        }
    }
    addCard(card) {
        this.cards.push(card);
    }
    createChest(value) {
        for (let i = 0; i < this.numberOfCards; i++) {
            if (this.cards[i].value == value) {
                this.cards.splice(i, 1);
                i--;
            }
        }
        this.chestsNum++;
        this.chestsArr.push(value);
    }
}
