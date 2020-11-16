import * as fm from "../framework";
import * as yaml from "js-yaml";
import * as fs from "fs";

/**
 * Plugin
 */
export class Plugin implements fm.plugins.iPlugin {

    /**
     * Update the model, check config, etc
     * @param services
     * @param config 
     */
    initialise(services:fm.services.Services, config:fm.plugins.iConfig) {

        //services.get("model").data.title = "StaticGenie";

        //@TODO Can register a new service provider... not recommended (may create a dependency on the order the plugins are executed) but a possible way of creating plugin based service providers given only the plugin generators use it :/ maybe providing the actual services plugin isn't the best idea here... Mabe provide another method here to explicitly register service providers?

    }
    
    /**
     * Generate pages
     * @param services 
     * @param config
     */
    generate(services:fm.services.Services, config:fm.plugins.iConfig) {

        // Services
        const pages = <fm.services.pagewriter.iPageWriter>services.get("pagewriter");
        const theme = <fm.services.theme.iTheme>services.get("theme");
        const report = <fm.services.report.iReport>services.get("report");

        // Find all the yml files
        fm.helpers.getFilesSync("./data/pages").forEach(file => {
            
            // Parse the yaml
            try {
                
                // Parse the yaml file
                let page:any = yaml.safeLoad(fs.readFileSync(file, 'utf8'));

                // Check required fields exist
                if (page.hasOwnProperty("config") === false) throw new Error(`${file} does not contain a "config" property`);
                if (page.config.hasOwnProperty("file") === false) throw new Error(`${file} does not contain a "config.file" property`);
                if (page.config.hasOwnProperty("layout") === false) throw new Error(`${file} does not contain a "config.layout" property`);

                // Optional fields, just make sure their keys exist as a minimum (but can create them)
                if (page.hasOwnProperty("theme") === false) {
                    page.theme = {};
                }
                if (page.hasOwnProperty("page") === false) {
                    page.page = {};
                }

                // Write the page
                pages.write(page.config.file, theme.renderLayout(page.config.layout, page.page));
                
            } catch (e) {

                // Couldn't create the page
                report.add(file, e.toString());

            }

        });

    }

}