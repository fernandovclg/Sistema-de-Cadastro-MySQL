import "./Register.css" //importando css
import Header from "../components/Header"

//importando as bibliotecas necessárias

import {useForm} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import Axios from "axios"
import { useState } from "react";


const Register = (props)=>{

    //variaveis
    const [warnings,setWarnings] = useState("warnings")

    //declarando restrições de preenchimento do formulario

    const schema = yup.object({
        name: yup.string().required("Campo obrigatório"),
        email: yup.string().email().required("Campo obrigatório"),
        password: yup.string().required("Campo obrigatório").min(6, "minimo de 6 caracteres"),
        confirmPassword: yup.string().required("Campo obrigatório").oneOf([yup.ref("password")],"as senhas devem ser iguais"),
      }).required();

      //constantes necessarias

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    //função executada quando o form é submetido

    const onSubmit = (userData)=>{
        console.log("user data => ")
        console.log(userData)
        Axios.post("http://localhost:3001/register",{
            ...userData,
            gender:1
        }).then((response)=>{
            const msgs = {
                "email já cadastrado, tente outro":()=>{
                    setWarnings(response.data.msg)
                },
                "usuario cadastrado com sucesso":()=>{
                    console.warn(response.data.msg)
                    props.setTela("homepage")
                },
                "defalt":()=>{console.log("caiu no default")},
            }
            msgs[response.data.msg || "default" ]()
        })
    }

    return(<>
    <Header headerText="Sistema de Cadastro" subText="salve suas informações com a gente"/>
                  <div className='bodyContainer'>

        <form className="formContainer" 
              onSubmit={ handleSubmit(onSubmit)}>

          <label>
            Name
            <input {...register("name",{required:true})} type="text"/>
            <span>{errors.name?.message}</span>
          </label>

          <label>
            Email
            <input {...register("email",{required:true})} type="text"/>
            <span>{errors.email?.message}</span>
          </label>

          <label>
            Password
            <input {...register("password",{required:true})} type="password" />
            <span>{errors.password?.message}</span>
          </label>

          <label>
            Confirm Password
            <input {...register("confirmPassword",{required:true})} type="password" />
            <span>{errors.confirmPassword?.message}</span>
          </label>

          <span>{warnings}</span>
          <button type="submit">Register</button>
        </form>
        </div>
    </>)
}
export default Register