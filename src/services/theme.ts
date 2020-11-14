import {iService, iConfigService} from "../libs/services"

export interface iTheme {
    renderLayout(layout:string, data:{[key: string] : any}): string;
    render(template:string, data:{[key: string] : any}): string;
}

abstract class Theme implements iService, iTheme {

    protected config:iConfigService = {};

    /**
     * Initialise using provided config
     * @param config 
     */
    initialise(config:iConfigService) {
        this.config = config;
    }

    pluginsInitialised() {

    }

    pluginsGenerated() {
    
    }

    abstract renderLayout(layout:string, data:{[key:string] : any}) : string;
    abstract render(template:string, data:{[key:string] : any}) : string;

}

export class ThemeEJS extends Theme {

    /**
     * Renders a layout using the data
     * @param layout 
     * @param data 
     */
    renderLayout(layout:string, data:{[key:string] : any}) : string {

        return "";

    }

    /**
     * Renders a template using the data model
     * @param template 
     * @param data 
     */
    render(template:string, data:{[key:string] : any}) : string {

        return "";

    }

}