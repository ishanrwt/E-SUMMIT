
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
