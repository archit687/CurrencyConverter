let URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";

const c = document.querySelectorAll("#container select");


for (let select of c) {
    for (let code of countryList) {
        let option = document.createElement('option');
        option.innerText = code;
        option.value = code;
        if (select.name === "from" && code === "USD") {
            option.selected = "selected";
        }
        select.append(option);
    }
}

select.addEventListener("change", (evt) => {
    update.from(evt.target);
})

const update = ()=>{
    let code=element.value;
    let countrycode=countryList[code];
    let newsrc=`https://flagsapi.com/%${countrycode}flat/64.png`
    let img=document.parentElement.querySelector('img');
    img.src=newsrc;
}
