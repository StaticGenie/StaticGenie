import * as fm from "../framework";

/**
 * Plugin
 * @TODO
 */
export default class implements fm.plugins.iPlugin {

    /**
     * Update the model, check config, etc
     * @param services
     * @param config 
     */
    initialise(services:fm.services.Services, config:fm.plugins.iConfig) {
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

        */

    }

    /**
     * Generate pages
     * @param services 
     * @param config 
     */
    generate(services:fm.services.Services, config:fm.plugins.iConfig) {
        
        // Generate the blog post pages



    }

}