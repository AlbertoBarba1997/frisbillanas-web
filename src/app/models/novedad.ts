export class Novedad{

  constructor(
    public _id: string,
    public tittle: string,
    public text : string,
    public visitas : number,
    public user : string,
    public created_at: Date,
    public file : string
    ){  }
}

