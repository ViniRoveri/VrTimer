import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './App.css';
import { Tempo } from './common/classes';
import Footer from './componentes/footer';
import Header from './componentes/header';
import Main from './componentes/main/main';
import MenuPrincipal from './componentes/menus/menu-principal';

function App(){
  const [copiaLocalStorage,setCopiaLocalStorage]:[Array<Tempo>,Dispatch<SetStateAction<Tempo[]>>] = useState<any>([]);

  function puxaLocalStorage(){
    if(!localStorage.Tempos){
      localStorage.setItem('Tempos','[]')
    }else{
      setCopiaLocalStorage(JSON.parse(localStorage.Tempos))
    }
  }
  useEffect(()=>{
    puxaLocalStorage()
  },[])

  function salvaLocalStorage(tempo:number,scramble:string,data:Date,foiMais2:boolean,foiDnf:boolean,foiDnfInspecao:boolean){
    setCopiaLocalStorage([...copiaLocalStorage,new Tempo(tempo,scramble,data,foiMais2,foiDnf,foiDnfInspecao)]);
    localStorage.setItem('Tempos',JSON.stringify(copiaLocalStorage))
  }
  
  return (
    <>
    <Header/>
    <MenuPrincipal copiaLocalStorage={copiaLocalStorage} setCopiaLocalStorage={setCopiaLocalStorage}/>
    <Main salvaLocalStorage={salvaLocalStorage}/>
    <Footer/>
    </>
  );
}

export default App;
