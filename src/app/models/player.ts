import { Bid } from './bid';

export class Player {
    id: number = null;
    name: string = null;
    position: number = null;
    status = 'Available';
    bids: any = {};
    jerseyNumber: number = null;
    dateOfBirth: string = null;
    nationality: string = null;
    owner: string = null;
    cost: number = null;
    team: string = null;

    constructor(private jsonData?) {
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
        if (jsonData.hasOwnProperty('web_name')) {
            this.name = jsonData['web_name'];
        }
        if (jsonData.hasOwnProperty('element_type')) {
            this.position = jsonData['element_type'];
        }
    }
}
