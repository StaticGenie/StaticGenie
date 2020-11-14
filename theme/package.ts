import * as fm from "./../src/framework";

export interface iThemeOptions extends fm.services.theme.iThemeEJSConfigOptions {
    
}

export interface iThemeData {
    title: string;
    links: iLink[]
    copyright: string;
}

interface iLink {
    name: string;
    url: string;
}