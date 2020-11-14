import {iService, iConfig} from "../libs/services"

export class Theme implements iService {

    private config:iConfig = {};

    /**
     * Initialise using provided config
     * @param config 
     */
    initialise(config:iConfig) {
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