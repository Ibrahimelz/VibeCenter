document.getElementById("button-register").onclick = function () {
  window.location.href = "Register.html";
};

document.addEventListener("DOMContentLoaded", () => {
  const description = document.getElementById("description-event");
  const descriptions = [
    "Youngs will be participating in a multi-activity competition that will be throughout the whole day with some team games, races, and fun challenges. Winners will bring home trophies and medals.",
    "They will learn how to manipulate cameras, learn posing techniques, and capture moments.",
    "Compete in video games or tabletop games with friends and win gift cards and more.",
    "Learn to cook simple, fun, delicious dishes and share in the end a meal together.",
    "Playing many movies in different rooms, with pizza and a plenty of snacks.",
  ];

  // Attach hover events to all <li> elements
  document.querySelectorAll(".events ul li").forEach((li, index) => {
    li.addEventListener("mouseenter", () => {
      description.textContent = `Description: ${descriptions[index]}`;
      description.style.visibility = "visible";
      description.style.opacity = "1";
    });

    li.addEventListener("mouseleave", () => {
      description.style.visibility = "hidden";
      description.style.opacity = "0";
    });
  });
});
