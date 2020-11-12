import {iService} from "../services"

/**
 * Holds the shared model data
 */
export class Model implements iService {
    
    /**
     * The data (duh)
     */
    public data: {[key: string] : any} = {};

    /**
     * Freeze the model once all plugins have initialised to prevent generators interfering with them
     */
    pluginsInitialised() {
        this.freeze()
    }

    /**
     * Nothing to do when this happens
     */
    pluginsGenerated() {

    }

    /**
     * When the data has been created. Freeze it!
     */
    private freeze() {
        
        // Destroy any functions and other smart stuff. Should just be text based.
        this.data = JSON.parse(JSON.stringify(this.data));

        // No further changes allowed
        Object.freeze(this.data);

    }

}