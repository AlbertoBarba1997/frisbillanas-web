export class Torneo{

  constructor(
    public _id: string,
    public name: string,
    public description : string,
    public place : string,
    public date: Date,
    public modality : number,
    public gender : number,
    public file : string
    ){  }
}
