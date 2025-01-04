function toggleNavbar() {
    var x = document.getElementById("navbar");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}
//Hello text
document.addEventListener("DOMContentLoaded", () => {
  const helloElement = document.getElementById("hello");
  const text = helloElement.textContent;
  const targetColor = "#3498db"; // The color to change to
  const originalColor = " #34495e"; // Original color
  
  // Split the text into individual characters wrapped in spans
  helloElement.innerHTML = [...text].map(char => `<span>${char}</span>`).join("");

  const spans = helloElement.querySelectorAll("span");

  // Function to change the color of characters one by one
  function changeColor(index) {
    if (index < spans.length) {
      spans[index].style.color = targetColor; // Change color to target
      setTimeout(() => changeColor(index + 1), 200); // Delay for next character
    } else {
      // Reset colors after all characters are changed
      setTimeout(() => resetColors(0), 1000); // Pause before resetting
    }
  }

  // Function to reset the colors one by one
  function resetColors(index) {
    if (index < spans.length) {
      spans[index].style.color = originalColor; // Reset color to original
      setTimeout(() => resetColors(index + 1), 200); // Delay for next character
    } else {
      // Restart the color-changing effect
      setTimeout(() => changeColor(0), 1000); // Pause before restarting
    }
  }

  // Start the infinite animation
  changeColor(0);
});


//For Progress Circular
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

// for About ME 
// Simple fade-in animation for sections when loaded
document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.querySelector("#about");
  aboutSection.classList.add("fade-in");
});


  //Contact Information

  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for reaching out! I will get back to you soon.');
    this.reset();
});



//  Footer

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
      }
    });
  });
});



  



