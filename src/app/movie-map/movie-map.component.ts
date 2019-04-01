import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DataService } from '../data.service';
import { ApiService } from '../api.service';
import { ReservationService } from '../reservation.service';
import { SucessoComponent } from '../sucesso/sucesso.component';
import { interval, Observable } from 'rxjs';
import { reference } from '@angular/core/src/render3';

@Component({
  selector: 'app-movie-map',
  templateUrl: './movie-map.component.html',
  styleUrls: ['./movie-map.component.scss']
})
export class MovieMapComponent implements OnInit {

  private seatConfig: any = null;
  public seatmap = [];
  public unavailable: any;
  private selectedSeat;

  

  processLocked() {

    this.seatmap.forEach(line => {
      line["seats"].forEach(seat => {
        let found = false;
        this.unavailable.forEach(unavailable_seat => {
          if (seat["seatLabel"] == unavailable_seat) {
            found = true
          }
        });
        if (found) {
          seat['status'] = "unavailable"
        } else seat['status'] = "available"
        if (seat["seatLabel"] == this.selectedSeat) {
          seat["status"] = "booked";
        }  
      });
    });
  }

  private seatChartConfig = {
    showRowsLabel: true,
    showRowWisePricing: false,
    newSeatNoForRow: true
  }

  public cart = {
    selectedSeats: [],
    seatstoStore: [],
    totalamount: 0,
    cartId: "",
    eventId: 0
  };

  title = 'seat-chart-generator';



  constructor(
    private dialogRef: MatDialogRef<MovieMapComponent>,
    public dialog: MatDialog,
    private data: DataService,
    private reservationService: ReservationService,
    private api: ApiService) { 

      this.refresh()

    }


  closeDialog() {
    this.dialogRef.close();
    
  }


  refresh() {
    const observervable: Observable<number> = interval(5000);
    
    observervable.subscribe(_ => {
      this.api.getLockedSeats().subscribe(res => {
        this.unavailable = res;
        // this.seatmap = []
        // this.processSeatChart(this.seatConfig);
        this.processLocked();
      })
    })
  }

  async ngOnInit() {


    

    this.seatConfig = [
      {
        "seat_price": 15,
        "seat_map": [
          {
            "seat_label": "Q",
            "layout": "ggggggggggg   gggggggggggg"
          },
          {
            "seat_label": "P",
            "layout": "ggg__gggggggggggggggg__ggg"
          },
          {
            "seat_label": "O",
            "layout": "ggg__gggggggggggggggg__ggg"
          },
          {
            "seat_label": "N",
            "layout": "ggg__gggggggggggggggg__ggg"
          },
          {
            "seat_label": "M",
            "layout": "ggg__gggggggggggggggg__ggg"
          },
          {
            "seat_label": "L",
            "layout": "ggg__gggggggggggggggg__ggg"
          },
          {
            "seat_label": "K",
            "layout": "ggg__gggggggggggggggg_____"
          },
          {
            "seat_label": "J",
            "layout": "ggg__gggggggggggggggg_____"
          },
          {
            "seat_label": "I",
            "layout": "...__gggggggggggggggg_____"
          },
          {
            "seat_label": "H",
            "layout": "...__gggggggggggggggg_____"
          },
          {
            "seat_label": "G",
            "layout": "...__gggggggggggggggg__ggg"
          },
          {
            "seat_label": "F",
            "layout": "...__gggggggggggggggg__ggg"
          },
          {
            "seat_label": "E",
            "layout": "...__gggggggggggggggg__ggg"
          },
          {
            "seat_label": "D",
            "layout": "...__gggggggggggggggg__ggg"
          },
          {
            "seat_label": "C",
            "layout": "...____gggggggggggg.____gg"
          },
          {
            "seat_label": "B",
            "layout": "ggg__ggggggggggggggg__ggg"
          },
          {
            "seat_label": "A",
            "layout": "ggg__ggggggggggggggg__ggg"
          }
        ]
      }
    ]
    await this.api.getLockedSeats().subscribe(res => {
      this.unavailable = res;
      this.processSeatChart(this.seatConfig);
      this.processLocked();
    });

  }

