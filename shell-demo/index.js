//Shell module is used to open a file or a file in the folder or external link in default browser (files/folders/links)
//Shell has three commands which are demonstrated below

const openBtn = document.getElementById("openBtn");
const shell = require("electron").shell;

openBtn.addEventListener("click", function (event) {
  shell.showItemInFolder("D:\\adoo\\github_notes\\git_notes.txt");
  shell.openExternal("http://electron.atom.io");
  shell.openItem(
    "D:\\anjali\\my projects\\login-react-firestore\\src\\images\\signup-image.jpg"
  );
});
//to fire all the functions we need to previously close all the apps first
