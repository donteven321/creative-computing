class Trip {
  constructor(trip) {
    this.isValid = true;
    this.startStation = stations.find(s => s.id === trip.start_station_id);
    this.endStation = stations.find(s => s.id === trip.end_station_id);
    this.startedTime = parseInt(trip.st);
    this.endedTime = parseInt(trip.et);
    this.path = []; 

    if (!this.startStation || !this.endStation || this.startStation.id === this.endStation.id) {
      this.isValid = false;
      console.log('trip is not valid', this);
    }
  }

  display(currentTime) {
    if (currentTime > this.startedTime && currentTime < this.endedTime) {
      const tripProgress = map(currentTime, this.startedTime, this.endedTime, 0, 1);
      const pos = this.startStation.getPos().lerp(this.endStation.getPos(), tripProgress);
      
      this.path.push(createVector(pos.x, pos.y));

      noFill();
      stroke(150, 150, 200);

      beginShape();
      for (let i = 0; i < this.path.length; i++) {
        vertex(this.path[i].x, this.path[i].y);
      }
      endShape();

      noStroke();
      fill(170, 80, 200);
      circle(pos.x, pos.y, 5);
    }
  }
}
