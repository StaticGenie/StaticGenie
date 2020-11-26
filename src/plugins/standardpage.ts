/* ====================================================================
 * License: MIT
 * Website: https://staticgenie.com
 * Source: https://github.com/StaticGenie/StaticGenie
==================================================================== */

import {iPlugin, iConfig} from "../libs/plugins";
import {Services} from "../libs/services";
import {iPageWriter} from "../services/pagewriter";
import {iTheme} from "../services/theme";
import {iReport} from "../services/report";
import {iSGDocumentObject, SGDocument} from "../libs/sgdocument";
import * as helpers from "../libs/helpers";
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

        // Find all the page defs
        helpers.getFilesSync(config.directory).forEach(file => {
            try {
                
                // Read the file contents into document
                let document = new SGDocumentStandardPage(fs.readFileSync(file, 'utf8')).export()

                // Write the page
                pages.write(document.config.file, theme.renderLayout(document.config.layout, document.page));
                
            } catch (e) {

                // Couldn't create the page, so report it
                report.add(file, e.toString());

            }

        });

    }

}

/**
 * Understands how to parse & verify Standard Pages
 */
class SGDocumentStandardPage extends SGDocument {

    /**
     * Verify the document contains the expected fields on config.* & page.*
     * @param document 
     */
    protected verifyDocument(document: iSGDocumentObject) : void {

        // Check required fields exist
        if (document.hasOwnProperty("config") === false) throw new Error(`Does not contain a "config" property`);
        if (document.config.hasOwnProperty("file") === false) throw new Error(`Does not contain a "config.file" property`);
        if (document.config.hasOwnProperty("layout") === false) throw new Error(`Does not contain a "config.layout" property`);
        
        // If this field doesn't exist, make sure it does now
        if (document.hasOwnProperty("page") === false) {
            document.page = {};
        }

        // These keys should NOT already exist as it's reserved for the parsed body sections content to be added later
        if (document.page.hasOwnProperty("content") === true) {
            throw new Error("You can not define your own 'page.content' key in the page head section as it's reserved for the main documents (body) content to occupy when parsed.");
        }

    }

}

/**
 * Configuration for this plugin
 */
export interface iPluginConfig extends iConfig {
    directory: string;
}
