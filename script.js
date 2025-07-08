let count = localStorage.getItem("shareCount") || 0;
let formSubmitted = localStorage.getItem("formSubmitted") === "true";

const counterText = document.getElementById("counterText");
const shareComplete = document.getElementById("shareComplete");
const whatsappBtn = document.getElementById("whatsappBtn");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("registrationForm");

counterText.textContent = `Click Count: ${count} / 5`;

if (formSubmitted) {
  disableForm();
}

whatsappBtn.addEventListener("click", () => {
  if (count < 5) {
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    window.open(`https://wa.me/?text=${message}`, "_blank");
    count++;
    localStorage.setItem("shareCount", count);
    counterText.textContent = `Click Count: ${count} / 5`;
  }

  if (count >= 5) {
    shareComplete.style.display = "block";
    submitBtn.disabled = false;
  }
});

form.addEventListener("submit", () => {
  localStorage.setItem("formSubmitted", "true");
  disableForm();
});

function disableForm() {
  form.querySelectorAll("input, button").forEach(el => {
    el.disabled = true;
  });
  shareComplete.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
  shareComplete.style.display = "block";
}
