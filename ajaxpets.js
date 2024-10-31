//
/*
* Please, include a display pets function placeholder for future students. If not, why even include the starter functions?
* The instruction say nothing about displaying images, anyway. Just making requests and fetching.
*/

"use strict";
(function() {

  window.addEventListener("load", init);

  function init() {
    const puppyButton = document.querySelector('input[value="puppy"]');
    const kittyButton = document.querySelector('input[value="kitty"]');

    puppyButton.addEventListener("click", () => makeRequest("puppy"));
    kittyButton.addEventListener("click", () => makeRequest("kitty"));
  }

  function makeRequest(animal) {
    const url = `https://courses.cs.washington.edu/courses/cse154/webservices/pets/ajaxpets.php?animal=${animal}`;
    fetch(url)
      .then(statusCheck)
      .then(res => res.text()) // Gets response as text
      .then(text => {
        console.log(text); // Logs the raw text response
        const imageUrls = text.split("\n").filter(url => url.trim() !== ""); // Splits by new lines and filter out empty lines
        displayPets(imageUrls);
      })
      .catch(error => console.error("Error fetching data:", error));
  }

  function displayPets(imageUrls) { 
    const picturesContainer = id("pictures");
    picturesContainer.innerHTML = ""; // Clears previous pictures

    if (imageUrls.length > 0) {
      imageUrls.forEach(url => {
        const img = document.createElement("img");
        img.src = url; //My issue
        picturesContainer.appendChild(img);
      });
    } else {
      picturesContainer.innerHTML = "<p>No pets found.</p>"; // no pets found
    }
  }

  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  function id(id) {
    return document.getElementById(id);
  }

  function qs(query) {
    return document.querySelector(query);
  }

  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();
