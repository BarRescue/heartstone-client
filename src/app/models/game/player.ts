import { field } from "./field";

export class player {
    id : string;
    fullName : string;
    gamesWon : number;
    amountOfCardsInHand : number;
    hp : number;
    mana : number;
    field : field;
}