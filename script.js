document.addEventListener("DOMContentLoaded", () => {
  loadOpeningHours();
  const buttonRegister = document.getElementById("button-register");
  if (buttonRegister) {
    buttonRegister.onclick = function () {
      window.location.href = "Register.html";
    };
  }

  const description = document.getElementById("description-event");
  const descriptions = [
    "Youngs will be participating in a multi-activity competition that will be throughout the whole day with some team games, races, and fun challenges. Winners will bring home trophies and medals.",
    "They will learn how to manipulate cameras, learn posing techniques, and capture moments.",
    "Compete in video games or tabletop games with friends and win gift cards and more.",
    "Learn to cook simple, fun, delicious dishes and share in the end a meal together.",
    "Playing many movies in different rooms, with pizza and a plenty of snacks.",
  ];

  // Using jQuery to handle mouse enter/leave events for event descriptions
  $(".events ul li").on("mouseenter", function () {
    const index = $(this).index(); // Get the index of the hovered item
    description.textContent = `Description: ${descriptions[index]}`;
    $(description).css({
      visibility: "visible",
      opacity: "1"
    });
  });

  $(".events ul li").on("mouseleave", function () {
    $(description).css({
      visibility: "hidden",
      opacity: "0"
    });
  });

  // === FORM HANDLING CODE ===
  const form = document.querySelector("form");
  if (form) {
    const fullNameInput = form.querySelector('input[placeholder="Full Name"]');
    const emailInput = form.querySelector('input[placeholder="Email"]');
    const phoneNumberInput = form.querySelector('input[placeholder="Phone Number"]');
    const eventsDropdown = form.querySelector("#events");
    const chosenEventsTextarea = form.querySelector("#chosen_events");
    const submitButton = form.querySelector('input[type="submit"]');

    const validateFullName = (name) => /^[A-Za-z\s]+$/.test(name);
    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const validatePhoneNumber = (phone) => /^\d+$/.test(phone);

    eventsDropdown.addEventListener("change", () => {
      const selectedEvent = eventsDropdown.value;
      if (selectedEvent) {
        chosenEventsTextarea.value = selectedEvent;
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fullName = fullNameInput.value.trim();
      const email = emailInput.value.trim();
      const phoneNumber = phoneNumberInput.value.trim();
      const selectedEvent = chosenEventsTextarea.value.trim();

      if (!validateFullName(fullName)) {
        alert("Please enter a valid Full Name (letters only).");
        return;
      }
      if (!validateEmail(email)) {
        alert("Please enter a valid Email address.");
        return;
      }
      if (!validatePhoneNumber(phoneNumber)) {
        alert("Please enter a valid Phone Number (digits only).");
        return;
      }
      if (!selectedEvent) {
        alert("Please choose an event before submitting.");
        return;
      }

      document.cookie = `fullName=${encodeURIComponent(fullName)}; path=/;`;
      document.cookie = `email=${encodeURIComponent(email)}; path=/;`;
      document.cookie = `phoneNumber=${encodeURIComponent(phoneNumber)}; path=/;`;
      document.cookie = `events=${encodeURIComponent(selectedEvent)}; path=/;`;

      alert("Registration is successful, we hope you will enjoy the event!");
      window.location.href = "index.html";
    });

    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      if (name.trim() === "fullName") fullNameInput.value = decodeURIComponent(value);
      if (name.trim() === "email") emailInput.value = decodeURIComponent(value);
      if (name.trim() === "phoneNumber") phoneNumberInput.value = decodeURIComponent(value);
      if (name.trim() === "events") chosenEventsTextarea.value = decodeURIComponent(value);
    });

    submitButton.disabled = true;

    // Using jQuery to toggle submit button enabled/disabled based on event selection
    $(eventsDropdown).on("change", function () {
      if ($(this).val()) {
        $(submitButton).prop("disabled", false);
      } else {
        $(submitButton).prop("disabled", true);
      }
    });
  }

  // jQuery way to handle cookie reading and displaying them in inputs
  $(document).ready(function() {
    const cookies = document.cookie.split(";");
    cookies.forEach(function(cookie) {
      const [name, value] = cookie.split("=");
      if (name.trim() === "fullName") {
        $('input[placeholder="Full Name"]').val(decodeURIComponent(value));
      }
      if (name.trim() === "email") {
        $('input[placeholder="Email"]').val(decodeURIComponent(value));
      }
      if (name.trim() === "phoneNumber") {
        $('input[placeholder="Phone Number"]').val(decodeURIComponent(value));
      }
      if (name.trim() === "events") {
        $('#chosen_events').val(decodeURIComponent(value));
      }
    });
  });
});

// Function to fetch a random quote
function fetchQuote() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.quotable.io/random", true); 
  xhr.onload = function () {
      if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          var quoteParagraph = document.createElement("p");
          quoteParagraph.innerText = `"${data.content}" — ${data.author}`;
          var quoteContainer = document.getElementById("quote-container");
          quoteContainer.style.textAlign = "center";
          quoteContainer.style.margin = "30px auto";
          quoteContainer.style.width = "500px"; 
          quoteContainer.style.padding = "10px";
          quoteContainer.style.backgroundColor = "#f9f9f9"; // Optional: Background color
          quoteContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Optional: Shadow effect
          quoteParagraph.style.margin = "0"; // Reset margins for paragraphs inside the container
          quoteParagraph.style.textAlign = "center"; // Ensure text is centered
          quoteContainer.appendChild(quoteParagraph);
      }
  };
  xhr.send();
}

window.onload = fetchQuote;

function loadOpeningHours() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "opening-hours.json", true); // Adjust the path if necessary
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const openingHoursList = document.getElementById("opening-hours-list");
      const openingHours = data.openingHours;

      // Clear any existing content
      openingHoursList.innerHTML = "";

      // Populate the list with fetched data
      for (const [day, hours] of Object.entries(openingHours)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${day}: ${hours}`;
        openingHoursList.appendChild(listItem);
      }
    } else {
      console.error("Failed to load opening hours:", xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error("Error fetching opening hours.");
  };
  xhr.send();
}
