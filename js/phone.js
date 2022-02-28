const phoneFetch = searchText =>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data=> loadPhone(data));
}
phoneFetch("")
const loadPhone = phones =>{
    const phoneContainer = document.getElementById("phone-container");
    phoneData= phones.data;
    phoneContainer.innerHTML = "";
    phoneData.forEach(phone => {
        phoneId = phone.slug;
        const div = document.createElement('div');
        div.classList.add('col');
        div.classList.add('d-none');
        console.log(`images/${phone.brand}.png`)
        div.innerHTML =`
        <div class="card h-100 border-0 shadow sm-3 mb-5 bg-body rounded">
          <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="...">
          <div class="card-body text-center ">
            <h5 class="card-title d-flex align-items-center justify-content-between">${phone.phone_name}
            <span><img width="120px"  src="images/${phone.brand}.png" class ="img-fluid" alt=""></span></h5>
            <button onclick="fecthDetails('${phoneId}')" type="button" class="btn btn-outline-secondary">More Details</button>
          </div>
        </div>`
        phoneContainer.appendChild(div)
    });
    manageResult();
}
let showNumber =20
const manageResult = ()=>{
    const totalResult = [...document.querySelectorAll(".col")]
    for (let index = 0; index < showNumber; index++) {
        if (index<totalResult.length){
            const element = totalResult[index];
            element.classList.remove('d-none')
            console.log(element)
        }
        
        else {
            break;
        }
    }
    showNumber +=20;
    if (showNumber>totalResult.length){
        document.getElementById("load-btn").style.display ='none';
    }
}

const fecthDetails = id =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data=> showDetails(data));
}
const showDetails = phoneDetails=>{
    console.log(phoneDetails);
}
document.getElementById("search-btn").addEventListener("click",function(){
    const searchInput = document.getElementById("search-input");
    searchInputText = searchInput.value;
    phoneFetch(searchInputText);
})

function pageSearch(){
    pageSearchInput = document.getElementById("page-search-input");
    pageSearchInputText = pageSearchInput.value;
    const a = document.getElementsByTagName('h5')
    console.log(a);
}