const encryption = require('./encryption');
const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter = {'pwd': 0, '__v': 0}
// const mongoose = require('mongoose');

// User.remove({user:'123'},function(err,doc){
//     console.log(doc);
// })
Router.get('/list', function (req, res) {
    const {type} = req.query;
    User.find({type}, function (err, doc) {
        return res.json({code: 0, data: doc})
    })
})
Router.get('/getmsglist', function (req, res) {
    const user = req.cookies.userid;
    User.find({}, function (e, userdoc) {
        let users = {}
        userdoc.forEach(v => {
            users[v._id] = {name: v.user, avatarName: v.avatarName}
        })
        Chat.find({'$or': [{from: user}, {to: user}]}, function (err, doc) {
            if (!err) {
                return res.json({code: 0, msgs: doc, users: users})
            }
        })
    })
})
Router.post('/readmsg', function (req, res) {
    const userid = req.cookies.userid;
    const {from} = req.body;
    // console.log('from',from);
    // console.log(userid,from);
    Chat.update(
        {from,to:userid},
        {'$set':{read:true}},
        {'multi':true},
        function(err,doc){
        console.log(doc);
        if(!err){
            return res.json({code:0,num:doc.nModified});
        }else{
            return res.json({code:1,msg:'error in modification'})
        }
    });
})
Router.post('/login', function (req, res) {
    const {user, pwd} = req.body
    User.findOne({user, pwd: encryption.md5Pwd(pwd)}, _filter, function (err, doc) {
        if (!doc) {
            return res.json({code: 1, msg: 'Username doesn\'t exist or Wrong password'})
        }
        res.cookie('userid', doc._id)
        return res.json({code: 0, data: doc})
    })
});

Router.post('/update',function(req,res){
    const userid = req.cookies.userid;
    if (!userid) {
        return json.dumps({code:1})
    }
    const body = req.body;
    console.log(body);
    User.findByIdAndUpdate(userid,body,function(err,doc){
        console.log(err);
        console.log(doc);
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,doc})
    })
})

Router.post('/register', function (req, res) {
    const {user, pwd, type} = req.body
    User.findOne({user}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: 'Username has been used'})
        }

        const userModel = new User({user, type, pwd: encryption.md5Pwd(pwd)})
        userModel.save(function (e, d) {
            if (e) {
                return res.json({code: 1, msg: 'Error occurred in server'})
            }
            const {user, type, _id} = d;
            res.cookie('userid', _id);
            return res.json({code: 0, data: {user, type, _id}})
        })
    })
})
Router.get('/info', function (req, res) {
    const {userid} = req.cookies
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: 'Error occurred in server'})
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }
    })
})


module.exports = Router