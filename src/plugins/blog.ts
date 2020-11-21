/* ====================================================================
 * License: MIT
 * Website: https://staticgenie.com
 * Source: https://github.com/StaticGenie/StaticGenie
==================================================================== */

import {iPlugin} from "../libs/plugins";
import {Services} from "../libs/services";
import {Plugin as StandardPage, iPluginConfig as iStandardPageConfig} from "./standardpage";
import {iGlobalModel} from "../services/globalmodel";
import * as helpers from "../libs/helpers";
import * as fs from "fs";
import * as slugify from "slugify";

/**
 * Plugin
 * @TODO sort out the pages plugin then finish this one.
 */
export class Plugin extends StandardPage implements iPlugin {

    /**
     * Update the model, check config, etc
     * @param services
     * @param config 
     */
    initialise(services:Services, config:iPluginConfig) {

        // Load the yaml section of each page to build the globl model
        const global = (<iGlobalModel>services.get("globalmodel")).model;

        // Ensure the keys all exist
        global.blog = {};
        global.blog.tags = {};

        // Find all the page defs
        helpers.getFilesSync("./data/blog").forEach(file => {
            try {
                
                // Read the file contents into document
                let documentRaw = fs.readFileSync(file, 'utf8');

                // Find the delimiter position
                let position = this.findDelimiterPosition(documentRaw);
                
                // Extract yaml head
                let documentYaml = this.extractYaml(documentRaw, position);

                // Verify structure
                


                
                // Move data from config


                // The URL taken from title
                // @TODO URL format should come from config
                // new Date(documentYaml.config.date + "T" + documentYaml.config.time)
                console.log(slugify.default("/blog/2020-11-19/" + documentYaml.config.title, {lower:true, strict: true}))


                //global.data.blog.tags[] = []
                
            } catch (e) {

                // @TODO

            }

        });

        /*

        compile and share these globally so all pages of the theme can use it

        global.blog.urls = {};
        global.blog.categories.alphabetical = [];
        global.blog.categories.popular = [];
        global.blog.tags.alphabetical = [];
        global.blog.tags.popular = [];
        global.blog.dates.yearly.newest = [];
        global.blog.dates.yearly.oldest = [];
        global.blog.dates.monthly.newest = [];
        global.blog.dates.monthly.oldest = [];

        need to prebuild the page urls so they can be linked directly to the relevant tags, etc. Allow the full post to be linked directly to each tag

        */

    }

    /**
     * Generate pages
     * @param services 
     * @param config 
     */
    generate(services:Services, config:iPluginConfig) {
        
        // Write the global pages

            // Post Index By Date


            // Browse Tags


        // Generate the blog post pages /posts/post-title-here.html

            // Allow config to specify a different URL structure

            



        







    }

}

interface iPluginConfig extends iStandardPageConfig {

}