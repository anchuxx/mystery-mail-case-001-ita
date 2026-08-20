var correctAnswers = [9, 28, 17, 8, 647, 54, 2, 11, 35, 9643];


/* -------------------------------------------------
   STARTUP
   Watch every answer box for changes.
------------------------------------------------- */

window.onload = function () {
  var i;
  var input;

  for (i = 1; i <= 10; i++) {
    input = document.getElementById("a" + i);

    if (input) {
      input.onkeyup = function () {
        checkStoryUnlocks();
      };

      input.onchange = function () {
        checkStoryUnlocks();
      };
    }
  }

  checkStoryUnlocks();
};


/* -------------------------------------------------
   CHECK ANSWERS BUTTON
------------------------------------------------- */

function checkAnswers() {
  var i;
  var input;
  var value;

  for (i = 1; i <= 10; i++) {
    input = document.getElementById("a" + i);

    if (!input) {
      continue;
    }

    value = input.value;

    /* Empty boxes stay neutral */
    if (value === "") {
      removeClass(input, "correct");
      removeClass(input, "incorrect");
    }

    /* Correct answer */
    else if (Number(value) === correctAnswers[i - 1]) {
      removeClass(input, "incorrect");
      addClass(input, "correct");
    }

    /* Incorrect answer */
    else {
      removeClass(input, "correct");
      addClass(input, "incorrect");
    }
  }

  checkStoryUnlocks();
}


/* -------------------------------------------------
   STORY UNLOCKING
------------------------------------------------- */

function checkStoryUnlocks() {
  var solved = [];
  var i;

  for (i = 1; i <= 10; i++) {
    solved[i] = isCorrect(i);
  }


  /* Puzzles 1 + 2 */
  if (solved[1] && solved[2]) {
    unlockSection("fragment-1", "locked-fragment-1");
  }


  /* Puzzles 3 + 4 */
  if (solved[3] && solved[4]) {
    unlockSection("fragment-2", "locked-fragment-2");
  }


  /* Puzzles 5 + 6 */
  if (solved[5] && solved[6]) {
    unlockSection("fragment-3", "locked-fragment-3");
  }


  /* Puzzles 7 + 8 */
  if (solved[7] && solved[8]) {
    unlockSection("fragment-4", "locked-fragment-4");
  }


  /* Puzzle 9 */
  if (solved[9]) {
    unlockSection("fragment-5", "locked-fragment-5");
  }


  /* ---------------------------------------------
     PUZZLE 10

     If 10 is correct early, confirm the RSVP
     code but DON'T show the ending.
  --------------------------------------------- */

  if (solved[10] && !allAnswersCorrect(solved)) {
    showElement("puzzle-10-status");
  } else {
    hideElement("puzzle-10-status");
  }


  /* ---------------------------------------------
     GRAND FINALE

     Only unlock when ALL TEN are correct.
  --------------------------------------------- */

  if (allAnswersCorrect(solved)) {
    hideElement("puzzle-10-status");
    unlockSection("grand-finale", "locked-finale");
  }
}


/* -------------------------------------------------
   CHECK ONE PUZZLE
------------------------------------------------- */

function isCorrect(number) {
  var input = document.getElementById("a" + number);

  if (!input) {
    return false;
  }

  if (input.value === "") {
    return false;
  }

  return Number(input.value) === correctAnswers[number - 1];
}


/* -------------------------------------------------
   CHECK WHETHER ALL TEN ARE COMPLETE
------------------------------------------------- */

function allAnswersCorrect(solved) {
  var i;

  for (i = 1; i <= 10; i++) {
    if (!solved[i]) {
      return false;
    }
  }

  return true;
}


/* -------------------------------------------------
   UNLOCK A LETTER / FINALE
------------------------------------------------- */

function unlockSection(sectionId, lockedId) {
  var section = document.getElementById(sectionId);
  var lockedSection = document.getElementById(lockedId);

  if (section) {
    section.style.display = "block";
  }

  if (lockedSection) {
    lockedSection.style.display = "none";
  }
}


/* -------------------------------------------------
   SHOW / HIDE
------------------------------------------------- */

function showElement(id) {
  var element = document.getElementById(id);

  if (element) {
    element.style.display = "block";
  }
}


function hideElement(id) {
  var element = document.getElementById(id);

  if (element) {
    element.style.display = "none";
  }
}


/* -------------------------------------------------
   CLASS HELPERS
   Older-browser compatible
------------------------------------------------- */

function addClass(element, className) {
  if (element.className.indexOf(className) === -1) {
    element.className =
      element.className + " " + className;
  }
}


function removeClass(element, className) {
  var pattern = new RegExp(
    "(^|\\s)" + className + "(\\s|$)",
    "g"
  );

  element.className =
    element.className.replace(pattern, " ");
}