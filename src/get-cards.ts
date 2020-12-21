import { NAMES, ANIMALS } from "./labels";

const CARDS_PER_PLAYER = 4;

function createId() { 
    var minm = 10000; 
    var maxm = 99999; 
    return Math.floor(Math 
    .random() * (maxm - minm + 1)) + minm; 
} 

function pickRandomName() {
    const index = Math.floor(Math.random() * NAMES.length)
    return NAMES[index]
}

function createCard(animal: any) {
    return {
        id: createId(),
        name: pickRandomName(),
        type: animal.type,
        url: animal.url,
    }
}

function shuffleArray(array: any[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

export default function getCards(totalPlayers: number) {
    const cards = [];

    for(let i = 0; i < totalPlayers; i++) {
        const animal = ANIMALS[i];

        for(let j = 0; j < CARDS_PER_PLAYER; j++) {
            cards.push(createCard(animal))
        }
    }

    return shuffleArray(cards)
}