function toggleNavbar() {
  var x = document.getElementById("navbar");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}

function closeNavbar() {
  var x = document.getElementById("navbar");
  x.className = "navbar";
}

// Hello text animation
document.addEventListener("DOMContentLoaded", () => {
  const helloElement = document.getElementById("hello");
  const text = helloElement.textContent;
  const targetColor = "#3498db";
  const originalColor = "#fff"; // Adjusted to match Sub-title background

  helloElement.innerHTML = [...text].map(char => `<span>${char}</span>`).join("");
  const spans = helloElement.querySelectorAll("span");

  function changeColor(index) {
    if (index < spans.length) {
      spans[index].style.color = targetColor;
      setTimeout(() => changeColor(index + 1), 200);
    } else {
      setTimeout(() => resetColors(0), 1000);
    }
  }

  function resetColors(index) {
    if (index < spans.length) {
      spans[index].style.color = originalColor;
      setTimeout(() => resetColors(index + 1), 200);
    } else {
      setTimeout(() => changeColor(0), 1000);
    }
  }

  changeColor(0);
});

// Skill Progress Circles
document.querySelectorAll('.outer-circle').forEach((circle) => {
  const target = parseInt(circle.dataset.progress, 10);
  const counter = circle.querySelector('.counter');
  let count = 0;

  const updateCounter = () => {
    if (count < target) {
      count++;
      counter.textContent = `${count}%`;
      const angle = (count / 100) * 360;
      circle.style.background = `conic-gradient(#3498db ${angle}deg, #e0e0e0 ${angle}deg)`;
      setTimeout(updateCounter, 30);
    }
  };

  updateCounter();
});

// About Section Fade-in
document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector("#about");
  aboutSection.classList.add("fade-in");
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for reaching out! I will get back to you soon.');
  this.reset();
});

// Footer Smooth Scrolling
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".footer-links a");

  links.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth"
        });
        closeNavbar(); // Close navbar on mobile after clicking
      }
    });
  });
});
