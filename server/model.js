const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/joe';
mongoose.connect(DB_URL);
const models = {
    user: {
        'user': {type:String,require:true},
        'pwd': {type:String,require:true},
        'type': {type:String,require:true},
        'objective': {type:String},
        'resume': {type:String},
        'avatarName': {type:String},
        'desc': {type:String},
        'job': {type:String},
        'company': {type:String},
        'salary': {type:String},
        'resume': {type:String},
        'vacancy': {type:String},
        'requirement': {type:String},
    },
    chat:{
        'chat_id':{type:String,require:true},
        'from':{type:String,require:true},
        'to':{type:String,require:true},
        'read':{type:Boolean,default:false},
        'content':{type:String,require:true,default:''},
        'create_time':{type:Number,default:(new Date()).valueOf()}
    }
}

for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]));
}
module.exports= {
    getModel: name => mongoose.model(name)
}

