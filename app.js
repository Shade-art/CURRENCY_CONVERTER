
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")

let btn = document.querySelector("form button")


let dropdown = document.querySelectorAll(".dropdown select") // this gives us all selects under dropdown[select,select]
for (let select of dropdown) {// this is a nodelist [select,select] like an array not a real array
    for (currCode in countryList) { // this is an object we cannot use "of" for objects tip : for objects always use in
        let newOption = document.createElement("option")
        newOption.innerHTML = currCode
        newOption.value = currCode
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        }
        if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }
        select.append(newOption)
        

    }
    select.addEventListener("change", (event) => {
        updateFlag(event.target)
    }) // we are adding this here cause we want to add event to both selects which we get from first loop
    const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode]
    console.log ("Currency code =" + currCode)
    console.log ("Country code =" + countryCode)
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let nimg = element.parentElement.querySelector("img")
    nimg.src = newsrc;

}
}

btn.addEventListener("click",async (e)=>{
    e.preventDefault()
    let amt = document.querySelector(".amount input")
    let val = Number(amt.value)
    if(val === "" || val <0){ //** blank is "" not " " this is space
        val=1
        amt.value = "1" //this displays 1 on screen 
        // NOTE : - val get stored 1 will be printed it is jus a copy changing it does not affect amt.value on console while amt.value will be shown on screen
    }
    let URL = `https://api.frankfurter.app/latest?from=${fromCurr.value}&to=${toCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[toCurr.value]
    console.log(rate)
    let result = val*rate;
    let out= document.querySelector(".msg")
    out.innerHTML=`${val} ${fromCurr.value} is  ${result} ${toCurr.value}`
})