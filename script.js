document.addEventListener("DOMContentLoaded", function () {
  // Tab switching functionality
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Show corresponding content
      const tabId = button.getAttribute("data-tab");
      document
        .querySelector(`.tab-content[data-tab="${tabId}"]`)
        .classList.add("active");
    });
  });

  // Cursor heart trail effect - works on all pages
  const colors = ["#ff4081", "#d81b60", "#ff6b6b", "#ff8a80", "#ff5252"];
  let lastTime = 0;

  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastTime < 100) return; // Limit heart creation rate
    lastTime = now;

    const heart = document.createElement("div");
    heart.classList.add("cursor-heart");

    // Random color from our palette
    const color = colors[Math.floor(Math.random() * colors.length)];

    heart.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="${color}" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>`;

    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;

    // Random size between 10px and 20px
    const size = Math.random() * 10 + 10;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;

    document.body.appendChild(heart);

    // Remove after animation completes
    setTimeout(() => {
      heart.remove();
    }, 1000);
  });

  // Apology page functionality
  if (document.getElementById("apologyBtn")) {
    const apologyBtn = document.getElementById("apologyBtn");
    const forgiveBtn = document.getElementById("forgiveBtn");
    const hugBtn = document.getElementById("hugBtn");
    const messages = document.querySelectorAll(".hidden-messages p");
    const hiddenMessages = document.querySelector(".hidden-messages");
    const progressFill = document.querySelector(".progress-fill");
    const progressPercent = document.querySelector(".progress-percent");
    const heartContainer = document.getElementById("heartContainer");
    const effectsContainer = document.getElementById("effectsContainer");

    let messageIndex = 0;
    let heartsInterval;
    let forgivenessLevel = 0;

    // Initially hide messages
    hiddenMessages.style.display = "none";

    // Typewriter effect for apology messages
    function typeMessage(message, index) {
      const typingText = document.createElement("div");
      typingText.className = "typing-text";
      hiddenMessages.insertBefore(typingText, messages[index]);

      const typingCursor = document.createElement("span");
      typingCursor.className = "typing-cursor";
      typingCursor.textContent = "|";
      typingText.appendChild(typingCursor);

      let i = 0;
      const typing = setInterval(() => {
        if (i < message.length) {
          typingText.textContent = message.substring(0, i);
          typingText.appendChild(typingCursor);
          i++;
        } else {
          clearInterval(typing);
          typingCursor.style.visibility = "hidden";
          setTimeout(() => {
            if (index < messages.length - 1) {
              typeMessage(messages[index + 1].textContent, index + 1);
            }
          }, 1500);
        }
      }, 50);
    }

    // Update forgiveness meter
    function updateForgiveness(amount) {
      forgivenessLevel = Math.min(100, forgivenessLevel + amount);
      progressFill.style.width = `${forgivenessLevel}%`;
      progressPercent.textContent = `${forgivenessLevel}%`;

      if (forgivenessLevel >= 100) {
        createHearts();
        showFinalEffect();
      }
    }

    // Create celebration effect when fully forgiven
    function showFinalEffect() {
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          const heart = document.createElement("div");
          heart.innerHTML = "❤️";
          heart.style.position = "absolute";
          heart.style.left = `${Math.random() * 100}%`;
          heart.style.top = `${Math.random() * 100}%`;
          heart.style.fontSize = `${Math.random() * 30 + 20}px`;
          heart.style.animation = `float ${
            Math.random() * 3 + 2
          }s ease-in-out infinite`;
          effectsContainer.appendChild(heart);
        }, i * 100);
      }
    }

    // Create floating hearts animation
    function createHearts() {
      heartsInterval = setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.style.left = Math.random() * 100 + "%";
        heart.style.bottom = "-20px";
        heart.style.width = Math.random() * 15 + 10 + "px";
        heart.style.height = heart.style.width;
        heart.style.animationDuration = Math.random() * 3 + 2 + "s";
        heartContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
      }, 300);
    }

    // Button event listeners
    apologyBtn.addEventListener("click", function () {
      if (hiddenMessages.style.display === "none") {
        hiddenMessages.style.display = "block";
        typeMessage(messages[0].textContent, 0);
        updateForgiveness(10);
      }
    });

    forgiveBtn.addEventListener("click", function () {
      updateForgiveness(25);
      this.textContent = "💖 Thank you for forgiving me!";
      this.disabled = true;
    });

    hugBtn.addEventListener("click", function () {
      updateForgiveness(15);
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          const hug = document.createElement("div");
          hug.innerHTML = "🤗";
          hug.style.position = "absolute";
          hug.style.left = Math.random() * 100 + "%";
          hug.style.top = Math.random() * 100 + "%";
          hug.style.fontSize = "30px";
          hug.style.animation = "pulse 1s ease-in-out";
          effectsContainer.appendChild(hug);
          setTimeout(() => hug.remove(), 1000);
        }, i * 200);
      }
    });
  }
});
