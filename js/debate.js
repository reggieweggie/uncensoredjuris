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
    votesNeg: 0,

    comments: [],
    rebuttals: {
      aff: [],
      neg: []
    },

    scores: {
      aff: { logic: 0, evidence: 0, clarity: 0, impact: 0 },
      neg: { logic: 0, evidence: 0, clarity: 0, impact: 0 }
    }
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

/* ---------------- COMMENTS ---------------- */

function addComment(id) {
  const input = document.getElementById(`comment-${id}`);
  const text = input.value;

  if (!text) return;

  debates = debates.map(d => {
    if (d.id === id) {
      d.comments.push(text);
    }
    return d;
  });

  input.value = "";
  renderDebates();
}

/* ---------------- REBUTTALS ---------------- */

function addRebuttal(id, side) {
  const input = document.getElementById(`${side}-rebuttal-${id}`);
  const text = input.value;

  if (!text) return;

  debates = debates.map(d => {
    if (d.id === id) {
      d.rebuttals[side].push(text);
    }
    return d;
  });

  input.value = "";
  renderDebates();
}

/* ---------------- JUDGE SCORING ---------------- */

function score(id, side, category, value) {
  debates = debates.map(d => {
    if (d.id === id) {
      d.scores[side][category] = Number(value);
    }
    return d;
  });

  renderDebates();
}

function calcScore(scores) {
  return (
    scores.logic +
    scores.evidence +
    scores.clarity +
    scores.impact
  );
}

/* ---------------- RENDER ---------------- */

function renderDebates() {
  const container = document.getElementById("debateList");
  container.innerHTML = "";

  debates.forEach(d => {

    const affScoreTotal = calcScore(d.scores.aff);
    const negScoreTotal = calcScore(d.scores.neg);

    container.innerHTML += `
      <div class="card">
        <h3>${d.topic}</h3>

        <div class="debate-grid">

          <div>
            <h4>Affirmative</h4>
            <p>${d.affirmative}</p>

            <button onclick="voteAff(${d.id})">Vote Pro</button>

            <h5>Rebuttals</h5>
            ${d.rebuttals.aff.map(r => `<p>↳ ${r}</p>`).join("")}

            <input id="aff-rebuttal-${d.id}" placeholder="Add rebuttal to Pro">
            <button onclick="addRebuttal(${d.id}, 'aff')">Submit</button>

            <h5>Judge Scoring</h5>
            Logic:
            <input type="number" min="0" max="10"
              onchange="score(${d.id}, 'aff', 'logic', this.value)">

            Evidence:
            <input type="number" min="0" max="10"
              onchange="score(${d.id}, 'aff', 'evidence', this.value)">

            Clarity:
            <input type="number" min="0" max="10"
              onchange="score(${d.id}, 'aff', 'clarity', this.value)">

            Impact:
            <input type="number" min="0" max="10"
              onchange="score(${d.id}, 'aff', 'impact', this.value)">

            <p><strong>Total: ${affScoreTotal}</strong></p>
          </div>

          <div>
            <h4>Negative</h4>
            <p>${d.negative}</p>

            <button onclick="voteNeg(${d.id})">Vote Con</button>

            <h5>Rebuttals</h5>
            ${d.rebuttals.neg.map(r => `<p>↳ ${r}</p>`).join("")}

            <input id="neg-rebuttal-${d.id}" placeholder="Add rebuttal to Con">
            <button onclick="addRebuttal(${d.id}, 'neg')">Submit</button>

            <h5>Judge Scoring</h5>
            Logic:
            <input type="number" min="0" max="10"
              onchange="score(${d.id}, 'neg', 'logic', this.value)">

            Evidence:
            <input type="number" min="0" max="10"
              onchange="score(${d.id}, 'neg', 'evidence', this.value)">

            Clarity:
            <input type="number" min="0" max="10"
              onchange="score(${d.id}, 'neg', 'clarity', this.value)">

            Impact:
            <input type="number" min="0" max="10"
              onchange="score(${d.id}, 'neg', 'impact', this.value)">

            <p><strong>Total: ${negScoreTotal}</strong></p>
          </div>

        </div>

        <hr>

        <h4>Comments</h4>
        ${d.comments.map(c => `<p>💬 ${c}</p>`).join("")}

        <input id="comment-${d.id}" placeholder="Add comment">
        <button onclick="addComment(${d.id})">Post</button>

        <p><strong>Voting:</strong> Pro ${d.votesAff} | Con ${d.votesNeg}</p>
      </div>
    `;
  });
}
