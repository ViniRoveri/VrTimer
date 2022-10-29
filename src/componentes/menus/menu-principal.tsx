import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Tempo } from "../../common/classes"
import Medias from "./medias"
import Tempos from "./tempos"
import arrowLeft from '../../img/Arrows/Arrow-Left.svg'
import arrowRight from '../../img/Arrows/Arrow-Right.svg'

const MenuPrincipal = (props:{copiaLocalStorage:Array<Tempo>,setCopiaLocalStorage:Dispatch<SetStateAction<Tempo[]>>})=>{
    const [classeArrowLeft,setClasseArrowLeft] = useState('')
    const [classeArrowRight,setClasseArrowRight] = useState('invisivel')
    const [aberturaMenu,setAberturaMenu] = useState('')

    const [mudouTempo,setMudouTempo] = useState(true)

    useEffect(()=>{
        if(window.matchMedia('(min-width:1025px)').matches){setAberturaMenu('aberto')}
    },[])
    
    return(
        <aside className="aside">
            <img src={arrowLeft} alt="Mostrar Menu" aria-label="Mostrar Menu" className={classeArrowLeft} onClick={()=>{
                setClasseArrowLeft('invisivel');
                setClasseArrowRight('');
                setAberturaMenu('aberto')
            }}/>
            <img src={arrowRight} alt="Esconder Menu" aria-label="Esconder Menu" className={classeArrowRight} onClick={()=>{
                setClasseArrowRight('invisivel');
                setClasseArrowLeft('');
                setAberturaMenu('fechado')
            }}/>
            <div className={`aside-menus ${aberturaMenu}`}>
               <Tempos copiaLocalStorage={props.copiaLocalStorage} setCopiaLocalStorage={props.setCopiaLocalStorage} aberturaMenu={aberturaMenu} mudouTempo={mudouTempo} setMudouTempo={setMudouTempo}/> 
               <Medias copiaLocalStorage={props.copiaLocalStorage} mudouTempo={mudouTempo}/> 
            </div>
        </aside>
    )
}

export default MenuPrincipal