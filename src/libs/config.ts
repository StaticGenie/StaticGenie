export interface iAppConfigPlugin {
    name: string;
    file: string;
    conf: { [key: string]: string; };
}

export interface iAppConfigTheme {
    name: string;
    files: string[];
    conf: { [key: string]: string; };
}

export interface iAppConfigDebug {

    /**
     * The current area of the framework being executed (recommended to only have on for framework/plugin developers)
     */
    showLifeCycle: boolean;
    
    /**
     * Warnings such as files not found, timeouts, etc
     */
    showWarnings: boolean;
    
    /**
     * When a URL is generated, will show the status of it (from cache, new, etc)
     */
    showGeneratedUrls: boolean;

}

export interface iAppConfig {

    /**
     * Where the generated website will be placed
     */
    outputDir: string;

    /**
     * Registered plugins
     */
    plugins: iAppConfigPlugin[];

    /**
     * Registered themes
     */
    themes: iAppConfigTheme[];
    
}
