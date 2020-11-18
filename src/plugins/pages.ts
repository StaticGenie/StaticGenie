import {iPlugin, iConfig} from "../libs/plugins";
import {Services} from "../libs/services";
import {iPageWriter} from "../services/pagewriter";
import {iTheme} from "../services/theme";
import {iReport} from "../services/report";
import * as helpers from "../libs/helpers";
import * as yaml from "js-yaml";
import * as fs from "fs";

/**
 * Plugin
 */
export class Plugin implements iPlugin {

    /**
     * Update the model, check config, etc
     * @param services
     * @param config 
     */
    initialise(services:Services, config:iPluginConfig) {

    }
    
    /**
     * Generate pages
     * @param services 
     * @param config
     */
    generate(services:Services, config:iPluginConfig) {

        // Services
        const pages = <iPageWriter>services.get("pagewriter");
        const theme = <iTheme>services.get("theme");
        const report = <iReport>services.get("report");

        // Find all the yaml files
        helpers.getFilesSync("./data/pages").forEach(file => {
            
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

export interface iPluginConfig extends iConfig {

}