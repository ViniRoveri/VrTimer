import { Dispatch, SetStateAction } from "react"
import { Tempo } from "../../../common/classes"

const PopupExcluirTodos = (props:{children:string,display:string,setDisplay:Dispatch<SetStateAction<string>>,copiaLocalStorage:Array<Tempo>,        setCopiaLocalStorage:Dispatch<SetStateAction<Tempo[]>>})=>{
    return(
        <section className="popupExcluir naoSelecionavel" style={{animation: 'animaPopup .2s ease-out forwards',display:props.display}}>
            <p className="texto">{props.children}</p>
            <button className="texto" type="button" onClick={()=>{
                props.setCopiaLocalStorage([]);
                localStorage.setItem('Tempos','[]')
                props.setDisplay('none')
            }}>Sim</button>
            <button className="texto" type="button" onClick={()=>props.setDisplay('none')}>Não</button>
        </section>
    )
}

export default PopupExcluirTodos