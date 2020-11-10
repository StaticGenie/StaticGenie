import {iAppConfig} from "./config";
import {Plugins} from "./plugins";
import {Models} from "./models";
import {Services} from "./services";
import {Generators} from "./generators";
import {Themes} from "./themes";
import {Debug} from "./debug";

/**
 * The core application, everything starts here!!
 * @TODO how to handle keywords & meta data to support search?
 * @TODO wrap up all core libs into a single app export; import * as app from "../libs/app"
 */
export class App {

    /**
     * Everything configuration related
     */
    private config:iAppConfig;

    /**
     * Primarily created to help build and initialise the plugins
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
     * @TODO implement the debug class
     * @TODO pull in via imports, NOT held on this app class
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
