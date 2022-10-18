import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Tempo } from "../../../common/classes";
import PopupExcluirTempo from "./popupExcluirTempo";

const PopupTempo = (props:{display:string,setDisplay:Dispatch<SetStateAction<string>>,copiaLocalStorage:Array<Tempo>,        setCopiaLocalStorage:Dispatch<SetStateAction<Tempo[]>>,tempoSelecionado:Tempo|undefined,indexTempoSelecionado:number|undefined,mudouTempo:boolean,setMudouTempo:Dispatch<SetStateAction<boolean>>,displayExcluir:string,setDisplayExcluir:Dispatch<SetStateAction<string>>})=>{
    let data = props.tempoSelecionado ? new Date(props.tempoSelecionado?.data) : new Date()
    let numeroTempo:number|string|undefined = props.tempoSelecionado?.tempo

    if(props.tempoSelecionado?.foiMais2&&numeroTempo){numeroTempo += 2}
    if(typeof numeroTempo==='number'&&numeroTempo<60){
        numeroTempo = numeroTempo.toFixed(2)
    }else{if(typeof numeroTempo==='number'&&numeroTempo>=60){
        let minTimer = Math.floor(numeroTempo/60)
        let segTimer = String(Math.floor(numeroTempo-minTimer*60)).padStart(2,'0')
        let cenTimer = ((numeroTempo-Math.floor(numeroTempo)).toFixed(2)).slice(-2)
        numeroTempo = (`${minTimer}:${segTimer}.${cenTimer}`)
    }}

    const [botaoAtivoMais2,setBotaoAtivoMais2] = useState('')
    const [botaoAtivoDnf,setBotaoAtivoDnf] = useState('')
    const [botaoAtivoCopiar,setBotaoAtivoCopiar] = useState('')

    useEffect(()=>{
        if(props.tempoSelecionado?.foiMais2){setBotaoAtivoMais2('botaoAtivo')}else{setBotaoAtivoMais2('')}
        if(props.tempoSelecionado?.foiDnf){setBotaoAtivoDnf('botaoAtivo')}else{setBotaoAtivoDnf('')}
    },[props.tempoSelecionado])

    return(
        <>
        <section className="popupTempo" style={{animation: 'animaPopup .2s ease-out forwards',display:props.display}}>
            <h4 className="subtitulo">{props.tempoSelecionado?.foiDnf ? 'DNF' : numeroTempo}</h4>
            <button className={`texto botaoCopiar ${botaoAtivoCopiar}`} aria-label="Copiar Tempo" onClick={()=>{
                navigator.clipboard.writeText
                (`Tempo: ${props.tempoSelecionado?.foiDnf ? 'DNF' : numeroTempo}\r\nScramble: ${props.tempoSelecionado?.scramble}\r\nData: ${data.getDate()} / ${data.getMonth()+1} / ${data.getFullYear()} - ${data.getHours()}:${String(data.getMinutes()).padStart(2,'0')}:${String(data.getSeconds()).padStart(2,'0')}\r\nPenalidades: ${props.tempoSelecionado?.foiMais2?'+2':'Nenhuma'}`)
                setBotaoAtivoCopiar('botaoAtivo')
            }}>{botaoAtivoCopiar?'Copiado':'Copiar'}</button>
            <h5 className="texto">{props.tempoSelecionado?.scramble}</h5>
            <h6 className="texto">{`${data.getDate()} / ${data.getMonth()+1} / ${data.getFullYear()} - ${data.getHours()}:${String(data.getMinutes()).padStart(2,'0')}:${String(data.getSeconds()).padStart(2,'0')}`}</h6>
            <div>
                <button className={`texto ${botaoAtivoMais2}`} onClick={()=>{
                    if(botaoAtivoMais2==='botaoAtivo'){
                        setBotaoAtivoMais2('')
                        if(props.tempoSelecionado){
                            props.tempoSelecionado.foiMais2 = false
                        }
                    }else{
                        setBotaoAtivoMais2('botaoAtivo')
                        if(props.tempoSelecionado){
                            props.tempoSelecionado.foiMais2 = true
                        }
                    }
                    props.setMudouTempo(props.mudouTempo?false:true)
                    localStorage.setItem('Tempos',JSON.stringify(props.copiaLocalStorage))
                }}>+2</button>
                <button className={`texto ${botaoAtivoDnf}`} onClick={()=>{
                    if(!props.tempoSelecionado?.foiDnfInspecao){
                        if(botaoAtivoDnf==='botaoAtivo'){
                            setBotaoAtivoDnf('')
                            if(props.tempoSelecionado){
                                props.tempoSelecionado.foiDnf = false
                            }
                        }else{
                            setBotaoAtivoDnf('botaoAtivo')
                            if(props.tempoSelecionado){
                                props.tempoSelecionado.foiDnf = true
                            }
                        }
                        props.setMudouTempo(props.mudouTempo?false:true)
                        localStorage.setItem('Tempos',JSON.stringify(props.copiaLocalStorage))
                    }
                }}>DNF</button>
                <button className="texto botaoExcluir" onClick={()=>{
                    props.setDisplayExcluir('inline-block');
                    props.setDisplay('none')
                }}>Excluir</button>
            </div>
            <button className="texto" onClick={()=>{
                props.setDisplay('none')
                setBotaoAtivoCopiar('')
            }}>Fechar</button>
        </section>
            <PopupExcluirTempo display={props.displayExcluir} setDisplay={props.setDisplayExcluir} copiaLocalStorage={props.copiaLocalStorage} setCopiaLocalStorage={props.setCopiaLocalStorage} setDisplayPai={props.setDisplay} indexTempoSelecionado={props.indexTempoSelecionado} setBotaoAtivoCopiar={setBotaoAtivoCopiar}>{`Excluir o tempo ${props.tempoSelecionado?.foiDnf ? 'DNF' : numeroTempo}?`}</PopupExcluirTempo>
        </>
    )
}

export default PopupTempo