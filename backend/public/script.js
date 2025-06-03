const listEl = document.getElementById('things-list');
const formEl = document.getElementById('add-form');
const inputEl = document.getElementById('thing-name');

// Charger la liste
async function fetchThings() {
  const res = await fetch('/api/things');
  const data = await res.json();
  listEl.innerHTML = '';
  data.forEach(({ id, name, left_votes, right_votes }) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${name}</strong> 
      | Gauche: ${left_votes} 
      | Droite: ${right_votes}
      <button onclick="vote(${id}, 'left')">👈 Gauche</button>
      <button onclick="vote(${id}, 'right')">👉 Droite</button>
    `;
    listEl.appendChild(li);
  });
}

// Ajouter une chose
formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = inputEl.value.trim();
  if (!name) return;
  await fetch('/api/things', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  inputEl.value = '';
  fetchThings();
});

// Voter
async function vote(id, side) {
  await fetch(`/api/things/${id}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ side })
  });
  fetchThings();
}

// Chargement initial
fetchThings();
