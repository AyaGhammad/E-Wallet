const usr=JSON.parse(sessionStorage.getItem("currentUser"));

const greetingname=document.querySelector("#greetingName");
//pour le solde on va pas travailler avec balance qu'on a dans les donnes
//mais plutos avec la somme des balances des cartes pour etre plus precises des donnees.
const Solde =document.querySelector("#availableBalance");
const revenus = document.querySelector("#monthlyIncome");
const depenses = document.querySelector("#monthlyExpenses");
const actvCards = document.querySelector("#activeCards");




greetingname.textContent=usr.name;

const trans = usr.wallet.transactions;
console.log(trans);

const D_trans=usr.wallet.transactions.filter((t)=>t.type==="debit");
const C_trans=usr.wallet.transactions.filter((t)=>t.type==="credit");

const somme = C_trans.reduce((total,t)=>{return total+t.amount;},0);

