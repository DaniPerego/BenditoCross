document.addEventListener('DOMContentLoaded', () => {
  // Ensure all elements are correctly retrieved
  const _toggle = document.getElementById('_toggle');
  const _items = document.getElementById('_items');
  const clockElement = document.getElementById('clock');
  const weightInput = document.getElementById('weight');
  const exerciseSelect = document.getElementById('exercise');
  const calculateButton = document.getElementById('calculate');
  const resultElement = document.getElementById('result');
  const stopwatchElement = document.getElementById('stopwatch');
  const startButton = document.getElementById('start');
  const resetButton = document.getElementById('reset');

  if (_toggle && _items) {
    // ANIMACIÓN BARRA DE NAVEGACIÓN
    _toggle.onclick = () => {
      _items.classList.toggle('open');
      _toggle.classList.toggle('close');
    };
  }

  if (clockElement) {
    // Reloj
    setInterval(updateClock, 1000);
    function updateClock() {
      const now = new Date();
      clockElement.textContent = now.toLocaleTimeString('es-ES');
    }
  }

  if (calculateButton) {
    // Calculadora de RM
    calculateButton.addEventListener('click', calculateRM);
    function calculateRM() {
      const weight = parseFloat(weightInput.value);
      const selectedExercise = exerciseSelect.value;
      if (weight && selectedExercise) {
        let percentages = '';
        let percentage = 95;
        while (percentage >= 30) {
          const rm = weight * (percentage / 100);
          percentages += `${percentage}%: ${rm.toFixed(2)}kg<br>`;
          percentage -= 5;
        }
        resultElement.innerHTML = `Porcentajes de RM para ${selectedExercise}:<br>${percentages}`;
      } else {
        resultElement.textContent = 'Por favor, ingresa el peso y selecciona un ejercicio.';
      }
    }
  }

  if (startButton && resetButton) {
    // Cronómetro y Temporizador
    let stopwatchInterval;
    let stopwatchTime = 0;
    startButton.addEventListener('click', startStopwatch);
    resetButton.addEventListener('click', resetStopwatch);

    function startStopwatch() {
      if (!stopwatchInterval) {
        stopwatchInterval = setInterval(updateStopwatch, 10);
        startButton.textContent = 'Pausar';
      } else {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        startButton.textContent = 'Continuar';
      }
    }

    function updateStopwatch() {
      stopwatchTime += 10;
      stopwatchElement.textContent = formatTime(stopwatchTime);
    }

    function resetStopwatch() {
      clearInterval(stopwatchInterval);
      stopwatchInterval = null;
      stopwatchTime = 0;
      stopwatchElement.textContent = '00:00:00.000';
      startButton.textContent = 'Iniciar';
    }

    function formatTime(time) {
      const hours = Math.floor(time / (60 * 60 * 1000));
      const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((time % (60 * 1000)) / 1000);
      const milliseconds = time % 1000;
      return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}.${padTime(milliseconds
