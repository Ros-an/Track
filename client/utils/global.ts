export const firstLetterOfString = (text: string):string => {
    if(text){

        return text[0].toUpperCase();
    }
    return "";
}
export const splitStr = (text: string, basedOn: any): string[] | string => {
    if(text){
        return text.split(basedOn)
    }
    return text;
}