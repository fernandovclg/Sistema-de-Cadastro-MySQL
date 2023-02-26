import "./Homepage.css"

import Header from "../components/Header"


export default (props)=>{
    return(
        <>
                  <Header headerText="Sistema de Cadastro" subText="salve suas informações com a gente"/>
                  <div className='bodyContainer'>
                    {/* <div className="buttonContainer"> */}
                        <button onClick={()=>props.setTela("login")}>
                            Login
                        </button>
                        <button onClick={()=>props.setTela("register")}>
                            Register
                        </button>
                        <button onClick={()=>props.setUser(null)}>
                            Logout
                        </button>
                    {/* </div> */}
                    <div className="text">
                        {props.user
                        ?"bem vindo "+props.user.name
                        :"favor fazer login"
                        }
                    </div>
                  </div>
        </>
    )
}