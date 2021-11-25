const tablist = document.querySelector('[role= "tablist"]');
const tabs =document.querySelectorAll('[role = "tab"]');

let tabFocus = 0;

/*------------------------------*/
/* Event Listeners */
/*------------------------------*/
tablist.addEventListener("keydown", changeTabfocus);
tabs.forEach((tab) => {
    tab.addEventListener("click", changeTabPanel);
});


/*------------------------------*/
/* Functions */
/*------------------------------*/
function changeTabfocus (event) {
//Key codes - A number which represents an actual key on the keyboard
// console.log(e.keyCode);
    const keyDownleft = 37;
    const keyDownRight = 39;

//change the tabindex of the current tab to -1
    if(event.keyCode === keyDownleft || event.keyCode === keyDownRight){
        tabs[tabFocus].setAttribute("tabindex", -1);
    }
//if the right key is pushed, move to the next tab on the right
    if(event.keyCode === keyDownRight){
        tabFocus++;
        if(tabFocus >= tabs.length){
            tabFocus = 0;
        }
    }
//if the left key is pushed,move to the next tab on the left
    if(event.keyCode === keyDownleft){
        tabFocus--;
        if(tabFocus < 0){
            tabFocus = tabs.length -1;
        }
    }

    tabs[tabFocus].setAttribute("tabindex",0);
    tabs[tabFocus].focus();
}

function changeTabPanel (event) {
    const targetTab = event.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetPicture = targetTab.getAttribute("data-picture");

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;
    
// change active or aria-selected tab
    tabContainer
        .querySelector("[aria-selected = 'true']")
        .setAttribute("aria-selected", false);
    targetTab.setAttribute("aria-selected", true);

//Change article
    hideContent(mainContainer, '[role = "tabpanel"]');
    showContent(mainContainer, [`#${targetPanel}`]);
// change picture
   hideContent(mainContainer, '.picture');
   showContent(mainContainer, [`#${targetPicture}`]);


}

//HideContent Function
function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach(function (item){
            item.setAttribute("hidden", true);
        });
};
//showContent Function
function showContent (parent, content) {
    parent.querySelector(content).removeAttribute('hidden');
};