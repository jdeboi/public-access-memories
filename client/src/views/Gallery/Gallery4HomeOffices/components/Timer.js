class Timer {
  constructor(dt) {
    this.lastUpdate = 0;
    this.dt = dt;
  }
  isTimeUp(p5) {
    if (p5.millis() - this.lastUpdate > this.dt) {
      this.lastUpdate = p5.millis();
      return true;
    }
    return false;
  }
}

export default Timer;
