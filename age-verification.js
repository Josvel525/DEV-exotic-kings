(function () {
  const KEY = "ek_ageVerified_v2";
  const TTL = 1000 * 60 * 60 * 24 * 30; // 30 days

  function getStore() {
    try {
      localStorage.setItem("__test", "1");
      localStorage.removeItem("__test");
      return localStorage;
    } catch {
      return sessionStorage;
    }
  }

  const store = getStore();
  const modal = document.getElementById("age-modal");

  function isVerified() {
    const raw = store.getItem(KEY);
    if (!raw) return false;

    try {
      const data = JSON.parse(raw);
      return Date.now() - data.time < TTL;
    } catch {
      return false;
    }
  }

  function verify() {
    store.setItem(KEY, JSON.stringify({ time: Date.now() }));
    modal.classList.remove("active");
  }

  function deny() {
    document.body.innerHTML = `
      <div style="height:100vh;display:flex;align-items:center;justify-content:center;background:black;color:white;text-align:center;padding:2rem">
        <h1>You must be 21 or older to enter.</h1>
      </div>`;
  }

  if (!isVerified()) {
    modal.classList.add("active");
  }

  window.confirmAge = verify;
  window.denyAge = deny;
})();
