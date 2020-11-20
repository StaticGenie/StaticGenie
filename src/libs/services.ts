/* ====================================================================
 * License: MIT
 * Website: https://staticgenie.com
 * Source: https://github.com/StaticGenie/StaticGenie
==================================================================== */

export * as model from "../services/model";
export * as report from "../services/report";
export * as pagewriter from "../services/pagewriter";
export * as theme from "../services/theme";

/**
 * Collection of services
 */
export class Services {

    /**
     * Registered service providers
     */
    private services: {[key: string] : any} = {};

    /**
     * Register a service provider and initialise it
     * @param name used to fetch the instance of a service provider
     * @param service service provider object
     * @param config configuration for the service provider
     */
    register(name:string, service:iService, config:iConfigService) {

        // Ensure the service doesn't already
        if (this.services.hasOwnProperty(name) === true) {
            throw new Error(`Can not register service provider '${name}' due to already having been registered.`);
        }

        // Register the service
        this.services[name] = service;

        // Initialise the service
        this.services[name].initialise(this, config);

    }

    /**
     * Get a specific service provider
     * @param name the name registered with the service provider to fetch it
     */
    get(name: string) {
        if (this.services.hasOwnProperty(name) === true) {
            return this.services[name];
        }
        throw new Error(`Can not get service '${name}' since it's not been registered (doesn't exist)`);
    }

    /**
     * Called when all plugins have initialised
     */
    pluginsInitialised() {
        Object.keys(this.services).forEach(key => this.services[key].pluginsInitialised());
    }

    /**
     * Called when all plugins have generated their web pages
     */
    pluginsGenerated() {
        Object.keys(this.services).forEach(key => this.services[key].pluginsGenerated());
    }

}

/**
 * Service interface
 */
export interface iService {

    /**
     * Setup the properties of the service
     * @TODO enforce that services can't be fetched here. Should only be stored to be used later by other areas of the system
     * @param services this should only be stored in the service. It should NOT be accessed within this method to give time for all services to be registered before being accessed
     * @param config 
     */
    initialise(services:Services, config:iConfigService): void;

    /**
     * Let's the services know that all plugins have been initialised
     * @TODO this gives the services knowledge of plugins (not a good idea). Refactor this off here, possibly use events.
     */
    pluginsInitialised(): void;

    /**
     * Let's the services know that all plugins have generated their relevant pages
     * @TODO this gives the services knowledge of plugins (not a good idea). Refactor this off here, possibly use events.
     */
    pluginsGenerated(): void;

}

/**
 * Define a group of services
 */
export interface iConfigServices {
    name: string;               // handle name used to register and fetch a service provider
    class: string;              // the name of the class to be instantiated
    config: iConfigService;     // the configuration to use with the class
}

/**
 * Config for a specific service (you will want to extend this with your specific service config)
 */
export interface iConfigService {
    [key: string] : any;
}
