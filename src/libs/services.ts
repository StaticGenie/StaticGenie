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
    register(name:string, service:any) {
        if (this.services.hasOwnProperty(name) === true) {
            throw new Error(`Can not register service provider '${name}' due to already having been registered.`);
        }
        this.services[name] = service;
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

}