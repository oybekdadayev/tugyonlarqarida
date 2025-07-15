document.addEventListener("DOMContentLoaded", () => {
  const reactButtons = document.querySelectorAll(".react-btn");
  const pageId = window.location.pathname.split("/").pop();

  reactButtons.forEach(button => {
    const type = button.getAttribute("data-type");
    const key = `react-${pageId}-${type}`;
    const countKey = `count-${pageId}-${type}`;
    const countSpan = button.querySelector(".count");

    let savedCount = parseInt(localStorage.getItem(countKey)) || 0;
    const isReacted = localStorage.getItem(key) === "1";

    if (isReacted) {
      button.classList.add("active");
    }

    countSpan.textContent = savedCount;

    button.addEventListener("click", () => {
      const currentlyReacted = localStorage.getItem(key) === "1";

      if (currentlyReacted) {
        localStorage.removeItem(key);
        button.classList.remove("active");
        savedCount = Math.max(savedCount - 1, 0);
        localStorage.setItem(countKey, savedCount);
      } else {
        // Avvalgi aktiv reaksiya tugmalarini o'chiramiz
        reactButtons.forEach(btn => {
          const t = btn.getAttribute("data-type");
          const k = `react-${pageId}-${t}`;
          const c = `count-${pageId}-${t}`;
          if (localStorage.getItem(k) === "1") {
            let cnt = parseInt(localStorage.getItem(c)) || 1;
            cnt = Math.max(cnt - 1, 0);
            localStorage.setItem(c, cnt);
          }
          localStorage.removeItem(k);
          btn.classList.remove("active");
          const btnCountSpan = btn.querySelector(".count");
          btnCountSpan.textContent = localStorage.getItem(c) || "0";
        });

        localStorage.setItem(key, "1");
        savedCount += 1;
        localStorage.setItem(countKey, savedCount);
        button.classList.add("active");
      }

      countSpan.textContent = localStorage.getItem(countKey);
    });
  });

  // Oxirgi ochilgan sahifani saqlash
  const lastPage = window.location.pathname.split("/").pop();
  localStorage.setItem("lastPage", lastPage);
});

// 🔖 Belgilash funksiyasi
function saveBookmark() {
  const currentPage = window.location.pathname.split("/").pop();
  localStorage.setItem("bookmarkedPage", currentPage);
  alert("📌 Bu sahifa belgilandi!");
}

// 🔖 Belgilangan sahifaga o'tish
function goToBookmark() {
  const savedPage = localStorage.getItem("bookmarkedPage");
  if (savedPage) {
    window.location.href = savedPage;
  } else {
    alert("⛔ Belgilangan sahifa topilmadi.");
  }
}
