
const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");
const video = document.getElementById("myVideo");

//speed control
video.playbackRate = 5.0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Fill screen with black
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Text settings
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = "bold 160px Arial";

let scale = 0.1;

function revealText() {
  // redraw black every frame
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // cut text out
  ctx.globalCompositeOperation = "destination-out";
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(scale, scale);
  ctx.fillText("E-SUMMIT 2K26", 0, 0);
  ctx.restore();

  if (scale < 1) {
    scale += 1.5; // Note: This is very fast
    requestAnimationFrame(revealText);
  }
}

revealText();

// ========== COUNTDOWN CLOCK LOGIC ==========
// This section handles the countdown timer display
// Format: days:hours:minutes:seconds
// You can customize the target date and update interval below

/**
 * CONFIGURATION: Set your target date here
 * Change the date to whenever you want the countdown to reach zero
 * Format: new Date('YYYY-MM-DD HH:MM:SS')
 */
const targetDate = new Date('2026-02-25 00:00:00').getTime();

/**
 * updateCountdown() - Calculates and displays remaining time
 * This function:
 * 1. Calculates the difference between target date and now
 * 2. Extracts days, hours, minutes, and seconds
 * 3. Updates the display with formatted values
 * 4. Stops when countdown reaches zero
 */
function updateCountdown() {
  // Get current time in milliseconds
  const now = new Date().getTime();
  
  // Calculate difference between target and current time
  const timeRemaining = targetDate - now;
  
  // If time has passed, display zeros
  if (timeRemaining <= 0) {
    document.getElementById('countdownClock').textContent = '00:00:00:00';
    return; // Stop updating
  }
  
  // Convert milliseconds to days, hours, minutes, and seconds
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
  // Format each value with leading zeros (e.g., 5 becomes '05')
  const formattedTime = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  // Update the display element
  document.getElementById('countdownClock').textContent = formattedTime;
}

/**
 * toggleClockVisibility() - Show/hide clock based on current scroll position
 * Clock is only visible when user is on page 1
 * Other pages: page 2, page 3, etc. will have the clock hidden
 */
function toggleClockVisibility() {
  // Get reference to the scroll container
  const scrollContainer = document.querySelector('.main-scroll-container');
  const clockContainer = document.querySelector('.countdown-clock-container');
  const page1 = document.querySelector('#page1');
  
  // Get page 1's position and dimensions
  const page1Rect = page1.getBoundingClientRect();
  const containerRect = scrollContainer.getBoundingClientRect();
  
  // Check if page 1 is currently visible in the viewport
  // Page 1 is considered visible if it occupies more than 50% of the viewport
  const isPage1Visible = page1Rect.top < containerRect.height / 2 && 
                        page1Rect.bottom > containerRect.height / 2;
  
  // Show or hide the clock based on page 1 visibility
  if (isPage1Visible) {
    clockContainer.style.display = 'flex';
  } else {
    clockContainer.style.display = 'none';
  }
}

/**
 * Initialize countdown:
 * 1. Call updateCountdown immediately to show timer on page load
 * 2. Set interval to update every 1000ms (1 second)
 * 3. Add scroll listener to hide clock when scrolled away from page 1
 */
updateCountdown(); // Display immediately
setInterval(updateCountdown, 1000); // Update every second

// Hide/show clock based on scroll position
const scrollContainer = document.querySelector('.main-scroll-container');
scrollContainer.addEventListener('scroll', toggleClockVisibility);
toggleClockVisibility(); // Check visibility on page load

//reveal text js - page 2 text animation
gsap.registerPlugin(ScrollTrigger);

// Configure ScrollTrigger to use the custom scroll container
ScrollTrigger.defaults({
  scroller: ".main-scroll-container"
});

const target = document.querySelector(".js-fill > span");

if (target && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.to(target, {
    backgroundSize: "200% 200%",
    ease: "none",
    scrollTrigger: {
      trigger: ".js-fill",
      start: "top 72%",
      end: "bottom 15%",
      scrub: true,
      markers: false
    }
  });
}

