async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await client.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Account created! Check your email to confirm.");
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  // store session
  localStorage.setItem("user", JSON.stringify(data.user));

  alert("Logged in successfully!");

  // redirect to forum
  window.location.href = "forum.html";
}

async function logout() {
  await client.auth.signOut();
  localStorage.removeItem("user");
  alert("Logged out");
  window.location.href = "index.html";
}
