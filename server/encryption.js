const utils=require('utility');

function md5Pwd(pwd){
    //increase the complexity of the password by add string to its rear
    const salt='joexxx_@joexxx@jOExxxzoexxxx.@joe';
    //double-layer encryption
    return utils.md5(utils.md5(pwd+salt));

}
module.exports= {
    md5Pwd
}