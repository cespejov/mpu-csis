export function bindTabEvents() {
  const tabs = document.querySelectorAll(".tab-link");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.target;

      // 1. Remove 'active' class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));

      // 2. Remove 'active' class from all content sections
      contents.forEach((c) => c.classList.remove("active"));

      // 3. Add 'active' class to current tab and targeted content
      tab.classList.add("active");
      const targetElement = document.getElementById(target);
      if (targetElement) {
        targetElement.classList.add("active");
      }
    });
  });
}
