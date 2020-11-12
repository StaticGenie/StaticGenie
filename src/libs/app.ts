import {Services} from "./services";
import {iConfig as iConfigPlugins, iPlugin} from "./plugins";
import {iConfig as iConfigTheme} from "./themes";
import {Report} from "./services/report";
import {Model} from "./services/model";
import Debug from "debug";

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
    private services:Services;

    /**
     * All starts (and ends) here
     * @TODO use pub/sub to inform service providers of current execution e.g. when plugins have all initialise the model service provider will want to freeze itself, or the report will want to spew out the report to the console, etc
     * @TODO Allow user supplied services?
     * @param config 
     */
    constructor(config:iConfig) {

        // Store config and build some basic handlers
        this.debug("Assigning config & creating handlers");
        this.config = config;
        Object.freeze(this.config);
        this.services = new Services();

        // Build the plugins and register with the framework
        this.debug("Registering plugins");
        Object.keys(this.config.plugins).forEach(file => {
            this.plugins[file] = new (require(file)).default();
        });

        // Register services
        this.debug("Registering service providers");
        this.services.register("model", new Model());                   // Shared model to help share data between plugins
        // @TODO this.services.register("markdown", new Markdown());    // Parses markdown
        
        // Initialise each plugin. Will allow for things like connecting to a database, ensuring API keys exist, checks config, updates shared model (service provider), etc 
        Object.keys(this.plugins).forEach(file => {
            this.plugins[file].initialise(this.services, this.config.plugins[file]);
        });

        // Register services that become available AFTER plugins have initialised
        this.services.register("report", new Report());                 // Report on what pages have been generated, skipped, etc
        // @TODO this.services.register("theme", new Theme());          // Load up the theme selected within the config, used to render pages
        // @TODO this.services.register("routes", new Routes());        // Anything passed to this will be output to the public website. All interaction with the generated website is done via this...
        
        // Call each plugins generator
        Object.keys(this.plugins).forEach(file => {
            this.plugins[file].generate(this.services, this.config.plugins[file]);
        });
        
    }
    
    /**
     * Show the stages of processing
     * @TODO could be a service provider that simply spews this out when each event is called
     * @param text 
     */
    private debug(text:string) {
        Debug("sg:stages")("\n=============================================\n=== " + text.toLocaleUpperCase() + "\n=============================================\n");
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
