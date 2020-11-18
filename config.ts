import {iConfig} from "./src/libs/app";
import {Model, iModelConfig} from "./src/services/model";
import {PageWriterFile, iPageWriterFileConfig} from "./src/services/pagewriter";
import {ThemeEJS, iThemeEJSConfig} from "./src/services/theme";
import {ReportConsole, iReportConsoleConfig} from "./src/services/report";
import {iPluginPagesConfig} from "./src/plugins/pages";
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
     * @TODO the services config doesn't "require" name, class in the interface. Fix this.
     */
    services: {
        beforePluginsInitialised: {
            "../services/model": { 
                name: "model", 
                class: Model.name,
                config: <iModelConfig>{}
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
                            {name: "GitHub", url: "https://github.com/StaticGenie/StaticGenie"},
                            {name: "Reddit", url: "https://reddit.com/u/StaticGenie"},
                            {name: "Twitter", url: "https://twitter.com/StaticGenie"},
                        ],
                        headerLinks: [
                            {name: "Home", url: "index.html"},
                            {name: "About", url: "about.html"},
                            {name: "Blog", url: "blog.html"},
                            {name: "Contact", url: "contact.html"},
                        ],
                        footerLinks: [
                            {name: "Terms", url: "terms.html"},
                            {name: "Privacy", url: "privacy.html"},
                            {name: "Contact", url: "contact.html"},
                        ],
                        copyright: "Copyright &copy; 2020 StaticGenie, All Rights Reserved",
                    },
                },
            },
        },
    },
    
}