import {iService, iConfigService} from "../libs/services"

export interface iTheme {
    renderLayout(layout:string, data:{[key: string] : any}): string;
    render(template:string, data:{[key: string] : any}): string;
}

export interface iThemeConfig extends iConfigService {
    options: {[key: string] : any};
    data: {[key: string] : any};
}

abstract class Theme implements iService, iTheme {

    abstract initialise(config:iConfigService) : void;
    abstract renderLayout(layout:string, data:{[key:string] : any}) : string;
    abstract render(template:string, data:{[key:string] : any}) : string;

    pluginsInitialised() {

    }

    pluginsGenerated() {
    
    }

}

export class ThemeEJS extends Theme {

    private config:iThemeEJSConfig;

    constructor() {
        super();
        this.config = {
            options: {},
            data: {},
        }
    }

    initialise(config:iThemeEJSConfig) {
        this.config = config;
    }

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

export interface iThemeEJSConfig extends iThemeConfig {
    options: iThemeEJSConfigOptions;
}

export interface iThemeEJSConfigOptions {
    
}