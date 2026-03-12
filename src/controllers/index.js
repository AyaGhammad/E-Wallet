const loginbtn=document.querySelector("#Loginbtn");
loginbtn.addEventListener("click",handlelogin);
function handlelogin(){
    setTimeout(() => {
        loginbtn.textContent="Loading...";
        document.location="/src/Views/login.html";
    }, 2000);
}