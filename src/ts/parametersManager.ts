export class ParameterManager {
    parameters: {id1: number, id2: number, id3: number, id4: number, id5: number};
    
    constructor() {
        this.parameters =  {
            id1: 100,
            id2: 200,
            id3: 300,
            id4: 400,
            id5: 500,
        }
    }

    // getValueFromId(id: string) {
    //     return this.parameters[id];
    // }

    // setValueOnId(id: string, value: number) {
    //     this.parameters[id] = value
    // }

    // fullUpdate() {
    //     for (const key in this.parameters) {
    //         this.parameters[key as keyof this.parameters] += 1;
    //     }
    // }

    getTableFormat() {
        return {
            ids: Object.keys(this.parameters),
            values: Object.values(this.parameters),
        }
    }
}