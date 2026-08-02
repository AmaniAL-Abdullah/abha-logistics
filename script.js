(function () {
  "use strict";
  
  const form = document.getElementById("form");
  const steps = Array.from(document.querySelectorAll(".step"));
  const progressBar = document.querySelector(".progress-bar");
  const currentStepEl = document.getElementById("current-step");
  const totalStepEl = document.getElementById("total-step");

  let currentStep = 0;

  function renderStep() {
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === currentStep);
    });

    const percent = Math.round(((currentStep + 1) / steps.length) * 100);

    progressBar.style.width = percent + "%";
    progressBar.setAttribute("aria-valuenow", String(percent));
    currentStepEl.textContent = currentStep + 1;
    totalStepEl.textContent = steps.length;
  }
function goNext() {
  const current = steps[currentStep];
  const error = current.querySelector(".error-message");

  if (error) {
    error.classList.remove("show");
    error.textContent = "";
  }

  current.querySelectorAll(".input-error").forEach(el => {
    el.classList.remove("input-error");
  });

  // التحقق من الحقول النصية
  const textFields = current.querySelectorAll("input[type='text'], input[type='tel'], input[type='email'], textarea");

  for (const field of textFields) {
    if (field.offsetParent === null) continue;

    if (field.value.trim() === "") {
      field.classList.add("input-error");

      if (error) {
        error.textContent = "يرجى تعبئة هذا الحقل.";
        error.classList.add("show");
      }

      field.focus();
      return;
    }
  }


  currentStep++;
  renderStep();
}

  function goPrev() {
    if (currentStep > 0) {
      currentStep--;
      renderStep();
    }
  }

  form.addEventListener("click", (event) => {
    if (event.target.closest(".next")) {
      goNext();
    } else if (event.target.closest(".prev")) {
      goPrev();
    }
  });

  function wireOtherToggle(radioId, boxId) {
    const radio = document.getElementById(radioId);
    const box = document.getElementById(boxId);

    if (!radio || !box) return;

    document.querySelectorAll(`input[name="${radio.name}"]`).forEach((input) => {
      input.addEventListener("change", () => {
        box.hidden = !radio.checked;
      });
    });
  }

  wireOtherToggle("otherActivity", "otherActivityBox");
  wireOtherToggle("otherChallenge", "otherChallengeBox");
  wireOtherToggle("otherAuthority", "otherAuthorityBox");
  wireOtherToggle("recruitmentDifficultyNo", "recruitmentDifficultyReasonBox");
  wireOtherToggle("infrastructureServesSectorNo", "infrastructureServesSectorReasonBox");
  wireOtherToggle("warehouseLandDifficultyNo", "warehouseLandDifficultyReasonBox");
  wireOtherToggle("digitalSystemsMeetNeedsNo", "digitalSystemsMeetNeedsReasonBox");

  function limitCheckboxGroup(name, max) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]`);

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const checkedCount = document.querySelectorAll(`input[name="${name}"]:checked`).length;

        checkboxes.forEach((box) => {
          box.disabled = !box.checked && checkedCount >= max;
        });
      });
    });
  }

  limitCheckboxGroup("challenges", 5);

  const submitBtn = document.getElementById("submitBtn");
  const thankYou = document.getElementById("thankYou");
  const restartBtn = document.getElementById("restartBtn");
  const formCard = document.getElementById("form-card");

  submitBtn.addEventListener("click", () => {
    const current = steps[currentStep];
    const error = current.querySelector(".error-message");

    if (error) {
      error.classList.remove("show");
      error.textContent = "";
    }

    current.querySelectorAll(".input-error").forEach(el => {
      el.classList.remove("input-error");
    });

    const requiredFields = current.querySelectorAll("input[type='text'], input[type='tel'], input[type='email'], textarea");

    for (const field of requiredFields) {
      if (field.offsetParent === null) continue;

      if (field.value.trim() === "") {
        field.classList.add("input-error");

        if (error) {
          error.textContent = "يرجى تعبئة هذا الحقل.";
          error.classList.add("show");
        }

        field.focus();
        return;
      }
    }

    formCard.style.display = "none";
    thankYou.classList.add("active");
  });

  restartBtn.addEventListener("click", () => {
    window.location.replace(window.location.pathname);
  });

  const hero = document.querySelector(".hero");
  const startBtn = document.querySelector(".hero-btn");

  function enterSurvey() {
    hero.classList.add("is-hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.pushState({ survey: true }, "", "#form-card");
  }

  function exitSurvey() {
    hero.classList.remove("is-hidden");
    formCard.style.display = "";
    thankYou.classList.remove("active");
    currentStep = 0;
    renderStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  startBtn.addEventListener("click", (event) => {
    event.preventDefault();
    enterSurvey();
  });

  window.addEventListener("popstate", exitSurvey);

  renderStep();
})();

