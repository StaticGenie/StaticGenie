import * as services from "./services";
import {iConfig as iConfigPlugins, iPlugin} from "./plugins";
import {iConfigServices} from "./services";

/**
 * The core application, everything starts here!!
 */
export class App {

    /**
     * Everything configuration related
     */
    private config:iConfig;

    /**
     * Stores all the plugins
     */
    private plugins: {[key:string] : iPlugin} = {};

    /**
     * Service providers perform tasks shared by the generators such as; caching, image resizing, clash handling, etc
     */
    private services:services.Services;

    /**
     * All starts (and ends) here
     * @param config 
     */
    constructor(config:iConfig) {

        // Store config and build some basic handlers
        this.config = config;
        Object.freeze(this.config);
        this.services = new services.Services();

        // Build the plugins and register with the framework
        Object.keys(this.config.plugins).forEach(file => {
            this.plugins[file] = new (require(file)).Plugin();
        });

        // Register services
        Object.keys(this.config.services.beforePluginsInitialised).forEach(file => {
            this.services.register(this.config.services.beforePluginsInitialised[file].name, new (require(file))[this.config.services.beforePluginsInitialised[file].class], this.config.services.beforePluginsInitialised[file]);
        });

        // Initialise each plugin (primary use is to create shared data on the model service provider)
        Object.keys(this.plugins).forEach(file => {
            this.plugins[file].initialise(this.services, this.config.plugins[file]);
        });
        
        // Register more services
        Object.keys(this.config.services.afterPluginsInitialised).forEach(file => {
            this.services.register(this.config.services.afterPluginsInitialised[file].name, new (require(file))[this.config.services.afterPluginsInitialised[file].class], this.config.services.afterPluginsInitialised[file]);
        });
        
        // Services event
        this.services.pluginsInitialised();

        // Call each plugins generator
        Object.keys(this.plugins).forEach(file => {
            this.plugins[file].generate(this.services, this.config.plugins[file]);
        });
        
        // Services event
        this.services.pluginsGenerated();
        
    }
    
}

/**
 * Configuration used by the app
 */
export interface iConfig {

    /**
     * Where the generated website will be placed
     */
    outputDir: string;

    /**
     * Registered plugins
     */
    plugins: iConfigPlugins;

    /**
     * Registered services
     */
    services: {
        beforePluginsInitialised: {[key:string] : iConfigServices};
        afterPluginsInitialised:  {[key:string] : iConfigServices};
    };

}
