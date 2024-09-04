import * as Carousel from "./Carousel.js";
import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_x7U4nuj5viLsb8BVMQQxP3sBCBtj0xtuD7Lwp3wePUVG4XehL2UNwVem78L4PuSB";


breedSelect.addEventListener('change', displayInfo);
export function displayInfo() {
    Carousel.clear();
    fetch(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedSelect.value}&api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            let newImage = Carousel.createCarouselItem(element.url, element.breeds[0].name, element.id);
            Carousel.appendCarousel(newImage);
        });
    })
    Carousel.start();
}

/*
3.Create an additional file to handle an alternative approach.

4.Within this additional file, change all of your fetch() functions to Axios!
-Axios has already been imported for you within index.js.
-If you've done everything correctly up to this point, this should be simple.
-If it is not simple, take a moment to re-evaluate your original code.
-Hint: Axios has the ability to set default headers. Use this to your advantage by setting a default header with your 
-API key so that you do not have to send it manually with all of your requests!
-You can also set a default base URL!
*/

async function initialLoad() {
    axios({
        method: 'get',
        onDownloadProgress: (progressEvent) => updateProgress(progressEvent),
        url: `https://api.thecatapi.com/v1/breeds`,
    })
    .then(response => {
        response.data.forEach(element => {
            let newOption = document.createElement("option")
            newOption.value = element.id;
            newOption.innerText = element.name
            breedSelect.appendChild(newOption)
        });
    })
    
}
initialLoad();

/* 5
Add Axios interceptors to log the time between request and response to the console.
Hint: you already have access to code that does this!
Add a console.log statement to indicate when requests begin.
As an added challenge, try to do this on your own without referencing the lesson material.
*/
axios.interceptors.request.use(request => {
    request.metadata = request.metadata || {};
    request.metadata.startTime = new Date().getTime();
    console.log("request begin now");
    progressBar.style.width="0%";
    document.querySelector('body').style.cursor = "progress";
    return request;
});
/*6
-Create a progress bar to indicate the request is in progress.
-The progressBar element has already been created for you.
-You need only to modify its width style property to align with the request progress.
-In your request interceptor, set the width of the progressBar element to 0%.
-This is to reset the progress with each request.
-Research the axios onDownloadProgress config option.
-Create a function "updateProgress" that receives a ProgressEvent object.
-Pass this function to the axios onDownloadProgress config option in your event handler.
-console.log your ProgressEvent object within updateProgress, and familiarize yourself with its structure.
-Update the progress of the request using the properties you are given.
-Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire once or twice per request to this API. 
-This is still a concept worth familiarizing yourself with for future projects.*/

function updateProgress(progressEvent) {
    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    progressBar.style.width = `${percentCompleted}%`;
}

/*7
 As a final element of progress indication, add the following to your axios interceptors:
 -In your request interceptor, set the body element's cursor style to "progress."
 -In your response interceptor, remove the progress cursor style from the body element.
 line 104 is part 7
 */

/*8
-To practice posting data, we will create a system to "favourite" certain images.
-The skeleton of this favourite() function has already been created for you.
-This function is used within Carousel.js to add the event listener as items are created.
-This is why we use the export keyword for this function.
-Post to the cat API's favourites endpoint with the given id.
-The API documentation gives examples of this functionality using fetch(); use Axios!
-Add additional logic to this function such that if the image is already favourited, you delete that favourite using the API, giving this function "toggle" behavior.
-You can call this function by clicking on the heart at the top right of any image.*/
export async function favourite(favId){
   try {
    const favouriteCats = await axios.get('https://api.thecatapi.com/v1/favourites', {
        headers: {
          'x-api-key': API_KEY,
        },
    });   
    const favourites = favouriteCats.data;
    const alreadyFavourites = favourites.find(fav => fav.image_id === favId); 
    if (alreadyFavourites) {
        await axios.delete(`https://api.thecatapi.com/v1/favourites/${alreadyFavourites.id}`, {
            headers: {
              'x-api-key': API_KEY,
            },
        });
    }else {
        const response = await axios.post(`https://api.thecatapi.com/v1/favourites`, {
            image_id: favId
        },
        { 
            headers: {
                'x-api-key': API_KEY,
            },
        })
        console.log(response.data);
    }
   } catch (error) {
    console.log(error);
   }
}
/*9
-Test your favourite() function by creating a getFavourites() function.
-Use Axios to get all of your favourites from the cat API.
-Clear the carousel and display your favourites when the button is clicked.
-You will have to bind this event listener to getFavouritesBtn yourself.
-Hint: you already have all of the logic built for building a carousel. 
-If that is not in its own function, maybe it should be so that you do not have to repeat yourself in this section.
*/
