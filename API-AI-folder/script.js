// Create a new fetch function to insert zip-code data into HTML using insertAdjacentHTML

let zipcode = document.querySelector('#zipcode');
const url = "http://cnos4.herokuapp.com/predict"; 
console.log(zipcode)

fetch(url)
.then(response => response.json())
.then(data =>{

    //empty variable that will be recieving data from API
    //Jquery syntax to access property "zip-code"(a way to integrate the API property that contains a dash. Not accepted in ES6)

    //Apply sort() method (put data in proper order) to array (zip-code) and store it into zipCodes variable
    let dropdownZip = (data.properties.data.properties['zip-code'].enum).sort(); 
    // zipcode.innerHTML = "";

   

    dropdownZip.forEach(code => { 
          zipcode.insertAdjacentHTML("beforeend", `<option>${code}</option>`);
   })
 
});
// END OF FETCH



// Store the x variable in the data object defined below and transform into integer : new Number(x)
let x = zipcode.addEventListener('click', ()=>{
     x= document.querySelector("#zipcode").value;
 })



// Create an addEventListenerFunction : when user click on submit button all data are send to the Api and a response is then given

document.getElementById("submit").addEventListener('click', function(){

    //Defining the four required variable for the estimated house price to be given : area - property-type - number of room - zip code
    //"input[name="type"]:checked". More Info On https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox

    let typeOfHouse = document.querySelector('input[name="type"]:checked').value;
    console.log(typeOfHouse);

    let room = new Number(document.getElementById('room').value);
    console.log(room);

    let area = new Number(document.getElementById('area').value);
    console.log(area);
    // let zipCode = new Number(document.querySelector('.zipcode').value);
    // console.log(zipCode);

    let zip = new Number(document.getElementById('zipcode').value);

    let priceResult = document.querySelector('.estimationResult');
    console.log(priceResult);

    // User input is a string
    let address = document.getElementById("address").value;
    
    // Split method can be applied on strings 
    // Split method allow to create an array of substrings
    let arrayAddress = address.split(" ");
    // Join method : join all substring by a comma"," with no space (as required in the API)
    let finalAddress = arrayAddress.join(",");
    console.log(finalAddress);



   




    //Create an object with API keys and values that are users input stocked in variables(see ßabove)
        let inputData ={
            data: {
                "area": area,
                "property-type" : typeOfHouse,
                "rooms-number" : room,
                "zip-code": new Number(x),
                "full-adress": finalAddress,
                
            }
        }
        console.log(inputData);

// api that deals with access/cors problem : const proxyurl = "https://cors-anywhere.herokuapp.com/"; 
//Snippet of code to overcome the cor policy problem : https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
  
    

        fetch(url, {
            method: 'POST',
            // convert data put by user(object created) into json format
            body: JSON.stringify(inputData), 
             //Header is something that can be packaged along with any POST or GET request that's moving between client and server
            headers:{                              
                'Content-type': 'application/json'}
        
        }) 
         //API response in json format
        .then(response => response.json())         
        .then((data)=> {
            console.log(data)

            //Slice the beginning and the end of the string to keep only the digits 
            let propertyValue = data.prediction.slice(22, -3);
            console.log(propertyValue);

            //Transform the string into a number
            propertyValue = new Number(propertyValue);
            console.log(propertyValue);

            // Reduce the number of decimal to two after the comma
            propertyValue = new Number(propertyValue.toFixed(2));
            console.log(new Number(propertyValue));
            // propertyValue = propertyValue.tolocaleString();


            priceResult.innerHTML = "";
            priceResult.insertAdjacentHTML("beforeend", `<p id="returned">Only ${propertyValue} euros </p>`);

        });
        // .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
        
       
    });


