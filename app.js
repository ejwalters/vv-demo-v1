const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");
const unifySpace = "spa_guwfkaTcfqVerxoetnb6AS"
const profileApiToken = "OnE2g7YLo4LqQBIKPUo5pcm73Ph7tIvJdAuy6__xZzaMKfMHmb6BSz9hO08hom4b4MpDcVKn3Gi0OKPy4gb4QsHz8_u8e7vwOsjk96yjiJfP5v2yqLqUjLk1bUltCR5G75jv2lLC9DABHccEE-5wl82dvvnSDCGe7P54GFNJ2gFD3vQPAp01nJ1_Dpjb1tQM7-kGOAqx8JxdeasC6o7dHFuIQ_Z5BfLif3b87TVHsmt0vHM0Uhf9XHqzBUavTJCSmu24kDnl_OwOX_O9lO5po8NDBZo="


analytics.ready(function () {
  let anonymous_id = analytics.user().anonymousId();
  console.log("ANON ID:" + anonymous_id);
  let anon_id = (anonymous_id.replace(/['"]+/g, ''));
  console.log("NEW ANON:" + anon_id);
  let hash = btoa(profileApiToken + ':')
  console.log("HASH" + hash);

  const apiUrl = 'https://profiles.segment.com/v1/spaces/' + unifySpace + '/collections/users/profiles/anonymous_id:' + anon_id + '/traits';
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${apiUrl}`);
  xhr.setRequestHeader("Basic", hash);
  xhr.send();
  xhr.responseType = "json";
  xhr.getResponseHeader
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const data = xhr.response;
      console.log(data);
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };
});

// Define the API URL


const products = [
  {
    id: 1,
    category: "New",
    price: 119,
    img: "./img/hero-v3.png",
    singleProductImg: "https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dw4215b0a3/images/2024/2E002002_951_CF_OF_0006_A.jpg?sw=864&strip=false",
  },
  {
    id: 2,
    category: "Mens",
    price: 149,
    img: "./img/mens-vv-2.png",
    singleProductImg: "https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dw05df2193/images/2024/1K004683_8872_CF_OF_0067_A.jpg?sw=864&strip=false",
    productTitle: "Calmwater Shirt Jacket",
  },
  {
    id: 3,
    category: "Womens",
    price: 109,
    img: "./img/womens-vv.png",
    singleProductImg: "https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dwd77423ae/images/2024/2E002068_111_CF_OF_0004_A.jpg?sw=864&strip=false",
    productTitle: "Cotton Cable Crewneck Sweater",
  },
  {
    id: 4,
    category: "Kids",
    price: 129,
    img: "./img/kids-vv.png",
    singleProductImg: "https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dwd0f82882/images/2023/3G010324_D180_LD_1444_F.jpg?sw=864&strip=false",
    productTitle: "Boys' Printed Sankaty Polo",
  },
  {
    id: 5,
    category: "Sale",
    price: 99,
    img: "./img/sale-vv.png",
    singleProductImg: "https://www.vineyardvines.com/dw/image/v2/AAHW_PRD/on/demandware.static/-/Sites-vineyardvines-master/default/dwd20846d9/images/2023/1K004367_8891_LD_53808_F.jpg?sw=548&sh=822&sm=cut&strip=false",
    productTitle: "Harbor Fleece Quarter-Snap",
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const carouselImg = document.querySelector(".carousel-img");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");
const cartProductImg = document.querySelector(".cartProductImg");
const cartProductTitle = document.querySelector(".cartProductTitle");
const cartProductPrice = document.querySelector(".cartProductPrice");


menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    //change the choosen product
    choosenProduct = products[index];

    //change texts of currentProduct
    currentProductTitle.textContent = choosenProduct.productTitle;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.singleProductImg;
  });
});


document.querySelectorAll(".carousel").forEach((carousel) => {
  const items = carousel.querySelectorAll(".carousel_item");

  menuItems.forEach((button, i) => {
    button.addEventListener("click", () => {
      // un-select all the items
      choosenProduct = products[i];
      console.log("Chosen Product:" + choosenProduct.category);
      carouselImg.src = choosenProduct.img;
      analytics.track('Product Viewed', {
        category: choosenProduct.category,
        price: choosenProduct.price,
      });
    });
  });

  // Select the first item on page load
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");
const payButton = document.querySelector(".payButton");
const resetAJS = document.querySelector(".resetAJS");
const newsletterButton = document.querySelector(".fButton");
const newsletterEmail = document.querySelector(".fInput");

newsletterButton.addEventListener("click", () => {
  analytics.identify(`${newsletterEmail}`, {
    email: `${newsletterEmail}`
  });
});

resetAJS.addEventListener("click", () => {
  analytics.reset()
});

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
  cartProductImg.src = choosenProduct.singleProductImg;
  cartProductPrice.textContent = "$" + choosenProduct.price;
  cartProductTitle.textContent = choosenProduct.productTitle;

  analytics.track('Checkout Started', {
    product: choosenProduct.productTitle,
    price: choosenProduct.price,
    category: choosenProduct.category,
  });
});

payButton.addEventListener("click", () => {
  console.log("TEST" + choosenProduct.title);
  let payEmail = document.getElementById("email").value;

  analytics.identify(`${payEmail}`, {
    name: document.getElementById("fullName").value,
    email: document.getElementById("email").value
  });
  analytics.track('Purchase Completed', {
    product: choosenProduct.productTitle,
    price: choosenProduct.price,
    category: choosenProduct.category,
  });
  payment.style.display = "none";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});
