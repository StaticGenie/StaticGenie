/* ====================================================================
 * License: MIT
 * Website: https://staticgenie.com
 * Source: https://github.com/StaticGenie/StaticGenie
==================================================================== */

import {iConfig} from "./src/libs/app";
import {GlobalModel, iGlobalModelConfig} from "./src/services/globalmodel";
import {PageWriterFile, iPageWriterFileConfig} from "./src/services/pagewriter";
import {ThemeEJS, iThemeEJSConfig} from "./src/services/theme";
import {ReportConsole, iReportConsoleConfig} from "./src/services/report";
import {iPluginConfig as iPluginPagesConfig} from "./src/plugins/pages";
import {iThemeConfigData} from "./theme/package";

/**
 * Configure your website here
 */
export = <iConfig>{

    /**
     * Lists all plugins to load and their respective config
     */
    plugins: {
        "../plugins/pages": <iPluginPagesConfig>{

        }
    },

    /**
     * Load all services to be used by plugins
     */
    services: {
        beforePluginsInitialised: {
            "../services/globalmodel": { 
                name: "globalmodel", 
                class: GlobalModel.name,
                config: <iGlobalModelConfig>{}
            },
        },
        afterPluginsInitialised: {
            "../services/report": {
                name: "report", 
                class: ReportConsole.name,
                config: <iReportConsoleConfig>{} 
            },
            "../services/pagewriter": {
                name: "pagewriter", 
                class: PageWriterFile.name,
                config: <iPageWriterFileConfig>{
                    outDirectory: "./www" // Don't change this (there are areas that don't use this value yet!!!!!!!!!)
                }
            },
            "../services/theme": {
                name: "theme",
                class: ThemeEJS.name,
                config: <iThemeEJSConfig>{
                    data: <iThemeConfigData>{
                        title: "StaticGenie",
                        socialLinks: [
                            {name: "GitHub", url: "https://github.com/StaticGenie/StaticGenie", image: "assets/images/github.png"},
                            {name: "Reddit", url: "https://reddit.com/u/StaticGenie", image: "assets/images/reddit.png"},
                            {name: "Twitter", url: "https://twitter.com/StaticGenie", image: "assets/images/twitter.png"},
                        ],
                        headerLinks: [
                            {name: "Home", url: "index.html"},
                            {name: "Getting Started", url: "docs/getting-started/installation.html"},
                            {name: "Docs", url: "docs/index.html"},
                            {name: "Roadmap", url: "roadmap.html"},
                        ],
                        footerLinks: [
                            {name: "Contact", url: "contact.html"},
                            {name: "Credits", url: "credits.html"},
                            {name: "License & Terms", url: "license-and-terms.html"},
                        ],
                        copyright: "Copyright &copy; 2020 StaticGenie, All Rights Reserved",
                    },
                },
            },
        },
    },
    
}