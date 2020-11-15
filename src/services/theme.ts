import {iService, iConfigService, Services} from "../libs/services";
import * as ejs from "ejs";
import {Model} from "./model";

export interface iTheme {
    renderLayout(layout:string, data:{[key: string] : any}): string;
    render(template:string, data:{[key: string] : any}): string;
}

interface iThemeConfig extends iConfigService {
    data: {[key: string] : any};
}

abstract class Theme implements iService, iTheme {

    /**
     * @TODO this is UGLY due to not using the constructor to setup the objects. As a result, they have to be initialised here. This sucks.
     */
    protected config:iThemeConfig = {options: {}, data: {}};
    protected model:{[key:string] : any} = {};

    /**
     * @TODO the usage of services results in a dependency around the order the services are registered (this sucks)
     * 
     * @param services 
     * @param config 
     */
    initialise(services:Services, config:iThemeConfig) {
        this.config = config;
        this.model = <Model>services.get("model").data;
    }

    abstract renderLayout(layout:string, data:{[key:string] : any}) : string;
    abstract render(template:string, data:{[key:string] : any}) : string;

    pluginsInitialised() {

    }

    pluginsGenerated() {
    
    }

}

export class ThemeEJS extends Theme {

    /**
     * Renders a layout using the data
     * @TODO create a consistent model structure to pass the EJS
     * @param layout 
     * @param data 
     */
    renderLayout(layout:string, data:{[key:string] : any}) : string {
        
        // Lookup layout
        


        // Parse layout


        // Return the parsed layout
        return "";

    }
    
    /**
     * Renders a template using the data model
     * @TODO create a consistent model structure to pass the EJS
     * @param template 
     * @param data 
     */
    render(template:string, data:{[key:string] : any}) : string {

        // Parse template
        return ejs.render(template, {
            theme: this.config.data,    // theme config data
            model: this.model,
            page: data,                 // data used to render this specific page/layout
        });
        
    }

}

export interface iThemeEJSConfig extends iThemeConfig {

}