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
        const response = await fetch("https://sangam-store-backend.onrender.com/api/enquiry/add", {
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

    const counters = document.querySelectorAll(".counter");

        const startCounter = (counter) => {
        const target = Number(counter.dataset.target);
        const duration = 1000;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);

            const currentValue = Math.floor(progress * target);

            counter.textContent = currentValue + "+";

            if (progress < 1) {
            requestAnimationFrame(updateCounter);
            } else {
            counter.textContent = target + "+";
            }
        };

        requestAnimationFrame(updateCounter);
    };

    const statsSection = document.querySelector(".stats");

    const observer = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        counters.forEach(startCounter);
    
        observer.unobserve(statsSection);
      }
    }, {
      threshold: 0.5
    });
    
    observer.observe(statsSection);    