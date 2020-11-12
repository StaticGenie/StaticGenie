import * as fm from "../framework";

/**
 * Plugin
 */
export default class implements fm.plugins.iPlugin {

    initialise(services:fm.services.Services, config:fm.plugins.iConfig) {
        services.get("model").data.title = "StaticGenie";
        services.get("model").data.author = {
            name: "Scott",
            location: "Earth",
            alias: "ScottyCoder"
        };
    }

    generate(services:fm.services.Services, config:fm.plugins.iConfig) {

        console.log(services.get("model").data);

        // Get location of pages from config

        // Parse a pages markdown/yaml/etc

        // Render the page (via theme layout service)

        // Output page (service)

        // Report (service)

        // Debug info? (service)
        
    }

}