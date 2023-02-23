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

    db.query("INSERT INTO `banco_de_usuarios`.`users` (`name`, `email`, `password`,`gender`) VALUES ('"+name+"', '"+email+"', '"+password+"', '"+gender+"');",
    (err,result)=>{
        if(err){
            console.log(err)
        }
    })
})