const DB_NAME = 'alias';
const STORE_NAME = 'words';
const DB_VERSION = 2;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      let store;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      } else {
        store = request.transaction.objectStore(STORE_NAME);
      }
      if (!store.indexNames.contains('word')) {
        store.createIndex('word', 'word', { unique: true });
      }
    };
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function dbSeedWords() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const countRequest = store.count();
    countRequest.onsuccess = async () => {
      if (countRequest.result > 0) {
        resolve();
        return;
      }
      try {
        const res = await fetch('words.json');
        const words = await res.json();
        const txAdd = db.transaction(STORE_NAME, 'readwrite');
        const storeAdd = txAdd.objectStore(STORE_NAME);
        words.forEach((word) => storeAdd.add({ word }));
        txAdd.oncomplete = () => resolve();
        txAdd.onerror = () => reject(txAdd.error);
      } catch (e) {
        reject(e);
      }
    };
    countRequest.onerror = () => reject(countRequest.error);
  });
}

async function dbGetAllWords() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function dbAddWord(word) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const index = store.index('word');
    const check = index.get(word);
    check.onsuccess = () => {
      if (check.result) {
        tx.abort();
        reject(new Error('Word already exists'));
      } else {
        store.add({ word });
      }
    };
    check.onerror = () => {
      tx.abort();
      reject(check.error);
    };
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function dbUpdateWord(id, word) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put({ id, word });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function dbDeleteWord(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
