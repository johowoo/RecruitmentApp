const express=require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const app=express();
const model = require('./model')
const Chat = model.getModel('chat');
const path =require('path');

//cooperate with express
const server=require('http').Server(app);
const io=require('socket.io')(server);
//
// Chat.remove({},(err,doc)=> {
//     console.log(doc);
// })
io.on('connection',function(socket){//socket is the current connection,while io is the global
    console.log('socket.io user login')
    socket.on('sendMsg',function(data){
        const {from, to, msg} = data;
        const create_time=new Date().getTime();
        const chat_id = [from,to].sort().join('_');
        Chat.create({chat_id,from,to,'content':msg,create_time},function(err,doc){
            io.emit('recvMsg', Object.assign({},doc._doc))
        })
    })
})


const userRouter =require('./user.js');

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',userRouter);


// app.use(function(req,res,next){
//     if(req.url.startsWith('/user/')||req.url.startsWith('/static/')){
//         return next();
//     }
//     return res.sendFile(path.resolve('build/index.html'));
// })
// app.use('/',express.static(path.resolve('build')));

server.listen(9093,function(){
    console.log('Node app start at port 9093');
})