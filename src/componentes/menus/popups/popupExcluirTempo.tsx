import { Dispatch, SetStateAction } from "react"
import { Tempo } from "../../../common/classes"

const PopupExcluirTempo = (props:{children:string,display:string,setDisplay:Dispatch<SetStateAction<string>>,copiaLocalStorage:Array<Tempo>,        setCopiaLocalStorage:Dispatch<SetStateAction<Tempo[]>>,setDisplayPai:Dispatch<SetStateAction<string>>,indexTempoSelecionado:number|undefined,setBotaoAtivoCopiar:Dispatch<SetStateAction<string>>})=>{
    function excluiTempo(){
        let copiaCopiaLocalStorage = props.copiaLocalStorage.slice(0).reverse()

        if(typeof props.indexTempoSelecionado==='number'){
            copiaCopiaLocalStorage.splice(props.indexTempoSelecionado,1)
        }

        props.setCopiaLocalStorage(copiaCopiaLocalStorage.slice(0).reverse())
        localStorage.setItem('Tempos',JSON.stringify(copiaCopiaLocalStorage.slice(0).reverse()))
    }

    return(
        <section className="popupExcluir naoSelecionavel" style={{animation: 'animaPopup .2s ease-out forwards',display:props.display}}>
            <p className="texto">{props.children}</p>
            <button className="texto" type="button" onClick={()=>{
                excluiTempo()
                props.setDisplay('none')
                props.setBotaoAtivoCopiar('')
            }}>Sim</button>
            <button className="texto" type="button" onClick={()=>{
                props.setDisplay('none')
                props.setDisplayPai('inline-block')
            }}>Não</button>
        </section>
    )
}

export default PopupExcluirTempo