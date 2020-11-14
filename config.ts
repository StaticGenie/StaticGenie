import * as fm from "./src/framework";
import {iThemeConfig} from "./theme/package";

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
                class: fm.services.report.Report.name,
                config: <fm.services.report.iReportConfig>{} 
            },
            "../services/pagewriter": { 
                name: "pagewriter", 
                class: fm.services.pagewriter.PageWriterConsole.name,
                config: <fm.services.pagewriter.iPageWriterConsoleConfig>{}
            },
            "../services/theme": { 
                name: "theme", 
                class: fm.services.theme.Theme.name,
                config: <iThemeConfig>{
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

}