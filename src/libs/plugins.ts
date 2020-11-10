import {Models} from "./models";
import {Services} from "./services";
import {Generators} from "./generators";
import {iAppConfigPlugin} from "./config";
import {ConfigError} from "./errors";

/**
 * If you want your class/object to be considered a plugin, use this
 */
export interface iPlugin {
    name(): string;
    build(config:iAppConfigPlugin):void;
    initialise(models:Models, generators:Generators, services:Services): void;
}

/**
 * Register relevant service providers, models and generators. 
 * @TODO Route to dependency hell if not careful
 */
export class Plugins {

    private models: Models;
    private generators: Generators;
    private services: Services;

    /**
     * Stores all the plugins by their name
     */
    private plugins:{ [key: string]: iPlugin; } = {};

    /**
     * Dependencies
     * 
     * @param models 
     * @param generators 
     * @param services 
     */
    constructor(models:Models, generators:Generators, services:Services) {
        this.models = models;
        this.generators = generators;
        this.services = services;
    }

    /**
     * Loads all the plugins according to the config
     * 
     * @TODO provide a copy of the properties. Preventing calling of methods on the generators/models/services.
     */
    load(pluginsConfig:iAppConfigPlugin[]) {

        // Build all plugins according to the config
        this.build(pluginsConfig);

        // Initalise each plugin (creates models, generators, services)
        this.intialise();

    }

    /**
     * Build a new plugin from the config (the plugin should build itself, since this Plugins class won't know how)
     * @param config 
     */
    build(plugins:iAppConfigPlugin[]) {

        // Build each plugin from the config
        plugins.forEach(config => {

            // Build the plugin
            // @TODO build the right plugin according to the config
            /*
            let plugin = new CorePlugin();

            // Ensure the plugin hasn't already been registered
            if (this.plugins.hasOwnProperty(plugin.name()) === true) {
                throw new ConfigError(`Plugin "${plugin.name()}" already registered. Check your config file for a duplicate plugin name.`);
            }

            // Register the plugin
            this.plugins[plugin.name()] = plugin;

            */
        });

    }

    /**
     * Initalise each plugin so it can be used by the app. This means the plugin returning models/generators/services for use within the app
     */
    intialise() {
        
        // Initialise each built plugin
        Object.keys(this.plugins).forEach(name => {
            this.plugins[name].initialise(this.models, this.generators, this.services);
        });

    }

}