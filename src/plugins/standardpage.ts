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
import * as helpers from "../libs/helpers";
import * as yaml from "js-yaml";
import * as fs from "fs";
import * as markdown from "markdown-it";

/**
 * Plugin
 * @TODO break out this functionality into libs/ class. Then allow the blog plugin to use it. Would also allow much better unit testing.
 */
export class Plugin implements iPlugin {

    protected delimiter:string = "\n====="; // Windows CRLF will still work with this (don't put a trailing \n in the delimiter) 

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
        helpers.getFilesSync("./data/standardpage").forEach(file => {
            try {
                
                // Read the file contents into document
                let documentRaw = fs.readFileSync(file, 'utf8');

                // Find the delimiter position
                let position = this.findDelimiterPosition(documentRaw);
                
                // Extract yaml head
                let documentYaml = this.extractYaml(documentRaw, position);

                // Verify structure
                this.verifyConfig(documentYaml);
                this.verifyPage(documentYaml);

                // Extract markdown body
                documentYaml.page.content = this.extractMarkdown(documentRaw, position);

                // Write the page
                pages.write(documentYaml.config.file, theme.renderLayout(documentYaml.config.layout, documentYaml.page));
                
            } catch (e) {

                // Couldn't create the page, so report it
                report.add(file, e.toString());

            }

        });

    }

    protected findDelimiterPosition(document:string, delimiter:string = this.delimiter){
        let position = document.indexOf(delimiter);
        if (position === -1) {
            throw new Error(`Couldn't find the delimiter '${delimiter}' that separates the yaml from the markdown`);
        }
        return position;

    }

    protected extractYaml(document:string, position:number) : iYamlObject  {
        return <iYamlObject>yaml.safeLoad(document.slice(0, position).trim());
    }

    protected verifyConfig(yamlObject: iYamlObject) {

        // Check required fields exist
        if (yamlObject.hasOwnProperty("config") === false) throw new Error(`Does not contain a "config" property`);
        if (yamlObject.config.hasOwnProperty("file") === false) throw new Error(`Does not contain a "config.file" property`);
        if (yamlObject.config.hasOwnProperty("layout") === false) throw new Error(`Does not contain a "config.layout" property`);
        
        // If this field doesn't exist, make sure it does now
        if (yamlObject.hasOwnProperty("page") === false) {
            yamlObject.page = {};
        }

    }

    protected verifyPage(yamlObject: iYamlObject) {

        // These keys should NOT already exist as it's reserved for the parsed content section
        if (yamlObject.page.hasOwnProperty("content") === true) {
            throw new Error("You can not define your own 'page.content.raw' key in the page head section as it's reserved for the main documents content to occupy.");
        }

    }

    protected extractMarkdown(document:string, position:number) : string {

        // Markdown parser
        let md = new markdown.default({
            html: true,
            linkify: true,
            typographer: true
        });

        // Extract and parse Markdown
        return md.render(document.slice(position + this.delimiter.length).trim());
        
    }



}

export interface iYamlObject{
    [key:string]:any
}

export interface iPluginConfig extends iConfig {

}