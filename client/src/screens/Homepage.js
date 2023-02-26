import Header from "../components/Header"


export default (props)=>{
    return(
        <>
                  <Header headerText="Sistema de Cadastro" subText="salve suas informações com a gente"/>
                  <div className='bodyContainer'>
                    <button onClick={()=>props.setTela("login")}>
                        Login
                    </button>
                    <button onClick={()=>props.setTela("register")}>
                        Fazer Cadastro
                    </button>
                  </div>
        </>
    )
}