let debates = [];

function createDebate() {
  const topic = document.getElementById("topic").value;
  const affirmative = document.getElementById("affirmative").value;
  const negative = document.getElementById("negative").value;

  if (!topic || !affirmative || !negative) {
    alert("Please fill out all fields");
    return;
  }

  const debate = {
    id: Date.now(),
    topic,
    affirmative,
    negative,
    votesAff: 0,
    votesNeg: 0
  };

  debates.unshift(debate);
  renderDebates();

  document.getElementById("topic").value = "";
  document.getElementById("affirmative").value = "";
  document.getElementById("negative").value = "";
}

function voteAff(id) {
  debates = debates.map(d => {
    if (d.id === id) d.votesAff++;
    return d;
  });
  renderDebates();
}

function voteNeg(id) {
  debates = debates.map(d => {
    if (d.id === id) d.votesNeg++;
    return d;
  });
  renderDebates();
}

function renderDebates() {
  const container = document.getElementById("debateList");
  container.innerHTML = "";

  debates.forEach(d => {

    const totalVotes = d.votesAff + d.votesNeg;
    const affScore = totalVotes ? ((d.votesAff / totalVotes) * 100).toFixed(1) : 50;
    const negScore = totalVotes ? ((d.votesNeg / totalVotes) * 100).toFixed(1) : 50;

    container.innerHTML += `
      <div class="card">
        <h3>${d.topic}</h3>

        <div class="debate-grid">
          <div>
            <h4>Affirmative</h4>
            <p>${d.affirmative}</p>
            <button onclick="voteAff(${d.id})">Vote Pro</button>
          </div>

          <div>
            <h4>Negative</h4>
            <p>${d.negative}</p>
            <button onclick="voteNeg(${d.id})">Vote Con</button>
          </div>
        </div>

        <p><strong>Persuasiveness Score:</strong></p>
        <p>Pro: ${affScore}% | Con: ${negScore}%</p>
      </div>
    `;
  });
}
