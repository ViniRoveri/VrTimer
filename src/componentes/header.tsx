import logo from '../img/Logos/Logo-Vini-Roveri-100.png'

const Header = ()=>{
    return(
        <header className="header naoSelecionavel">
            <img src={logo} alt="VR"/>
            <h1 className="titulo">Timer</h1>
        </header>
    )
}

export default Header