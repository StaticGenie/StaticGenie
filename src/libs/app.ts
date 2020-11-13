import * as services from "./services";
import {iConfig as iConfigPlugins, iPlugin} from "./plugins";
import {iConfig as iConfigTheme} from "./themes";

/**
 * The core application, everything starts here!!
 * @TODO how to handle generated files such as images, js files, etc?
 * @TODO Implement error handling and a way of reporting new pages, failed pages and errors during processing
 * @TODO How can users supply their own services
 * @TODO Service providers don't have an intialisation process (using the config)
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
            this.plugins[file] = new (require(file)).default();
        });
        
        // Register services
        this.services.register("model", new services.Model());
        this.services.register("markdown", new services.Markdown());

        // Initialise each plugin. Will allow for things like connecting to a database, ensuring API keys exist, checks config, updates shared model (service provider), etc 
        Object.keys(this.plugins).forEach(file => {
            this.plugins[file].initialise(this.services, this.config.plugins[file]);
        });
        
        // Register more services
        this.services.register("report", new services.Report());
        this.services.register("theme", new services.Theme());
        this.services.register("ejs", new services.Ejs());
        this.services.register("routes", new services.Routes());
        
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
     * Registered themes
     */
    theme: iConfigTheme;
    
}
