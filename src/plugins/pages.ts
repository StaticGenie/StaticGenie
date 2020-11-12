import * as fm from "../framework";

/**
 * Plugin
 */
export default class implements fm.plugins.iPlugin {

    models() : fm.models.iBuilder[] {
        return [new Builder()];
    }

    generators() : fm.generators.iGenerator[] {
        return [new Generator()];
    }

}

class Builder implements fm.models.iBuilder {

    build(model: {[key: string] : any}) {
        model.title = "StaticGenie";
        model.date = "Today";
        model.author = {
            name: "Scott",
            location: "Earth",
            alias: "ScottyCoder"
        }
    }

}

class Generator implements fm.generators.iGenerator {
    
    /**
     * @TODO
     * @param model 
     */
    generate(model: {[key: string] : any}) {

        // Get location of pages from config

        // Parse a pages markdown/yaml/etc

        // Render the page (via theme layout service)

        // Output page (service)

        // Report (service)

        // Debug info? (service)
        
    }

}