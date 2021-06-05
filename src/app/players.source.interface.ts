import { Observable } from "rxjs";
import { Player } from "./models/player";

export interface PlayerSource {
    getTeamMap(): Observable<Map<number, string>>
    getAllPlayersByTeam(): Observable<Map<number, Player[]>>
    getAllPlayersMap(): Observable<any>
}