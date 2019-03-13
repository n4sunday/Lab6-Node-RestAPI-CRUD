const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')

let bears = [{id:1,name:'Winnie', weight:50}, 
             {id:2,name:'Pool', weight:70}, ]

app.use('/api',bodyParser.json(),router)       
app.use('/api',bodyParser.urlencoded({extended:false}),router)              

app.use('/api',router)

router.route('/bears')
    .get((req,res) =>
        res.send(bears)
    )
    .post((req,res) => {
        let bear = {}
        bear.id = bears.length+1
        bear.name = req.body.name
        bear.weight = req.body.weight
        bears.push( bear)
        res.send( bear )
        }
    )

router.route('/bears/:id')
        .get((req,res) =>{
            res.send(bears[ req.params.id-1])
        })
        .put((req,res) => {
            var id = req.params.id-1
            bears[id].name = req.body.name
            bears[id].weight = req.body.weight
            res.send(breas[id])
        })
        .delete((req,res) => {
            delete bears[req.params.id-1]
            res.send({ message: 'Bear deleted: ' + req.params.bear_id});
        })




app.listen(80, ()=> console.log('server ready'))