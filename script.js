const cityData = {
  mumbai: {
    name: "Mumbai",
    summary: "Showing fast-moving bridal, diamond and daily wear pieces for Mumbai."
  },
  delhi: {
    name: "Delhi",
    summary: "Showing wedding, festive and gifting pieces available for Delhi NCR."
  },
  jaipur: {
    name: "Jaipur",
    summary: "Showing colourful, bridal and heritage-inspired designs for Jaipur."
  },
  ahmedabad: {
    name: "Ahmedabad",
    summary: "Showing lightweight gold, festive and family gifting pieces for Ahmedabad."
  },
  bengaluru: {
    name: "Bengaluru",
    summary: "Showing modern, lightweight and diamond-forward jewellery for Bengaluru."
  }
};

// To add a product: copy one block below, change the text, and put the image file inside the assets folder.
const products = [
  {
    name: "Deep Gold Bangles",
    image: "assets/product-bangles.png",
    category: "daily",
    price: "Rs. 88,000",
    tag: "22K Gold",
    note: "Comfortable gold bangles for daily wear, festivals and family functions.",
    cities: ["mumbai", "delhi", "jaipur", "ahmedabad", "bengaluru"]
  },
  {
    name: "Deep Diamond Ring",
    image: "assets/product-ring.png",
    category: "gift",
    price: "Rs. 66,000",
    tag: "Diamond",
    note: "A polished gift choice for birthdays, proposals and anniversaries.",
    cities: ["mumbai", "delhi", "jaipur", "ahmedabad", "bengaluru"]
  },
  {
    name: "Deep Bridal Necklace",
    image: "assets/product-necklace.png",
    category: "bridal",
    price: "Rs. 2,75,000",
    tag: "Bridal Gold",
    note: "A graceful necklace set for wedding shopping and special home visits.",
    cities: ["mumbai", "delhi", "jaipur", "ahmedabad", "bengaluru"]
  },
  {
    name: "Deep Floral Pendant",
    image: "assets/product-pendant.png",
    category: "daily",
    price: "Rs. 42,000",
    tag: "Gold Pendant",
    note: "A light pendant chain for office wear, gifting and simple occasions.",
    cities: ["mumbai", "delhi", "jaipur", "ahmedabad", "bengaluru"]
  }
];

let activeCity = "ahmedabad";
let activeFilter = "all";

const citySelect = document.querySelector("#citySelect");
const bookingCity = document.querySelector("#bookingCity");
const citySummary = document.querySelector("#citySummary");
const collectionTitle = document.querySelector("#collectionTitle");
const productGrid = document.querySelector("#productGrid");
const filterButtons = document.querySelectorAll(".filter");
const bookingForm = document.querySelector("#bookingForm");
const bookingStatus = document.querySelector("#bookingStatus");
const quizButton = document.querySelector("#quizButton");
const giftPurpose = document.querySelector("#giftPurpose");
const quizResult = document.querySelector("#quizResult");

function renderProducts() {
  const city = cityData[activeCity];
  const visibleProducts = products.filter((product) => {
    const matchesCity = product.cities.includes(activeCity);
    const matchesFilter = activeFilter === "all" || product.category === activeFilter;
    return matchesCity && matchesFilter;
  });

  collectionTitle.textContent = `Popular in ${city.name}`;
  citySummary.textContent = city.summary;
  citySelect.value = activeCity;
  bookingCity.value = city.name;

  productGrid.innerHTML = visibleProducts
    .map((product) => {
      return `
        <article class="product-card">
          <img class="product-image" src="${product.image}" alt="${product.name}" />
          <div class="product-body">
            <div class="product-meta">
              <span>${product.tag}</span>
              <span>${city.name}</span>
            </div>
            <h3>${product.name}</h3>
            <p>${product.note}</p>
            <div class="product-footer">
              <span class="price">${product.price}</span>
              <button class="small-btn" type="button" data-product="${product.name}">Add to Visit</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

citySelect.addEventListener("change", (event) => {
  activeCity = event.target.value;
  renderProducts();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderProducts();
  });
});

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-product]");
  if (!button) return;

  bookingStatus.textContent = `${button.dataset.product} added to the home visit request. Fill the form and submit.`;
  document.querySelector("#visit").scrollIntoView({ behavior: "smooth" });
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const customerName = formData.get("name") || "Customer";
  const city = formData.get("city");
  const date = formData.get("date");

  bookingStatus.textContent = `Thank you, ${customerName}. Your ${city} home visit request for ${date} is ready. In a real website this will go to your WhatsApp, email or shop dashboard.`;
  bookingForm.reset();
  bookingCity.value = cityData[activeCity].name;
});

quizButton.addEventListener("click", () => {
  const suggestions = {
    wedding: "Recommend bridal necklace sets, kundan chokers and matching bangles.",
    anniversary: "Recommend diamond rings, pearl tops and rose gold bangles.",
    festival: "Recommend gold bangles, festive necklaces and colourful meenakari pieces.",
    daily: "Recommend lightweight rings, slim bangles and small diamond pendants."
  };

  quizResult.textContent = suggestions[giftPurpose.value];
});

renderProducts();
