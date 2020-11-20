/* ====================================================================
 * License: MIT
 * Website: https://staticgenie.com
 * Source: https://github.com/StaticGenie/StaticGenie
==================================================================== */

import {iService, iConfigService, Services} from "../libs/services";
import * as ejs from "ejs";
import * as fs from "fs";

/**
 * Theme interface
 */
export interface iTheme {

    /**
     * A shortcut method that knows where to pick the layout from StaticGenie
     * @param layout layout as string data
     * @param data the model to use with the layout
     * @returns the rendered layout
     */
    renderLayout(layout:string, data:{[key: string] : any}): string;

    /**
     * Renders a string and sets the partials directory
     * @param template string
     * @param data the model to use with the template
     * @returns the rendered template
     */
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

    /**
     * Service provider access
     */
    protected services:Services = new Services();

    /**
     * Store the dependencies
     * @param services
     * @param config 
     */
    initialise(services:Services, config:iThemeConfig) {

        // Save theme config & data model
        this.config = config;
        
        // Freeze config to make debugging easier and remove the choice of plugins being able to change too much
        Object.freeze(this.config);
        
        // Save services so we can get the global model data
        this.services = services;

    }

    /**
     * When plugins have all initialised
     */
    pluginsInitialised() {
        // Nothing to do when his happens
    }

    /**
     * When plugins have generated all their pages
     */
    pluginsGenerated() {
        // Nothing to do when this happens
    }

    abstract renderLayout(layout:string, data:{[key:string] : any}) : string;
    abstract render(template:string, data:{[key:string] : any}) : string;

}

/**
 * EJS Template Engine
 */
export class ThemeEJS extends Theme {

    /**
     * Renders a layout using the data
     * @param layout layout as string data
     * @param data the model to use with the layout
     * @returns the rendered layout
     */
    renderLayout(layout:string, data:{[key:string] : any}) : string {
        return this.render(fs.readFileSync("./theme/layouts/" + layout + ".ejs").toString(), data);
    }
    
    /**
     * Renders a template using the data model
     * @param template string
     * @param data the model to use with the template
     * @returns the rendered template
     */
    render(template:string, data:{[key:string] : any}) : string {

        // Parse template
        return ejs.render(template, {
            theme: this.config.data,                            // Theme config data - frozen
            global: this.services.get("globalmodel").model,     // The global model services data (updated via plugins during their init process) - frozen
            page: data,                                         // Data used to render this specific page/layout and can change between each render
        }, {
            root: "./theme/partials",
        });
        
    }

}

/**
 * EJS Specific Config
 */
export interface iThemeEJSConfig extends iThemeConfig {

}