import './Header.css';

const Header = (props)=>{
    return(<div className='HeaderContainer'>
        {props.headerText}
    </div>)
}

export default Header