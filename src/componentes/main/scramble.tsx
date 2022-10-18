const Scramble = (props:{duranteSolve:string,scramble:string})=>{
    return(
        <section className={`scramble ${props.duranteSolve}`}>
            <p className="texto naoSelecionavel">{props.scramble}</p>
        </section>
    )
}

export default Scramble