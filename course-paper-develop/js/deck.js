export const SUITS = ['♠', '♣', '♥', '♦'];
export const VALUES = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
import { Card } from './card.js';

export class Deck {
    constructor(cards = this.freshDeck()) {
        this.cards = cards;
        this.shuffle();
    }
    freshDeck() {
        return SUITS.flatMap((suit) => {
            return VALUES.map((value) => {
                return new Card(suit, value);
            });
        });
    }
    get numberOfCards() {
        return this.cards.length;
    }
    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }
    takeCard() {
        return this.cards.length > 0 ? this.cards.pop() : undefined;
    }
}
