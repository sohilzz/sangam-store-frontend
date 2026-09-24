const images = document.querySelectorAll(".gph img, .product-image");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");

/* Open image */
  images.forEach(image => {
      image.addEventListener("click", () => {
          lightboxImage.src = image.src;
          lightboxImage.alt = image.alt;
          lightbox.classList.add("active");
      });
  });

/* Close using X */
  lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("active");
  });

/* Close by clicking outside image */
  lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
          lightbox.classList.remove("active");
      }
  });

/* Close using Escape key */
  document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
          lightbox.classList.remove("active");
      }
  });

   document.getElementById("enquiryForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const enquiry = {
        name: document.getElementById("name").value,
        contact: document.getElementById("contactInput").value,
        message: document.getElementById("message").value
    };
    console.log(enquiry);
    try{
        const response = await fetch("http://localhost:8080/api/enquiry/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(enquiry)
        });

        if (response.ok) {
            alert("Enquiry submitted successfully!");
            document.getElementById("enquiryForm").reset();
        } else {
            //const errorData = await response.json();
            //console.log(errorData);
            //alert("Failed to Submit Enquiry.");
            const errorText = await response.text();
            console.log("Status:", response.status);
            console.log("Response:", errorText);

    alert("Failed to Submit Enquiry. Status: " + response.status);
        }
    }catch(error){
        console.error("Error:",error);
        alert("Unable to Coonect to Server.");
    }

});