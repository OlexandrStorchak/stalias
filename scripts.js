if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js')
window.copyright.innerText = `© ${new Date().getFullYear()} Alias Game`

function navigateHome() { window.location.href = 'index.html' }

function startGame(e) {
  e.target.disabled = true
  const team1Name = document.getElementById('team1-name').value
  const team2Name = document.getElementById('team2-name').value

  if (team1Name && team2Name) {
    localStorage.setItem('team1', team1Name)
    localStorage.setItem('team2', team2Name)

    window.location.href = 'game.html'
  } else {
    alert('Придумайте назви обох команд')
    e.target.disabled = false
  }
}

function gameButtonClick(e) { window.started ? pauseGame(e) : beginGame(e) }

function beforeBegin() {
  window.teamName.innerText = localStorage.getItem('team1')
  if (window.started) {
    window.nextWordbtn.style.display = 'block'
  } else {
    window.nextWordbtn.style.display = 'none'
  }
}

let timerFn

function beginGame(e) {
  e.target.innerText = 'Пауза'
  window.nextWordbtn.style.display = 'block'
  window.started = true
  window.seconds = localStorage.getItem('secondsLeft') || 60
  timerFn = setInterval(() => tick(), 1000)
}

function pauseGame(e) {
  window.started = false
  e.target.innerText = 'Далі'
  localStorage.setItem('secondsLeft', window.seconds)
  clearInterval(timerFn)
}

function tick() {
  window.timer.innerText = seconds
  if (window.seconds <= 0) {
    clearInterval(timerFn)
    console.log("Timer stopped.")
    onTurnEnd()
  } else {
    window.seconds--
  }
}

function onTurnEnd() {
  console.log("Game turn ended.");
  localStorage.removeItem('secondsLeft')
  window.started = false
  window.seconds = 60
  window.beginContinuedbtn.innerText = 'Почати'
}
