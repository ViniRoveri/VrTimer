const Cronometro = (props:{displayTimer:number|string,duranteInspecao:string,duranteSolve:string,minTimer:number})=>{
    return(
        <section className={`cronometro ${props.duranteSolve}`}>
            <span className={`texto ${props.duranteInspecao}`}>Inspeção</span>
            <h2 className="naoSelecionavel">{typeof props.displayTimer==='number'?props.displayTimer.toFixed(2):props.displayTimer}</h2>
        </section>
    )
}

export default Cronometro