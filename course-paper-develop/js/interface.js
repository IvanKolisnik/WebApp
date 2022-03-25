import { createElement } from './helpers/domHelper.js';
import {
    createInnerPlayedHand,
    createPlayground,
    createInnerEnemyHand,
} from './helpers/renderHelper.js';

export class Interface {
    constructor() {}
    static rootElement = document.getElementById('root');
    createStarter(deck) {
        let checkDeck = document.getElementsByClassName('deck');
        if (checkDeck[0]) {
            checkDeck[0].remove();
        }
        let playground = createPlayground(deck);
        Interface.rootElement.append(playground);
        myInterface.renderDeck(deck);
    }
    renderDeck(deck) {
        const cardsnum = deck.numberOfCards;
        if (cardsnum > 0) {
            document.querySelector('.deck p').innerText = cardsnum;
        } else {
            let deck = document.querySelector('.deck');
            if (deck) {
                deck.remove();
            }
        }
    }
    createPlayerHand(playerHand) {
        const playground = document.getElementsByClassName('playground')[0];
        let playerHandDiv = createElement({
            tagName: 'div',
            className: 'playerHand',
        });
        playerHandDiv = createInnerPlayedHand(playerHand, playerHandDiv);
        playground.append(playerHandDiv);
    }
    renderPlayerHand(playerHand) {
        const playerHandDiv = document.querySelector('.playerHand');
        if (playerHandDiv) {
            playerHandDiv.innerHTML = '';
        }
        createInnerPlayedHand(playerHand, playerHandDiv);
    }
    createEnemyHand(playerHand) {
        let enemyHandDiv = createInnerEnemyHand(playerHand);
        const playground = document.getElementsByClassName('playground')[0];
        playground.append(enemyHandDiv);
    }
    renderEnemyHand(playerHand) {
        const playerHandDiv = document.querySelector('.enemyHand');
        if (playerHandDiv) {
            playerHandDiv.innerHTML = '';
        }
        createInnerEnemyHand(playerHand, playerHandDiv);
    }
    showStartModal(onClose) {
        const root = Interface.rootElement;
        const modal = this.createStartModal(onClose);

        root.append(modal);
    }
    createChest(player) {
        let chestBlock;
        let chestP = createElement({
            tagName: 'p',
        });
        if (player == '1') {
            chestBlock = createElement({
                tagName: 'div',
                className: 'playerChest chest',
            });
            chestP.innerHTML = `You have <span>0</span> chests`;
        } else if (player == '2') {
            chestBlock = createElement({
                tagName: 'div',
                className: 'enemyChest chest',
            });
            chestP.innerHTML = `Enemy has <span>0</span> chests`;
        }

        let chestImg = createElement({
            tagName: 'img',
            attributes: {
                src: 'images/chest.png',
                alt: 'chest',
            },
        });
        chestBlock.append(chestP, chestImg);
        document.getElementsByClassName('playground')[0].append(chestBlock);
    }
    renderChest(player, playerHand) {
        let chestP;
        if (player == '1') {
            chestP = document.querySelector('.playerChest p');
            chestP.innerHTML = `You have <span>${playerHand.chestsNum}</span> chests`;
        } else if (player == '2') {
            chestP = document.querySelector('.enemyChest p');
            chestP.innerHTML = `Enemy has <span>${playerHand.chestsNum}</span> chests`;
        }
    }
    addAction(message) {
        const logs = document.querySelector('.backlog p');
        if (logs) {
            logs.innerHTML = message + '<br>' + logs.innerHTML;
        }
    }
    createStartModal(onClose) {
        let modalStart = createElement({
            tagName: 'div',
            className: 'modalStart',
        });
        let modalImg = createElement({
            tagName: 'img',
            attributes: {
                src: 'images/message_bg.jpg',
                alt: 'Start',
            },
        });
        let modalP = createElement({
            tagName: 'p',
            attributes: { id: 'start' },
        });
        let modalBtn = createElement({
            tagName: 'button',
        });
        modalP.innerText = 'Start game';
        modalBtn.innerText = 'Start';
        modalStart.append(modalImg, modalP, modalBtn);

        const close = () => {
            this.hideModal();
            onClose();
        };
        modalBtn.addEventListener('click', close);

        return modalStart;
    }
    hideModal() {
        const modal = document.getElementsByClassName('modalStart')[0];
        modal?.remove();
    }
    showWinner(player, playerOneHand, playerTwoHand) {
        const root = Interface.rootElement;
        root.innerHTML = '';
        const modal = createElement({
            tagName: 'div',
            className: 'winner-modal',
        });
        modal.innerHTML = `
        <div class="winner__header">
        <h1></h1>
        <hr>
    </div>
    <div class="winner__results">
        <ul class="chests-list player">
            <h3>Your chests:</h3>
        </ul>
        <br><br>
        <ul class="chests-list enemy">
            <h3>Enemy chests:</h3>
        </ul >
        
    </div>
    <div class="winner__restart">
        <button>Play again</button>
    </div>
        `;
        const winner = modal.querySelector('h1');
        if (player == '1') {
            winner.innerText = 'You won!';
        } else {
            winner.innerText = 'You lost!';
        }
        const playerChests = modal.querySelector('.player');
        const enemyChests = modal.querySelector('.enemy');
        for (let item of playerOneHand.chestsArr) {
            playerChests.innerHTML += `<li>${item}</li>`;
        }
        for (let item of playerTwoHand.chestsArr) {
            enemyChests.innerHTML += `<li>${item}</li>`;
        }
        const winnerBtn = modal.querySelector('.winner__restart');
        winnerBtn.onclick = () => {
            document.location.reload();
        };
        root.append(modal);
    }
}

export const myInterface = new Interface();
