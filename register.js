document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Zoom out the big background text slightly and fade it in
  gsap.from(".bg-big-text", {
    scale: 1.2,
    opacity: 0,
    filter: "blur(20px)",
    duration: 1.5,
    ease: "power2.out"
  });

  // 2. Slide up the glass card from the bottom
  gsap.from(".glass-card", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out"
  });

  // 3. Stagger the input fields so they appear one by one
  gsap.from(".input-group", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1, // 0.1 second delay between each item
    delay: 0.6,
    ease: "power2.out"
  });

  // 4. Animate button and footer last
  gsap.from(".submit-btn, .form-footer", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    delay: 1.1,
    ease: "power2.out"
  });
});