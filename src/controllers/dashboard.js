const user = JSON.parse(sessionStorage.getItem("currentUser"));


const greetingname = document.querySelector("#greetingName");
const soldeDisp = document.querySelector("#availableBalance");
const revenus = document.querySelector("#monthlyIncome");
const depenses = document.querySelector("#monthlyExpenses");
const actvCards = document.querySelector("#activeCards");

// Affichage des informations utilisateur
greetingname.textContent = user.name;

// Solde total des cartes
soldeDisp.textContent = user.wallet.cards.reduce((total, carte) => total + carte.balance, 0);

// Revenus 
const transactionsDebit = user.wallet.transactions.filter(t => t.type === "debit");
revenus.textContent = transactionsDebit.reduce((total, t) => total + t.amount, 0);

// Dépenses 
const transactionsCredit = user.wallet.transactions.filter(t => t.type === "credit");
depenses.textContent = transactionsCredit.reduce((total, t) => total + t.amount, 0);

// Nombre de cartes actives
actvCards.textContent = user.wallet.cards.length;

// elements de la fenetre transferer
const transferBtn = document.querySelector("#quickTransfer");
const section = document.querySelector("#transfer-section");
const closeBtn = document.querySelector("#closeTransferBtn");
const annulerBtn = document.querySelector("#cancelTransferBtn");
const submitbtn = document.querySelector("#submitTransferBtn");

// Éléments du formulaire
const selectBenf = document.querySelector("#beneficiary");
const selectCards = document.querySelector("#sourceCard");
const montantInput = document.querySelector("#amount");
const instantCheckbox = document.querySelector("#instantTransfer");

// Initialisation des options
document.querySelector("#beneficiary option[value='1']").textContent = "Ahmed";
document.querySelector("#sourceCard option[value='visa-4242']").textContent = "visa";


// Ouverture de la fenêtre de transfert
transferBtn.addEventListener("click", () => {
    setTimeout(() => {
        section.classList.remove("hidden");
    }, 1000);
});

// Fermeture de la fenêtre
closeBtn.addEventListener("click", fermerFenetre);
annulerBtn.addEventListener("click", fermerFenetre);

function fermerFenetre() {
    section.classList.add("hidden");
}

//transferer
submitbtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Récupération des valeurs du formulaire
    const montant = Number(montantInput.value);
    const instantane = instantCheckbox.checked;
    
    // Recherche de la carte à débiter (Visa)
    const carte = user.wallet.cards.find(c => c.type === "visa");
    
    // Validation du montant
    if (montant <= 0) {
        alert("Le montant doit être supérieur à 0");
        return;
    }
    
    if (!carte) {
        alert("Carte introuvable");
        return;
    }
    
    // Calcul du montant total avec frais si transfert instantané
    const montantTotal = instantane ? montant + 13.4 : montant;
    
    // Vérification du solde
    if (montantTotal > carte.balance) {
        alert("Solde insuffisant");
        return;
    }
    
    // Mise à jour du solde de la carte
    carte.balance -= montantTotal;
    
    // Ajout de la transaction
    const nvTransaction = {
        type: "credit",
        amount: montantTotal,
        to: selectBenf.value === "1" ? "Ahmed" : selectBenf.value,
        date: new Date().toLocaleDateString(),
        from : greetingname
    };   
    user.wallet.transactions.push(nvTransaction);
    // Sauvegarde dans sessionStorage
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    
    // Mise à jour de l'affichage
    mettreAJourDashboard();
    
    // Message de confirmation
    const fraisMsg = instantane ? " ( + 13.4 MAD de frais)" : "";
    alert(`Transfert de ${montant} MAD${fraisMsg} effectué avec succès`);
    
    // Fermeture de la fenêtre
    fermerFenetre();
    
    //affichage de la transaction
    document.querySelector('.transaction-item').innerHTML += 
    "<p>Type Transaction : " + nvTransaction.type + "</p>" +
    "<p>Montant : " + nvTransaction.amount + " MAD</p>" +
    "<p>Bénéficiaire : " + nvTransaction.to + "</p>" +
    "<p>Date: " + nvTransaction.date + "</p>"
    +"<hr>";
    
});


function mettreAJourDashboard() {
    // Solde total
    const totalSolde = user.wallet.cards.reduce((total, c) => total + c.balance, 0);
    soldeDisp.textContent = totalSolde;
    
    // Revenus
    const revenusTrans = user.wallet.transactions.filter(t => t.type === "debit");
    const totalRevenus = revenusTrans.reduce((total, t) => total + t.amount, 0);
    revenus.textContent = totalRevenus;
    
    // Dépenses
    const depensesTrans = user.wallet.transactions.filter(t => t.type === "credit");
    const totalDepenses = depensesTrans.reduce((total, t) => total + t.amount, 0);
    depenses.textContent = totalDepenses;
}