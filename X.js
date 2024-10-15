  // Link mapping for images
  const linksMapping = {
    "1": "https://cdn.imgchest.com/files/j7kzczjjwr7.jpg",
    "2": "https://example.com/another-link",
    "3": "https://example.com/yet-another-link"
  };

  // Replace the embedded image based on link mapping
  function triggerImageReplacement() {
    const postLinkElement = document.querySelector("#postLink");
    const linkId = postLinkElement.getAttribute("data-link-id");
    const newImageUrl = linksMapping[linkId]; // Get the new image URL from mapping
    const embeddedImage = document.querySelector("#embeddedImage");

    if (newImageUrl && embeddedImage) {
      embeddedImage.src = newImageUrl;
    } else {
      alert("Replacement image not found.");
    }
  }

  // Download button functionality to replace the embedded image
  function downloadClicked() {
    const button = document.getElementById("downloadButton");
    if (button.getAttribute("disabled")) return;

    button.style.backgroundColor = "#4CAF50";
    button.innerHTML = "Downloading...";

    setTimeout(function() {
      button.style.backgroundColor = "#e67e22";
      button.innerHTML = "Download";
      triggerImageReplacement(); // Call the function to replace the image
    }, 1000);
  }

  // Countdown timer for download button
  function countdownTimer(button) {
    var count = 6;
    button.setAttribute("disabled", true);

    var interval = setInterval(function() {
      count--;
      if (count <= 0) {
        clearInterval(interval);
        button.innerHTML = "Download";
        button.removeAttribute("disabled");
      } else {
        button.innerHTML = "Download (" + count + ")";
      }
    }, 1000);
  }

  // Start countdown when the button is in the viewport
  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  window.addEventListener('scroll', function() {
    var button = document.getElementById("downloadButton");
    if (isInViewport(button) && !button.getAttribute("data-countdown-started")) {
      countdownTimer(button);
      button.setAttribute("data-countdown-started", "true");
    }
  });

  document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("downloadButton");
    button.innerHTML = "Download";
  });
