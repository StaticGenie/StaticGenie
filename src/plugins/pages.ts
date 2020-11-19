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
 */
export class Plugin implements iPlugin {

    private delimiter = "\n====="; // Windows CRLF will still work with this (don't put a trailing \n in the delimiter) 

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
        helpers.getFilesSync("./data/pages").forEach(file => {
            
            // Split the file at the delimiter
            try {
                
                // Read the file contents into document
                let documentRaw = fs.readFileSync(file, 'utf8');

                // Find the deimiter position
                let position = documentRaw.indexOf(this.delimiter);
                if (position === -1) {
                    throw new Error(`Coudln't find the delimiter '${this.delimiter}' that separates the yaml from the markdown`);
                }

                // Extract and parse YAML
                let documentYaml = <{[key:string]:any}>yaml.safeLoad(documentRaw.slice(0, position).trim());
                
                // Check required fields exist
                if (documentYaml.hasOwnProperty("config") === false) throw new Error(`${file} does not contain a "config" property`);
                if (documentYaml.config.hasOwnProperty("file") === false) throw new Error(`${file} does not contain a "config.file" property`);
                if (documentYaml.config.hasOwnProperty("layout") === false) throw new Error(`${file} does not contain a "config.layout" property`);

                // Optional fields, just make sure their keys exist as a minimum (but can create them)
                if (documentYaml.hasOwnProperty("page") === false) {
                    documentYaml.page = {};
                }
                if (documentYaml.page.hasOwnProperty("content") === false) {
                    documentYaml.page.content = {};
                }
                if (documentYaml.page.content.hasOwnProperty("parsed") === true) {
                    throw new Error("You can not define your own 'page.content.raw' key in the page header as it's reserved for the main documents content to occupy.");
                }
                if (documentYaml.page.content.hasOwnProperty("raw") === true) {
                    throw new Error("You can not define your own 'page.content.raw' key in the page header as it's reserved for the main documents content to occupy.");
                }

                // Extract and parse Markdown, assign to page object
                let documentMarkdown = documentRaw.slice(position + this.delimiter.length).trim();
                let md = new markdown.default({
                    html: true,
                    linkify: true,
                    typographer: true
                });
                documentYaml.page.content.raw = documentMarkdown;
                documentYaml.page.content.parsed = md.render(documentMarkdown);
                
                // Write the page
                pages.write(documentYaml.config.file, theme.renderLayout(documentYaml.config.layout, documentYaml.page));
                
            } catch (e) {

                // Couldn't create the page
                report.add(file, e.toString());

            }

        });

    }

}

export interface iPluginConfig extends iConfig {

}