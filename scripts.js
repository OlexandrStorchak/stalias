if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js')
window.copyright.innerText = `AlexSt © ${new Date().getFullYear()} Alias Game`

// Attach keyboard and accessibility helpers once the UI is ready.
document.addEventListener('DOMContentLoaded', initUiShortcuts)

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
  const word = words.splice(randomIndex, 1)[0]
  return word
}

function onLaunch() {
  loadWords().then(() => {
    const team1 = localStorage.getItem('team1')
    const team2 = localStorage.getItem('team2')
    if (team1 && team2) {
      window.team1Name.value = team1
      window.team2Name.value = team2
      window.continueBtn.style.display = 'block'
    } else {
      setRandomNames()
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
  localStorage.clear()

  if (window.team1Name.value && window.team2Name.value) {
    localStorage.setItem('team1', window.team1Name.value)
    localStorage.setItem('team2', window.team2Name.value)
    window.location.href = 'game.html'
  }
}

function gameButtonClick(e) { window.started ? pauseGame(e) : beginGame(e) }

async function beforeBegin() {
  if (words.length === 0) await loadWords()
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

async function beginGame(e) {
  if (words.length === 0) await loadWords()
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
  window.timer.innerText = window.seconds
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

// UI helpers ---------------------------------------------------------------

function initUiShortcuts() {
  const overlayControls = createShortcutOverlay()
  const filterInput = document.querySelector('[data-filter-input]')
  const quickTargets = Array.from(document.querySelectorAll('[data-quick-index]')).sort(
    (a, b) => parseInt(a.dataset.quickIndex, 10) - parseInt(b.dataset.quickIndex, 10)
  )
  const tabList = document.querySelector('[data-tablist]')
  const tabs = tabList
    ? Array.from(tabList.querySelectorAll('[role="tab"], [data-tab]'))
    : []

  document.addEventListener('keydown', event => {
    if (event.defaultPrevented) return

    const key = event.key
    const isModifierPressed = event.ctrlKey || event.metaKey || event.altKey

    if (key === '?' && !isModifierPressed) {
      event.preventDefault()
      overlayControls.toggle()
      return
    }

    if (overlayControls.isOpen()) {
      if (key === 'Escape') {
        event.preventDefault()
        overlayControls.close()
      }
      return
    }

    const activeElement = event.target
    const typingContext =
      activeElement instanceof HTMLElement &&
      (activeElement.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName))

    if (key === '/' && !event.shiftKey && !isModifierPressed && filterInput) {
      if (!typingContext) event.preventDefault()
      focusElement(filterInput)
      if (typeof filterInput.select === 'function') filterInput.select()
      return
    }

    if (typingContext) return

    if (key === ' ' || key === 'Spacebar') {
      const gameButton = document.getElementById('beginContinuedbtn')
      if (gameButton) {
        event.preventDefault()
        if (isElementInteractive(gameButton)) {
          focusAndClick(gameButton)
        } else if (typeof gameButton.click === 'function') {
          gameButton.click()
        }
        return
      }
      const startButton = quickTargets.find(
        item => parseInt(item.dataset.quickIndex, 10) === 1 && isElementInteractive(item)
      )
      if (startButton) {
        event.preventDefault()
        focusAndClick(startButton)
      }
      return
    }

    if (key === 'n' || key === 'N') {
      const nextButton = document.getElementById('nextWordbtn')
      if (isElementInteractive(nextButton)) {
        event.preventDefault()
        focusAndClick(nextButton)
      }
      return
    }

    if (key === 's' || key === 'S') {
      const skipButton = document.getElementById('skipWordbtn')
      if (isElementInteractive(skipButton)) {
        event.preventDefault()
        focusAndClick(skipButton)
      }
      return
    }

    if (key === 'ArrowLeft') {
      if (moveTabFocus(tabs, -1)) event.preventDefault()
      return
    }

    if (key === 'ArrowRight') {
      if (moveTabFocus(tabs, 1)) event.preventDefault()
      return
    }

    if (/^[1-9]$/.test(key)) {
      const quickTarget = quickTargets.find(
        item => parseInt(item.dataset.quickIndex, 10) === parseInt(key, 10) && isElementInteractive(item)
      )
      if (quickTarget) {
        event.preventDefault()
        focusAndClick(quickTarget)
      }
    }
  })
}

function createShortcutOverlay() {
  const overlay = document.getElementById('shortcutsOverlay')
  if (!overlay) {
    return { open() {}, close() {}, toggle() {}, isOpen: () => false }
  }

  const panel = overlay.querySelector('.shortcuts-panel')
  const closeTargets = overlay.querySelectorAll('[data-shortcuts-close]')
  const openTargets = document.querySelectorAll('[data-shortcuts-open]')
  const rovingItems = Array.from(overlay.querySelectorAll('[data-shortcut-item]'))
  let lastFocused = null
  let activeIndex = 0
  let focusableNodes = []

  // Annotate shortcut toggles for assistive tech and track state.
  openTargets.forEach(trigger => {
    trigger.setAttribute('aria-haspopup', 'dialog')
    trigger.setAttribute('aria-expanded', 'false')
  })

  const focusableSelector = 'button, [href], input, select, textarea, [tabindex]'

  const refreshFocusable = () => {
    if (!panel) {
      focusableNodes = []
      return
    }
    focusableNodes = Array.from(panel.querySelectorAll(focusableSelector)).filter(element => {
      if (!(element instanceof HTMLElement)) return false
      if (element.hasAttribute('disabled')) return false
      if (element.getAttribute('aria-hidden') === 'true') return false
      return element.tabIndex !== -1
    })
  }

  const setRoving = index => {
    rovingItems.forEach((item, idx) => {
      item.tabIndex = idx === index ? 0 : -1
      item.setAttribute('role', 'listitem')
    })
    activeIndex = index
    refreshFocusable()
  }

  setRoving(0)

  const syncTriggerState = expanded => {
    openTargets.forEach(trigger => trigger.setAttribute('aria-expanded', String(expanded)))
  }

  const open = () => {
    if (!overlay.hidden) return
    lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    overlay.hidden = false
    overlay.setAttribute('aria-hidden', 'false')
    document.body.classList.add('shortcuts-open')
    setRoving(0)
    syncTriggerState(true)
    const firstItem = rovingItems[0]
    if (firstItem) focusElement(firstItem)
  }

  const close = () => {
    if (overlay.hidden) return
    overlay.hidden = true
    overlay.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('shortcuts-open')
    syncTriggerState(false)
    focusableNodes = []
    if (lastFocused) focusElement(lastFocused)
  }

  const toggle = () => (overlay.hidden ? open() : close())
  const isOpen = () => !overlay.hidden

  openTargets.forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.preventDefault()
      open()
    })
  })

  closeTargets.forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.preventDefault()
      close()
    })
  })

  overlay.addEventListener('click', event => {
    const target = event.target
    if (target && target.dataset && target.dataset.shortcutsClose !== undefined) close()
  })

  // Keep focus cycling within the modal and allow quick escape.
  overlay.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
    }
    if (event.key === 'Tab' && focusableNodes.length) {
      const first = focusableNodes[0]
      const last = focusableNodes[focusableNodes.length - 1]
      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault()
          focusElement(last)
        }
      } else if (document.activeElement === last) {
        event.preventDefault()
        focusElement(first)
      }
    }
  })

  if (panel) {
    panel.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        if (!rovingItems.length) return
        const direction = event.key === 'ArrowDown' ? 1 : -1
        const nextIndex = (activeIndex + direction + rovingItems.length) % rovingItems.length
        setRoving(nextIndex)
        focusElement(rovingItems[nextIndex])
      }
    })
  }

  return { open, close, toggle, isOpen }
}

function moveTabFocus(tabs, direction) {
  if (!tabs || !tabs.length) return false

  let currentIndex = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true' || tab.classList.contains('is-active'))
  if (currentIndex < 0) currentIndex = 0

  const nextIndex = (currentIndex + direction + tabs.length) % tabs.length
  const nextTab = tabs[nextIndex]
  if (nextTab) {
    focusElement(nextTab)
    if (typeof nextTab.click === 'function') nextTab.click()
    return true
  }
  return false
}

function isElementInteractive(element) {
  if (!(element instanceof HTMLElement) || element.disabled) return false
  if (element.offsetParent !== null) return true
  const rect = element.getBoundingClientRect()
  return rect.width > 0 && rect.height > 0
}

function focusElement(element) {
  if (!(element instanceof HTMLElement)) return
  if (typeof element.focus === 'function') {
    try {
      element.focus({ preventScroll: true })
    } catch (err) {
      element.focus()
    }
  }
}

function focusAndClick(element) {
  if (!(element instanceof HTMLElement)) return
  focusElement(element)
  if (typeof element.click === 'function') element.click()
}
