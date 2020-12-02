/* ====================================================================
 * License: MIT
 * Website: https://staticgenie.com
 * Source: https://github.com/StaticGenie/StaticGenie
==================================================================== */

import {iConfigService, iService, Services} from "../libs/services"

/**
 * Service provider interface
 */
export interface iGlobalModel {
    model: {[key: string] : any};
}

/**
 * Holds the shared model data - called GlobalModel to make referencing it easier
 * "Global" leaks context, but, this service provider won't be re-used anywhere
 */
export class GlobalModel implements iService, iGlobalModel {
    
    /**
     * The model data (duh)
     */
    public model: {[key: string] : any} = {};

    /**
     * Dependency injection
     * @param services
     * @param config 
     */
    initialise(services:Services, config:iGlobalModelConfig) {
        
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
     * When the model has been created. Freeze it!
     */
    private freeze() {
        
        // No further changes allowed
        Object.freeze(this.model);

    }

}

export interface iGlobalModelConfig extends iConfigService {

}