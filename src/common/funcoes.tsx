export function geraScramble(){
    var movimentosFinal:Array<string> = []

    function checaLetraIgual(moveProx:string){
        var retorno = moveProx

        if(movimentosFinal.length>0){            
            let charChecado = movimentosFinal[movimentosFinal.length-1][0]
            let charProx = moveProx[0]

            if(charChecado===charProx){
                if(charProx==='B'||charProx==='F'){
                    retorno = moveProx.replace(charProx,'D')
                }
                if(charProx==='D'||charProx==='U'){
                    retorno = moveProx.replace(charProx,'L')
                }
                if(charProx==='L'||charProx==='R'){
                    retorno = moveProx.replace(charProx,'B')
                }  
            }

            if(movimentosFinal.length>1){
                let charAnterior = movimentosFinal[movimentosFinal.length-2][0]

                if(retorno[0]===charAnterior){
                    if(retorno[0]==='B'&&charChecado==='F'){retorno = retorno.replace('B','U')}
                    if(retorno[0]==='F'&&charChecado==='B'){retorno = retorno.replace('F','U')}
                    if(retorno[0]==='D'&&charChecado==='U'){retorno = retorno.replace('D','R')}
                    if(retorno[0]==='U'&&charChecado==='D'){retorno = retorno.replace('U','R')}
                    if(retorno[0]==='L'&&charChecado==='R'){retorno = retorno.replace('L','F')}
                    if(retorno[0]==='R'&&charChecado==='L'){retorno = retorno.replace('R','F')}
                }
            }
        }
        return retorno
    }

    const numMoves1 = Math.round(Math.random()*4)+1
    const numMoves2 = Math.round(Math.random()*4)+1
    const numMoves3 = Math.round(Math.random()*4)+1
    var numMoves4 = Math.round(Math.random()*4)
    const numMovesTotal = numMoves1+numMoves2+numMoves3+numMoves4
    if(numMovesTotal<20){
        const falta = 20-numMovesTotal
        numMoves4 += falta
    }

    const moves1 = ["F2","B2","R2","L2","U2","D2"]
    const moves2 = ["F2","B2","R2","L2","U2","U","U'","D2","D","D'"]
    const moves3 = ["F2","B2","R2","R","R'","L2","L","L'","U2","U","U'","D2","D","D'"]
    const moves4 = ["F2","F","F'","B2","B","B'","R2","R","R'","L2","L","L'","U2","U","U'","D2","D","D'"]

    for(let i=0;i<numMoves1;i++){
        let moveProx = moves1[Math.floor(Math.random()*moves1.length)]
        movimentosFinal.push(checaLetraIgual(moveProx))
    }
    for(let i=0;i<numMoves2;i++){
        let moveProx = moves2[Math.floor(Math.random()*moves2.length)]
        movimentosFinal.push(checaLetraIgual(moveProx))
    }
    for(let i=0;i<numMoves3;i++){
        let moveProx = moves3[Math.floor(Math.random()*moves3.length)]
        movimentosFinal.push(checaLetraIgual(moveProx))
    }
    for(let i=0;i<numMoves4;i++){
        let moveProx = moves4[Math.floor(Math.random()*moves4.length)]
        movimentosFinal.push(checaLetraIgual(moveProx))
    }

    return movimentosFinal.toString().replaceAll(',',' ')
}
  