if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js')
window.copyright.innerText = `© ${new Date().getFullYear()} Alias Game`

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

const words = [
  "море", "сонце", "книга", "дім", "мама", "тато", "школа", "дорога", "кава", "дівчина",
  "хліб", "молоко", "кіт", "собака", "яблуко", "вітер", "дощ", "весна", "літо", "осінь",
  "зима", "парк", "лист", "пензель", "фарба", "перо", "рука", "нога", "вухо", "око",
  "нос", "губа", "зуби", "шкіра", "квітка", "дерево", "ліс", "гора", "річка", "озеро",
  "міст", "автомобіль", "велосипед", "літак", "поїзд", "човен", "колесо", "вікно", "двері", "стіл",
  "стілець", "ліжко", "шафа", "ковдра", "подушка", "ковбаса", "м'ясо", "риба", "овочі",
  "фрукти", "сіль", "цукор", "масло", "хліб", "картопля", "макарони", "суп", "сік", "кава",
  "чай", "вино", "пиво", "вода", "сік", "сир", "мед", "морозиво", "торт",
  "цукерки", "вареники", "пиріжки", "борщ", "салат", "соус", "масло", "олія", "хліб",
  "піца", "бургер", "сендвіч", "попкорн", "чіпси", "шоколад", "мармелад", "медальйон", "космос",
  "зірка", "планета"
]

function getRandomTeamName() {
  const randomIndex = Math.floor(Math.random() * teamNames.length)
  const team = [...teamNames].splice(randomIndex, 1)[0]
  return team
}

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length)
  const word = [...words].splice(randomIndex, 1)[0]
  return word
}

function onLaunch() {
  setRandomNames()
  if (localStorage.getItem('team1') != null || localStorage.getItem('team2') != null) {
    window.continueBtn.style.display = 'block'
  } else {
    window.continueBtn.style.display = 'none'
  }
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
  window.timer.style.visibility = 'visible'
  window.nextWordbtn.style.display = 'block'
  window.started = true
  window.seconds = localStorage.getItem('secondsLeft') || 59
  timerFn = setInterval(() => tick(), 1000)
  window.word.style.visibility = 'visible'
  if (window.started && !window.paused) {
    window.word.innerText = getRandomWord()
    // window.skipWordbtn.style.display = 'block'
  }
  if (!window.started && window.seconds <= 0) onTurnEnd()
}

function nextWord(e) {
  window.word.innerText = getRandomWord()
  const score = localStorage.getItem(`${window.activeTeam}_score`) || 0
  localStorage.setItem(`${window.activeTeam}_score`, parseInt(score) + 1)
  window.teamScore.innerText = ` (${localStorage.getItem(`${window.activeTeam}_score`)})`
  if (!window.started) onTurnEnd()
}

function pauseGame(e) {
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
  window.seconds = 60
  window.beginContinuedbtn.style.display = 'none'
}

function onTurnEnd() {
  changeActiveTeam()
  window.beginContinuedbtn.innerText = 'Почати'
  window.beginContinuedbtn.style.display = 'block'
  window.word.style.display = 'none'
  window.timer.style.visibility = 'hidden'
  beforeBegin()
}

function changeActiveTeam() {
  if (window.activeTeam === localStorage.getItem('team1')) {
    window.activeTeam = localStorage.getItem('team2')
  } else {
    window.activeTeam = localStorage.getItem('team1')
  }
}


function endGame() {
  if (window.confirm("Завершити гру?")) {
    localStorage.clear()
    window.location.href = 'index.html'
  }
}