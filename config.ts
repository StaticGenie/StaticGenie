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
import {iPluginConfig as iPluginStandardPageConfig} from "./src/plugins/standardpage";
import {iThemeConfigData} from "./theme/package";
import * as path from "path";
import { fstat } from "fs";

/**
 * Configure your website here
 */
export = <iConfig>{

    /**
     * Lists all plugins to load and their respective config
     */
    plugins: {
        "../plugins/standardpage": <iPluginStandardPageConfig>{
            directory: "./data/standardpage"
        },
        "../plugins/blog": <iPluginStandardPageConfig>{
            directory: "./data/blog"
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
                        logoLink: "/index.html",
                        docs: {
                            "Getting Started" : {
                                "Installation" : "/docs/getting-started/installation.html",
                                "Commands" : "/docs/getting-started/commands.html",
                                "Directory Structure" : "/docs/getting-started/directory-structure.html",
                            },
                            "Core" : {
                                "Services" : "/docs/core/services.html",
                                "Plugins" : "/docs/core/plugins.html",
                                "Libs" : "/docs/core/libs.html",
                            },
                            "How To" : {
                                "New Pages" : "/docs/how-to/new-pages.html",
                                "Bespoke Design" : "/docs/how-to/bespoke-design.html",
                                "Display Image" : "/docs/how-to/display-image.html",
                            },
                            "Advanced" : {
                                "Creating A Theme" : "/docs/advanced/creating-a-theme.html",
                                "Creating A Service" : "/docs/advanced/creating-a-service.html",
                                "Creating A Plugin" : "/docs/advanced/creating-a-plugin.html",
                            },
                            "Extras" : {
                                "Tips" : "/docs/extras/tips.html",
                            },
                        },
                        socialLinks: [
                            {name: "GitHub", url: "https://github.com/StaticGenie/StaticGenie", image: "/assets/images/github.png"},
                            {name: "Reddit", url: "https://reddit.com/u/StaticGenie", image: "/assets/images/reddit.png"},
                            {name: "Twitter", url: "https://twitter.com/StaticGenie", image: "/assets/images/twitter.png"},
                        ],
                        headerLinks: [
                            {name: "Home", url: "/index.html"},
                            {name: "Docs", url: "/docs/getting-started/installation.html"},
                            {name: "Roadmap", url: "/roadmap.html"},
                        ],
                        footerLinks: [
                            {name: "Contact", url: "/contact.html"},
                            {name: "Credits", url: "/credits.html"},
                            {name: "License & Terms", url: "/license-and-terms.html"},
                        ],
                        copyright: "Copyright &copy; 2020 StaticGenie, All Rights Reserved",
                    },
                },
            },
        },
    },
    
}
