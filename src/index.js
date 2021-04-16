console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
const breedUrl = 'https://dog.ceo/api/breeds/list/all' 



function postImages(dogs) {
    const imageDiv = document.querySelector("#dog-image-container")

    dogs.message.forEach(image => {

         const imageTag = document.createElement("IMG");
         imageTag.setAttribute("src", image);
         imageDiv.append(imageTag)
    })
}

function createLITag(breedString) {
    const breedUl = document.querySelector("#dog-breeds")
    const liTag = document.createElement("LI");
    liTag.classList.add("breed")
    liTag.classList.add(breedString[0])
    liTag.addEventListener("click", function(event) {
        const styleLI = event.target.style
        if (styleLI.color === "red") {
            styleLI.color = "black"
        } else {
            styleLI.color = "red"
        }
    });
    liTag.innerText = breedString
    breedUl.append(liTag)  
}

function postBreeds(breeds) {
    const breedsArray = breeds.message
   //debugger
    for (const key in breedsArray) {
      //  debugger
        if (breedsArray[key].length > 0) {
            breedsArray[key].forEach(subBreed => {
                createLITag(key + ", " + subBreed)
            })

        } else {
            createLITag(key)
        }
    }
}

function fliterBreeds(e) {
    fliterValue = e.target.value
    console.log(fliterValue)
    breedLIs = Array.from(document.getElementsByClassName("breed"))
    breedLIs.forEach(singleBreed => {
        if (singleBreed.classList.contains(fliterValue)) {
            singleBreed.style.display = "block"
        } else {
            singleBreed.style.display = "none"
        }
    })

}

fetch(imgUrl)
.then(resp => resp.json())
.then(stringResults => postImages(stringResults));  

fetch(breedUrl)
.then(resp => resp.json())
.then(stringResults => postBreeds(stringResults));  

document.addEventListener("DOMContentLoaded", () => {
    const dropDown = document.querySelector("#breed-dropdown")
    dropDown.onchange = fliterBreeds
})

