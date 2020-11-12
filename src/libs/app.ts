import {Models} from "./models";
import {Generators} from "./generators";
import {Themes} from "./themes";
import {iConfig as iConfigPlugin} from "./plugins";
import {iConfig as iConfigTheme} from "./themes";

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

/**
 * The core application, everything starts here!!
 * @TODO how to handle keywords & meta data to support search?
 * @TODO implement debug()
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
     * Generates pages, executes in order, performs caching, image resizing, clash handling, etc. This is what does the hard work.
     */
    private generators:Generators;

    /**
     * Themes containing layouts & views used by generators.
     */
    private themes:Themes;

    /**
     * Register everything
     * @param config 
     */
    constructor(config:iConfig) {

        // Register the configuration & make it immutable
        this.config = config;
        Object.freeze(this.config);

        // Basic handlers
        this.models = new Models;
        this.generators = new Generators();
        this.themes = new Themes().load(this.config.themes);
        
        // Load the plugins - which will register models and generators
        this.config.plugins.forEach(config => {

            // Build the plugin
            let plugin = new (require(config.file)).default();

            // Add any shared models
            this.models.addBuilders(plugin.models());

            // Add generators to execute
            this.generators.addGenerators(plugin.generators())

        });

    }
    
    /**
     * Generate the website
     * @TODO
     */
    generate() {
        
        // Build all shared models
        this.models.build();

        // Execute each generator, generators can use all shared models data
        this.generators.generate(this.models.data);

        // @TODO Create and save each rendered page - pass to the generator so that it can render pages as generated to prevent heavy RAM usage and make use of async io
        

    }

}
