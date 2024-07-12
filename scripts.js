const words = ["apple", "banana", "cherry", "date", "elderberry"];

document.getElementById('startButton').addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * words.length);
    document.getElementById('word').innerText = words[randomIndex];
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
  .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
  })
  .catch((error) => {
      console.log('Service Worker registration failed:', error);
  });
}
