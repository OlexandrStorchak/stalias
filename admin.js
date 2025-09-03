async function init() {
  await dbSeedWords();
  await refresh();
}

const dots = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-dots"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>'
const svgCross = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>'
async function refresh() {
  const data = await dbGetAllWords();
  const list = document.getElementById('words');
  list.innerHTML = '';
  data.forEach((item) => {
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = item.word;
    li.appendChild(p);
    const editBtn = document.createElement('button');
    editBtn.innerHTML = dots;
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
    delBtn.innerHTML = svgCross;
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
