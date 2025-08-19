async function init() {
  if (prompt('Password') !== 'admin') {
    document.body.innerHTML = '<h1>Forbidden</h1>';
    return;
  }
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
        await dbUpdateWord(item.id, updated);
        refresh();
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
    await dbAddWord(word);
    input.value = '';
    refresh();
  }
}

init();
