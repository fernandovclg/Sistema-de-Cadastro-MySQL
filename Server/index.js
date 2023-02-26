const express = require("express")
const app = express()
const cors = require("cors")

const mysql = require("mysql")

const db = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"12345678",
    database:"banco_de_usuarios",
})

app.use(express.json());
app.use(cors())

app.listen(3001, ()=>{
    console.log("rodando na porta 3001")
})

app.get('/',(req,res)=>{
    console.log("request recebido")
    db.query("INSERT INTO `banco_de_usuarios`.`users` (`name`, `email`, `password`) VALUES ('userteste', 'user@email.com', 'senha');",
    (err,result)=>{
        if(err){
            console.log(err)
        }
    })
})
app.post('/register',(req,res)=>{
    console.log("request de registro recebido")

    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const gender= req.body.gender


    db.query("SELECT * FROM `banco_de_usuarios`.`users` WHERE email='"+email+"';",
    (err,response)=>{
        if(err){
            console.log("erros")
            console.log(err)
        }
        if(!!response.length){
            res.send({msg:"email já cadastrado, tente outro"})
        }
        else{
            db.query("INSERT INTO `banco_de_usuarios`.`users` (`name`, `email`, `password`,`gender`) VALUES ('"+name+"', '"+email+"', '"+password+"', '"+gender+"');",
            (err,response2)=>{
                if(err){
                    console.log(err)
                }
                res.send({msg:"usuario cadastrado com sucesso"})
            })
        }
    })
})


app.post('/login',(req,res)=>{
    console.log("request de login recebido")

    const email = req.body.email
    const password = req.body.password
    console.log("email => "+email )
    db.query("SELECT * FROM `banco_de_usuarios`.`users` WHERE email='"+email+"' and password = '"+password+"';",
    (err,response)=>{
        if(err){
            console.log("erros")
            console.log(err)
        }
        
        res.send(response)
        console.log("result => ")
        console.log(response)
    })
})