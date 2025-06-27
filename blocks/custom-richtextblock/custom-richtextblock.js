export default function decorate() {
    console.log("Content 3 : custom-richtext-item")

    function addClassesContent3() {
        Array.from(document.querySelector('.content3 .custom-richtextblock').children).forEach(function (item, index) {
            console.log(item)
            item.classList.add(`content3-div`)
            //  item.classList.add(`sec3-${index}`)
            if (index < 2) {
                item.classList.add(`content3-div-show`)
            } else {
                item.classList.add(`content3-div-hide`)
            }
        })
    }
    addClassesContent3()

    // Add Show More Button
    const button = document.createElement('button')
    button.textContent = "View More"
    button.className = "view-more-btn"
    document.querySelector('.content3 .custom-richtextblock-wrapper').appendChild(button)

    // Show More btn Click Event
    document.querySelector('.view-more-btn').addEventListener('click', function () {
        // console.log("inn")
        // document.querySelector('.content3 .custom-richtextblock').childNodes.forEach(function (item, index) {
        //     if (!item.classList.contains('sec3-ul-show')) {
        //         item.classList.add(`sec3-ul-show`)
        //         item.classList.remove(`sec3-ul-hide`)
        //     } else {
        //         if (index < 2) {
        //             item.classList.add(`sec3-ul-show`)
        //         } else {
        //             item.classList.add(`sec3-ul-hide`)
        //             item.classList.remove(`sec3-ul-show`)
        //         }
        //     }
        // })
        // document.querySelector('.view-more-btn').classList.remove(`sec3-ul-hide`)
        // if (document.querySelector('.view-more-btn').textContent == 'View More') {
        //     document.querySelector('.view-more-btn').textContent = 'View Less'
        // } else if (document.querySelector('.view-more-btn').textContent == 'View Less') {
        //     document.querySelector('.view-more-btn').textContent = 'View More'
        // }
        // console.log("out")


        Array.from(document.querySelector('.content3 .custom-richtextblock').children).forEach(function (item, index) {
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