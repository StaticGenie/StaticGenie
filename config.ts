import * as fm from "./src/framework";
import {iThemeConfigData} from "./theme/package";

/**
 * Configure your website here
 */
export = <fm.app.iConfig>{

    /**
     * Lists all plugins to load and their respective config
     */
    plugins: {
        "../plugins/pages": {}
    },

    /**
     * Load all services to be used by plugins
     * @TODO the services config doesn't "require" name, class in the interface. Fix this.
     */
    services: {
        beforePluginsInitialised: {
            "../services/model": { 
                name: "model", 
                class: fm.services.model.Model.name,
                config: <fm.services.model.iModelConfig>{} 
            },
        },
        afterPluginsInitialised: {
            "../services/report": { 
                name: "report", 
                class: fm.services.report.ReportConsole.name,
                config: <fm.services.report.iReportConsoleConfig>{} 
            },
            "../services/pagewriter": { 
                name: "pagewriter", 
                class: fm.services.pagewriter.PageWriterFile.name,
                config: <fm.services.pagewriter.iPageWriterFileConfig>{
                    outDirectory: "./www"
                }
            },
            "../services/theme": { 
                name: "theme", 
                class: fm.services.theme.ThemeEJS.name,
                config: <fm.services.theme.iThemeEJSConfig>{
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
            },
        },
    },

}