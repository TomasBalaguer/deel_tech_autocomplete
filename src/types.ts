export type Countries = {
    name: {
        common: string
    }
    cca2: string,
    flag?: string;
    capital?: string;
    coatOfArms:{
        png: string
    }
}

export type IData = {
    name: string;
    code: string;
    language?: string;
    flag?: string;
    capital?: string;
    coatOfArms?: string;
  }