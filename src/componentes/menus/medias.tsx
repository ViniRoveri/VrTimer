import { useEffect, useState } from "react"
import { Tempo } from "../../common/classes"

const Medias = (props:{copiaLocalStorage:Array<Tempo>,mudouTempo:boolean})=>{
    const [mediaGeral,setMediaGeral] = useState(calculaMediaGeral())
    const [media5,setMedia5] = useState(calculaMedia(5))
    const [media12,setMedia12] = useState(calculaMedia(12))
    const [media50,setMedia50] = useState(calculaMedia(50))
    const [media100,setMedia100] = useState(calculaMedia(100))

    function calculaMediaGeral(){
        let total = 0
        let totalDnfs = 0
    
        props.copiaLocalStorage.forEach(tempo=>{
            total += tempo.foiMais2?tempo.tempo+2:tempo.tempo;
            if(tempo.foiDnf){totalDnfs++}
        })

        total = total/props.copiaLocalStorage.length

        if(totalDnfs>0){return 'DNF'} 

        if(total>=60){
            let minTimer = Math.floor(total/60)
            let segTimer = String(Math.floor(total-minTimer*60)).padStart(2,'0')
            let cenTimer = ((total-Math.floor(total)).toFixed(2)).slice(-2)
            return `${minTimer}:${segTimer}.${cenTimer}`
        }else{
            if(total){return total.toFixed(2)}else{return ''}
        }
    }
    
    function calculaMedia(numeroMedia:number){
        let tempos = []
        let totalDnfs = 0
    
        if(props.copiaLocalStorage.length>=numeroMedia){
            for(let i=1;i<=numeroMedia;i++){
                let tempoAtual = props.copiaLocalStorage[props.copiaLocalStorage.length-i]
                
                if(tempoAtual.foiDnf){
                    totalDnfs++
                    tempos.push(0)
                }else{
                    tempos.push(tempoAtual.foiMais2?tempoAtual.tempo+2:tempoAtual.tempo)
                }
            }
            
            if(totalDnfs>1){return 'DNF'}

            tempos.sort((a,b)=>a-b)
            tempos.shift()
            if(totalDnfs===1){tempos.shift()}
            if(totalDnfs===0){tempos.pop()}
            let total = tempos.reduce((a,b)=>a+b,0)
            total = total/(numeroMedia-2)

            if(total>=60){
                let minTimer = Math.floor(total/60)
                let segTimer = String(Math.floor(total-minTimer*60)).padStart(2,'0')
                let cenTimer = ((total-Math.floor(total)).toFixed(2)).slice(-2)
                return `${minTimer}:${segTimer}.${cenTimer}`
            }
        
            return total.toFixed(2)
        }else{return ''}
    }

    useEffect(()=>{
        setMediaGeral(calculaMediaGeral())
        setMedia5(calculaMedia(5))
        setMedia12(calculaMedia(12))
        setMedia50(calculaMedia(50))
        setMedia100(calculaMedia(100)) 
    })

    useEffect(()=>{
        setMediaGeral(calculaMediaGeral())
        setMedia5(calculaMedia(5))
        setMedia12(calculaMedia(12))
        setMedia50(calculaMedia(50))
        setMedia100(calculaMedia(100))
    },[props.mudouTempo])

    return(
        <div className="medias">
            <span>
                <h2 className="subtitulo">Médias</h2>
                <div className="mediaGeral texto">
                    <h4>Média Geral:</h4>
                    <p>{mediaGeral}</p>
                </div>
            </span>
            <div>
                <div className="media5 texto">
                    <h4>Média de 5:</h4>
                    <p>{media5}</p>
                </div>
                <div className="media12 texto">
                    <h4>Média de 12:</h4>
                    <p>{media12}</p>
                </div>
                <div className="media50 texto">
                    <h4>Média de 50:</h4>
                    <p>{media50}</p>
                </div>
                <div className="media100 texto">
                    <h4>Média de 100:</h4>
                    <p>{media100}</p>
                </div>
            </div>
        </div>
    )
}

export default Medias
