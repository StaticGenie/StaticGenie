import {iPlugin} from "../libs/plugins";
import {Services} from "../libs/services";
import {Plugin as Pages, iPluginConfig as iPagesConfig} from "./pages";
import {iModel} from "../services/model";
import * as helpers from "../libs/helpers";
import * as fs from "fs";
import * as slugify from "slugify";

/**
 * Plugin
 * @TODO sort out the pages plugin then finish this one.
 */
export class Plugin extends Pages implements iPlugin {

    /**
     * Update the model, check config, etc
     * @param services
     * @param config 
     */
    initialise(services:Services, config:iPluginConfig) {

        // Load the yaml section of each page to build the globl model
        const model = <iModel>services.get("model");

        // Ensure the keys all exist
        model.data.blog = {};
        model.data.blog.tags = {};

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


                //model.data.blog.tags[] = []
                
            } catch (e) {

                // @TODO

            }

        });

        /*

        compile and share these globally so all pages of the theme can use it

        services.get("model").data.blog.urls = {};
        services.get("model").data.blog.categories.alphabetical = [];
        services.get("model").data.blog.categories.popular = [];
        services.get("model").data.blog.tags.alphabetical = [];
        services.get("model").data.blog.tags.popular = [];
        services.get("model").data.blog.dates.yearly.newest = [];
        services.get("model").data.blog.dates.yearly.oldest = [];
        services.get("model").data.blog.dates.monthly.newest = [];
        services.get("model").data.blog.dates.monthly.oldest = [];

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

interface iPluginConfig extends iPagesConfig {

}