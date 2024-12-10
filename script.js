document.addEventListener("DOMContentLoaded", () => { //DOMContentLoaded is used because we want the following to be executed each time the page loads
  loadOpeningHours();
  fetchQuote();
  const buttonRegister = document.getElementById("button-register");
  if (buttonRegister) {
    buttonRegister.onclick = function () {
      window.location.href = "Register.html"; //When clicked over the buttonRegister we go to Register page
    };
  }

  const description = document.getElementById("description-event");
  // Each of the following is the description of the current event that the user is hover over it 
  const descriptions = [
    "Youngs will be participating in a multi-activity competition that will be throughout the whole day with some team games, races, and fun challenges. Winners will bring home trophies and medals.",
    "They will learn how to manipulate cameras, learn posing techniques, and capture moments.",
    "Compete in video games or tabletop games with friends and win gift cards and more.",
    "Learn to cook simple, fun, delicious dishes and share in the end a meal together.",
    "Playing many movies in different rooms, with pizza and a plenty of snacks.",
  ];

  // Here we will use jQuery to handle mouse hovering for event descriptions
  $(".events ul li").on("mouseenter", function () {
    const index = $(this).index(); // This gets the index of the hovered item
    description.textContent = `Description: ${descriptions[index]}`;
    $(description).css({ 
      visibility: "visible", //This makes it appear to us while hovering
      opacity: "1"
    });
  });

  $(".events ul li").on("mouseleave", function () {
    $(description).css({
      visibility: "hidden",
      opacity: "0"
    });
  });

  const form = document.querySelector("form");
  if (form) {
    const fullNameInput = form.querySelector('input[placeholder="Full Name"]');
    const emailInput = form.querySelector('input[placeholder="Email"]');
    const phoneNumberInput = form.querySelector('input[placeholder="Phone Number"]');
    const eventsDropdown = form.querySelector("#events");
    const chosenEventsTextarea = form.querySelector("#chosen_events");
    const submitButton = form.querySelector('input[type="submit"]');

    //Used regex pattern because its efficient, easy and short to write
    const validateFullName =  (name) => /^[A-Za-z\s]+$/.test(name); //Makes sure that there is only letters
    const validateEmail =(email) => /\S+@\S+\.\S+/.test(email); //Makes sure that there is a @ and a "." 
    const validatePhoneNumber = (phone) => /^\d+$/.test(phone); //Make sure that phone is only digits
    eventsDropdown.addEventListener("change", () => {
      const selectedEvent= eventsDropdown.value; 
      if (selectedEvent) {
        chosenEventsTextarea.value = selectedEvent;
      }
    });

    /**Here we are making sure before submitting the registration that what the user has input is valid or not */
    form.addEventListener("submit", (e) => {
      e.preventDefault(); //preventDefault() stops the form's default action, which is to submit and reload the page. This is helpful because it prevents the user from losing their form data due to a page reload, which could be very frustrating if there are errors in the input.
      const fullName = fullNameInput.value.trim();
      const email = emailInput.value.trim();
      const phoneNumber = phoneNumberInput.value.trim();
      const selectedEvent = chosenEventsTextarea.value.trim();
      if (!validateFullName(fullName)) {
        alert("Please enter a valid Full Name (letters only)!");
        return;
      }
      if (!validateEmail(email)) {
        alert("Please enter a valid Email address!");
        return;
      }
      if (!validatePhoneNumber(phoneNumber)) {
        alert("Please enter a valid Phone Number (digits only)!");
        return;
      }
      if (!selectedEvent) {
        alert("Please choose an event before submitting!");
        return;
      }
      document.cookie = `fullName=${encodeURIComponent(fullName)};`;
      document.cookie = `email=${encodeURIComponent(email)};`;
      document.cookie = `phoneNumber=${encodeURIComponent(phoneNumber)};`;
      document.cookie = `events=${encodeURIComponent(selectedEvent)};`;


      alert("Registration is successful, we hope you will enjoy the event!");
      window.location.href = "index.html"; //When we click the button the submit button we go back to home page
    });

    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("="); //Here we are extracting the first and second elements of the array into the name and value variables respectively
      if (name.trim() === "fullName") fullNameInput.value = decodeURIComponent(value);
      if (name.trim() === "email" ) emailInput.value = decodeURIComponent(value);
      if (name.trim() === "phoneNumber")  phoneNumberInput.value= decodeURIComponent(value);
      if (name.trim() ===  "events") chosenEventsTextarea.value = decodeURIComponent(value);
    });
    
    submitButton.disabled = true;
    // Here we are using jQuery to make submit button enabled/disabled based on event selection
    $(eventsDropdown).on("change", function () { //on() attaches event handlers to elements
      if ($(this).val()) {
        $(submitButton).prop("disabled", false); //prop() in jQuery is used to manipulate properties like disabled, checked, selected, etc.
      } else {
        $(submitButton).prop("disabled",true);
      }
    });
  }

  /* We use the jQuery way to handle the cookie reading and displaying. Basically, the function save the user information so that they don’t 
   need to rewrite them in the next time they want to register for themselves, or for another person, into an event(they just choose another event from the list and submit). 
   The function makes sure that they can only register to 1 event at a time, this encourages indirectly a diverse participation in each event.
   However, the user could still go back and register to the other events, but it's going to be longer and annoying for him. We are kind of forcing him to ambandon overbooking and to leave a chance for others*/
  $(document).ready(function() {
    const cookies = document.cookie.split(";");
    cookies.forEach(function(cookie) {
      const [name, value] = cookie.split("=");
      if (name.trim() === "fullName") { //trim() remove whitespace from both ends of a string
        $('input[placeholder="Full Name"]').val(decodeURIComponent(value)); //decodeURIComponent() helps us to basically convert this cookie data back to a human-readable format.
      }
      if (name.trim() ==="email") {
        $('input[placeholder="Email"]').val(decodeURIComponent(value)); //val() method is simply used to get or set the value of a form element
      }
      if (name.trim() === "phoneNumber") {
        $('input[placeholder="Phone Number"]').val(decodeURIComponent(value));
      }
      if (name.trim()==="events") {
        $('#chosen_events').val(decodeURIComponent(value));
      }
    });
  });
});

