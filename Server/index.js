const express = require("express")
const app = express()
const cors = require("cors")

const bcrypt = require("bcrypt")
const saltRounds = 10

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
})


app.post('/register',(req,res)=>{
    console.log("request de registro recebido")

    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const gender= req.body.gender


    const queryFunction = (password)=>{ 
        
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
    }

    bcrypt.hash(password,saltRounds,(err,hash)=>{
        if(err) console.log(err)
        console.log("hash")
        console.log(hash)
        queryFunction(hash)
    })
})


app.post('/login',(req,res)=>{
    console.log("request de login recebido")

    const email = req.body.email
    const password = req.body.password
    

    db.query("SELECT * FROM `banco_de_usuarios`.`users` WHERE email='"+email+"';",
    (err,response)=>{
        const user = response[0]
        if(err){
            console.log(err)
        }
        if(!user){
            res.send({msg:"email não encontrado"})
        }
        else{
            bcrypt.compare(password,user.password,(err,resultado)=>{
                if(err) console.log(err)
                if(!resultado){
                    res.send({msg:"senha incorreta"})
                }
                else{
                    res.send({...user , msg: "usuário logado com sucesso"})
                }
            })
        }
        
    })

})