import * as services from "./services";
import {iConfig as iConfigPlugins, iPlugin} from "./plugins";
import {iConfig as iConfigTheme} from "./themes";

/**
 * The core application, everything starts here!!
 * @TODO how to handle keywords & meta data to support search?
 * @TODO how to handle generated files such as images, js files, etc?
 * @TODO Implement error handling and a way of reporting new pages, failed pages and errors during processing
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
     * @TODO Allow user supplied services?
     * @TODO service providers don't have a setup routine yet - intialise them with config....
     * @param config 
     */
    constructor(config:iConfig) {

        // Store config and build some basic handlers
        this.config = config;
        Object.freeze(this.config);
        this.services = new services.Services();

        // Build the plugins and register with the framework
        Object.keys(this.config.plugins).forEach(file => {
            this.plugins[file] = new (require(file)).default();
        });

        // Register services
        this.services.register("model", new services.Model());                   // Shared model to help share data between plugins
        this.services.register("markdown", new services.Markdown());             // Parses markdown

        // Initialise each plugin. Will allow for things like connecting to a database, ensuring API keys exist, checks config, updates shared model (service provider), etc 
        Object.keys(this.plugins).forEach(file => {
            this.plugins[file].initialise(this.services, this.config.plugins[file]);
        });
        this.services.pluginsInitialised();
        
        // Register services that become available AFTER plugins have initialised
        this.services.register("report", new services.Report());        // Report on what pages have been generated, skipped, etc
        this.services.register("theme", new services.Theme());          // Load up the theme selected within the config, used to render pages
        this.services.register("routes", new services.Routes());        // Anything passed to this will be output to the public website. All interaction with the generated website is done via this...
        
        // Call each plugins generator
        Object.keys(this.plugins).forEach(file => {
            this.plugins[file].generate(this.services, this.config.plugins[file]);
        });
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
     * Registered themes
     */
    themes: iConfigTheme[];
    
}
