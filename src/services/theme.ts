import {iService, iConfigService} from "../libs/services"

export interface iTheme {
    renderLayout(layout:string, data:{[key: string] : any}): void;
    render(template:string, data:{[key: string] : any}): void;
}

export class Theme implements iService, iTheme {

    private config:iConfigService = {};

    /**
     * Initialise using provided config
     * @param config 
     */
    initialise(config:iConfigService) {
        this.config = config;
    }

    /**
     * Renders a layout using the data
     * @param layout 
     * @param data 
     */
    renderLayout(layout:string, data:{[key:string] : any}) {

        

    }

    /**
     * Renders a template using the data model
     * @param template 
     * @param data 
     */
    render(template:string, data:{[key:string] : any}) {

    }

    pluginsInitialised() {

    }

    pluginsGenerated() {
    
    }

}