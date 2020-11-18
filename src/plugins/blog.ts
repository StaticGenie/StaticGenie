import {iPlugin, iConfig} from "../libs/plugins";
import {Services} from "../libs/services";

/**
 * Plugin
 * @TODO
 */
export class Plugin implements iPlugin {

    /**
     * Update the model, check config, etc
     * @param services
     * @param config 
     */
    initialise(services:Services, config:iConfig) {
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
    generate(services:Services, config:iConfig) {
        
        // Generate the blog post pages
        


    }

}