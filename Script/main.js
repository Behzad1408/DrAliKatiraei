document.addEventListener("DOMContentLoaded", function () {
  // --- Main Navigation Menu with Scroll Behavior ---
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");

      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }

      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }, 150);
        }
      }
    });
  });

  // --- New Section: Handles the Post-Treatment Care popup/modal logic ---
  const careModal = document.getElementById("care-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const modalTitle = document.getElementById("modal-title");
  const modalContent = document.getElementById("modal-content");
  const careButtons = document.querySelectorAll(".care-btn");

  // Default content for each service
  const carePlans = {
    "ایمپلنت و کاشت دندان": `
                    <ul class="space-y-2 list-disc list-inside">
                        <li>تا ۲۴ ساعت از مسواک زدن در ناحیه جراحی شده خودداری کنید.</li>
                        <li>از کمپرس یخ برای کاهش تورم در ساعات اولیه استفاده نمایید.</li>
                        <li>غذاهای نرم و سرد میل کنید و از خوردن غذاهای سفت و داغ بپرهیزید.</li>
                        <li>داروهای تجویز شده توسط پزشک را به موقع مصرف کنید.</li>
                        <li>از کشیدن سیگار و مصرف الکل جدا خودداری نمایید.</li>
                    </ul>`,
    "لمینت و کامپوزیت": `
                    <ul class="space-y-2 list-disc list-inside">
                        <li>تا چند روز از مصرف مواد غذایی رنگی مانند چای، قهوه و نوشابه خودداری کنید.</li>
                        <li>از شکستن اجسام سخت مانند پسته و تخمه با دندان‌های لمینت شده بپرهیزید.</li>
                        <li>رعایت بهداشت دهان و دندان، از جمله مسواک زدن و استفاده از نخ دندان، ضروری است.</li>
                        <li>برای بررسی‌های دوره‌ای به طور منظم به دندانپزشک مراجعه کنید.</li>
                    </ul>`,
    "عصب کشی دندان": `
                    <ul class="space-y-2 list-disc list-inside">
                        <li>تا زمان برطرف شدن کامل بی‌حسی، از جویدن غذا با سمت درمان شده خودداری کنید.</li>
                        <li>داشتن مقداری درد پس از درمان طبیعی است؛ از مسکن‌های تجویز شده استفاده کنید.</li>
                        <li>از خوردن غذاهای سفت و چسبناک تا زمان قرارگیری روکش نهایی خودداری نمایید.</li>
                        <li>بهداشت دهان و دندان را به طور کامل رعایت کنید.</li>
                    </ul>`,
    "جراحی دندان عقل": `
                    <ul class="space-y-2 list-disc list-inside">
                        <li>گاز استریل قرار داده شده روی محل زخم را تا یک ساعت با فشار ملایم نگه دارید.</li>
                        <li>از کمپرس یخ در ۲۴ ساعت اول برای کاهش تورم و خونریزی استفاده کنید.</li>
                        <li>از تف کردن و مکیدن با نی خودداری کنید، زیرا باعث خونریزی مجدد می‌شود.</li>
                        <li>رژیم غذایی نرم و مایعات خنک داشته باشید.</li>
                        <li>داروهای خود را طبق دستور پزشک مصرف نمایید.</li>
                    </ul>`,
    "بلیچینگ و سفید کردن دندان": `
                    <ul class="space-y-2 list-disc list-inside">
                        <li>تا ۴۸ ساعت از مصرف هرگونه مواد غذایی و نوشیدنی رنگی (مانند قهوه، چای، سس قرمز، نوشابه) خودداری کنید.</li>
                        <li>حساسیت دندان‌ها به سرما و گرما تا چند روز طبیعی است و به تدریج برطرف می‌شود.</li>
                        <li>از خمیردندان‌های ضد حساسیت در صورت نیاز استفاده کنید.</li>
                        <li>برای حفظ سفیدی دندان‌ها، بهداشت دهان را به خوبی رعایت کنید.</li>
                    </ul>`,
    "جرم گیری و پر کردن دندان": `
                    <ul class="space-y-2 list-disc list-inside">
                        <li>پس از پر کردن، تا زمان رفع کامل بی‌حسی از خوردن غذا خودداری کنید تا از گاز گرفتن زبان یا گونه جلوگیری شود.</li>
                        <li>پس از جرم‌گیری، ممکن است دندان‌ها تا چند روز به سرما و گرما حساس باشند که طبیعی است.</li>
                        <li>رعایت بهداشت دهان و دندان پس از جرم‌گیری برای جلوگیری از تجمع مجدد جرم ضروری است.</li>
                        <li>از مسواک نرم برای تمیز کردن دندان‌ها استفاده کنید.</li>
                    </ul>`,
  };

  // Adding click event to buttons
  careButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const service = button.dataset.service;
      modalTitle.textContent = `مراقبت‌های پس از ${service}`;
      modalContent.innerHTML =
        carePlans[service] || "<p>اطلاعاتی برای این خدمت ثبت نشده است.</p>";
      careModal.classList.remove("hidden");
    });
  });

  // Closing the modal
  const closeModal = () => {
    careModal.classList.add("hidden");
  };

  closeModalBtn.addEventListener("click", closeModal);
  careModal.addEventListener("click", (e) => {
    if (e.target === careModal) {
      closeModal();
    }
  });
});
