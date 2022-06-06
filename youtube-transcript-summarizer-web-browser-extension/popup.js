// Initialize button with users' preferred color
// let changeColor = document.getElementById("changeColor");

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
  // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   function: setPageBackgroundColor,
  // });
 // changeColor.innerHTML = "ggjgjgjg";
//  loader();
// });

// The body of this function will be executed as a content script inside the
// current page
//function loader() {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    document.getElementById("changeColor").innerHTML = "<iframe src='http://localhost:3000/url="+url+"' height='438' width='294' id='changeColor' frameBorder='0'>clcick</iframe>"; 
    // use `url` here inside the callback because it's asynchronous!
});
// console.log("sexcond url");
// console.log(url);
//}
