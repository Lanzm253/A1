// Function to load external JavaScript dynamically
function loadScript(url, callback) {
  const script = document.createElement("script");
  script.src = url;
  script.onload = callback; // Execute the callback after the script loads
  document.head.appendChild(script);
}

// Main function to trigger image replacement based on link ID
function triggerImageReplacement() {
  const postLinkElement = document.querySelector("#postLink");
  const linkId = parseInt(postLinkElement.getAttribute("data-link-id")); // Convert to integer
  let newImageUrl;

  // Load scripts dynamically based on linkId
  if (linkId < 100) {
    newImageUrl = getLinkFromCodeA(linkId); // Get link from Code A
  } else if (linkId < 200) {
    loadScript("https://cdn.jsdelivr.net/gh/Lanzm253/your-repo@1/codeB.js", function() {
      newImageUrl = getLinkFromCodeB(linkId);
      updateImage(newImageUrl);
    });
    return; // Prevent further execution until the script loads
  } else if (linkId < 300) {
    loadScript("https://cdn.jsdelivr.net/gh/Lanzm253/your-repo@1/codeC.js", function() {
      newImageUrl = getLinkFromCodeC(linkId);
      updateImage(newImageUrl);
    });
    return; // Prevent further execution until the script loads
  } else {
    alert("Invalid link ID.");
    return;
  }

  updateImage(newImageUrl);
}

// Function to update the embedded image
function updateImage(newImageUrl) {
  const embeddedImage = document.querySelector("#embeddedImage");
  if (newImageUrl && embeddedImage) {
    embeddedImage.src = newImageUrl;
  } else {
    alert("Replacement image not found.");
  }
}

// Download button functionality
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

// Other functions (countdown timer, etc.) can be added here.
