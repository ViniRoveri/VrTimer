import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Tempo } from "../../common/classes";
import PopupExcluirTodos from "./popups/popupExcluirTodos";
import PopupTempo from "./popups/popupTempo";
var alturaDiv:string;
var naoHaTempos:string;

const Tempos = (props:{copiaLocalStorage:Array<Tempo>,setCopiaLocalStorage:Dispatch<SetStateAction<Tempo[]>>,aberturaMenu:string,mudouTempo:boolean,setMudouTempo:Dispatch<SetStateAction<boolean>>})=>{
    if(props.copiaLocalStorage.length<=0){
        alturaDiv = 'calc(100% - 41px)';
        naoHaTempos = ''
    }else{
        alturaDiv = 'auto';
        naoHaTempos = 'invisivel'
    }
    
    const [displayExcluirTodos,setDisplayExcluirTodos] = useState('none')
    const [displayTempo,setDisplayTempo] = useState('none')
    const [displayExcluirTempo,setDisplayExcluirTempo] = useState('none')

    useEffect(()=>{
        if(props.aberturaMenu==='fechado'){
            setDisplayExcluirTodos('none')
        }
    },[props.aberturaMenu])

    const [tempoSelecionado,setTempoSelecionado] = useState<Tempo>()
    const [indexTempoSelecionado,setIndexTempoSelecionado] = useState<number>()

    const [botaoAtivoCopiar,setBotaoAtivoCopiar] = useState('')

    return(
        <div className="tempos">
            <PopupExcluirTodos display={displayExcluirTodos} setDisplay={setDisplayExcluirTodos} copiaLocalStorage={props.copiaLocalStorage} setCopiaLocalStorage={props.setCopiaLocalStorage}>Excluir todos os tempos?</PopupExcluirTodos>
            <span>
                <h2 className="subtitulo">Tempos</h2>
                <p className={`texto ${props.copiaLocalStorage.length>0?'':'invisivel'}`}>{`Total de tempos: ${props.copiaLocalStorage.length}`}</p>
                <button className={`texto ${props.copiaLocalStorage.length>0?'':'invisivel'}`} type="button" onClick={()=>{
                    setDisplayTempo('none')
                    setDisplayExcluirTempo('none')
                    setDisplayExcluirTodos('inline-block')
                    setBotaoAtivoCopiar('')
                }}>Excluir tempos</button>
            </span>
            <div style={{height:alturaDiv}}>
                {props.copiaLocalStorage.slice(0).reverse().map((tempo,index)=>{
                    let data = new Date(tempo.data)
                    let numeroTempo:number|string = tempo.foiMais2?tempo.tempo+2:tempo.tempo

                    numeroTempo = tempo.foiDnf?'DNF':numeroTempo

                    if(typeof numeroTempo==='number'&&numeroTempo<60){
                        numeroTempo = numeroTempo.toFixed(2)
                    }else{if(typeof numeroTempo==='number'&&numeroTempo>=60){
                        let minTimer = Math.floor(numeroTempo/60)
                        let segTimer = String(Math.floor(numeroTempo-minTimer*60)).padStart(2,'0')
                        numeroTempo = (`${minTimer}:${segTimer}`)
                    }}
                
                    return(
                    <div key={`${data.getTime()}`} onClick={()=>{
                        setDisplayExcluirTodos('none')
                        setDisplayExcluirTempo('none')
                        setTempoSelecionado(props.copiaLocalStorage.slice(0).reverse()[index])
                        setIndexTempoSelecionado(index)
                        displayTempo==='none'?setDisplayTempo('inline-block'):setDisplayTempo('none')
                        }}>
                        <h3 className="texto">{numeroTempo}</h3>
                    </div>
                    )
                })}
                <PopupTempo display={displayTempo} setDisplay={setDisplayTempo} copiaLocalStorage={props.copiaLocalStorage} setCopiaLocalStorage={props.setCopiaLocalStorage} tempoSelecionado={tempoSelecionado} indexTempoSelecionado={indexTempoSelecionado} mudouTempo={props.mudouTempo} setMudouTempo={props.setMudouTempo} displayExcluir={displayExcluirTempo} setDisplayExcluir={setDisplayExcluirTempo} botaoAtivoCopiar={botaoAtivoCopiar} setBotaoAtivoCopiar={setBotaoAtivoCopiar}/>
                <span className={`${naoHaTempos} texto`}>Ainda Não Há Tempos</span>
            </div>
        </div>
    )
}

export default Tempos