// This fetches a random quote from the API and display it
function fetchQuote() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.quotable.io/random", true); 
  xhr.onload = function () {
      if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          var quoteParagraph = document.createElement("p");
          quoteParagraph.innerText = `"${data.content}" — ${data.author}`;
          var quoteContainer = document.getElementById("quote-container");
          //We are going to style the quote before appending it to the quoteContainer
          quoteContainer.style.textAlign = "center";
          quoteContainer.style.margin = "30px auto";
          quoteContainer.style.width = "500px"; 
          quoteContainer.style.padding = "10px";
          quoteContainer.style.backgroundColor = "#f9f9f9"; 
          quoteContainer.style.boxShadow  = "0 4px 8px rgba(0, 0, 0, 0.1)"; 
          quoteParagraph.style.margin = "0"; 
          quoteParagraph.style.textAlign ="center"; 
          quoteContainer.appendChild(quoteParagraph);
      }
  };
  xhr.send();
}

//This loads the opening hours of the center from the json file and displays it
function loadOpeningHours() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "opening-hours.json", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const openingHoursList = document.getElementById("opening-hours-list");
      const openingHours = data.openingHours;
      openingHoursList.innerHTML = ""; // This is to clear any existing content
      for (const [day, hours] of Object.entries(openingHours)) { //Here we simply are populating the list with fetched data from the opening-hours. Also, we are destructuring in a for of Loop and converting an object into an array of key-value pairs. 
        const listItem = document.createElement("li");
        listItem.textContent = `${day}: ${hours}`;
        openingHoursList.appendChild(listItem);
      }
    }
  };
  xhr.send();
}
