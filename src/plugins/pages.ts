import * as fm from "../framework";

/**
 * Plugin
 */
export default class implements fm.plugins.iPlugin {

    /**
     * Official name of this plugin
     */
    name() : string {
        return "staticgenie::core"
    }

    /**
     * Injects its models, generators and services into the app
     */
    initialise(models:fm.models.Models, generators:fm.generators.Generators, services:fm.services.Services) {
        
    }

    /**
     * Create and return the services/models/generators that make up this plugin
     * @param config 
     */
    build(config:fm.plugins.iConfig) {
        
    }

}