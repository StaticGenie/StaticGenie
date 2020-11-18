
export interface iThemeConfigData {
    title: string;
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