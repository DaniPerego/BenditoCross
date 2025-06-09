document.addEventListener('DOMContentLoaded', () => {
  const _toggle = document.getElementById('_toggle');
  const _items = document.getElementById('_items');
  const clockElement = document.getElementById('clock');
  const weightInput = document.getElementById('weight');
  const exerciseSelect = document.getElementById('exercise');
  const calculateButton = document.getElementById('calculate');
  const resultElement = document.getElementById('result');

  // Cronómetro
  const stopwatchElement = document.getElementById('stopwatch');
  const startButton = document.getElementById('start');
  const resetButton = document.getElementById('reset');

  let interval;
  let milliseconds = 0;

  // ANIMACION BARRA DE NAVEGACIÓN
  _toggle.onclick = () => {
    _items.classList.toggle('open');
    _toggle.classList.toggle('close');
  };

  // Reloj
  setInterval(updateClock, 1000);
  function updateClock() {
    const now = new Date();
    clockElement.textContent = now.toLocaleTimeString('es-ES');
  }

  // Calculadora de RM
  calculateButton.addEventListener('click', calculateRM);
  function calculateRM() {
    const weight = parseFloat(weightInput.value);
    const selectedExercise = exerciseSelect.value;
    if (weight && selectedExercise) {
      let percentages = '';
      let percentage = 95;
      while (percentage >= 30) {
        percentages += `${percentage}%: ${weight * (percentage / 100)} kg\n`;
        percentage -= 5;
      }
      resultElement.textContent = percentages;
    } else {
      resultElement.textContent = 'Por favor, introduce el peso y selecciona un ejercicio.';
    }
  }

  // Funciones del cronómetro
  function startStopwatch() {
    clearInterval(interval);
    interval = setInterval(updateStopwatch, 1);
  }

  function updateStopwatch() {
    milliseconds += 1;
    let date = new Date(milliseconds);
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
    let millis = date.getUTCMilliseconds();

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    millis = millis < 100 ? (millis < 10 ? '00' + millis : '0' + millis) : millis;

    stopwatchElement.textContent = `${minutes}:${seconds}:${millis}`;
  }

  function resetStopwatch() {
    clearInterval(interval);
    milliseconds = 0;
    stopwatchElement.textContent = '00:00:00.000';
  }

  // Event listeners para el cronómetro
  startButton.addEventListener('click', startStopwatch);
  resetButton.addEventListener('click', resetStopwatch);
});
