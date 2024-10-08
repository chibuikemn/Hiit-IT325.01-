// script.js
let interval;
let currentSet = 0;
let currentCycle = 0;
let totalTime = 0;
let isRunning = false;
let workTime, restTime, sets, cycles;
const beepSound = document.getElementById('beep-sound');
const totalTimeElement = document.getElementById('total-time');

document.getElementById('start-button').addEventListener('click', startWorkout);
document.getElementById('stop-button').addEventListener('click', stopWorkout);

function startWorkout() {
    if (isRunning) return;

    // Get the settings from the user
    workTime = parseInt(document.getElementById('work-time').value, 10);
    restTime = parseInt(document.getElementById('rest-time').value, 10);
    sets = parseInt(document.getElementById('sets').value, 10);
    cycles = parseInt(document.getElementById('cycles').value, 10);

    // Calculate total workout time
    totalTime = (workTime + restTime) * sets * cycles;
    totalTimeElement.value = `${totalTime / 60} min`;

    currentSet = 0;
    currentCycle = 0;
    isRunning = true;
    runTimer(workTime, 'Work', 'work-timer');
}

function runTimer(time, phase, timerClass) {
    let timeLeft = time;
    document.getElementById('current-interval').textContent = phase;
    document.getElementById('timer').className = timerClass;
    updateTimerDisplay(timeLeft);

    interval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(interval);
            beepSound.play(); // Play sound

            if (phase === 'Work') {
                currentSet++;
                if (currentSet >= sets) {
                    currentSet = 0;
                    currentCycle++;
                    if (currentCycle >= cycles) {
                        stopWorkout();
                        return;
                    }
                }
                runTimer(restTime, 'Rest', 'rest-timer');
            } else {
                runTimer(workTime, 'Work', 'work-timer');
            }
        }
    }, 1000);
}

function updateTimerDisplay(time) {
    document.getElementById('timer').textContent = time.toString().padStart(2, '0') + ':00';
}

function stopWorkout() {
    clearInterval(interval);
    isRunning = false;
    document.getElementById('timer').textContent = '00:00';
    document.getElementById('current-interval').textContent = 'Stopped';
}
