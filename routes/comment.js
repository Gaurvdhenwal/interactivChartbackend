var express = require('express');
const Comment = require('../models/comment')
var router = express.Router();
// var io = require('socket.io');

router.post('/createComment',(req,res,next)=>{
    var io = req.app.get('socketio');
    console.log(req.body);
    let {from , fromData , to , toData , comment} = req.body;
    let com = new Comment({
        startDate:from,
        endData:toData,
        startData:fromData,
        endDate:to,
        comment:comment
    })
    com.save()
        .then((comment)=>{
            console.log(comment)
            io.emit('refreshComment', 'refresh')
            res.status(200).json({msg:'created',data:comment})

        },err=>{
            res.status(500)
            console.log('error in savinf comment',err)
        })
})

router.get('/getComment',(req,res,next)=>{
    Comment.find()
        .then(data=>{
            if(data != null){
                res.status(200).json({data:data})
            }
            else{
                res.status(200).json({data:[]});
            }
        })
})
module.exports = router;