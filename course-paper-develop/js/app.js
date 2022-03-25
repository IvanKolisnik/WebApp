import { Deck } from './deck.js';
import { PlayerHand } from './PlayerHand.js';
import { myInterface } from './interface.js';
import { Gameprocess } from './gameProcess.js';

class App {
    constructor() {
        this.startApp();
    }
    static rootElement = document.getElementById('root');
    startApp() {
        if (screen.width >= 1367) {
            const deck = new Deck();

            const playerOneHand = new PlayerHand(deck);
            const playerTwoHand = new PlayerHand(deck);
            myInterface.showStartModal(() => {
                myInterface.createStarter(deck);
                myInterface.createPlayerHand(playerOneHand);
                myInterface.createEnemyHand(playerTwoHand);
                myInterface.createChest('1', playerOneHand);
                myInterface.createChest('2', playerTwoHand);
                new Gameprocess(playerOneHand, playerTwoHand, deck);
            });
        }
        //console.log(deck);
    }
}

export default App;
