const steps = document.querySelectorAll(".step");
const nextBtns = document.querySelectorAll(".next");
const prevBtns = document.querySelectorAll(".prev");
const progress = document.querySelector(".progress-bar");

let currentStep = 0;

function updateForm() {

    steps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep);
    });

    const percent = ((currentStep + 1) / steps.length) * 100;

    progress.style.width = percent + "%";

    document.getElementById("current-step").textContent = currentStep + 1;
    document.getElementById("total-step").textContent = steps.length;
}

nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        const input = steps[currentStep].querySelector("input, select");

        if (input && input.value.trim() === "") {
            input.focus();
            return;
        }

        if (currentStep < steps.length - 1) {
            currentStep++;
            updateForm();
        }

    });
});

prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        if (currentStep > 0) {
            currentStep--;
            updateForm();
        }

    });
});

updateForm();
document.addEventListener("DOMContentLoaded", () => {

    const otherRadio = document.getElementById("otherActivity");
    const otherBox = document.getElementById("otherActivityBox");

    document.querySelectorAll('input[name="activity"]').forEach((radio) => {

        radio.addEventListener("change", function () {

            console.log("تم اختيار:", this.id);

            if (this.id === "otherActivity") {
                otherBox.style.display = "block";
            } else {
                otherBox.style.display = "none";
            }

        });

    });

});
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function () {
    document.getElementById("form-card").style.display = "none";
    document.getElementById("thankYou").style.display = "flex";
});