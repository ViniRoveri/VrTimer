export class Tempo{
    constructor(
        readonly tempo:number,
        readonly scramble:string,
        readonly data:Date,
        public foiMais2:boolean,
        public foiDnf:boolean,
        readonly foiDnfInspecao:boolean
    ){
        this.tempo=tempo
        this.scramble=scramble
        this.data=data
        this.foiMais2=foiMais2
        this.foiDnf=foiDnf
        this.foiDnfInspecao=foiDnfInspecao
    }
}
