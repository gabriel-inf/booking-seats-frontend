export class Reservation {

    id: number;
    name: string;
    cpf: string;
    phone: string;
    seat: string;
    confirmed: boolean;
    value: string;
    email: string;
  
    constructor() { 
      this.id = null;
      this.name = "";
      this.cpf = "";
      this.phone = "";
      this.seat = "0";
      this.confirmed = false;
      this.value = "0";
      this.email = "";
    }

    // constructor() { 
    //   this.id = null;
    //   this.name = "Teste1";
    //   this.cpf = "44444444444";
    //   this.phone = "44444444444";
    //   this.seat = "0";
    //   this.confirmed = false;
    //   this.value = "1";
    //   this.email = "gabriel@teste.com";
    // }


}