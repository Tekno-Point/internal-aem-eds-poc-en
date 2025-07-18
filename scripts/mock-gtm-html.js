function createMockDOMForTracking() {
    // Prevent duplicate insertion
    if (document.getElementById("dummy-container")) return;

    const dummyContainer = document.createElement("div");
    dummyContainer.id = "dummy-container";
    document.body.appendChild(dummyContainer);

    // Helper: create element with optional class and text
    const el = (tag, cls = "", text = "") => {
        const elem = document.createElement(tag);
        if (cls) elem.className = cls;
        if (text) elem.textContent = text;
        return elem;
    };

    // .bottom-menu-wrap.bg-megamenu .menu-list .sub-menu-list li
    const bottomLi = el("li", "");
    const subMenuList = el("ul", "sub-menu-list");
    subMenuList.appendChild(bottomLi);
    const menuList = el("ul", "menu-list");
    menuList.appendChild(subMenuList);
    const bottomMenuWrap = el("div", "bottom-menu-wrap bg-megamenu");
    bottomMenuWrap.appendChild(menuList);
    dummyContainer.appendChild(bottomMenuWrap);

    // .right-top-menu.js-rightmenu-dth .submenu-wrap-top li
    const topLi = el("li");
    const submenuWrapTop = el("ul", "submenu-wrap-top");
    submenuWrapTop.appendChild(topLi);
    const topMenu = el("ul", "right-top-menu js-rightmenu-dth");
    topMenu.appendChild(submenuWrapTop);
    dummyContainer.appendChild(topMenu);

    // [class="col-xs-12 col-sm-12 col-md-3 col-lg-3"] li
    const footerLi = el("li");
    const footerList = el("ul");
    footerList.appendChild(footerLi);
    const footerTitle = el("h4", "", "Footer Title");
    const footerWrap = el("div", "col-xs-12 col-sm-12 col-md-3 col-lg-3");
    footerWrap.appendChild(footerTitle);
    footerWrap.appendChild(footerList);
    dummyContainer.appendChild(footerWrap);

    // .call-main-wrap .il-error and .call-main-wrap input
    const callWrap = el("div", "call-main-wrap");
    callWrap.appendChild(el("div", "il-error")); // empty error div
    callWrap.appendChild(document.createElement("input"));
    callWrap.appendChild(document.createElement("input"));

    // #callback-select with options
    const select = document.createElement("select");
    select.id = "callback-select";
    ["One", "Two"].forEach(val => {
        const opt = document.createElement("option");
        opt.value = val;
        opt.textContent = val;
        select.appendChild(opt);
    });
    callWrap.appendChild(select);

    // .btn-m.js-callback-valid
    callWrap.appendChild(el("button", "btn-m js-callback-valid", "Submit"));
    dummyContainer.appendChild(callWrap);

    // .tabSectionBox li
    const tabBox = el("ul", "tabSectionBox");
    tabBox.appendChild(el("li", "", "Tab Item"));
    dummyContainer.appendChild(tabBox);

    // .products-tabs li with child
    const prodTabs = el("ul", "products-tabs");
    const mobLi = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = "Mobile Tab";
    mobLi.appendChild(span);
    prodTabs.appendChild(mobLi);
    dummyContainer.appendChild(prodTabs);
}

export default createMockDOMForTracking;
