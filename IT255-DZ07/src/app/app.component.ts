import { Component, NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditRoomDialogComponent } from './edit-room-dialog/edit-room-dialog.component';
import { Room } from './room/room.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  rooms: Room[];
  searchText: string;

  constructor(private dialog: MatDialog) {
    this.rooms = [
      new Room("EAST Miami", "With 4 pools, an on-site restaurant, and a 24-hour fitness center, there's something for everyone at EAST Miami.", 299, "https://cf.bstatic.com/xdata/images/hotel/square200/74559707.webp?k=f8f45d9de7a51edca2862f2b85af46077c6999f0e1a8b4b2b1dcc128963a012e&o=", 8.9),
      new Room("Hampton Inn & Suites by Hilton", "Located in downtown Miami, this Hampton Inn is a 1 minute walk from the free Brickell Metromover Station.", 399, "https://cf.bstatic.com/xdata/images/hotel/square200/143033854.webp?k=9aa39dbef24e6c3645d893f49652ffb9d2245d858b6e70376f8937b8018310c4&o=", 9.0),
      new Room("Staybridge Suites", "Staybridge Suites - Miami International Airport features air-conditioned rooms in Miami. With an outdoor swimming pool, the property also has a fitness center, as well as barbecue facilities.", 199, "https://cf.bstatic.com/xdata/images/hotel/square200/251167161.webp?k=c7b59b242a8f9fe083153c99a757669515dee5b62f900df2bdeece3f3dac5cb6&o=", 8.6),
      new Room("Kimpton EPIC Hotel", "This luxury Miami hotel is in the center of the city’s financial district and offers views of the Miami River and Biscayne Bay.", 549, "https://cf.bstatic.com/xdata/images/hotel/square200/234689771.webp?k=0d44f2cb785ab3f56944d7b55e85acbd1c1ad7e20e534368c902be2748dfa5bd&o=", 8.6)
    ]
    this.searchText = '';
  }



  randomize() {
    if (this.searchText !== '') {
      alert(`Can't use randomize with search bar`);
      return;
    }
    let currentIndex = this.rooms.length;
    let randomIndex;
    let temp;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temp = this.rooms[currentIndex];
      this.rooms[currentIndex] = this.rooms[randomIndex];
      this.rooms[randomIndex] = temp;
    }
  }

  onDelete(room: Room): void {
    const index = this.rooms.indexOf(room);
    if (index > -1) {
      this.rooms.splice(index, 1);
    }
  }

  onEdit(room: Room): void {
    const dialogRef = this.dialog.open(EditRoomDialogComponent, {
      data: {
        room: room
      }
    });
    dialogRef.afterClosed().subscribe(room => {
      console.log(room);
    })
  }

  addRoom(room: Room) {
    this.rooms.push(room);
  }
}
