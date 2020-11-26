/* ====================================================================
 * License: MIT
 * Website: https://staticgenie.com
 * Source: https://github.com/StaticGenie/StaticGenie
==================================================================== */

import {Services} from "./services";

/**
 * Configuration of a plugin (you will want to extend this with your plugin config)
 */
export interface iConfig {
    [key: string]: any;
}

/**
 * The plugin interface
 */
export interface iPlugin {

    /**
     * Init the plugin with minimal service providers
     * @param services service providers
     * @param config plugin config
     */
    initialise(services:Services, config:iConfig): void;

    /**
     * Generate web pages using the full range of service providers
     * @param services service providers
     * @param config plugin config
     */
    generate(services:Services, config:iConfig): void;
    
}