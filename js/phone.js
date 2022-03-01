let showNumber =20; // a variable to track the load more 
const phoneDetailsContainer = document.getElementById("phone-details");
const loadBtn = document.getElementById("load-btn");
//Function to get the data from the api using the searched text 
const phoneFetch = searchText =>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data=> loadPhone(data));
}
//an arrow function to load search results
const loadPhone = phones =>{
    const phoneContainer = document.getElementById("phone-container");
    phoneData= phones.data;
    phoneContainer.innerHTML = "";
    const noResult = document.getElementById("no-result");
    phoneDetailsContainer.innerHTML="";
    if (phoneData.length ==0){
        noResult.classList.remove("d-none")
        manageResult(0);
    }
    else{
        noResult.classList.add("d-none")
        phoneData.forEach(phone => {
            phoneId = phone.slug;
            const div = document.createElement('div');
            div.classList.add('col');
            div.classList.add('d-none');
            div.innerHTML =`
            <div class="card h-100 border-0 shadow sm-3 mb-5 bg-body rounded">
            <img src="${phone.image}" class="card-img-top w-75 mx-auto mt-2" alt="...">
            <div class="card-body text-center ">
                <h5 class="card-title d-flex align-items-center justify-content-between">${phone.phone_name}
                <span><img width="56px"  src="images/${phone.brand}.png" class ="img-fluid" alt=""></span></h5>
                <button onclick="fecthDetails('${phoneId}')" data-bs-toggle="modal" data-bs-target="#phone-modal" type="button" class="btn btn-outline-secondary">More Details</button>
            </div>
            </div>`
            phoneContainer.appendChild(div)
        });
    manageResult(20);
    document.getElementById("phone-container").scrollIntoView({behavior: 'smooth'});
}
}
//a function to display limited amount of results
const manageResult = number=>{
    const totalResult = [...document.querySelectorAll(".col")]
    for (let index = 0; index < number; index++) {
        if (index<totalResult.length){
            const element = totalResult[index];
            element.classList.remove('d-none');
        }
        else {
            break;
        }
    }
    if (showNumber>=totalResult.length){
        loadBtn.classList.add('d-none');
        showNumber = 20;
    }
    else {
       loadBtn.classList.remove('d-none');
    }
}
//A function to handle loadmore button
const loadManageResult =()=>{
    showNumber += 20;
    manageResult(showNumber);
}
// a functiom to fetch phone details
const fecthDetails = id =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data=> showDetails(data));
}
//arrow function to show the phone details in a modal
const showDetails = phoneDetails=>{
    const phoneDetailsData = phoneDetails.data;
    const sensors = phoneDetailsData.mainFeatures.sensors;
    const sensorsList = sensors.toString();
    const modalTitle = document.getElementById("title")
    const phoneDetailsDataOther = phoneDetailsData.others;
    modalTitle.innerText = `${phoneDetails.data.name}`
    phoneDetailsContainer.innerHTML = ""
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('d-flex','align-items-center' ,'flex-column');
    imageDiv.innerHTML =` <img src="${phoneDetails.data.image}" class="card-img-top w-75 mx-auto mb-3" alt="...">
    <h3>${phoneDetails.data.name}</h3>`;
    const detailsDiv = document.createElement('div');
    detailsDiv.innerHTML =`<h4 class='text-secondary'>Release Date : <span class="text-black fs-6" >${phoneDetailsData.releaseDate==""?"Not Specified":phoneDetailsData.releaseDate}</span></h4>
    <h4 class='text-secondary'>Brand :  <span ><img width="56px"  src="images/${phoneDetailsData.brand} .png" class ="img-fluid" alt=""></span></h4>
    <h4 class='text-secondary'>Processor : <span class="text-black fs-6" >${phoneDetailsData.mainFeatures.chipSet}</span></h4>
    <h4 class='text-secondary'>Display : <span class="text-black fs-6" >${phoneDetailsData.mainFeatures.displaySize}</span></h4>
    <h4 class='text-secondary'>Storage and Ram : <span class="text-black fs-6" >${phoneDetailsData.mainFeatures.memory}</span></h4>
    <h4 class='text-secondary'>Sensors : <span class="text-black fs-6" >${sensorsList}</span></h4>
    <h4 class='text-secondary'>Wifi : <span class="text-black fs-6" >${phoneDetailsDataOther?phoneDetailsDataOther.WLAN:"Not Known"}</span></h4>
    <h4 class='text-secondary'>Bluetooth : <span class="text-black fs-6" >${phoneDetailsDataOther?phoneDetailsDataOther.Bluetooth:"Not Known"}</span></h4>
    <h4 class='text-secondary'>GPS : <span class="text-black fs-6" >${phoneDetailsDataOther?phoneDetailsDataOther.GPS:"Not Known"}</span></h4>
    <h4 class='text-secondary'>USB : <span class="text-black fs-6" >${phoneDetailsDataOther?phoneDetailsDataOther.USB:"Not Known"}</span></h4>
    <h4 class='text-secondary'>NFC : <span class="text-black fs-6" >${phoneDetailsDataOther?phoneDetailsDataOther.NFC:"Not Known"}</span></h4>
    <h4 class='text-secondary'>Radio : <span class="text-black fs-6" >${phoneDetailsDataOther?phoneDetailsDataOther.Radio:"Not Known"}</span></h4>`;
    phoneDetailsContainer.appendChild(imageDiv);
    phoneDetailsContainer.appendChild(detailsDiv);
};
//Search button handler
document.getElementById("search-btn").addEventListener("click",function(){
    const searchInput = document.getElementById("search-input");
    searchInputText = searchInput.value;
    if (searchInputText==""){
        alert("Please write something before searching");
    }
    else{
        searchInput.value = "";
        phoneFetch(searchInputText);
    }
});