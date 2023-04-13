// building => floors => meeting room

// meeting room class

class MeetingRoom {
  constructor(roomNo, roomId, floorNo) {
    this.roomNo = roomNo;
    this.roomId = roomId;
    this.floorNo = floorNo;
    this.bookedTime = [];

    for (let i = 0; i < 24; i++) {
      let temp = { time: [i, i + 1], isBooked: false };
      this.bookedTime.push(temp);
    }
  }
}

class Floor {
  constructor(floorNo, numberOfMeetingRoom) {
    this.floorNo = floorNo;
    this.numberOfMeetingRoom = numberOfMeetingRoom;
    this.rooms = [];

    for (let i = 0; i < numberOfMeetingRoom; i++) {
      let roomNo = i + 1;
      let roomId = Date.now() + roomNo;
      let room = new MeetingRoom(roomNo, roomId, floorNo);
      this.rooms.push(room);
    }
  }
}

const f1 = new Floor(1, 5);


class Building {
  constructor(numberOfFloors, numberOfMeetingRoom) {
    this.numberOfFloors = numberOfFloors;
    this.floors = [];

    for (let i = 0; i < numberOfFloors; i++) {
      let floorNo = i + 1;
      let floor = new Floor(floorNo, numberOfMeetingRoom);
      this.floors.push(floor);
    }
  }

  findeRoom(time) {
    for (let i = 0; i < this.numberOfFloors; i++) {
      for (let j = 0; j < this.floors[i].numberOfMeetingRoom; j++) {
        for (
          let k = 0;
          k < this.floors[i].rooms[j].bookedTime.length - 1;
          k++
        ) {
          let times = this.floors[i].rooms[j].bookedTime[k];
          
          if (times.time[0] === time[0]) {
            let start = time[0];
            let end = time[1];
           let flag = true;
            for (let l = start; l < end && flag; l++) {
              let temp = [l, l + 1];
           
              for (let m = 0; m < 24; m++) {
               if (times.isBooked) flag = false;

               if (temp.join(" ") == times.time.join(" ") && times.isBooked)
                flag = false;
              }
           }
           
            
          }

           if (times.time[0]==time[0] && !this.floors[i].rooms[j].bookedTime[k].isBooked) {
          return {
              floorNo: this.floors[i].floorNo,
           room: this.floors[i].rooms[j],
              time:`${time[0]} to ${time[1]}`
            };
            }
        }
      }
    }
    return false;
  }
  bookRoom(room, time) {
    let start = time[0];
    let end = time[1];

    for (let l = start; l < end; l++) {
      let temp = [l, l + 1];
      // console.log("temp", temp);
      for (let m = 0; m < 24; m++) {
        if (room.room.bookedTime[m].time.join(" ") == temp.join(" ")) {
          room.room.bookedTime[m].isBooked = true;
        }
      }
    }
    
  }

  getRoom(time) {
    let room = this.findeRoom(time);
    // console.log("get room", room);
    if (room) {
      this.bookRoom(room, time);
      let tickit = new Tickit(room.floorNo, room.room.roomNo,time);
      // console.log("after booked room", room);
      return tickit;
    } else {
      return `no room available for ${time[0]} to ${time[1]}`;
    }
  }
}

class Tickit {
  constructor(floorNo, roomNo,time) {
    this.floorNo = floorNo;
    this.roomNo = roomNo;
   this.bookedAt = Date.now();
   this.message=`Congratulation you goot the room for ${time[1]-time[0]}h, ${time[0]} to ${time[1]}`
  }
}

const b1 = new Building(5, 5);
// console.log("building", b1.getRoom([18, 20]));
// console.log("building 2", b1.getRoom([19, 21]));
// console.log("building", b1.getRoom([21, 22]));

const startTime = document.getElementById("startTime")
const endTime = document.getElementById("endTime");
const tiket=document.getElementById("ticket")
function submit() {
 let sTime = +startTime.value;
 let eTime = +endTime.value;

 let timeSlot = [sTime, eTime]
 let timeSlot2=[eTime-1,eTime+3]

 
 

const room=b1.getRoom(timeSlot)

 let div = document.createElement("div");
 div.setAttribute("class","ticketCard")
 div.innerHTML =
 `<h1> ${room.message}</h1>
 <h3>Floor No:${room.floorNo}</h3>
 <h3>Room No:${room.roomNo}</h3>
 <h3>Time: ${sTime} To ${eTime}</h3>`
 tiket.append(div)

 console.log("timeSlot",timeSlot,"----",timeSlot2)
}
