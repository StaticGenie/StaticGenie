/**
 * The core application, everything starts here!!
 * @TODO how to handle keywords & meta data to support search?
 */
class App {

    /**
     * Everything configuration related
     */
    private config:iAppConfig;

    /**
     * Primarily created to help register and check the plugin dependencies. Do NOT directly access this.
     */
    private plugins: Plugins;

    /**
     * Data used by generators to render pages
     */
    private models:Models;

    /**
     * Objects that provide services such as caching, image resizing, etc
     */
    private services:Services;

    /**
     * Generates pages, executes in order, performs caching, image resizing, clash handling, route generation, etc
     */
    private generators:Generators;

    /**
     * Themes containing layouts & views used by generators. Generators know which theme to use from the config file
     */
    private themes:Themes;

    /**
     * Handles the the debug information to the console
     * @TODO replace this with a proper debugger/logger, for now, this crude implementation will do
     */
    private debug:Debug;

    /**
     * Register everything
     * @param config 
     */
    constructor(config:iAppConfig) {

        // Register the configuration & make it immutable
        this.config = config;
        Object.freeze(this.config);

        // Basic handlers
        this.models = new Models;
        this.services = new Services();
        this.generators = new Generators();
        this.themes = new Themes();
        this.debug = new Debug();

        // Handlers with dependencies
        this.plugins = new Plugins(this.models, this.generators, this.services);

        // Load the plugins and themes
        this.plugins.load(this.config.plugins);
        this.themes.load(this.config.themes);

    }
    
    /**
     * Generate the website
     */
    generate() {
        
        // Execute each generator
        this.generators.execute();

        // @TODO Create and save each rendered page
        

    }

}

/**
 * Register relevant service providers, models and generators. 
 * @TODO Route to dependency hell if not careful
 */
class Plugins {

    private models: Models;
    private generators: Generators;
    private services: Services;

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
     * @TODO make this work (currently just done so the typescript compiles)
     * @param config 
     */
    build(plugins:iAppConfigPlugin[]) {

        // Build each plugin from the config
        plugins.forEach(config => {

            // Build the plugin
            // @TODO build the right plugin according to the config
            let plugin = new CorePlugin();

            // Ensure the plugin hasn't already been registered
            if (this.plugins.hasOwnProperty(plugin.name()) === true) {
                throw new ConfigError(`Plugin "${plugin.name()}" already registered. Check your config file for a duplicate plugin name.`);
            }

            // Register the plugin
            this.plugins[plugin.name()] = plugin;

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

class ConfigError extends Error {};




interface iPlugin {
    name(): string;
    build(config:iAppConfigPlugin):void;
    initialise(models:Models, generators:Generators, services:Services): void;
}

class CorePlugin implements iPlugin {

    /**
     * Official name of this plugin
     */
    name() : string {
        return "staticgenie::core"
    }

    /**
     * Injects its models, generators and services
     */
    initialise(models:Models, generators:Generators, services:Services) {
        
        

    }

    /**
     * Create and return the services/models/generators that make up this plugin
     * @param config 
     */
    build(config:iAppConfigPlugin) {
        
    }

}





























class Models {

}

class Services {

}

class Generators {

    execute() {
        
    }

}

class Themes {

    load(themeConfig:iAppConfigTheme[]) {

    }

}

class Debug {

}



interface iAppConfigPlugin {
    name: string;
    file: string;
    conf: { [key: string]: string; };
}

interface iAppConfigTheme {
    name: string;
    files: string[];
    conf: { [key: string]: string; };
}

interface iAppConfigDebug {

    /**
     * The current area of the framework being executed (recommended to only have on for framework/plugin developers)
     */
    showLifeCycle: boolean;
    
    /**
     * Warnings such as files not found, timeouts, etc
     */
    showWarnings: boolean;
    
    /**
     * When a URL is generated, will show the status of it (from cache, new, etc)
     */
    showGeneratedUrls: boolean;

}

interface iAppConfig {

    /**
     * Where the generated website will be placed
     */
    outputDir: string;

    /**
     * Registered plugins
     */
    plugins: iAppConfigPlugin[];
    themes: iAppConfigTheme[];
}
