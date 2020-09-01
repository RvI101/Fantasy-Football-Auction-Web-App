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

    private deserialize(jsonData: any) {
        // Note this.active will not be listed in keys since it's declared, but not defined
        const keys = Object.keys(this);

        for (const key of keys) {
            if (jsonData.hasOwnProperty(key)) {
                this[key] = jsonData[key];
            }
        }
        if (jsonData.hasOwnProperty('first_name') && jsonData.hasOwnProperty('second_name')) {
            this.name = jsonData.first_name + ' ' + jsonData.second_name;
        }
        if (jsonData.hasOwnProperty('element_type')) {
            this.position = Position[jsonData.element_type];
        }
        this.status = 'Available';
    }
}
