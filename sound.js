let play = document.getElementById("hit");
function playSound() {
  let audio = new Audio("mixkit-page-turn-single-1104.wav");
  audio.loop = false;
  audio.play();
}
play.addEventListener("click", playSound);
