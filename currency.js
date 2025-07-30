// let BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json";
let BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

const c = document.querySelectorAll(".selectT select");
const btn = document.querySelector('button');
const from_curr = document.querySelector('.from select');
const to_curr = document.querySelector('.to select');
let mssg = document.querySelector('.mssg');


for (let select of c) {
    for (let code in countryList) {
        let option = document.createElement('option');
        option.innerText = code;
        option.value = code;
        if (select.name === "from" && code === "USD") {
            option.selected = "selected";
        } else if (select.name === "to" && code === "INR") {
            option.selected = "selected";
        }
        select.append(option);
    }


    select.addEventListener("change", (evt) => {
        update(evt.target);

    });
}

const update = (element) => {
    let code = element.value;
    let countrycode = countryList[code];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`
    let img = element.parentElement.querySelector('img');
    img.src = newsrc;
}


// btn.addEventListener('click', async (evt)=>{
//     evt.preventDefault()
//     let amt=document.querySelector('input');
//     let amount=amt.value;
//     console.log(amount);
//     if(amount===""|| amount<1){
//         amount=1;
//         amt.value='1';
//     }
//     // console.log(from_curr.value,to_curr.value);
//     const URL=`${BASE_URL}/${from_curr.value.toLowerCase()}/${to_curr.value.toLowerCase()}.json`;
//     let response=await fetch(URL);
//     let data= await response.json();
//     let rate = data[to_curr.value.toLowerCase()];
//     let finalamt=amount*rate;
//     mssg.innerText= `${amt}${from_curr.value} = ${finalamt}${to_curr.value}`;


// });

btn.addEventListener('click', async (evt) => {
    evt.preventDefault();

    let amt = document.querySelector('input');
    let amount = amt.value;

    if (amount === "" || amount < 1) {
        amount = 1;
        amt.value = '1';
    }

    const from = from_curr.value.toLowerCase();
    const to = to_curr.value.toLowerCase();

    const URL = `${BASE_URL}/${from}.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();

        // rate will be like data[from][to]
        let rate = data[from][to];
        let finalamt = amount * rate;

        mssg.innerText = `${amount} ${from_curr.value} = ${finalamt.toFixed(2)} ${to_curr.value}`;
    } catch (error) {
        console.error("Error fetching rate:", error);
        mssg.innerText = "Something went wrong!";
    }
});




