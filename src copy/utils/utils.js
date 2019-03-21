export const getRedirectPath=({type,avatar,pageType})=>{
    console.log(type);
    let url=(type==='Boss')?'/boss':'/genius';
    if(pageType==='login'){
        return url;
    }
    if(!avatar){
        url+='/info';
    }
    return url;
}

export function getChatId(userId,targetId) {
    return [userId,targetId].sort().join('_');
}









