import { player } from "./player";
import { discardPile } from "./discardPile";

export class game {
    players : player[];
    currentPlayer : player;
    ownPlayer : player;
    discardPile : discardPile;
    message : string;
}