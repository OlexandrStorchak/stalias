if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js')
window.copyright.innerText = `© ${new Date().getFullYear()} Alias Game`

const SECONDS = 59

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
  "зірка", "планета",
  "вода", "сонце", "земля", "дерево", "пташка", "трава", "небо", "море", "камінь", "гора",
  "дитина", "школа", "книга", "ліс", "мама", "тато", "село", "місто", "квітка", "літо",
  "зима", "весна", "осінь", "дощ", "сніг", "вітер", "хмара", "світло", "темрява", "ніч",
  "день", "ранок", "вечір", "година", "хвилина", "секунда", "тиждень", "місяць", "рік", "століття",
  "друг", "подруга", "любов", "радість", "сум", "щастя", "злість", "страх", "смуток", "радість",
  "річка", "озеро", "море", "океан", "пляж", "берег", "острів", "півострів", "гори", "долина",
  "стіл", "стілець", "шафа", "ліжко", "стеля", "стіна", "підлога", "вікно", "двері", "замок",
  "кіт", "собака", "птах", "риба", "корова", "кінь", "вівця", "коза", "свиня", "курка",
  "яблуко", "груша", "слива", "абрикос", "персик", "вишня", "черешня", "полуниця", "малина", "агрус",
  "капуста", "морква", "буряк", "картопля", "цибуля", "часник", "огірок", "помідор", "перець", "баклажан",
  "лікарня", "аптека", "школа", "університет", "театр", "кінотеатр", "музей", "бібліотека", "пошта", "банк",
  "машина", "автобус", "тролейбус", "трамвай", "поїзд", "літак", "корабель", "велосипед", "мотоцикл", "скутер",
  "хліб", "молоко", "масло", "сир", "м'ясо", "ковбаса", "риба", "яйце", "борщ", "суп",
  "чай", "кава", "сік", "вода", "компот", "лимонад", "мед", "цукор", "сіль", "перець",
  "газета", "журнал", "книга", "зошит", "ручка", "олівець", "фломастер", "гумка", "лінійка", "ножиці",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "телевізор", "радіо", "комп'ютер", "ноутбук", "телефон", "смартфон", "планшет", "принтер", "сканер", "факс",
  "ручка", "олівець", "фломастер", "гумка", "лінійка", "ножиці", "папір", "зошит", "клей", "фарби",
  "лікар", "медсестра", "вчитель", "викладач", "інженер", "будівельник", "продавець", "офіціант", "кухар", "пекар",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "м'яч", "шайба", "ракетка", "ковзани", "велосипед", "лижі", "сноуборд", "ролики", "шахи", "шашки",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "дитина", "мама", "тато", "брат", "сестра", "бабуся", "дідусь", "дядько", "тітка", "кузен",
  "яблуко", "груша", "слива", "абрикос", "персик", "вишня", "черешня", "полуниця", "малина", "агрус",
  "кіт", "собака", "птах", "риба", "корова", "кінь", "вівця", "коза", "свиня", "курка",
  "день", "ніч", "ранок", "вечір", "година", "хвилина", "секунда", "тиждень", "місяць", "рік",
  "стіл", "стілець", "шафа", "ліжко", "стеля", "стіна", "підлога", "вікно", "двері", "замок",
  "газета", "журнал", "книга", "зошит", "ручка", "олівець", "фломастер", "гумка", "лінійка", "ножиці",
  "чай", "кава", "сік", "вода", "компот", "лимонад", "мед", "цукор", "сіль", "перець",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "лікар", "медсестра", "вчитель", "викладач", "інженер", "будівельник", "продавець", "офіціант", "кухар", "пекар",
  "машина", "автобус", "тролейбус", "трамвай", "поїзд", "літак", "корабель", "велосипед", "мотоцикл", "скутер",
  "м'яч", "шайба", "ракетка", "ковзани", "велосипед", "лижі", "сноуборд", "ролики", "шахи", "шашки",
  "річка", "озеро", "море", "океан", "пляж", "берег", "острів", "півострів", "гори", "долина",
  "яблуко", "груша", "слива", "абрикос", "персик", "вишня", "черешня", "полуниця", "малина", "агрус",
  "капуста", "морква", "буряк", "картопля", "цибуля", "часник", "огірок", "помідор", "перець", "баклажан",
  "дитина", "мама", "тато", "брат", "сестра", "бабуся", "дідусь", "дядько", "тітка", "кузен",
  "лікарня", "аптека", "школа", "університет", "театр", "кінотеатр", "музей", "бібліотека", "пошта", "банк",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "вода", "сонце", "земля", "дерево", "пташка", "трава", "небо", "море", "камінь", "гора",
  "м'яч", "шайба", "ракетка", "ковзани", "велосипед", "лижі", "сноуборд", "ролики", "шахи", "шашки",
  "газета", "журнал", "книга", "зошит", "ручка", "олівець", "фломастер", "гумка", "лінійка", "ножиці",
  "чай", "кава", "сік", "вода", "компот", "лимонад", "мед", "цукор", "сіль", "перець",
  "машина", "автобус", "тролейбус", "трамвай", "поїзд", "літак", "корабель", "велосипед", "мотоцикл", "скутер",
  "лікар", "медсестра", "вчитель", "викладач", "інженер", "будівельник", "продавець", "офіціант", "кухар", "пекар",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "кіт", "собака", "птах", "риба", "корова", "кінь", "вівця", "коза", "свиня", "курка",
  "день", "ніч", "ранок", "вечір", "година", "хвилина", "секунда", "тиждень", "місяць", "рік",
  "річка", "озеро", "море", "океан", "пляж", "берег", "острів", "півострів", "гори", "долина",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "яблуко", "груша", "слива", "абрикос", "персик", "вишня", "черешня", "полуниця", "малина", "агрус",
  "вода", "сонце", "земля", "дерево", "пташка", "трава", "небо", "море", "камінь", "гора",
  "дитина", "школа", "книга", "ліс", "мама", "тато", "село", "місто", "квітка", "літо",
  "дитина", "мама", "тато", "брат", "сестра", "бабуся", "дідусь", "дядько", "тітка", "кузен",
  "капуста", "морква", "буряк", "картопля", "цибуля", "часник", "огірок", "помідор", "перець", "баклажан",
  "лікарня", "аптека", "школа", "університет", "театр", "кінотеатр", "музей", "бібліотека", "пошта", "банк",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "телевізор", "радіо", "комп'ютер", "ноутбук", "телефон", "смартфон", "планшет", "принтер", "сканер", "факс",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "лікар", "медсестра", "вчитель", "викладач", "інженер", "будівельник", "продавець", "офіціант", "кухар", "пекар",
  "кіт", "собака", "птах", "риба", "корова", "кінь", "вівця", "коза", "свиня", "курка",
  "вода", "сонце", "земля", "дерево", "пташка", "трава", "небо", "море", "камінь", "гора",
  "машина", "автобус", "тролейбус", "трамвай", "поїзд", "літак", "корабель", "велосипед", "мотоцикл", "скутер",
  "дитина", "школа", "книга", "ліс", "мама", "тато", "село", "місто", "квітка", "літо",
  "м'яч", "шайба", "ракетка", "ковзани", "велосипед", "лижі", "сноуборд", "ролики", "шахи", "шашки",
  "чай", "кава", "сік", "вода", "компот", "лимонад", "мед", "цукор", "сіль", "перець",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "лікарня", "аптека", "школа", "університет", "театр", "кінотеатр", "музей", "бібліотека", "пошта", "банк",
  "день", "ніч", "ранок", "вечір", "година", "хвилина", "секунда", "тиждень", "місяць", "рік",
  "стіл", "стілець", "шафа", "ліжко", "стеля", "стіна", "підлога", "вікно", "двері", "замок",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "газета", "журнал", "книга", "зошит", "ручка", "олівець", "фломастер", "гумка", "лінійка", "ножиці",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "річка", "озеро", "море", "океан", "пляж", "берег", "острів", "півострів", "гори", "долина",
  "яблуко", "груша", "слива", "абрикос", "персик", "вишня", "черешня", "полуниця", "малина", "агрус",
  "капуста", "морква", "буряк", "картопля", "цибуля", "часник", "огірок", "помідор", "перець", "баклажан",
  "кіт", "собака", "птах", "риба", "корова", "кінь", "вівця", "коза", "свиня", "курка",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "дитина", "мама", "тато", "брат", "сестра", "бабуся", "дідусь", "дядько", "тітка", "кузен",
  "м'яч", "шайба", "ракетка", "ковзани", "велосипед", "лижі", "сноуборд", "ролики", "шахи", "шашки",
  "машина", "автобус", "тролейбус", "трамвай", "поїзд", "літак", "корабель", "велосипед", "мотоцикл", "скутер",
  "лікарня", "аптека", "школа", "університет", "театр", "кінотеатр", "музей", "бібліотека", "пошта", "банк",
  "чай", "кава", "сік", "вода", "компот", "лимонад", "мед", "цукор", "сіль", "перець",
  "день", "ніч", "ранок", "вечір", "година", "хвилина", "секунда", "тиждень", "місяць", "рік",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "газета", "журнал", "книга", "зошит", "ручка", "олівець", "фломастер", "гумка", "лінійка", "ножиці",
  "дитина", "школа", "книга", "ліс", "мама", "тато", "село", "місто", "квітка", "літо",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "лікар", "медсестра", "вчитель", "викладач", "інженер", "будівельник", "продавець", "офіціант", "кухар", "пекар",
  "лікарня", "аптека", "школа", "університет", "театр", "кінотеатр", "музей", "бібліотека", "пошта", "банк",
  "дитина", "мама", "тато", "брат", "сестра", "бабуся", "дідусь", "дядько", "тітка", "кузен",
  "день", "ніч", "ранок", "вечір", "година", "хвилина", "секунда", "тиждень", "місяць", "рік",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "лікар", "медсестра", "вчитель", "викладач", "інженер", "будівельник", "продавець", "офіціант", "кухар", "пекар",
  "вода", "сонце", "земля", "дерево", "пташка", "трава", "небо", "море", "камінь", "гора",
  "телевізор", "радіо", "комп'ютер", "ноутбук", "телефон", "смартфон", "планшет", "принтер", "сканер", "факс",
  "машина", "автобус", "тролейбус", "трамвай", "поїзд", "літак", "корабель", "велосипед", "мотоцикл", "скутер",
  "кіт", "собака", "птах", "риба", "корова", "кінь", "вівця", "коза", "свиня", "курка",
  "дитина", "мама", "тато", "брат", "сестра", "бабуся", "дідусь", "дядько", "тітка", "кузен",
  "день", "ніч", "ранок", "вечір", "година", "хвилина", "секунда", "тиждень", "місяць", "рік",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "річка", "озеро", "море", "океан", "пляж", "берег", "острів", "півострів", "гори", "долина",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "лікарня", "аптека", "школа", "університет", "театр", "кінотеатр", "музей", "бібліотека", "пошта", "банк",
  "газета", "журнал", "книга", "зошит", "ручка", "олівець", "фломастер", "гумка", "лінійка", "ножиці",
  "вода", "сонце", "земля", "дерево", "пташка", "трава", "небо", "море", "камінь", "гора",
  "капуста", "морква", "буряк", "картопля", "цибуля", "часник", "огірок", "помідор", "перець", "баклажан",
  "яблуко", "груша", "слива", "абрикос", "персик", "вишня", "черешня", "полуниця", "малина", "агрус",
  "дитина", "мама", "тато", "брат", "сестра", "бабуся", "дідусь", "дядько", "тітка", "кузен",
  "стіл", "стілець", "шафа", "ліжко", "стеля", "стіна", "підлога", "вікно", "двері", "замок",
  "лікар", "медсестра", "вчитель", "викладач", "інженер", "будівельник", "продавець", "офіціант", "кухар", "пекар",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "машина", "автобус", "тролейбус", "трамвай", "поїзд", "літак", "корабель", "велосипед", "мотоцикл", "скутер",
  "вода", "сонце", "земля", "дерево", "пташка", "трава", "небо", "море", "камінь", "гора",
  "м'яч", "шайба", "ракетка", "ковзани", "велосипед", "лижі", "сноуборд", "ролики", "шахи", "шашки",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "яблуко", "груша", "слива", "абрикос", "персик", "вишня", "черешня", "полуниця", "малина", "агрус",
  "кіт", "собака", "птах", "риба", "корова", "кінь", "вівця", "коза", "свиня", "курка",
  "вода", "сонце", "земля", "дерево", "пташка", "трава", "небо", "море", "камінь", "гора",
  "дитина", "школа", "книга", "ліс", "мама", "тато", "село", "місто", "квітка", "літо",
  "капуста", "морква", "буряк", "картопля", "цибуля", "часник", "огірок", "помідор", "перець", "баклажан",
  "м'яч", "шайба", "ракетка", "ковзани", "велосипед", "лижі", "сноуборд", "ролики", "шахи", "шашки",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "газета", "журнал", "книга", "зошит", "ручка", "олівець", "фломастер", "гумка", "лінійка", "ножиці",
  "вода", "сонце", "земля", "дерево", "пташка", "трава", "небо", "море", "камінь", "гора",
  "яблуко", "груша", "слива", "абрикос", "персик", "вишня", "черешня", "полуниця", "малина", "агрус",
  "капуста", "морква", "буряк", "картопля", "цибуля", "часник", "огірок", "помідор", "перець", "баклажан",
  "лікарня", "аптека", "школа", "університет", "театр", "кінотеатр", "музей", "бібліотека", "пошта", "банк",
  "м'яч", "шайба", "ракетка", "ковзани", "велосипед", "лижі", "сноуборд", "ролики", "шахи", "шашки",
  "капуста", "морква", "буряк", "картопля", "цибуля", "часник", "огірок", "помідор", "перець", "баклажан",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "газета", "журнал", "книга", "зошит", "ручка", "олівець", "фломастер", "гумка", "лінійка", "ножиці",
  "капуста", "морква", "буряк", "картопля", "цибуля", "часник", "огірок", "помідор", "перець", "баклажан",
  "вода", "сонце", "земля", "дерево", "пташка", "трава", "небо", "море", "камінь", "гора",
  "лікар", "медсестра", "вчитель", "викладач", "інженер", "будівельник", "продавець", "офіціант", "кухар", "пекар",
  "лікарня", "аптека", "школа", "університет", "театр", "кінотеатр", "музей", "бібліотека", "пошта", "банк",
  "дитина", "мама", "тато", "брат", "сестра", "бабуся", "дідусь", "дядько", "тітка", "кузен",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "м'яч", "шайба", "ракетка", "ковзани", "велосипед", "лижі", "сноуборд", "ролики", "шахи", "шашки",
  "газета", "журнал", "книга", "зошит", "ручка", "олівець", "фломастер", "гумка", "лінійка", "ножиці",
  "лікар", "медсестра", "вчитель", "викладач", "інженер", "будівельник", "продавець", "офіціант", "кухар", "пекар",
  "вода", "сонце", "земля", "дерево", "пташка", "трава", "небо", "море", "камінь", "гора",
  "річка", "озеро", "море", "океан", "пляж", "берег", "острів", "півострів", "гори", "долина",
  "лікарня", "аптека", "школа", "університет", "театр", "кінотеатр", "музей", "бібліотека", "пошта", "банк",
  "дитина", "мама", "тато", "брат", "сестра", "бабуся", "дідусь", "дядько", "тітка", "кузен",
  "яблуко", "груша", "слива", "абрикос", "персик", "вишня", "черешня", "полуниця", "малина", "агрус",
  "кіт", "собака", "птах", "риба", "корова", "кінь", "вівця", "коза", "свиня", "курка",
  "дитина", "мама", "тато", "брат", "сестра", "бабуся", "дідусь", "дядько", "тітка", "кузен",
  "машина", "автобус", "тролейбус", "трамвай", "поїзд", "літак", "корабель", "велосипед", "мотоцикл", "скутер",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "лікар", "медсестра", "вчитель", "викладач", "інженер", "будівельник", "продавець", "офіціант", "кухар", "пекар",
  "дитина", "школа", "книга", "ліс", "мама", "тато", "село", "місто", "квітка", "літо",
  "м'яч", "шайба", "ракетка", "ковзани", "велосипед", "лижі", "сноуборд", "ролики", "шахи", "шашки",
  "вода", "сонце", "земля", "дерево", "пташка", "трава", "небо", "море", "камінь", "гора",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "газета", "журнал", "книга", "зошит", "ручка", "олівець", "фломастер", "гумка", "лінійка", "ножиці",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "лікарня", "аптека", "школа", "університет", "театр", "кінотеатр", "музей", "бібліотека", "пошта", "банк",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "яблуко", "груша", "слива", "абрикос", "персик", "вишня", "черешня", "полуниця", "малина", "агрус",
  "телевізор", "радіо", "комп'ютер", "ноутбук", "телефон", "смартфон", "планшет", "принтер", "сканер", "факс",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "лікар", "медсестра", "вчитель", "викладач", "інженер", "будівельник", "продавець", "офіціант", "кухар", "пекар",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "вода", "сонце", "земля", "дерево", "пташка", "трава", "небо", "море", "камінь", "гора",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "м'яч", "шайба", "ракетка", "ковзани", "велосипед", "лижі", "сноуборд", "ролики", "шахи", "шашки",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "вода", "сонце", "земля", "дерево", "пташка", "трава", "небо", "море", "камінь", "гора",
  "телевізор", "радіо", "комп'ютер", "ноутбук", "телефон", "смартфон", "планшет", "принтер", "сканер", "факс",
  "дитина", "мама", "тато", "брат", "сестра", "бабуся", "дідусь", "дядько", "тітка", "кузен",
  "газета", "журнал", "книга", "зошит", "ручка", "олівець", "фломастер", "гумка", "лінійка", "ножиці",
  "кіт", "собака", "птах", "риба", "корова", "кінь", "вівця", "коза", "свиня", "курка",
  "газета", "журнал", "книга", "зошит", "ручка", "олівець", "фломастер", "гумка", "лінійка", "ножиці",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "машина", "автобус", "тролейбус", "трамвай", "поїзд", "літак", "корабель", "велосипед", "мотоцикл", "скутер",
  "дитина", "школа", "книга", "ліс", "мама", "тато", "село", "місто", "квітка", "літо",
  "лікар", "медсестра", "вчитель", "викладач", "інженер", "будівельник", "продавець", "офіціант", "кухар", "пекар",
  "дитина", "мама", "тато", "брат", "сестра", "бабуся", "дідусь", "дядько", "тітка", "кузен",
  "дитина", "мама", "тато", "брат", "сестра", "бабуся", "дідусь", "дядько", "тітка", "кузен",
  "газета", "журнал", "книга", "зошит", "ручка", "олівець", "фломастер", "гумка", "лінійка", "ножиці",
  "машина", "автобус", "тролейбус", "трамвай", "поїзд", "літак", "корабель", "велосипед", "мотоцикл", "скутер",
  "лікарня", "аптека", "школа", "університет", "театр", "кінотеатр", "музей", "бібліотека", "пошта", "банк",
  "лікар", "медсестра", "вчитель", "викладач", "інженер", "будівельник", "продавець", "офіціант", "кухар", "пекар",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "вода", "сонце", "земля", "дерево", "пташка", "трава", "небо", "море", "камінь", "гора",
  "телевізор", "радіо", "комп'ютер", "ноутбук", "телефон", "смартфон", "планшет", "принтер", "сканер", "факс",
  "лікарня", "аптека", "школа", "університет", "театр", "кінотеатр", "музей", "бібліотека", "пошта", "банк",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "кіт", "собака", "птах", "риба", "корова", "кінь", "вівця", "коза", "свиня", "курка",
  "дитина", "мама", "тато", "брат", "сестра", "бабуся", "дідусь", "дядько", "тітка", "кузен",
  "сонце", "місяць", "зірка", "планета", "комета", "метеор", "астероїд", "супутник", "галактика", "всесвіт",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "лікарня", "аптека", "школа", "університет", "театр", "кінотеатр", "музей", "бібліотека", "пошта", "банк",
  "дитина", "мама", "тато", "брат", "сестра", "бабуся", "дідусь", "дядько", "тітка", "кузен",
  "газета", "журнал", "книга", "зошит", "ручка", "олівець", "фломастер", "гумка", "лінійка", "ножиці",
  "дитина", "мама", "тато", "брат", "сестра", "бабуся", "дідусь", "дядько", "тітка", "кузен",
  "ліжко", "подушка", "ковдра", "матрац", "простирадло", "рушник", "штори", "плед", "килим", "лампа",
  "лікарня", "аптека", "школа", "університет", "театр", "кінотеатр"]

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
  window.beginContinuedbtn.innerText = 'Почати'
  window.beginContinuedbtn.style.display = 'block'
  window.word.style.visibility = 'hidden'
  window.timer.style.visibility = 'hidden'
  beforeBegin()
}

function changeActiveTeam() {
  const round = 0
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