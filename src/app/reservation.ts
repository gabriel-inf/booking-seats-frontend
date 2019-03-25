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

}