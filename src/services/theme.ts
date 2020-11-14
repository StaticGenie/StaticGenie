import {iService, iConfigService} from "../libs/services"

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
     * @param layout 
     * @param data 
     */
    renderLayout(layout:string, data:{[key:string] : any}) : string {
        
        // Lookup layout



        // Merge theme data into local data


        // Parse layout with the merged data


        // Return the parsed layout
        return "";

    }

    /**
     * Renders a template using the data model
     * @param template 
     * @param data 
     */
    render(template:string, data:{[key:string] : any}) : string {


        // Merge theme data into local data


        // Parse template with the merged data


        // Return the parsed layout
        return "";

    }

}

export interface iThemeEJSConfig extends iThemeConfig {
    
}