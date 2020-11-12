/**
 * Holds the shared model data
 */
export class Model {
    
    /**
     * The data (duh)
     */
    public data: {[key: string] : any} = {};

    /**
     * When the data has been created. Freeze it!
     */
    freeze() {
        
        // Destroy any functions and other smart stuff. Should just be text based.
        this.data = JSON.parse(JSON.stringify(this.data));

        // No further changes allowed
        Object.freeze(this.data);

    }

}