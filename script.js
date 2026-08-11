function checkAnswers() {
  const correctAnswers = [9, 28, 17, 8, 647, 54, 2, 11, 35, 9643];
  let allCorrect = true;

  for (let i = 1; i <= 10; i++) {
    const input = document.getElementById("a" + i);
    const userValue = Number(input.value);

    if (userValue === correctAnswers[i - 1]) {
      input.classList.remove("incorrect");
      input.classList.add("correct");
    } else {
      input.classList.remove("correct");
      input.classList.add("incorrect");
      allCorrect = false;
    }
  }

  if (allCorrect) {
    document.getElementById("secret-message").style.display = "block";
    window.scrollTo(0, document.body.scrollHeight);
  }
}
