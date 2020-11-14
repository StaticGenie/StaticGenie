import * as fm from "../framework";

/**
 * Plugin
 */
export class Plugin implements fm.plugins.iPlugin {

    /**
     * Update the model, check config, etc
     * @param services
     * @param config 
     */
    initialise(services:fm.services.Services, config:fm.plugins.iConfig) {

        /*
        services.get("model").data.title = "StaticGenie";
        services.get("model").data.author = {
            name: "Scott",
            location: "Earth",
            alias: "ScottyCoder"
        };
        */

        //@TODO Can register a new service provider... not recommended (may create a dependency on the order the plugins are executed) but a possible way of creating plugin based service providers given only the plugin generators use it :/ maybe providing the actual services plugin isn't the best idea here... Mabe provide another method here to explicitly register service providers?

    }

    /**
     * Generate pages
     * @TODO
     * @param services 
     * @param config 
     */
    generate(services:fm.services.Services, config:fm.plugins.iConfig) {

        // Services
        const pages = <fm.services.pagewriter.PageWriter>services.get("pagewriter");
        const report = <fm.services.report.Report>services.get("report");
        
        // Write a page
        pages.write("hello.txt", Buffer.from("I'm a string!"));
        //pages.write("index.html", theme.renderLayout("home", {title: "hello"}));

        // Report the page
        report.add("hello.txt");
        
    }

}