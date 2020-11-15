import {iService, iConfigService, Services} from "../libs/services";
import * as ejs from "ejs";
import * as fs from "fs";


export interface iTheme {
    renderLayout(layout:string, data:{[key: string] : any}): string;
    render(template:string, data:{[key: string] : any}): string;
}

interface iThemeConfig extends iConfigService {
    data: {[key: string] : any};
}

abstract class Theme implements iService, iTheme {

    /**
     * @TODO this is UGLY due to not using the constructor to setup the objects. As a result, they have to be initialised here. This sucks - but so does handling constructor interfaces in TypeScript ><
     */
    protected config:iThemeConfig = {data: {}};
    protected services:Services = new Services();

    /**
     * Store the dependencies
     * @param services
     * @param config 
     */
    initialise(services:Services, config:iThemeConfig) {
        this.config = config;
        this.services = services;
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
     * @TODO setup EJS
     */
    constructor() {
        super();
    }

    /**
     * Renders a layout using the data
     * @TODO create a consistent model structure to pass the EJS
     * @param layout 
     * @param data 
     */
    renderLayout(layout:string, data:{[key:string] : any}) : string {
        return this.render(fs.readFileSync("./theme/layouts/" + layout + ".ejs").toString(), data);
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
            theme: this.config.data,                    // Theme config data
            model: this.services.get("model").data,     // The global model services data (updated via plugins during their init process)
            page: data,                                 // Data used to render this specific page/layout
        }, {
            root: "./theme/layouts",
        });
        
    }

}

export interface iThemeEJSConfig extends iThemeConfig {

}