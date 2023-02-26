import Header from "../components/Header"

import {useForm} from "react-hook-form"
import "./Login.css"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import axios from "axios";
import { useState } from "react";


const Login = (props)=>{

    //variaveis
    const [warnings,setWarnings] = useState("")

    const schema = yup.object({
        email: yup.string().email().required("Campo obrigatório"),
        password: yup.string().required("Campo obrigatório").min(6, "minimo de 6 caracteres"),
      }).required();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (userData)=>{
        console.log(userData)
        axios.post("http://localhost:3001/login",{
            email: userData.email,
            password: userData.password,
        }).then((response)=>{

            const msgs = {
                "email não encontrado":()=>{
                    setWarnings(response.data.msg)
                },
                "senha incorreta":()=>{
                    setWarnings(response.data.msg)
                },
                "usuário logado com sucesso":()=>{
                    props.setUser(response.data)
                    props.setTela("homepage")
                },
                "defalt":()=>{console.log("caiu no default")},
            }
            msgs[response.data.msg || "default" ]()
        })
    }


    return(<>
    <Header headerText="Login" subText="salve suas informações com a gente"/>
                  <div className='bodyContainer'>

        <form className="formContainer" 
              onSubmit={ handleSubmit((onSubmit))}>

          <label>
            Email
            <input {...register("email")} type="text" />
            <span>{errors.email?.message}</span>
          </label>

          <label>
            Password
            <input {...register("password")} type="password" />
            <span>{errors.password?.message}</span>
          </label>


          <span>{warnings}</span>
          <button type="submit">Login</button>
        </form>
        <span className="link" onClick={()=>props.setTela("register")}>Ainda não possui cadastro?</span>
        </div>
    </>)
}

export default Login