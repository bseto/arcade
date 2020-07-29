export default class Timer {
    constructor(timeLimit) {
        this.timeLimit = timeLimit;
        this.timePassed = 0;
        this.timerInterval = null;
    }

    timeLeft() {
        return this.timeLimit - this.timePassed;
    }
    startTimer() {
        this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    }

    onTimesUp() {
        clearInterval(this.timerInterval);
    }
}
