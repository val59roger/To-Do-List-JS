const tableauTaches = [];
const tableauTerminee = [];
let numero = 1;

function AjoutTache() {    
    const tache = document.getElementById("LabelAjoutTache").value;    
    if (tache.trim() === "") {
        alert("Veuillez entrer une description de tâche valide.");
    }
    else if (tache.trim() !== "") { 
        tableauTaches.push({ numero: numero++, libelle: tache }); 
        console.log(tableauTaches);
        AjouterTache();
    }
}

function AjouterTacheHTML() {
    const select = document.createElement('select');
    select.id = "SelectTache";
    document.body.appendChild(select);

    const option1 = document.createElement('option');
    option1.value = "all";
    option1.textContent = "toutes les tâches";
    select.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = "completed";
    option2.textContent = "tâches terminées";
    select.appendChild(option2);

    const option3 = document.createElement('option');
    option3.value = "uncompleted";
    option3.textContent = "tâches non terminées";
    select.appendChild(option3);

    select.addEventListener("change", filterTasks);


    const table = document.createElement('table');
    table.id = "tableauTaches";

    const caption = document.createElement('caption');
    caption.textContent = 'Liste des tâches';
    table.appendChild(caption);

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const thNum = document.createElement('th');
    thNum.textContent = 'Numéro';
    headerRow.appendChild(thNum);

    const thStatus = document.createElement('th');
    thStatus.textContent = 'Terminée ?';
    headerRow.appendChild(thStatus);

    const thDesc = document.createElement('th');
    thDesc.textContent = 'Libellé';
    headerRow.appendChild(thDesc);    

    const thActions = document.createElement('th');
    thActions.textContent = 'Actions';
    headerRow.appendChild(thActions);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    document.body.appendChild(table);
}


function AjouterTache() {
    const tableau = document.getElementById("tableauTaches");

    while (tableau.rows.length > 1) {
        tableau.deleteRow(1);
    }

    tableauTaches.forEach((tache) => {
        const ligne = tableau.insertRow();
        const celluleNumero = ligne.insertCell();
        celluleNumero.textContent = tache.numero;
        celluleNumero.style.textAlign = "center";

        const celluleTerminee = ligne.insertCell();
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "terminer" + tache.numero;
        checkbox.addEventListener("change", cocher);
        celluleTerminee.appendChild(checkbox);
        celluleTerminee.style.textAlign = "center";

        const celluleLibelle = ligne.insertCell();
        celluleLibelle.textContent = tache.libelle;
        celluleLibelle.style.textAlign = "center";    
        
        const celluleActions = ligne.insertCell();
        const bouton = document.createElement("button");
        bouton.id = "SupprActions";
        bouton.textContent = "Supprimer";
        celluleActions.addEventListener("click", supprimerTache)
        celluleActions.appendChild(bouton);
        celluleActions.style.textAlign = "center";
    });

    document.getElementById("LabelAjoutTache").value = "";
}

function cocher(event) {
    const checkbox = event.target;
    const id = checkbox.id; 
    const numeroTache = parseInt(id.replace("terminer", "")); 

    const tache = tableauTaches.find(t => t.numero === numeroTache);

    const ligne = checkbox.closest("tr");
    const celluleLibelle = ligne.cells[2];

    if (checkbox.checked) {
        tableauTerminee.push(tache); 
        celluleLibelle.style.textDecoration = "line-through";
        console.log(`Tâche terminée : ${tache.libelle}`);

    } else {
        const index = tableauTerminee.indexOf(tache);
        if (index > -1) {
            tableauTerminee.splice(index, 1); 
        }
        celluleLibelle.style.textDecoration = "none";
        console.log(`Tâche non terminée : ${tache.libelle}`);
    }
    console.log("Tâches terminées :", tableauTerminee);
}

function filterTasks() {
    //change l'affichage des tâches en fonction de la valeur du select
    const filterValue = document.getElementById("SelectTache").value;
    const tableau = document.getElementById("tableauTaches");
    
    // Effacer toutes les lignes sauf l'en-tête
    while (tableau.rows.length > 1) {
        tableau.deleteRow(1);
    }

    // Filtrer les tâches à afficher
    let filteredTasks = [];
    if (filterValue === "all") {
        filteredTasks = tableauTaches;
    } else if (filterValue === "completed") {
        filteredTasks = tableauTerminee;
    } else if (filterValue === "uncompleted") {
        filteredTasks = tableauTaches.filter(t => !tableauTerminee.includes(t));
    }

    // Afficher les tâches filtrées
    filteredTasks.forEach((tache) => {
        const ligne = tableau.insertRow();
        const celluleNumero = ligne.insertCell();
        celluleNumero.textContent = tache.numero;
        celluleNumero.style.textAlign = "center";

        const celluleTerminee = ligne.insertCell();
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "terminer" + tache.numero;
        checkbox.checked = tableauTerminee.includes(tache); // Coche si terminé
        checkbox.addEventListener("change", cocher);
        celluleTerminee.appendChild(checkbox);
        celluleTerminee.style.textAlign = "center";

        const celluleLibelle = ligne.insertCell();
        celluleLibelle.textContent = tache.libelle;
        celluleLibelle.style.textAlign = "center";

        const celluleActions = ligne.insertCell();
        const bouton = document.createElement("button");
        bouton.id = "SupprActions";
        bouton.textContent = "Supprimer";
        celluleActions.appendChild(bouton);
        celluleActions.style.textAlign = "center";

        // Appliquer le style barré si terminé
        if (checkbox.checked) {
            celluleLibelle.style.textDecoration = "line-through";
        }
    });
}

function supprimerTache() {
    const ligne = this.closest("tr");
    const celluleNumero = ligne.cells[0];
    const numeroTache = parseInt(celluleNumero.textContent);
    const tache = tableauTaches.find(t => t.numero === numeroTache);

    const index = tableauTaches.indexOf(tache);
    if (index > -1) {
        tableauTaches.splice(index, 1);
    }

    const indexTerminee = tableauTerminee.indexOf(tache);
    if (indexTerminee > -1) {
        tableauTerminee.splice(indexTerminee, 1);
    }

    ligne.remove();
    console.log("Tâche supprimée :", tache.libelle);
    console.log("Tâches restantes :", tableauTaches);
    console.log("Tâches terminées :", tableauTerminee);
}


AjouterTacheHTML();
