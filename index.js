import {renderCats} from './gallery.js'
//import {displayInfo} from "./breed.js"
//import { start } from './Carousel.js';
let topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");


const API_KEY = "live_x7U4nuj5viLsb8BVMQQxP3sBCBtj0xtuD7Lwp3wePUVG4XehL2UNwVem78L4PuSB";

const userImage= document.getElementById('userimage');
const button= document.getElementById('newUser');
//const username= document.getElementById('');

async function getUserData() {
    try{
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const jsonData = await response.json();
        const user= jsonData[0];
        userImage.src=user.url;
        console.log(jsonData);
        console.log(userImage.src);
    }catch(error){
        console.log(error);
    }
}
getUserData();
button.addEventListener('click', getUserData);


renderCats();
//displayInfo();
//start();

