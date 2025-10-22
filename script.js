// Demo front-end: live matches list + player panel
// NOTE: replace demoFixtures with live API fetch (server-side) in production

const demoFixtures = [
  {
    id: 1,
    home: "FCUZ",
    away: "Raqib",
    time: "Hozir",
    competition: "Demo Liga",
    // embed: must be an allowed embed (YouTube live or broadcaster embed)
    embed: "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1", // example public livestream (Lo-fi)
    sourceName: "YouTube",
    note: "Demo stream - ruxsatli kontent bo'lishi kerak"
  },
  {
    id: 2,
    home: "Team A",
    away: "Team B",
    time: "22:30",
    competition: "Friendly",
    embed: "", // empty -> show button to go to official source
    sourceUrl: "https://www.formal-broadcaster.example/match/123",
    sourceName: "Rasmiy broadcaster"
  }
];

const matchesEl = document.getElementById('matches');
const playerPanel = document.getElementById('playerPanel');
const playerBody = document.getElementById('playerBody');
const playerTitle = document.getElementById('playerTitle');
const playerMeta = document.getElementById('playerMeta');
const closePlayer = document.getElementById('closePlayer');

function renderList(list){
  matchesEl.innerHTML = '';
  list.forEach(m => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="match-title">${m.home} — ${m.away}</div>
      <div class="meta">${m.competition} • ${m.time}</div>
      <div class="meta">${m.sourceName || ''}</div>
      <div>
        <button class="watch-btn" data-id="${m.id}">${m.embed ? 'Tomosha qilish' : (m.sourceUrl ? 'Rasmiy saytga o‘tish' : 'Hech nima')}</button>
      </div>
    `;
    matchesEl.appendChild(card);
  });
  // attach listeners
  document.querySelectorAll('.watch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const m = demoFixtures.find(x => x.id === id);
      openPlayer(m);
    });
  });
}

function openPlayer(match){
  playerPanel.classList.add('open');
  playerTitle.textContent = `${match.home} — ${match.away}`;
  playerMeta.innerHTML = `${match.competition} • ${match.time} • ${match.sourceName || ''}`;
  if(match.embed){
    playerBody.innerHTML = `<iframe src="${match.embed}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  } else if(match.sourceUrl){
    playerBody.innerHTML = `<div class="placeholder"><p>Rasmiy manbaga o'tish uchun <a href="${match.sourceUrl}" target="_blank" rel="noopener">bu yerga bosing</a></p></div>`;
  } else {
    playerBody.innerHTML = `<div class="placeholder"><p>Bu o'yin uchun streaming mavjud emas.</p></div>`;
  }
}

document.getElementById('refreshBtn').addEventListener('click', ()=> {
  // In production: call your server endpoint to fetch fresh fixtures
  renderList(demoFixtures);
});

closePlayer.addEventListener('click', ()=>{
  playerPanel.classList.remove('open');
  playerBody.innerHTML = `<div class="placeholder"><p>Jonli stream uchun ruxsatli embed yoki YouTube linkini qo‘shing.</p></div>`;
  playerTitle.textContent = 'Tanlang — o‘yinni ko‘rish';
  playerMeta.innerHTML = '';
});

// initial render
renderList(demoFixtures);