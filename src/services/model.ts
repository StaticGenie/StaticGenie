/* ====================================================================
 * License: MIT
 * Website: https://staticgenie.com
 * Source: https://github.com/StaticGenie/StaticGenie
==================================================================== */

import {iConfigService, iService, Services} from "../libs/services"

export interface iModel {
    data: {[key: string] : any};
}

/**
 * Holds the shared model data
 */
export class Model implements iService, iModel {
    
    /**
     * The data (duh)
     */
    public data: {[key: string] : any} = {};

    /**
     * Initialise using provided config
     * @param services service provider access, but, don't use any
     * @param config 
     */
    initialise(services:Services, config:iModelConfig) {
        
    }

    /**
     * When plugins have all initialised
     */
    pluginsInitialised() {
        this.freeze()
    }

    /**
     * When plugins have generated all their pages
     */
    pluginsGenerated() {
        // Nothing to do when this happens
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

export interface iModelConfig extends iConfigService {

}