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

export const isAuthorised = ()=> {
    if(localStorage.getItem("user")){
        return true
    }
    return false;
}