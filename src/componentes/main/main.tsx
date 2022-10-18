import { useState,useEffect } from "react"
import { geraScramble } from "../../common/funcoes";
import Cronometro from "./cronometro"
import Scramble from "./scramble"
var numTimer = 0
var idIntervalTimer:any;
var idIntervalInspecao:any;
var etapaSolve:'pre'|'inspecao'|'solve'|'pos' = 'pre'
var minTimer = 0
var duranteSolve:'duranteSolve'|'' = ''
var duranteInspecao:'duranteInspecao'|'' = ''
var foiMais2 = false
var foiDnf = false
var foiDnfInspecao = false

const Main = (props:{salvaLocalStorage:(tempo:number,scramble:string,data:Date,foiMais2:boolean,foiDnf:boolean,foiDnfInspecao:boolean)=>void})=>{
  const [timerAtivo,setTimerAtivo] = useState(false)
  const [timerInspecaoAtivo,setTimerInspecaoAtivo] = useState(false)
  var [displayTimer,setDisplayTimer] = useState<number|string>(numTimer);
  const [scramble,setScramble] = useState(geraScramble)

  const zeraTimer = ()=>{
    numTimer = 0
    setDisplayTimer(numTimer);
  }

  useEffect(()=>{
    if(timerInspecaoAtivo){
      foiMais2 = false
      foiDnf = false
      foiDnfInspecao = false
      var numInspecao = 15
      setDisplayTimer(String(numInspecao))
      idIntervalInspecao = setInterval(()=>{
        numInspecao--
        if(numInspecao>0){
          setDisplayTimer(String(numInspecao))
        }
        if(numInspecao===0||numInspecao===-1){
          foiMais2 = true
          setDisplayTimer('+2')
        }
        if(numInspecao<-1){
          foiMais2 = false
          foiDnf = true
          foiDnfInspecao = true
          props.salvaLocalStorage(numTimer,scramble,new Date(),foiMais2,foiDnf,foiDnfInspecao)
          clearInterval(idIntervalInspecao)
          duranteInspecao = ''
          duranteSolve = ''
          setScramble(geraScramble)
          setTimerInspecaoAtivo(false)
          setDisplayTimer('DNF')
        }
      },1000)
    }else{clearInterval(idIntervalInspecao)} 
  },[timerInspecaoAtivo])

  useEffect(()=>{
    if(timerAtivo){
      idIntervalTimer = setInterval(()=>{
        numTimer += 0.01;
        if(numTimer<60){
          setDisplayTimer(numTimer);
        }else{
          minTimer = Math.floor(numTimer/60)
          setDisplayTimer(`${minTimer}:${String((numTimer-minTimer*60).toFixed(2)).padStart(5,'0')}`)
        }
      },10)
    }else{
      clearInterval(idIntervalTimer)
    }
  },[timerAtivo])

  document.body.onkeyup=(e)=>{
    if(!timerAtivo&&e.code==='Space'){
      if(etapaSolve==='pre'||etapaSolve==='inspecao'){
        funcaoPrincipal()
      }
      if(etapaSolve==='pos'){
        setTimeout(()=>{
          etapaSolve='pre'
        },500)
      }
    }
  }
  document.body.onkeydown=(e)=>{
    e.preventDefault()
    if(timerAtivo&&!e.repeat&&etapaSolve==='solve'){
      funcaoPrincipal()
      if(e.code!=='Space'){etapaSolve='pre'}
    }
  }

  function funcaoPrincipal(){
    if(!timerAtivo){
      if(!timerInspecaoAtivo){
        zeraTimer()
        etapaSolve = 'inspecao'
        duranteInspecao = 'duranteInspecao'
        duranteSolve = 'duranteSolve'
        setTimerInspecaoAtivo(true)
      }else{
        etapaSolve = 'solve'
        duranteInspecao = ''
        setTimerInspecaoAtivo(false)
        setTimerAtivo(true)
      } 
    }else{
      etapaSolve = 'pos'
      duranteSolve = ''
      props.salvaLocalStorage(numTimer,scramble,new Date(),foiMais2,foiDnf,foiDnfInspecao)
      if(foiMais2){setDisplayTimer(numTimer<60?numTimer+2:`${minTimer}:${String(((numTimer-minTimer*60)+2).toFixed(2)).padStart(5,'0')}`)}
      foiMais2 = false
      foiDnf = false
      foiDnfInspecao = false
      setScramble(geraScramble)
      setTimerAtivo(false)
    }
  }
  
  return(
    <main className={`main ${duranteSolve}`} 
    onTouchEnd={()=>{
      if(!timerAtivo){
        if(etapaSolve==='pre'||etapaSolve==='inspecao'){
          funcaoPrincipal()
        }
        if(etapaSolve==='pos'){etapaSolve = 'pre'}
      }
    }} 
    onTouchStart={()=>{
      if(timerAtivo&&etapaSolve==='solve'){
        funcaoPrincipal()
      } 
    }}>
      <Scramble duranteSolve={duranteSolve} scramble={scramble}/>
      <Cronometro displayTimer={displayTimer} duranteInspecao={duranteInspecao} duranteSolve={duranteSolve} minTimer={minTimer}/>
      <div className={duranteSolve}></div>
    </main>
  )
}

export default Main
