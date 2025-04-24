export default function decorate(block) {
    if (block.querySelectorAll("ul")) {
        const Preferenceul = block.querySelectorAll("ul");
        Preferenceul.forEach((element, index) => {
            element.classList.add("breadlist" + (index + 1))
        });
        block.querySelectorAll(".breadlist1 li").forEach((element) => {
            element.style.display = "none";
        })
        block.querySelector(".breadlist1").innerHTML += '<li>' + block.querySelector(".breadlist1").textContent.trim().replaceAll(" ", "").replaceAll("\n", " > ") + '</li>';

        console.log(block.querySelector(".breadlist2"));
        block.querySelectorAll(".breadlist2 li").forEach((element, index) => {
            if (element.querySelector(".breadlist3") != null) {
                console.log(element.querySelector(".breadlist3"));
                const selectItem = document.createElement("select");
                const option = document.createElement("option");
                option.text = element.querySelector("p").textContent.trim();
                element.querySelector("p").style.display = "none"
                selectItem.append(option);
                element.querySelectorAll(".breadlist3 li").forEach((element) => {
                    const option = document.createElement("option");
                    option.text = element.textContent.trim();
                    selectItem.append(option)
                    element.style.display = "none";
                })
                element.append(selectItem);
            }
        })



    }
}