
export interface iThemeConfigData {
    title: string;
    docs: iToc;
    socialLinks: iLink[];
    headerLinks: iLink[];
    footerLinks: iLink[];
    copyright: string;
}

interface iLink {
    name: string;
    url: string;
    image?: string;
}

interface iToc {
    [key: string] : { [key: string] : string } // {"Heading": {"Page Name" : "URL"}} Nest as many as you like
}