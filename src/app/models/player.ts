import { Bid } from './bid';

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

    constructor(private jsonData?, public team?: string) {
        if (team) {
            this.team = team;
        } else {
            this.team = null;
        }

        if (jsonData) {
            this.deserialize(jsonData);
            this.jsonData = null;
        }
    }

    private deserialize(jsonData: Player) {
        // Note this.active will not be listed in keys since it's declared, but not defined
        const keys = Object.keys(this);

        for (const key of keys) {
            if (jsonData.hasOwnProperty(key)) {
                this[key] = jsonData[key];
            }
        }
    }
}
