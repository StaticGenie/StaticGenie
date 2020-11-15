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

        services.get("model").data.title = "StaticGenie";

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
        const pages = <fm.services.pagewriter.iPageWriter>services.get("pagewriter");
        const theme = <fm.services.theme.iTheme>services.get("theme");
        
        // Write the page
        pages.write("hello/index.html", theme.render("Index: <%= model.title %><br />Hello <%= page.name %><br /><%- theme.copyright %>", {name: "ScottyCoder"}));

    }

}