document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  // عملکرد باز و بسته شدن منوی همبرگری
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // عملکرد اسکرول نرم برای تمام لینک‌های داخل صفحه
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // جلوگیری از رفتار پیش‌فرض برای همه لینک‌های #

      const href = this.getAttribute("href");

      // اگر منوی موبایل باز بود، اول ببندش
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }

      // اگر لینک لوگو بود (#)، برو بالای صفحه
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      // اگر لینک به بخش خاصی اشاره داشت
      else {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          // با یه تاخیر خیلی کم اسکرول کن تا لرزش از بین بره
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: "smooth",
            });
          }, 150);
        }
      }
    });
  });
});

/* document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  //
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  //
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const targetElement = document.querySelector(this.getAttribute("href"));
      if (targetElement) {
        e.preventDefault();
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
 */
