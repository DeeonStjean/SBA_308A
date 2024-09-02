var menuLinks = [
    {text: 'Home', class: '/index.html'},
    {text: 'Breed', class: '/Breed'},
    {text: 'search', class:'/search'},
];
let topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

menuLinks.forEach((link)=>{
    const a=document.createElement("a");
    a.setAttribute("href",link.href);
    a.textContent=link.text;
    topMenuEl.appendChild(a);
});
const topMenuLinks = document.querySelectorAll("a");

const API_KEY = "live_x7U4nuj5viLsb8BVMQQxP3sBCBtj0xtuD7Lwp3wePUVG4XehL2UNwVem78L4PuSB";

const userImage= document.getElementById('userimage');
const userName= document.getElementById('user');
const userEmail= document.getElementById('email');
const button= document.getElementById('newUser');
//const username= document.getElementById('');


async function getUserData() {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const jsonData = await response.json();
    const user= jsonData[0];
    userImage.src=user.url;
    console.log(jsonData);
    console.log(userImage.src);
}
getUserData();
button.addEventListener('click', getUserData);


