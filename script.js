
// ========== NAVIGATION SCROLL FUNCTION ==========
// Handles smooth scrolling to different pages when nav links are clicked
/**
 * scrollToPage(pageId) - Smoothly scrolls to the specified page section
 * @param {string} pageId - The id of the page to scroll to (e.g., 'page1', 'page2', etc.)
 */
function scrollToPage(pageId) {
  const scrollContainer = document.querySelector('.main-scroll-container');
  const targetPage = document.getElementById(pageId);
  
  if (targetPage && scrollContainer) {
    // Calculate the position of the target page relative to the scroll container
    const offsetTop = targetPage.offsetTop;
    
    // Smooth scroll to the target position
    scrollContainer.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

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

// ========== PAGE 1: TEXT REVEAL ANIMATION ==========
// This animation reveals the "E-SUMMIT 2K26" text by scaling it up
// The scale-out effect creates a smooth text reveal from the center
// IMPORTANT: Lower increment values = smoother animation
// Adjust scale increment for desired smoothness and speed

let scale = 0.1; // Start very small for dramatic reveal

/**
 * revealText() - Main text reveal animation loop
 * Uses requestAnimationFrame for smooth, hardware-accelerated rendering
 * The animation continues until scale reaches 1 (full size)
 * Uses composite operation 'destination-out' to cut out text from black background
 */
function revealText() {
  // Step 1: Redraw black background each frame (clears previous frame)
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Step 2: Switch to 'destination-out' mode to cut out the text from black layer
  // This creates the knockout effect - revealing content behind
  ctx.globalCompositeOperation = "destination-out";
  ctx.save();
  
  // Step 3: Center the text at canvas middle
  ctx.translate(canvas.width / 2, canvas.height / 2);
  
  // Step 4: Apply scale transformation for smooth zoom-in effect
  ctx.scale(scale, scale);
  
  // Step 5: Draw the text (will be cut out from black background)
  ctx.fillText("E-SUMMIT 2K26", 0, 0);
  ctx.restore();

  // Step 6: Increment scale for next frame (SMOOTHNESS CONTROL)
  // Lower values = slower, smoother animation
  // ORIGINAL: 1.5 (too fast, creates jank)
  // OPTIMIZED: 0.8 (slower, much smoother momentum)
  if (scale < 1) {
    scale += 0.8; // Reduced from 1.5 for smoother reveals
    requestAnimationFrame(revealText);
  }
}

// Initialize the text reveal animation
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

//========== PAGE 2: TEXT REVEAL ANIMATION ==========
// This animation reveals the "What is E-Summit?" paragraph text
// The text gradually becomes more visible (higher opacity) as you scroll down
// SMOOTHNESS FACTOR: scrub: 1 = 1ms lag between scroll and animation (smooth sync)

gsap.registerPlugin(ScrollTrigger);

// Configure ScrollTrigger to use the custom scroll container
// This tells GSAP to watch scroll position within our custom container, not window
ScrollTrigger.defaults({
  scroller: ".main-scroll-container"
});

const target = document.querySelector(".js-fill > span");

// Only animate if element exists and user hasn't set "prefers-reduced-motion"
if (target && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  /**
   * Text reveal animation: Background gradient grows as you scroll
   * The gradient creates the "filling" effect revealing text color
   * 
   * Animation progression:
   * - Start: 0% background-size (no color, text invisible)
   * - End: 200% background-size (full color, text fully visible)
   */
  gsap.to(target, {
    backgroundSize: "200% 200%",     // Gradient size at end of animation
    ease: "none",                     // No easing - direct scroll binding
    scrollTrigger: {
      trigger: ".js-fill",           // Trigger animation when this element comes into view
      start: "top 72%",              // Start revealing when element is 72% down viewport
      end: "bottom 10%",             // Finish revealing when element bottom is 10% from top
      scrub: 1,                      // SMOOTHNESS: 1ms lag = smooth connection to scroll
      markers: false                 // Set to true for debugging timeline
    }
  });
}

//========== PAGE 3: MARQUEE & TEXT ANIMATION ==========
// This section handles the smooth animation of images scrolling horizontally
// and text reveals that happen in sync with the scroll
// 
// SMOOTHNESS FACTORS:
// - scrub: 1 binds animation directly to scroll (1ms lag = smoother than scrub: true)
// - scrollTrigger settings control reveal timing
// - stagger delays create the wave effect
// - lerp in Lenis provides momentum for ongoing animations

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  /**
   * animateChars() - Animates individual characters with font weight progression
   * Creates a "strengthening" effect as text comes into view
   * Characters transition from thin (100) to bold (900) weight
   * 
   * @param {Array} chars - Array of character elements from SplitType
   * @param {Boolean} reverse - If true, animates from start instead of end
   */
  function animateChars(chars, reverse = false) {
    // Configuration for staggered character animation
    const staggerOptions = {
      each: 0.35,                    // Delay between each character (lower = faster wave)
      from: reverse ? "start" : "end", // Direction of animation wave
      ease: "linear",                // Linear easing for consistent character weight change
    };

    // Animate all characters: from thin (100) to bold (900)
    gsap.fromTo(
      chars,
      { fontWeight: 25 },           // Starting state: thin text
      {
        fontWeight: 800,             // Ending state: bold text
        duration: 1,                 // Animation duration per character
        ease: "none",
        stagger: staggerOptions,
        scrollTrigger: {
          trigger: chars[0].closest(".marquee-container"),
          start: "50% bottom",       // Animation starts when 50% of container is at bottom
          end: "top top",            // Animation ends when container reaches top
          scrub: 1,                  // SMOOTHNESS: 1 = 1ms lag between scroll and animation (smoother than true)
        },
      }
    );
  }

  // Split all h1 text in marquee items into individual characters
  // This allows for character-level animation effects
  const splitText = new SplitType(".item h1", { types: "chars" });

  // Get all marquee containers for processing
  const marqueeContainers = document.querySelectorAll(".marquee-container");

  /**
   * Process each marquee container for animation setup
   * Even-indexed containers scroll right, odd-indexed scroll left
   * This creates a visual rhythm as you scroll down the page
   */
  marqueeContainers.forEach((container, index) => {
    // Define scroll direction based on container index
    // Even: scroll right (positive), Odd: scroll left (negative)
    let start = "%";
    let end = "-25%";

    if (index % 2 === 0) {
      start = "0%";
      end = "10%";  // Scroll right for even rows
    }

    // Get marquee and words in this container
    const marquee = container.querySelector(".marquee");
    const words = marquee.querySelectorAll(".item h1");

    /**
     * Horizontal scroll animation for the marquee
     * Uses scroll position to control horizontal position
     * Creates smooth parallax-like effect as page scrolls
     */
    gsap.fromTo(
      marquee,
      { x: start },                  // Starting x position
      {
        x: end,                       // Ending x position
        scrollTrigger: {
          trigger: container,
          start: "top bottom",       // Animation starts when container enters viewport
          end: "150% top",           // Animation continues for longer duration
          scrub: 1,                  // SMOOTHNESS: 1ms lag keeps animation smooth with scroll
        },
      }
    );

    // Apply character animation to each word in this marquee
    words.forEach((word) => {
      const chars = Array.from(word.querySelectorAll(".char"));
      if (chars.length) {
        // Alternate animation direction for visual variety
        const reverse = index % 2 !== 0;
        animateChars(chars, reverse);
      }
    });
  });

  // ========== SMOOTH SCROLLING & ANIMATION MOMENTUM ==========
  // Lenis: Advanced smooth scrolling library that provides momentum-based scrolling
  // This creates the organic "coasting" feeling when you stop scrolling
  // 
  // Key Features:
  // - smoothWheel: true → Smooth mouse wheel scrolling (not instant jumps)
  // - syncScroll: true → Keeps scroll state synced with DOM
  // - duration: Controls momentum duration (higher = longer coasting)
  // - easing: Exponential decay for natural deceleration
  // - lerp: Interpolation factor (lower = smoother momentum)
  
  const lenis = new Lenis({
    wrapper: document.querySelector(".main-scroll-container"),
    content: document.querySelector(".main-scroll-container"),
    smoothWheel: true,        // Enable smooth scroll on mouse wheel
    syncScroll: true,         // Keep scroll state in sync
    duration: 0.2,            // INCREASED for longer momentum (prevents abrupt stops on page 4)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing for natural deceleration
    lerp: 0.1                 // Smoothing factor: lower value = smoother momentum (0.1 is very smooth)
  });
  
  // Connect Lenis scroll events to ScrollTrigger for animation sync
  // This ensures all GSAP animations trigger at the right scroll positions
  lenis.on("scroll", ScrollTrigger.update);
  
  // Integrate Lenis with GSAP ticker for consistent frame updates
  // This keeps animations and scrolling perfectly synchronized
  // Every GSAP frame update also updates Lenis, preventing desync issues
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  
  // Disable GSAP's automatic lag smoothing
  // We use Lenis for smoothing instead to avoid double-smoothing which causes lag
  gsap.ticker.lagSmoothing(0);
});
// ========== PAGE 4: CARDS ENTRANCE ANIMATION ==========
  
  // Animate the Title and Subtitle
  gsap.from(".p4-header", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#page4",
      containerAnimation: null, // Since we are vertical scrolling, standard trigger works
      start: "top 60%", 
      toggleActions: "play none none reverse"
    }
  });

  // Animate the Grid Cards (Staggered)
  gsap.from(".flip-card", {
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1, // Delays each card by 0.1s for a wave effect
    ease: "back.out(1.7)", // Slight bounce effect on entry
    scrollTrigger: {
      trigger: ".p4-grid",
      start: "top 75%",
      toggleActions: "play none none reverse"
    }
  });
  // ========== PAGE 5: GUESTS ANIMATION ==========
  
  // Animate Header
  gsap.from(".p5-header", {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: "#page5",
      start: "top 60%",
      toggleActions: "play none none reverse"
    }
  });

  // Animate Guest Cards (Staggered from left to right)
  gsap.from(".guest-card", {
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".guest-grid",
      start: "top 75%",
      toggleActions: "play none none reverse"
    }
  });