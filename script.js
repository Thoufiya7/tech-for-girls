let shareCount = 0;
const maxShares = 5;

const shareBtn = document.getElementById("whatsappShareBtn");
const countText = document.getElementById("shareCount");
const shareStatus = document.getElementById("shareStatus");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("registrationForm");
const thankYouMsg = document.getElementById("thankYouMsg");

// Prevent resubmit
if (localStorage.getItem("submitted")) {
  form.style.display = "none";
  thankYouMsg.classList.remove("hidden");
}

shareBtn.addEventListener("click", () => {
  if (shareCount < maxShares) {
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    const link = `https://wa.me/?text=${message}`;
    window.open(link, "_blank");

    shareCount++;
    countText.textContent = `Click count: ${shareCount}/5`;

    if (shareCount === maxShares) {
      shareStatus.textContent = "Sharing complete. Please continue.";
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (shareCount < maxShares) {
    alert("Please complete WhatsApp sharing (5/5) before submitting.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const file = document.getElementById("screenshot").files[0];

  if (!file) {
    alert("Please upload a file.");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("screenshot", file);

  // Replace this URL with your Google Apps Script Web App URL
  const scriptURL = "https://script.google.com/macros/s/AKfycbzVvIGrBhgWMAmuu7tMgJAAdah3cC6OYfebrxmEaWjcTr3obCrsTAA1R6ytEhgqrS1j/exec";

  try {
    await fetch(scriptURL, {
      method: "POST",
      body: formData
    });

    localStorage.setItem("submitted", "true");
    form.style.display = "none";
    thankYouMsg.classList.remove("hidden");

  } catch (error) {
    alert("Error submitting form. Try again.");
    console.error("Submission error:", error);
  }
});
