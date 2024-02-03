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
    img: "./img/hero-img-vv-2.png",
  },
  {
    id: 2,
    category: "Mens",
    price: 149,
    img: "./img/mens-collection-vv.jpeg",
  },
  {
    id: 3,
    category: "Womens",
    price: 109,
    img: "./img/womens-vv.png"
  },
  {
    id: 4,
    category: "Kids",
    price: 129,
    img: "./img/kids-vv.png"
  },
  {
    id: 5,
    category: "Sale",
    price: 99,
    img: "./img/sale-vv.png"
  },
];

let choosenProduct = products[0];

//const currentProductImg = document.querySelector(".productImg");
const carouselImg = document.querySelector(".carousel-img");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");


menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    //change the current slide
    //wrapper.style.transform = `translateX(${-100 * index}vw)`;





    //change the choosen product
    choosenProduct = products[index];



    //change texts of currentProduct
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    //currentProductImg.src = choosenProduct.colors[0].img;

    analytics.track('Product Viewed', {
      product: choosenProduct.title,
      price: choosenProduct.price,
    });
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

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

payButton.addEventListener("click", () => {
  console.log("TEST" + choosenProduct.title);
  let payEmail = document.getElementById("email").value;

  analytics.identify(`${payEmail}`, {
    name: document.getElementById("fullName").value,
    email: document.getElementById("email").value
  });
  analytics.track('Purchase Completed', {
    product: choosenProduct.title,
    price: choosenProduct.price,
  });
  payment.style.display = "none";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});
