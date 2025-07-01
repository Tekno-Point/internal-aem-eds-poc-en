export default function decorate(block) {
    debugger
  console.log("Content: custom-richtext-item", block);
  function addClassesContent() {
    const lilist = document.querySelector(".explormoreflights-container ul");
    if (lilist) {
      const listItems = lilist.querySelectorAll("li");
      listItems.forEach((item, index) => {
        if (index < 15) {
          item.classList.add(`content3-div-show`);
        } else {
          item.classList.add(`content3-div-hide`);
        }
      });
    }
  }
 
  if (!document.querySelector('.view-more-btn')) {
     addClassesContent();
      // Add Show More Button
      const button = document.createElement('button')
      button.textContent = "View More"
      button.className = "view-more-btn"
      document.querySelector('.explormoreflights-container').appendChild(button)

      // Show More btn Click Event
      document.querySelector('.view-more-btn').addEventListener('click', function () {
          Array.from(document.querySelector('.explormoreflights-container ul').children).forEach(function (item, index) {
              if (!item.classList.contains('content3-div-show')) {
                  item.classList.add(`content3-div-show`)
                  item.classList.remove(`content3-div-hide`)
              } else {
                  if (index < 2) {
                      item.classList.add(`content3-div-show`)
                  } else {
                      item.classList.add(`content3-div-hide`)
                      item.classList.remove(`content3-div-show`)
                  }
              }
          })
          document.querySelector('.view-more-btn').classList.remove(`content3-div-hide`)
          if (document.querySelector('.view-more-btn').textContent == 'View More') {
              document.querySelector('.view-more-btn').textContent = 'View Less'
          } else if (document.querySelector('.view-more-btn').textContent == 'View Less') {
              document.querySelector('.view-more-btn').textContent = 'View More'
          }
          console.log("out")
      })
  }
}
