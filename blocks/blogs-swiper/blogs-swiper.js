/*eslint-disable*/
import { div, h2, p, img, a } from "../../scripts/domhelper.js";

export default function decorate(block) {
  function getFakeApiData() {
    return [
      {
        id: 1,
        image: "https://picsum.photos/id/1015/250/150",
        title: "Mountain View",
        description: "A beautiful mountain view with mist and trees.",
        link: "#",
      },
      {
        id: 2,
        image: "https://picsum.photos/id/1016/250/150",
        title: "City Life",
        description: "The hustle and bustle of a vibrant cityscape.",
        link: "#",
      },
      {
        id: 3,
        image: "https://picsum.photos/id/1018/250/150",
        title: "Ocean Breeze",
        description: "Relaxing ocean waves on a sunny day.",
        link: "#",
      },
      {
        id: 4,
        image: "https://picsum.photos/id/1020/250/150",
        title: "Forest Trail",
        description: "A serene walk through the woods.",
        link: "#",
      },
    ];
  }

  const apiData = getFakeApiData();

  const retirementCalculator = div(
    { class: "main-Container" },
    apiData.forEach((data)=>{
 div(
      { class: "card" },
      img("img src"),
      h2("Title"),
      p("para"),
      a("#")
    )
    })
  );

  //   // Render cards dynamically
  //   function renderCards(data) {
  //     const container = document.getElementById("cardContainer");
  //     container.innerHTML = "";
  //     data.forEach((card) => {
  //       const cards = document.createElement("div");
  //       cards.className = "card";
  //       cards.innerHTML = `
  //           <img src="${card.image}" alt="${card.title}">
  //           <h3>${card.title}</h3>
  //           <p>${card.description}</p>
  //           <a href="${card.link}">Read More</a>
  //         `;
  //       container.appendChild(div);
  //     });
  //   }
  //   const apiData = getFakeApiData();
  //   renderCards(apiData);
}

/* For Future: */
/*   // Render cards dynamically
  function renderCards(data) {
    const container = document.getElementById("cardContainer");
    container.innerHTML = ""; // Clear previous cards if any
    data.forEach(card => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <img src="${card.image}" alt="${card.title}">
        <h3>${card.title}</h3>
        <p>${card.description}</p>
        <a href="${card.link}">Read More</a>
      `;
      container.appendChild(div);
    });
  }
  // Fetch data from real API
  fetch('https://your-api.com/cards')
    .then(response => response.json())
    .then(data => renderCards(data))
    .catch(error => {
      console.error("Error fetching data:", error);
    }); */
