let pageData = [
    {
      name: "Lithuania | Lietuva",
      url: "page1.html",
      img: "1.jpg"
    },
    {
      name: "Spain | España",
      url: "page2.html",
      img: "2.jpg"
    },
    {
      name: "Middle East",
      url: "page3.html",
      img: "3.jpg"
    },
    {
      name: "Netherlands | Nederland",
      url: "page3.html",
      img: "3.jpg"
    },
    {
      name: "Bosnia and Herzegovina",
      url: "page3.html",
      img: "3.jpg"
    },
    {
      name: "Belgium | België",
      url: "page3.html",
      img: "3.jpg"
    },
    {
      name: "Finland | Suomi",
      url: "page3.html",
      img: "3.jpg"
    },
    {
      name: "India",
      url: "page3.html",
      img: "3.jpg"
    }
  ];
  
  let dropdownContainer = document.querySelector(".custom-dropdown");
  
  dropdownContainer.innerHTML = `
     <div class="dropdown-selected">
      <img alt="ab"></img>
      <span>India</span>
    </div>
    <ul class="dropdown-options"></ul>
  `;
  
  let optionsContainer = dropdownContainer.querySelector(".dropdown-options");
  
  pageData.forEach(function (page) {
    let optionDiv = document.createElement("li");
    optionDiv.classList.add("dropdown-option");
    // optionDiv.setAttribute("data-url", page.url);
    optionDiv.innerHTML = `
      <a href=${page.url}>
      <img src="${page.img}" />
      <span>${page.name}</span>
      </a>
    `;
    optionsContainer.appendChild(optionDiv);
  
    optionDiv.addEventListener("click", function () {
      document.querySelector(".dropdown-selected").innerHTML = `
        <img src="${page.img}" />
        <span>${page.name}</span>
      `;
      optionsContainer.classList.remove("show");
      // window.location.href = `https;//${page.url}.in`;
    });
  });
  
  document
    .querySelector(".dropdown-selected")
    .addEventListener("click", function () {
      optionsContainer.classList.toggle("show");
    });