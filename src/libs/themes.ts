export class Themes {

    load(config:iConfig[]) : Themes {
        return this;
    }

}

export interface iConfig {
    data: { [key: string]: any; };
}
