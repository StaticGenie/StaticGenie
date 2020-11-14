export * as model from "../services/model";
export * as report from "../services/report";
export * as pagewriter from "../services/pagewriter";
export * as theme from "../services/theme";

export class Services {

    /**
     * Registered service providers
     */
    private services: {[key: string] : any} = {};

    /**
     * Register a service provider
     * @param name 
     * @param service 
     */
    register(name:string, service:iService, config:iConfig) {

        // Ensure the service doesn't already
        if (this.services.hasOwnProperty(name) === true) {
            throw new Error(`Can not register service provider '${name}' due to already having been registered.`);
        }

        // Register the service
        this.services[name] = service;

        // Initialise the service
        this.services[name].initialise(config);

    }

    /**
     * Get a specific service provider
     * @param name 
     */
    get(name: string) {
        if (this.services.hasOwnProperty(name) === true) {
            return this.services[name];
        }
        throw new Error(`Can not get service '${name}' since it's not been register (doesn't exist)`);
    }

    /**
     * Hooks
     */
    pluginsInitialised() {
        Object.keys(this.services).forEach(key => this.services[key].pluginsInitialised());
    }

    /**
     * Hooks
     */
    pluginsGenerated() {
        Object.keys(this.services).forEach(key => this.services[key].pluginsGenerated());
    }

}

/**
 * Service interface
 */
export interface iService {
    initialise(config:iConfig): void;
    pluginsInitialised(): void;
    pluginsGenerated(): void;
}

/**
 * Config
 */
export interface iConfig {
    [key: string]: { [key: string] : any };
}
