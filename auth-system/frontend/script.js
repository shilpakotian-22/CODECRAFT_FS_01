let token = null;

// Register User
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("regUsername").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    console.log("Register response:", data);  // 👈 will show full error in browser console

    if (res.ok) {
      document.getElementById("registerMsg").style.color = "green";
      document.getElementById("registerMsg").innerText = data.msg || "Registered!";
    } else {
      document.getElementById("registerMsg").style.color = "red";
      document.getElementById("registerMsg").innerText = data.msg || "Registration failed!";
    }
  } catch (err) {
    console.error("Error:", err);
    document.getElementById("registerMsg").style.color = "red";
    document.getElementById("registerMsg").innerText = "Error connecting to backend!";
  }
});

// Login User
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (data.token) {
      token = data.token;
      document.getElementById("loginMsg").innerText = "✅ Logged in!";
    } else {
      document.getElementById("loginMsg").innerText = data.msg || "Login failed!";
    }
  } catch (err) {
    document.getElementById("loginMsg").innerText = "Error logging in!";
  }
});

// Fetch Users
document.getElementById("fetchUsers").addEventListener("click", async () => {
  if (!token) {
    alert("Please login first!");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/users", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const users = await res.json();

    const list = document.getElementById("userList");
    list.innerHTML = "";

    users.forEach(user => {
      const li = document.createElement("li");
      li.innerText = `${user.username} - ${user.email}`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    alert("Error fetching users!");
  }
});
