export class Themes {

    load(config:iConfig[]) {

    }

}

export interface iConfig {
    name: string;
    files: string[];
    conf: { [key: string]: string; };
}
