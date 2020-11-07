/**
 * The core application, everything starts here!!
 * @TODO how to handle keywords & meta data to support search?
 */
class App {

    /**
     * Everything configuration related
     */
    private config:iConf;

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
    constructor(config:iConf) {

        // Register the configuration & make it immutable
        this.config = config;
        Object.freeze(this.config);

        // Basic handlers
        this.plugins = new Plugins();
        this.models = new Models;
        this.services = new Services();
        this.generators = new Generators();
        this.themes = new Themes();
        this.debug = new Debug();

        // Register plugins
        this.config.plugins.forEach(plugin => {
            this.plugins.register(plugin, this.config, this.models, this.generators, this.services);
        });

        // Each plugin to check it has all the required dependencies. Must be done after all plugins have registered.
        this.config.plugins.forEach(plugin => {
            this.plugins.selfCheck(plugin, this.config, this.models, this.generators, this.services);
        });

        // Register themes
        this.config.themes.forEach(theme => {
            this.themes.register(theme);
        });

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

// New StaticGenie instance
new App(<iAppConfig>{
    outputDir: "./public",
    assetsDir: "./assets",
    debug: <iAppConfigDebug>{
        showLifeCycle: true,
        showWarnings: true,
        showGeneratedUrls: true,
    },
    plugins: [
        {
            name: "Pages",
            file: "./plugins/Pages.js",
            conf: {}        // @TODO Assign relevant interface, should be part of plugin
        },
        {
            name: "Tags",
            file: "./plugins/Tags.js",
            conf: {}
        },
        {
            name: "Categories",
            file: "./plugins/Categories.js",
            conf: {}
        },
        {
            name: "LinkMap",
            file: "./plugins/LinkMap.js",
            conf: {}
        },
        {
            name: "Header",
            file: "./plugins/Header.js",
            conf: {}
        },
        {
            name: "Navigation",
            file: "./plugins/Navigation.js",
            conf: {}
        },
        {
            name: "Footer",
            file: "./plugins/Footer.js",
            conf: {}
        },
        {
            name: "Cache",
            file: "./plugins/Cache.js",
            conf: {}
        },
        {
            name: "ImageResizer",
            file: "./plugins/ImageResizer.js",
            conf: {}
        },
    ],
    themes: [
        {
            name: "Default",
            files: [],
            conf: {},
        },
    ],
}).generate();