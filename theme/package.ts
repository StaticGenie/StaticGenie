export interface iThemeConfig {
    title: string;
    links: iLink[]
    copyright: string;
}

interface iLink {
    name: string;
    url: string;
}