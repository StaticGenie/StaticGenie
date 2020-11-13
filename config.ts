import * as fm from "./src/framework";
import {iThemeConfigData} from "./theme/package";

/**
 * Configure your website here
 */
export = <fm.app.iConfig>{

    /**
     * Where to put the generated website
     */
    outputDir: "./www",

    /**
     * Where to pull static assets like files (js, images, etc)
     */
    assetsDir: "./theme/assets",

    /**
     * Lists all plugins to load and their respective config
     */
    plugins: {
        "../plugins/pages": {}
    },

    /**
     * Load all services
     */
    services: {
        beforePluginsInitialised: {
            "../services/markdown": {
                name: "markdown"
            },
            "../services/model": {
                name: "model"
            },
        },
        afterPluginsInitialised: {
            "../services/ejs": {
                name: "ejs"
            },
            "../services/report": {
                name: "report"
            },
            "../services/routes": {
                name: "routes"
            },
            "../services/theme": {
                name: "theme"
            },
        },
    },

    /**
     * Theme config
     */
    theme: {
        data: <iThemeConfigData>{
            title: "StaticGenie",
            links: [
                {name: "Home", url: "/index.html"},
                {name: "About", url: "/about.html"},
                {name: "Contact", url: "/contact.html"},
            ],
            copyright: "Copyright &copy; 2020 StaticGenie, All Rights Reserved",
        },
    },
    
}