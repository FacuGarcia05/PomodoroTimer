const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");
const add = document.getElementById("add");
const sub = document.getElementById("sub");
const sessionEl = document.getElementById("session");

const helpBtn = document.getElementById("help-btn");
const helpText = document.getElementById("help-text");
const helpPopup = document.getElementById("help-popup");
const langToggle = document.getElementById("lang-toggle");
const closeHelp = document.getElementById("close-help");

let timeLeft = 1500;
let interval;
let sessionCount = 1;
let onBreak = false;

const helpMessages = {
  en: `1. Make a to-do list for today, ordered by priority.
2. Choose a task to work on and start a 25-minute 'Pomodoro' session. (You can add more if you like!)
3. After the session, take a moment to review what you’ve achieved and mark it as completed.
4. Take a 5-minute break.
5. Complete 3 more ‘Pomodoros’ by repeating steps 2 to 4.
6. After 4 ‘Pomodoros,’ take a longer break of 15 to 30 minutes.
7. Repeat the cycle and track how many ‘Pomodoro’ sessions you need to finish a task.
By tracking your sessions, you’ll be able to plan your schedule more effectively. The next time you have similar tasks, create a calendar and use your past records to estimate how many ‘Pomodoro’ sessions they will take to complete.`,
  es: `1.Haz una lista de las tareas que debas realizar para hoy ordenada según las prioridades. 
2. Elige una tarea para trabajar e inicia una sesión ‘pomodoro’ de 25 minutos. (Puedes agregar mas si quieres!)
3. Después de la sesión, presta atención a lo que has logrado y márcalo como cumplido.
4. Tómate un descanso de 5 minutos. 
5. Haz 3 ‘pomodoros’ más, repitiendo los pasos 2 a 4.  
6. Después de 4 ‘pomodoros’, tómate un descanso de entre 15 y 30 minutos.
7. Repite el ciclo y registra cuántas sesiones ‘pomodoro’ necesitas para finalizar una tarea.
Si registras la cantidad de sesiones ‘pomodoro’ que haces, podrás planificar mejor tu cronograma. La próxima vez que tengas tareas similares, crea un calendario y usa los registros anteriores para estimar cuántas sesiones ‘pomodoro’ te tomará finalizar esas tareas.`,
};
let currentLang = "en";

function updateHelp() {
  helpText.textContent = helpMessages[currentLang];
  langToggle.textContent = currentLang === "en" ? "ES" : "EN";
}

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "es" : "en";
  updateHelp();
});

helpBtn.addEventListener("click", () => {
  helpPopup.style.display =
    helpPopup.style.display === "none" ? "block" : "none";
});

closeHelp.addEventListener("click", () => {
  helpPopup.style.display = "none";
});

updateHelp();

const updateTimer = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timer.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const updateSession = () => {
  sessionEl.textContent = `Session: ${sessionCount}`;
};

const handlePeriodEnd = () => {
  clearInterval(interval);
  if (!onBreak) {
    onBreak = true;
    timeLeft = 300;
    startTimer();
  } else {
    sessionCount++;
    updateSession();
    if (sessionCount > 4) {
      alert(
        "You’ve crushed your 4th round! Your brain has worked hard—now give it some love with a long break. (15 to 30 minutes)",
      );
      sessionCount = 1;
      updateSession();
      onBreak = false;
      timeLeft = 1500;
      updateTimer();
    } else {
      onBreak = false;
      timeLeft = 1500;
      startTimer();
    }
  }
};

const startTimer = () => {
  clearInterval(interval);
  interval = setInterval(() => {
    if (timeLeft <= 0) {
      timeLeft = 0;
      updateTimer();
      handlePeriodEnd();
    } else {
      timeLeft--;
      updateTimer();
    }
  }, 1000);
};

const stopTimer = () => clearInterval(interval);

const resetTimer = () => {
  clearInterval(interval);
  timeLeft = 1500;
  onBreak = false;
  sessionCount = 1;
  updateTimer();
  updateSession();
};

const addTimer = () => {
  timeLeft += 300;
  updateTimer();
};

const subTimer = () => {
  if (timeLeft >= 300) {
    timeLeft -= 300;
    updateTimer();
  }
};

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);
add.addEventListener("click", addTimer);
sub.addEventListener("click", subTimer);
