import {Models} from "./models";
import {Generators} from "./generators";
import {iConfig as iConfigPlugin} from "./plugins";
import {iConfig as iConfigTheme} from "./themes";
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
     * Shared models accessible by both generators and themes
     */
    private models:Models;

    /**
     * Generators generate pages, executes in order, performs caching, image resizing, clash handling, etc. This is what does the hard work.
     * @TODO Do generates do too much?
     */
    private generators:Generators;

    /**
     * All starts (and ends) here
     * 
     * @param config 
     */
    constructor(config:iConfig) {

        // Store config and build some basic handlers
        this.debug("Assigning config & creating handlers");
        this.config = config;
        Object.freeze(this.config);
        this.models = new Models;
        this.generators = new Generators();

        // Register services (theme rendering, file io, caching, etc)
        /* @TODO create services, use interface to allow type hinting when using a service. By registering services, it allows the potential for 3rd parties to also create services... later tho...
        this.services = new Services();
        this.services.register(new Theme);
        */

        // Load the plugins - which will register models and generators
        this.debug("Loading plugins");
        this.config.plugins.forEach(config => {

            // Build the plugin
            let plugin = new (require(config.file)).default();

            // Add any shared models
            this.models.addBuilders(plugin.models());

            // Add generators to execute
            this.generators.addGenerators(plugin.generators())

        });

        // Build all shared models
        this.debug("Building shared models");
        this.models.build();

        // Execute each generator, generators can use all shared models data
        // @TODO pass in service providers
        this.debug("Building pages (generators)");
        this.generators.generate(this.models.data);

        // @TODO Create and save each rendered page - pass to the generator so that it can render pages as generated to prevent heavy RAM usage and make use of async io
        // @TODO Will theme be better off as a plugin? Config would be the model (so pointless creating a model builder), and no need for a generator as the theme would be used by others. This appears more of a service provider.        
        // @TODO Report

    }
    
    /**
     * Show the stages of processing
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
    plugins: iConfigPlugin[];

    /**
     * Registered themes
     */
    themes: iConfigTheme[];
    
}
