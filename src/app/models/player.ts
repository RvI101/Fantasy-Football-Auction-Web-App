import { Bid } from './bid';
enum Position {
    GK = 1,
    DEF,
    MID,
    FWD
}
export class Player {
    id: number = null;
    name: string = null;
    position: string = null;
    status = 'Available';
    bids: any = {};
    jerseyNumber: number = null;
    dateOfBirth: string = null;
    nationality: string = null;
    owner: string = null;
    cost: number = null;
    team: number = null;

    constructor(private jsonData?) {
        if (jsonData) {
            this.deserialize(jsonData);
            this.jsonData = null;
        }
    }
    // {
    //     "player_id": "63706",
    //     "player_name": "Cristiano Ronaldo",
    //     "team_name": "Portugal",
    //     "team_id": "110",
    //     "position": "4"
    // }
    private deserialize(jsonData: any) {
        // Note this.active will not be listed in keys since it's declared, but not defined
        const keys = Object.keys(this);

        for (const key of keys) {
            if (jsonData.hasOwnProperty(key)) {
                this[key] = jsonData[key];
            }
        }
        if (jsonData.hasOwnProperty('player_name')) {
            this.name = jsonData.player_name;
        }
        if (jsonData.hasOwnProperty('player_id')) {
            this.id = jsonData.player_id;
        }
        if (jsonData.hasOwnProperty('team_id')) {
            this.team = Number(jsonData.team_id);
        }
        if (jsonData.hasOwnProperty('position')) {
            this.position = Position[Number(jsonData.position)];
        }
        this.status = 'Available';
    }
}
