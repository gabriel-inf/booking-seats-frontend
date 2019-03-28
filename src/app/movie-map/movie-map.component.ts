import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DataService } from '../data.service';
import { ApiService } from '../api.service';
import { ReservationService } from '../reservation.service';
import { SucessoComponent } from '../sucesso/sucesso.component';

@Component({
  selector: 'app-movie-map',
  templateUrl: './movie-map.component.html',
  styleUrls: ['./movie-map.component.scss']
})
export class MovieMapComponent implements OnInit {

  private seatConfig: any = null;
  public seatmap = [];
  public unavailable = [];

  processLocked() {

    this.seatmap.forEach(line => {
      line["seats"].forEach(seat => {
        let found = false;
        this.unavailable.forEach(unavailable_seat => {
          if (seat["seatLabel"] == unavailable_seat) {
            found = true
            console.log("locked", seat)
          }
        });
        if (found) {
          seat['status'] = "unavailable"
        } else seat['status'] = "available"
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
    private api: ApiService) { }


  closeDialog() {
    this.dialogRef.close();
  }
  async ngOnInit() {
    this.seatConfig = [
      {
        "seat_price": 15,
        "seat_map": [
          {
            "seat_label": "Q",
            "layout": "ggg__ggggggggggggggg__ggg"
          },
          {
            "seat_label": "P",
            "layout": "ggg__ggggggggggggggg__ggg"
          },
          {
            "seat_label": "O",
            "layout": "ggg__ggggggggggggggg__ggg"
          },
          {
            "seat_label": "N",
            "layout": "ggg__ggggggggggggggg__ggg"
          },
          {
            "seat_label": "M",
            "layout": "ggg__ggggggggggggggg__ggg"
          },
          {
            "seat_label": "L",
            "layout": "ggg__ggggggggggggggg__ggg"
          },
          {
            "seat_label": "K",
            "layout": "ggg__ggggggggggggggg_____"
          },
          {
            "seat_label": "J",
            "layout": "ggg__ggggggggggggggg_____"
          },
          {
            "seat_label": "I",
            "layout": "_____ggggggggggggggg_____"
          },
          {
            "seat_label": "H",
            "layout": "_____ggggggggggggggg_____"
          },
          {
            "seat_label": "G",
            "layout": "_____ggggggggggggggg__ggg"
          },
          {
            "seat_label": "F",
            "layout": "_____ggggggggggggggg__ggg"
          },
          {
            "seat_label": "E",
            "layout": "_____ggggggggggggggg__ggg"
          },
          {
            "seat_label": "D",
            "layout": "_____ggggggggggggggg__ggg"
          },
          {
            "seat_label": "C",
            "layout": "_______ggggggggggg_____gg"
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
      console.log("Unavailable (api)", res);
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

            if (item != '_') {
              seatObj["seatLabel"] = map_element.seat_label + seatNoCounter;
              if (seatNoCounter < 10) { seatObj["seatNo"] = "0" + seatNoCounter; }
              else { seatObj["seatNo"] = "" + seatNoCounter; }

              seatNoCounter++;
            }
            else {
              seatObj["seatLabel"] = "";
              seatNoCounter++;
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
    console.log("Seat to block: ", seatObject);

    if (seatObject.status == "available") {
      this.api.getLockedSeats().subscribe(lkSeats => {
        this.blockSeats = lkSeats;
        this.processLocked();
        console.log(lkSeats)
        lkSeats.forEach(element => {
          if (element == seatObject.seatLabel) {
            seatObject.status = "unavailable";
          }
        });
        if (seatObject.seatLabel != "unavailable") {
          seatObject.status = "booked";
          this.cart.selectedSeats.push(seatObject.seatLabel);
          this.cart.seatstoStore.push(seatObject.key);
          this.cart.totalamount += seatObject.price;
          this.reservationService.pickReservation(seatObject.seatLabel);
        }
      });
    }
    else if (seatObject.status = "booked") {
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
        console.log("Split seat: ", seatSplitArr);
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              console.log("\n\n\nFount Seat to block: ", seatObj);
              seatObj["status"] = "unavailable";
              this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1] = seatObj;
              console.log("\n\n\nSeat Obj", seatObj);
              console.log(this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1]);
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
