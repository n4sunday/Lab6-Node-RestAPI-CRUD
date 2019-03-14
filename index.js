const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')

let std = [{id:5935512004,name:'Nattapon',surname:'Lueakaew',Major:'CoE',GPA: 2.65}, 
{id:5935512023,name:'Niran',surname:'Sasuloh',Major:'CoE',GPA: 4.00}, ]

app.use('/api',bodyParser.json(),router)       
app.use('/api',bodyParser.urlencoded({extended:false}),router)              

app.use('/api',router)

router.route('/student')
    .get((req,res) =>
        res.send(std)
    )
    .post((req,res) => {
        let student = {}
        student.id = req.body.id
        student.name = req.body.name
        student.surname = req.body.surname
        student.Major = req.body.Major
        student.GPA = req.body.GPA
        std.push( student)
        res.send( std )
        }
    )

router.route('/student/:id')
        .get((req,res) =>{
            res.send(std[ req.params.id-1])
        })
        .put((req,res) => {
            var id = req.params.id-1
            std[id].name = req.body.name
            std[id].surname = req.body.surname
            std[id].Major = req.body.Major
            std[id].GPA = req.body.GPA

            res.send(std[id])
        })
        .delete((req,res) => {
            std = std.filter((item) => item.id != req.params.id)
            console.log(std);
            res.send(std)
        })




app.listen(80, ()=> console.log('server ready'))