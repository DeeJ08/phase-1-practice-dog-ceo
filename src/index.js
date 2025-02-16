document.addEventListener("DOMContentLoaded", async () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const dogImageContainer = document.getElementById('dog-image-container');
    const breedList = document.getElementById('dog-breeds');
    const breedDropdown = document.getElementById('breed-dropdown');

    let allBreeds = [];

    try {
        const imageResponse = await fetch(imgUrl);
        const imageData = await imageResponse.json();

        imageData.message.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            dogImageContainer.appendChild(img);
        });
    } catch (error) {
        console.error('Error fetching or parsing images:', error);
    }

    try {
        const breedResponse = await fetch(breedUrl);
        const breedData = await breedResponse.json();

        allBreeds = Object.keys(breedData.message);
        displayBreeds(allBreeds);

        breedDropdown.addEventListener('change', (event) => {
            const selectedLetter = event.target.value;
            console.log('Selected letter:', selectedLetter);
            const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
            console.log('Filtered breeds:', filteredBreeds);
            displayBreeds(filteredBreeds);
        });
    } catch (error) {
        console.error('Error fetching or parsing breeds:', error);
    }

    
    function displayBreeds(breeds) {
        breedList.innerHTML = ''; 
        breeds.forEach(breed => {
            const li = document.createElement('li');
            li.textContent = breed;
            li.addEventListener('click', () => {
                li.style.color = 'blue'; 
            });
            breedList.appendChild(li);
        });
    }
});
