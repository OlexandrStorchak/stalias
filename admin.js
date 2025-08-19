async function init() {
  await dbSeedWords();
  await refresh();
}

async function refresh() {
  const data = await dbGetAllWords();
  const list = document.getElementById('words');
  list.innerHTML = '';
  data.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item.word + ' ';
    const editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.onclick = async () => {
      const updated = prompt('Edit word', item.word);
      if (updated) {
        try {
          await dbUpdateWord(item.id, updated);
          refresh();
        } catch (e) {
          alert('Word already exists');
        }
      }
    };
    const delBtn = document.createElement('button');
    delBtn.innerText = 'Delete';
    delBtn.onclick = async () => {
      await dbDeleteWord(item.id);
      refresh();
    };
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

async function addWord() {
  const input = document.getElementById('newWord');
  const word = input.value.trim();
  if (word) {
    try {
      await dbAddWord(word);
      input.value = '';
      refresh();
    } catch (e) {
      alert('Word already exists');
    }
  }
}

init();
