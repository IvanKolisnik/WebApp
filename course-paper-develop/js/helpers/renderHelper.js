import { createElement } from './domHelper.js';
//створення playground, колоди та backlog
export function createPlayground(deck) {
    let playground = createElement({
        tagName: 'div',
        className: 'playground',
    });
    let deckDiv = createElement({
        tagName: 'div',
        className: 'deck',
    });
    let deckPicImg = createElement({
        tagName: 'img',
        attributes: {
            src: 'images/cardForPlayer1.png',
        },
    });
    let deckPicP = createElement({
        tagName: 'p',
    });
    let backlog = createElement({
        tagName: 'div',
        className: 'backlog',
    });
    let backlogP = createElement({
        tagName: 'p',
    });
    deckPicP.innerText = deck.numberOfCards;
    deckDiv.append(deckPicImg, deckPicP);
    backlog.append(backlogP);
    playground.append(backlog);
    playground.append(deckDiv);
    return playground;
}
//заповнення руки гравця картами
export function createInnerPlayedHand(playerHand, playerHandDiv) {
    let playerHandUl = createElement({
        tagName: 'ul',
    });
    if (playerHand.numberOfCards < 1) {
        playerHandDiv.appendChild(playerHandUl);
        return playerHandDiv;
    }
    const marginCard = 100;
    for (let i = 1; i < playerHand.numberOfCards + 1; i++) {
        let playerHandLi = createElement({
            tagName: 'li',
        });
        let playerHandCardDiv = createElement({
            tagName: 'div',
            className: 'card',
            attributes: {
                id: 'card' + i,
            },
        });
        let playerHandCardSuitValue = createElement({
            tagName: 'p',
            className: 'suitvalue',
        });
        playerHandCardSuitValue.innerHTML =
            playerHand.cards[i - 1]?.value +
            '<br>' +
            playerHand.cards[i - 1]?.suit;
        let playerHandCardSuitBig = createElement({
            tagName: 'p',
            className: 'suitBig',
        });
        playerHandLi.style.left = marginCard + 60 * i + 'px';
        playerHandCardSuitBig.innerText = playerHand.cards[i - 1]?.suit;
        if (
            playerHand.cards[i - 1]?.suit == '♥' ||
            playerHand.cards[i - 1]?.suit == '♦'
        ) {
            playerHandCardSuitValue.style.color = window
                .getComputedStyle(document.documentElement)
                .getPropertyValue('--redSuit');
            playerHandCardSuitBig.style.color = window
                .getComputedStyle(document.documentElement)
                .getPropertyValue('--redSuit');
        } else {
            playerHandCardSuitValue.style.color = window
                .getComputedStyle(document.documentElement)
                .getPropertyValue('--blackSuit');
            playerHandCardSuitBig.style.color = window
                .getComputedStyle(document.documentElement)
                .getPropertyValue('--blackSuit');
        }

        playerHandCardDiv.append(
            playerHandCardSuitValue,
            playerHandCardSuitBig,
        );
        playerHandLi.append(playerHandCardDiv);
        playerHandUl.append(playerHandLi);
    }
    playerHandDiv.append(playerHandUl);
    return playerHandDiv;
}
//заповнення руки ворога картами
export function createInnerEnemyHand(enemyHand, enemyHandDiv) {
    if (!enemyHandDiv) {
        enemyHandDiv = createElement({
            tagName: 'div',
            className: 'enemyHand',
        });
    }
    let enemyHandUl = createElement({
        tagName: 'ul',
    });
    if (enemyHand.numberOfCards >= 7) {
        for (let i = 1; i < 8; i++) {
            renderNumberOfCardsEnemy(enemyHandUl, i);
        }
        let enemyHandPre = createElement({
            tagName: 'pre',
        });
        let enemyHandP = createElement({
            tagName: 'p',
        });
        enemyHandP.innerHTML = `Enemy has <br>    <span>${enemyHand.numberOfCards}</span> cards`;
        enemyHandPre.append(enemyHandP);
        enemyHandDiv.append(enemyHandUl);
        enemyHandDiv.append(enemyHandPre);
    } else if (enemyHand.numberOfCards < 7) {
        for (let i = 1; i < enemyHand.numberOfCards + 1; i++) {
            renderNumberOfCardsEnemy(enemyHandUl, i);
        }
        let enemyHandPre = createElement({
            tagName: 'pre',
        });
        let enemyHandP = createElement({
            tagName: 'p',
        });
        enemyHandP.innerHTML = `Enemy has <br>    <span>${enemyHand.numberOfCards}</span> cards`;
        enemyHandPre.append(enemyHandP);
        enemyHandDiv.append(enemyHandUl);
        enemyHandDiv.append(enemyHandPre);
    }
    return enemyHandDiv;
}
//оновлення кількості карт ворога
function renderNumberOfCardsEnemy(enemyHandUl, i) {
    let enemyHandLi = createElement({
        tagName: 'li',
        className: 'card' + i,
    });
    let enemyHandImg = createElement({
        tagName: 'img',
        attributes: {
            src: 'images/cardForPlayer1.png',
        },
    });
    enemyHandLi.style.left = 600 + 50 * i + 'px';
    enemyHandLi.append(enemyHandImg);
    enemyHandUl.append(enemyHandLi);
}
