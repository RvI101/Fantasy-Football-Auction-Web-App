import { Observable, of } from "rxjs";
import { Player } from "../models/player";
import { PlayerSource } from "../players.source.interface";
import SquadData from '../../data/squads.json'
import TeamData from '../../data/teams.json'
import PlayerData from '../../data/players.json'
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PlayersFileSource implements PlayerSource {
    getTeamMap(): Observable<Map<number, string>> {
        let intr: [number, string][] = Object.entries(TeamData).map(([tid, tname]) => [Number(tid), tname])
        return of(new Map(intr))
    }
    getAllPlayersByTeam(): Observable<Map<number, Player[]>> {
        let intr: [number, Player[]][] = Object.entries(SquadData).map(([tid, players]) => [Number(tid), players.map((p: any) => new Player(p))])
        return of(new Map(intr));
    }
    getAllPlayersMap(): Observable<any> {
        const res = {};
        PlayerData.map((p: any) => new Player(p)).forEach(p => {
            res[p.id] = p;
        })
        return of(res);
    }
}