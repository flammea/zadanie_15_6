class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }


    print() {
        this.display.innerText = this.format(this.times);
	}

	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}
	
	start() {
    if (!this.running) {
        this.running = true;
        this.watch = setInterval(() => this.step(), 10);
    	}
	}

	step() {
    if (!this.running) return;
	    this.calculate();
	    this.print();
	}

	calculate() {
    this.times.miliseconds += 1;
	if (this.times.miliseconds >= 100) {
	    this.times.seconds += 1;
	    this.times.miliseconds = 0;
	    }
	if (this.times.seconds >= 60) {
	    this.times.minutes += 1;
	    this.times.seconds = 0;
	    }
	}

	stop() {
    this.running = false;
    clearInterval(this.watch);
	}

	add() {
    const addResultsList = document.querySelector('.results');
    const addResultItem = document.createElement('li');
    addResultItem.className = 'result';
    addResultsList.appendChild(addResultItem);
    addResultItem.innerHTML = this.display.innerText;
    this.reset();
    this.start();
  }

  resetList() {
    this.reset();
    const resetResultsList = document.querySelector('.results');
    resetResultsList.innerHTML = '';
  }

}

const stopwatch = new Stopwatch(
document.querySelector('.stopwatch'));

const startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

const resetButton = document.getElementById('resetbtn');
resetButton.addEventListener('click', () => stopwatch.reset());

const addToListButton = document.getElementById('add');
addToListButton.addEventListener('click', () => stopwatch.add());

const resetListButton = document.getElementById('reset_list');
resetListButton.addEventListener('click', () => stopwatch.resetList());

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    	return result;
}