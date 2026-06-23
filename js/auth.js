async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await client.auth.signUp({
    email,
    password
  });

  if (error) {
    document.getElementById("status").innerText = error.message;
  } else {
    document.getElementById("status").innerText = "Check your email to confirm account.";
  }
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    document.getElementById("status").innerText = error.message;
  } else {
    document.getElementById("status").innerText = "Logged in successfully!";
    localStorage.setItem("user", JSON.stringify(data.user));
  }
}
