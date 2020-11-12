import * as fm from "../framework";

/**
 * Plugin
 */
export default class implements fm.plugins.iPlugin {

    /**
     * Update the model, check config, etc
     * @param services
     * @param config 
     */
    initialise(services:fm.services.Services, config:fm.plugins.iConfig) {
        services.get("model").data.title = "StaticGenie";
        services.get("model").data.author = {
            name: "Scott",
            location: "Earth",
            alias: "ScottyCoder"
        };

        //@TODO Can register a new service provider... not recommended (may create a dependency on the order the plugins are executed) but a possible way of creating plugin based service providers given only the plugin generators use it :/ maybe providing the actual services plugin isn't the best idea here... Mabe provide another method here to explicitly register service providers?

    }

    /**
     * Generate pages
     * @param services 
     * @param config 
     */
    generate(services:fm.services.Services, config:fm.plugins.iConfig) {

        console.log(services.get("model").data);

        const report = <fm.services.Report>services.get("report");
        report.add("/index.html");
        report.add("/about.html");
        report.add("/contact.html");

        // Get location of pages from config

        // Parse a pages markdown/yaml/etc

        // Render the page (via theme layout service)

        // Output page (service)

        // Report (service)

        // Debug info? (service)
        
    }

}