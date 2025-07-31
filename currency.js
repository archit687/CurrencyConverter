let BASE_URL = "https://api.exchangerate-api.com/v4/latest/";

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

btn.addEventListener('click', async (evt) => {
    evt.preventDefault();

    let amt = document.querySelector('input');
    let amount = amt.value;

    if (amount === "" || amount < 1) {
        amount = 1;
        amt.value = '1';
    }

    const from = from_curr.value;  // No .toLowerCase()
    const to = to_curr.value;

    // const URL = `https://api.exchangerate-api.com/v4/latest/${from}`;
    let URL = `${BASE_URL}${from}`;

    try {
        let response = await fetch(URL);
        let data = await response.json();

        let rate = data.rates[to];  // ✅ Use .rates[to]
        let finalamt = amount * rate;

        mssg.innerText = `${amount} ${from} = ${finalamt.toFixed(2)} ${to}`;
    } catch (error) {
        console.error("Error fetching rate:", error);
        mssg.innerText = "Something went wrong!";
    }
});
