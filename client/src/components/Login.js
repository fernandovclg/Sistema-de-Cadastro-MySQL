import {useForm} from "react-hook-form"
import "./Login.css"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const Login = (props)=>{

    const schema = yup.object({
        name: yup.string().required("Campo obrigatório"),
        email: yup.string().email().required("Campo obrigatório"),
        password: yup.string().required("Campo obrigatório").min(6, "minimo de 6 caracteres"),
        confirmPassword: yup.string().required("Campo obrigatório").oneOf([yup.ref("password")],"as senhas devem ser iguais"),
      }).required();


    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (userData)=>{
        console.log(userData)
    }

    return(<>

        <form className="formContainer" 
              onSubmit={ handleSubmit(onSubmit)}>

          <label>
            Email
            <input {...register("email",{required:true})} type="text"/>
            <span>{errors.email?.message}</span>
          </label>

          <label>
            Password
            <input {...register("password",{required:true})} type="password"/>
            <span>{errors.password?.message}</span>
          </label>



          <button type="submit">Login</button>
        </form>
          <span className="link">Ainda não possui cadastro?</span></>

    )
}
export default Login