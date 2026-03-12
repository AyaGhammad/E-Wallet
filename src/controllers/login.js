import findfinduserbymail from "../models/database.js";

const mailinput = document.querySelector("#mail");
const passinput = document.querySelector("#password");
const subbtn = document.querySelector("#submitbtn");

subbtn.addEventListener("click",handleSub);
function handleSub(){
    let mail = mailinput.value;
    let pass= passinput.value;
    if(!mail || !pass){
        alert("Bad Credentials!!");
    }
    else{
        subbtn.textContent="Checking!";
        setTimeout(() => {
            const usr=findfinduserbymail(mail,pass);
            if(usr){
                sessionStorage.setItem("currentUser",JSON.stringify(usr));
                document.location="/src/Views/dashboard.html";
            }
            else{
                alert("Bad Credentials");
            }
        }, 2000);
    }
}