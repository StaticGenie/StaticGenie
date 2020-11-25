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
import {iGlobalModel} from "../services/globalmodel";
import {iSGDocumentObject, SGDocument} from "../libs/sgdocument";
import * as helpers from "../libs/helpers";
import * as fs from "fs";
import * as slugify from "slugify";
import * as path from "path";

/**
 * Plugin
 * @TODO Finish the blog plugin
 * @TODO Add config params
 */
export class Plugin implements iPlugin {

    /**
     * Update the model, check config, etc
     * @param services
     * @param config 
     */
    initialise(services:Services, config:iPluginConfig) {

        const gm = (<iGlobalModel>services.get("globalmodel")).model;

        // Define the blog keys that will be populated
        gm.blog = {
            tags: {
                alphabetical: {},
                popular: {}
            },
            dates: {
                newtest: {},
                yearly: {},
                monthly: {}
            },
            authors: {
                popular: {},
                date: {}
            }
        };
        
        // Find all the blog posts
        // @TODO get the file location from the config
        helpers.getFilesSync("./data/blog").forEach(file => {
            try {
                
                // Read the file contents into document but only parse the head section (since the parsed markdown could use up a lot of memory if stored within the globalmodel so best to get and parse it if needed)
                let document = (new SGDocumentBlogPage(fs.readFileSync(file, 'utf8')).exportHead()).config;
                
                // @TODO apparently date and time fields are not being parsed as strings... ?
                //console.log(document);


                // Create an object that will represent a post.
                let post = new Post();
                post.date = new Date(document.post.date +"T"+ document.post.time); 
                post.title = document.post.title;
                post.desc = document.post.desc;
                post.tags = document.post.tags;
                post.url = "/blog/" + document.post.date + "/" + slugify.default(document.post.title, {lower:true, strict: true}); //@TODO allow this to be customised via the plugin config
                post.author = document.post.author;
                post.file = file;


                // Extract the tags and assign to the global model
                (<string[]>document.post.tags).forEach(tag => {
                    
                    // Does the tag already exist, if not, create it
                    if (gm.blog.tags.alphabetical.hasOwnProperty(tag) === false) {
                        gm.blog.tags.alphabetical[tag] = [];    
                    }

                    // Add the post to this tag
                    gm.blog.tags.alphabetical[tag].push(post);

                });


                
                // Move data from config


                // The URL taken from title
                // @TODO URL format should come from config
                // new Date(documentYaml.config.date + "T" + documentYaml.config.time)
                


                //global.data.blog.tags[] = []
                
            } catch (e) {

                // @TODO
                throw e;

            }

        });

    }
    
    /**
     * Generate pages
     * @param services 
     * @param config
     */
    generate(services:Services, config:iPluginConfig) {

        const gm = (<iGlobalModel>services.get("globalmodel")).model.blog;
        console.log(gm);

        // Create the general pages
            // Index (page.post .... )
            // By Tags
            // By Date
            // By Author
            // 

        /*

        // Services
        const pages = <iPageWriter>services.get("pagewriter");
        const theme = <iTheme>services.get("theme");
        const report = <iReport>services.get("report");

        // Find all the page defs
        helpers.getFilesSync("./data/standardpage").forEach(file => {
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
        */

        
        

    }

}

interface iPost {
    title:string;
    desc:string;
    url:string;
    author:string;
    tags:string[];
    date:Date;
    file:string; // Gives you the ability to later load and parse the raw file to get any information you need
}

class Post implements iPost {
    date:Date = new Date();
    title:string = "";
    desc:string = "";
    url:string = "";
    author:string = "";
    tags:string[] = [];
    file:string = "";
}

/**
 * Understands how to parse & verify Blog Pages
 */
class SGDocumentBlogPage extends SGDocument {

    /**
     * Verify the document contains the expected fields on config.* & page.*
     * @param document 
     */
    protected verifyDocument(document: iSGDocumentObject) : void {

        // Check required fields exist
        if (document.hasOwnProperty("config") === false) throw new Error(`Does not contain a "config" property`);
        if (document.config.hasOwnProperty("layout") === false) throw new Error(`Does not contain a "config.file" property`);
        
        // If this field doesn't exist, make sure it does now
        if (document.hasOwnProperty("page") === false) {
            document.page = {};
        }

        // These keys should NOT already exist as it's reserved for the parsed body sections content to be added later
        if (document.page.hasOwnProperty("content") === true) {
            throw new Error("You can not define your own 'page.content' key in the page head section as it's reserved for the main documents (body) content to occupy when parsed.");
        }

        // Reserved for the generated post data such as author, date, etc
        if (document.page.hasOwnProperty("post") === true) {
            throw new Error("You can not define your own 'page.post' key in the page head section as it's reserved for use by the blog plugin to make computed values available to themes.");
        }

    }

}

/**
 * Configuration for this plugin
 */
export interface iPluginConfig extends iConfig {

}
