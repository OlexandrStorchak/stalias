if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js')
window.copyright.innerText = `AlexSt © ${new Date().getFullYear()} Alias Game`

const SECONDS = 59
const WINRATE = 60

const teamNames = [
  "Динаміка", "Блискавка", "Орли", "Титани", "Леви", "Ведмеді", "Соколи", "Кобри", "Штурмовики", "Дракони",
  "Фенікси", "Гладіатори", "Яструби", "Молоти", "Зірки", "Пантера", "Ракети", "Громові", "Вікінги", "Самураї",
  "Вовки", "Зубри", "Кречети", "Вершники", "Рейнджери", "Легенди", "Соколи", "Орбіта", "Комета", "Торнадо",
  "Ліга", "Борці", "Стрільці", "Фурія", "Карателі", "Кіборги", "Атоми", "Валкірії", "Ведмежата", "Кречети",
  "Ягуари", "Патріоти", "Завойовники", "Супутники", "Пірати", "Акули", "Тигри", "Леви", "Грифони", "Чорти",
  "Рицарі", "Армія", "Інквізитори", "Деспоти", "Хижаки", "Соколи", "Ворони", "Альянс", "Флот", "Сталевари",
  "Буревій", "Привиди", "Чемпіони", "Еліта", "Прометей", "Легіон", "Титани", "Герої", "Варвари", "Генерали",
  "Циклони", "Трибуна", "Чемпіони", "Орли", "Бунтівники", "Трибуна", "Метеори", "Сила", "Арена", "Рейнджери",
  "Фурія", "Мрія", "Перемога", "Зірка", "Кристал", "Промінь", "Світло", "Магніт", "Галактика", "Альфа",
  "Бета", "Гамма", "Омега", "Пульсар", "Парадокс", "Атлант", "Сталкер", "Сингулярність", "Нова", "Супернова"
]

let words = []

async function loadWords() {
  await dbSeedWords();
  const all = await dbGetAllWords();
  words = all.map(w => w.word);
}

function getRandomTeamName() {
  const randomIndex = Math.floor(Math.random() * teamNames.length)
  const team = [...teamNames].splice(randomIndex, 1)[0]
  return team
}

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length)
  const word = words.splice(randomIndex, 1)
  return word
}

function onLaunch() {
  loadWords().then(() => {
    setRandomNames()
    if (localStorage.getItem('team1') != null || localStorage.getItem('team2') != null) {
      window.continueBtn.style.display = 'block'
    } else {
      window.continueBtn.style.display = 'none'
    }
  })
}

function setRandomNames() {
  window.team1Name.value = getRandomTeamName()
  window.team2Name.value = getRandomTeamName()
}

function navigateHome() { window.location.href = 'index.html' }

function continueGame() { window.location.href = 'game.html' }

function startGame() {
  if (localStorage.getItem('team1') != null || localStorage.getItem('team2') != null) {
    if (window.confirm("Почати нову гру?")) {
      newGame()
    }
  } else {
    newGame()
  }
}

function newGame() {
  localStorage.clear

  if (window.team1Name.value && window.team2Name.value) {
    localStorage.setItem('team1', window.team1Name.value)
    localStorage.setItem('team2', window.team2Name.value)
    window.location.href = 'game.html'
  }
}

function gameButtonClick(e) { window.started ? pauseGame(e) : beginGame(e) }

function beforeBegin() {
  if (window.activeTeam === undefined) window.activeTeam = localStorage.getItem('team1')
  window.teamName.innerText = window.activeTeam || localStorage.getItem('team1')
  window.teamScore.innerText = ` (${localStorage.getItem(`${window.activeTeam}_score`)})`

  if (localStorage.getItem(`${window.activeTeam}_score`) == null) window.teamScore.innerText = '(0)'

  if (window.started) {
    window.nextWordbtn.style.display = 'block'
    window.skipWordbtn.style.display = 'block'
  } else {
    window.nextWordbtn.style.display = 'none'
    window.skipWordbtn.style.display = 'none'
  }
}

let timerFn

function beginGame(e) {
  e.target.innerText = 'Пауза'
  window.nextWordbtn.disabled = false
  window.timer.style.visibility = 'visible'
  window.nextWordbtn.style.display = 'block'
  window.seconds = localStorage.getItem('secondsLeft') || SECONDS
  timerFn = setInterval(() => tick(), 1000)
  window.word.style.visibility = 'visible'
  if (!window.started && !window.paused) {
    window.word.innerText = getRandomWord()
    window.word.style.visibility = 'visible'
  }
  if (window.started && window.seconds <= 0) onTurnEnd()
  window.started = true
}

function nextWord(e) {
  window.word.innerText = getRandomWord()
  const score = localStorage.getItem(`${window.activeTeam}_score`) || 0
  localStorage.setItem(`${window.activeTeam}_score`, parseInt(score) + 1)
  window.teamScore.innerText = ` (${localStorage.getItem(`${window.activeTeam}_score`)})`
  if (!window.started) onTurnEnd()
}

function pauseGame(e) {
  window.nextWordbtn.disabled = true
  window.started = false
  window.paused = true
  window.word.style.visibility = 'hidden'
  e.target.innerText = 'Далі'
  localStorage.setItem('secondsLeft', window.seconds)
  clearInterval(timerFn)
}

function tick() {
  window.timer.innerText = seconds
  if (window.seconds <= 0) {
    clearInterval(timerFn)
    onSecondsEnd()
  } else {
    window.seconds--
  }
}

function onSecondsEnd() {
  localStorage.removeItem('secondsLeft')
  window.started = false
  window.seconds = SECONDS
  window.beginContinuedbtn.style.display = 'none'
}

function onTurnEnd() {
  changeActiveTeam()
  if (checkForVictory()) return
  window.beginContinuedbtn.innerText = 'Почати'
  window.beginContinuedbtn.style.display = 'block'
  window.word.style.visibility = 'hidden'
  window.timer.style.visibility = 'hidden'
  beforeBegin()
}

function changeActiveTeam() {
  window.endRound = false
  if (window.activeTeam === localStorage.getItem('team1')) {
    window.activeTeam = localStorage.getItem('team2')
  } else {
    window.activeTeam = localStorage.getItem('team1')
    window.endRound = true
  }
}

function checkForVictory() {
  const team1 = localStorage.getItem('team1')
  const team2 = localStorage.getItem('team2')
  const team1score = parseInt(localStorage.getItem(`${team1}_score`))
  const team2score = parseInt(localStorage.getItem(`${team2}_score`))
  if (((team1score >= WINRATE) || (team2score >= WINRATE)) && window.endRound) {
    window.results.open = true
    window.teamWinnerName.innerText = team1
    window.teamWinnerScore.innerText = `(${team1score})`
    window.teamLoserName.innerText = team2
    window.teamLoserScore.innerText = `(${team2score})`
    document.querySelector('.team-title').remove()
    document.querySelector('.word').remove()
    document.querySelector('.timer').remove()
    document.querySelector('.game-content').remove()
    return true
  }
}

function endGame() {
  if (window.confirm("Завершити гру?")) {
    localStorage.clear()
    window.location.href = 'index.html'
  }
}

function gameOver() {
  localStorage.clear()
  window.location.href = 'index.html'
}
