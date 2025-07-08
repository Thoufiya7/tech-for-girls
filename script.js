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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("fileUpload");
  const file = fileInput.files[0];

  // Optional: Upload to file.io or use Google Drive in real project
  const fileURL = file ? file.name : "No file";

  const formData = new FormData(form);
  formData.append("file", fileURL);

  const response = await fetch("https://script.google.com/macros/s/AKfycbx0SmFlHMirCGSSUskHvicF4_jD95Z_gzqGmxcZQSdK3IrG3bh8t-wRNVJLekhrACT8/exec", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    localStorage.setItem("formSubmitted", "true");
    disableForm();
    window.location.href = "thankyou.html";
  } else {
    alert("Submission failed!");
  }
});

function disableForm() {
  form.querySelectorAll("input, button").forEach(el => el.disabled = true);
  shareComplete.textContent = "🎉 Your submission has been recorded!";
  shareComplete.style.display = "block";
}
