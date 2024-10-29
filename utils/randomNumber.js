class RandomNumberGenerator {
  constructor() {
    this.interval = 180000;
    this.number = "";
    this.start();
  }

  generateRandomNumber() {
    let randomNumber = "";
    for (let i = 0; i < 6; i++) {
      randomNumber += Math.floor(Math.random() * 10);
    }
    this.number = randomNumber;
  }

  getNumber() {
    return this.number;
  }

  start() {
    this.generateRandomNumber(); // Generate the first random number immediately
    this.intervalId = setInterval(
      () => this.generateRandomNumber(),
      this.interval
    );
  }
}

module.exports = new RandomNumberGenerator();