  public processSeatChart(map_data: any[]) {

    if (map_data.length > 0) {
      var seatNoCounter = 1;
      for (let __counter = 0; __counter < map_data.length; __counter++) {
        var row_label = "";
        var item_map = map_data[__counter].seat_map;

        //Get the label name and price
        row_label = "Row " + item_map[0].seat_label + " - ";
        if (item_map[item_map.length - 1].seat_label != " ") {
          row_label += item_map[item_map.length - 1].seat_label;
        }
        else {
          row_label += item_map[item_map.length - 2].seat_label;
        }
        row_label += " : Rs. " + map_data[__counter].seat_price;

        item_map.forEach(map_element => {
          var mapObj = {
            "seatRowLabel": map_element.seat_label,
            "seats": [],
            "seatPricingInformation": row_label
          };
          row_label = "";
          var seatValArr = map_element.layout.split('');
          if (this.seatChartConfig.newSeatNoForRow) {
            seatNoCounter = 1; //Reset the seat label counter for new row
          }
          var totalItemCounter = 1;
          seatValArr.forEach(item => {

            var seatObj = {
              "key": map_element.seat_label + "_" + totalItemCounter,
              "price": map_data[__counter]["seat_price"],
              "status": "available"
            };

            if (item == 'g') {

              if (map_element.seat_label == "C" && (seatNoCounter == 6)){
                seatNoCounter++;
              }
              if (map_element.seat_label == "C" && (seatNoCounter == 11)){
                seatNoCounter++;
                seatNoCounter++;
              }
              if (map_element.seat_label == "C" && (seatNoCounter == 17)){
                seatNoCounter++;
              }

              seatObj["seatLabel"] = map_element.seat_label + seatNoCounter;
              if (seatNoCounter < 10) { seatObj["seatNo"] = "0" + seatNoCounter; }
              else { seatObj["seatNo"] = "" + seatNoCounter; }

              seatNoCounter++;
            }
            else if (item == "."){
              seatObj["seatLabel"] = "";
              seatNoCounter++;
            } else {
              seatObj["seatLabel"] = "";
            }
            totalItemCounter++;
            mapObj["seats"].push(seatObj);
          });
          this.seatmap.push(mapObj);

        });
      }
    }
  }

  public selectSeat(seatObject: any) {
    
    if (seatObject.status == "available") {
      this.api.getLockedSeats().subscribe(lkSeats => {
        //this.unavailable = lkSeats;
        this.processLocked();
        lkSeats.forEach(element => {
          if (element == seatObject.seatLabel) {
            seatObject.status = "unavailable";
          }
        });
        if (seatObject.seatLabel != "unavailable") {

          if (this.selectedSeat != null) {
            this.seatmap.forEach(seat => {
              if (seat.status == this.selectedSeat) {
                seat.status = "available"
              }
              
            });
          }


          this.selectedSeat = seatObject.seatLabel;
          seatObject.status = "booked";
          this.cart.selectedSeats.push(seatObject.seatLabel);
          this.cart.seatstoStore.push(seatObject.key);
          this.cart.totalamount += seatObject.price;
          // if (this.reservationService.pickReservation(seatObject.seatLabel) == 1) {
          //   alert("Ocorreu um erro! Selecione outra cadeira!");
          //   this.selectedSeat = "";
          //   this.dialog.closeAll();
          //   let dialogRef = this.dialog.open(MovieMapComponent, {
          //     width: '800px'
          //   });
          //   dialogRef.updatePosition();
          // }
          try {
            let ret = this.reservationService.pickReservation(seatObject.seatLabel)
            console.log(ret)
          } catch (error) {
            console.log(error)
          }
          
        
        }
      });
    }
    else if (seatObject.status == "booked") {
      seatObject.status = "available";
      var seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
      if (seatIndex > -1) {
        this.cart.selectedSeats.splice(seatIndex, 1);
        this.cart.seatstoStore.splice(seatIndex, 1);
        this.cart.totalamount -= seatObject.price;
      }

    }
  }

  public blockSeats(seatsToBlock: string) {
    if (seatsToBlock != "") {
      var seatsToBlockArr = seatsToBlock.split(',');
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        var seat = seatsToBlockArr[index] + "";
        var seatSplitArr = seat.split("_");
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              seatObj["status"] = "unavailable";
              this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1] = seatObj;
              break;
            }

          }
        }

      }
    }

  }

  async processBooking() {
    await this.reservationService.submitReservation();
    await this.dialog.closeAll();
    if (this.data.reservation.cpf != "" && this.data.reservation.email != "" && this.data.reservation.name != ""
      && this.data.reservation.phone != "" && this.data.reservation.seat != "" && this.data.reservation.value != "") {
      let dialogRef = await this.dialog.open(SucessoComponent, {
        width: '800px'
      });
      dialogRef.updatePosition();
    } else {
      alert("Selecione =(")
    }

  }

  

}
