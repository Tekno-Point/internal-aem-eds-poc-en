export default function decorate(block) {
    console.log("Content 3 : custom-richtext-item", block)

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
    if (!document.querySelector('.view-more-btn')) {
        addClassesContent3()
        // Add Show More Button
        const button = document.createElement('button')
        button.textContent = "View More"
        button.className = "view-more-btn"
        document.querySelector('.content3 .custom-richtextblock-wrapper').appendChild(button)

        // Show More btn Click Event
        document.querySelector('.view-more-btn').addEventListener('click', function () {
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



}