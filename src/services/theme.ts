import {iService, iConfigService} from "../libs/services"
import * as ejs from "ejs";

export interface iTheme {
    renderLayout(layout:string, data:{[key: string] : any}): string;
    render(template:string, data:{[key: string] : any}): string;
}

interface iThemeConfig extends iConfigService {
    data: {[key: string] : any};
}

abstract class Theme implements iService, iTheme {

    protected config:iThemeConfig = {options: {}, data: {}};

    initialise(config:iThemeConfig) {
        this.config = config;
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
            // model: ?                 // @TODO pull in the model from the model service. Otherwise, for example, if there was a tags panel as often is the case in blogs, this would have no way of globally getting into each layout (bloating the "page" data)
            page: data,                 // data used to render this specific page/layout
        });
        
    }

}

export interface iThemeEJSConfig extends iThemeConfig {
    
}