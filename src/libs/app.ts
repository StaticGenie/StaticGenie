/* ====================================================================
 * License: MIT
 * Website: https://staticgenie.com
 * Source: https://github.com/StaticGenie/StaticGenie
==================================================================== */

import * as services from "./services";
import {iConfig as iConfigPlugins, iPlugin} from "./plugins";
import {iConfigServices} from "./services";

/**
 * The core application where different phases of the generator are glued together
 */
export class App {

    /**
     * The global config of the app and all its plugins/services/theme/etc (referenced at /config.ts)
     */
    private config:iConfig;

    /**
     * Stores all the plugins
     */
    private plugins: {[key:string] : iPlugin} = {};

    /**
     * Manages all the built services and their state that are passed into plugins, services, etc
     */
    private services:services.Services;

    /**
     * All starts (and ends) here
     * @param config The global config of the app and all its plugins/services/theme/etc (referenced at /config.ts)
     */
    constructor(config:iConfig) {

        // Store config and build some basic handlers
        this.config = config;
        this.services = new services.Services();

        // Freeze the config since it should NEVER change from what the user expects
        Object.freeze(this.config);

        // Build the plugins and register with the framework
        Object.keys(this.config.plugins).forEach(file => {
            this.plugins[file] = new (require(file)).Plugin();
        });

        // Register services
        Object.keys(this.config.services.beforePluginsInitialised).forEach(file => {
            this.services.register(
                this.config.services.beforePluginsInitialised[file].name, 
                new (require(file))[this.config.services.beforePluginsInitialised[file].class], 
                this.config.services.beforePluginsInitialised[file].config,
            );
        });

        // Initialise each plugin (primary use is to create shared data on the model service provider)
        Object.keys(this.plugins).forEach(file => {
            this.plugins[file].initialise(this.services, this.config.plugins[file]);
        });
        
        // Register more services
        Object.keys(this.config.services.afterPluginsInitialised).forEach(file => {
            this.services.register(
                this.config.services.afterPluginsInitialised[file].name, 
                new (require(file))[this.config.services.afterPluginsInitialised[file].class], 
                this.config.services.afterPluginsInitialised[file].config
            );
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
