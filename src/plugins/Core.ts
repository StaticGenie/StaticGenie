import {Models} from "../libs/models";
import {Services} from "../libs/services";
import {Generators} from "../libs/generators";
import {iAppConfigPlugin} from "../libs/config";
import {iPlugin} from "../libs/plugins";

export class CorePlugin implements iPlugin {

    /**
     * Official name of this plugin
     */
    name() : string {
        return "staticgenie::core"
    }

    /**
     * Injects its models, generators and services into the app
     */
    initialise(models:Models, generators:Generators, services:Services) {
        


    }

    /**
     * Create and return the services/models/generators that make up this plugin
     * @param config 
     */
    build(config:iAppConfigPlugin) {
        
    }

}