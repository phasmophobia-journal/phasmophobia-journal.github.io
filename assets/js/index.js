function evidenceConstructor() {
    let evidence_elements = document.getElementsByClassName("evidence-text");
    let evidence = [];
    for (let i = 0; i < evidence_elements.length; i++) {
        evidence[i] = Number(evidence_elements[i].getAttribute("optionvalue"));
    }
    evaluateEvidence(evidence);
}
function evaluateEvidence(evidence) {
    global_map.possible_ghosts = [];

    for (let i = 0; i < ghosts_map.length; i++) {
        let valid_ghost = true;
        for (let a = 0; a < evidence.length; a++) {
            if (!ghosts_map[i].evidence.includes(evidence[a])) {/*Note: "includes()" doesn't work with IE, if IE compatibility is necessary then use the "some()" function instead*/
                valid_ghost = false;
            }
        }
        if (valid_ghost) {
            global_map.possible_ghosts.push({ignore:ghosts_map[i].ignore, name:ghosts_map[i].name, evidence:ghosts_map[i].evidence, description:ghosts_map[i].description});
        }
    }
    if (global_map.possible_ghosts.length) {
        printGhostInfo(0);
    }
    printPossibleGhosts();
}
function printPossibleGhosts() {
    ghostTypeElement = document.getElementsByClassName('ghosttype-text')[0];
    ghostTypeElement.setAttribute('optionvalue', 0);
    if (global_map.possible_ghosts.length) {
        ghostTypeElement.innerHTML = global_map.possible_ghosts[0].name;
    }
    else{
        ghostTypeElement.innerHTML = "No Matches";
        printGhostInfo(-1);
    }
    toggleSlideOptions();
}
function toggleSlideOptions() {
    let g_list = document.getElementsByClassName('ghosts-list-nav');
    if (global_map.possible_ghosts.length > 1) {
        for (let i = 0; i < g_list.length; i++) {
            g_list[i].classList.remove("slide-option-disabled");
        }
    } else {
        for (let i = 0; i < g_list.length; i++) {
            g_list[i].classList.add("slide-option-disabled");
        }
    }
}
function chOption(targetId, direction) {
    let targetElement = document.getElementById(targetId);
    let c_value = Number(targetElement.getAttribute('optionvalue'));
    let c_map = global_map[targetElement.getAttribute('optionmap')];
    
    if (c_map.length <= 0) {
        return -1;
    }
    
    c_value = c_value+direction;
    
    if (c_value >= c_map.length) {
        c_value = 0;
    }
    else if (c_value < 0) {
        c_value = c_map.length-1;
    }
    targetElement.setAttribute('optionvalue', c_value);
    targetElement.innerHTML = c_map[c_value].name;
    return c_value;
}
function printGhostInfo(id) {
    let overline = document.getElementById('left_page_overline');
    let title = document.getElementById('left_page_title');
    let description = document.getElementById('left_page_text');

    if (id == -1) {
        overline.innerHTML = "No matching ghosts";
        title.innerHTML = "Inconclusive";
        description.innerHTML = "No ghost matches the evidence provided, double check the evidence and try again.";
    }
    else{
        if (global_map.possible_ghosts.length == ghosts_map.length) {
            if (id > 0) {
                overline.innerHTML = (id)+" out of "+(global_map.possible_ghosts.length - 1)+" ghosts matching evidence found";
            }
            else{
                overline.innerHTML = "";
            }
        }
        else{
            overline.innerHTML = (id+1)+" out of "+global_map.possible_ghosts.length+" ghosts matching evidence found";
        }
        title.innerHTML = global_map.possible_ghosts[id].name;
        description.innerHTML = global_map.possible_ghosts[id].description;

        //prints the evidence the ghost provides
        if (global_map.possible_ghosts[id].ignore != true) {
            let evidenceHTML = "<br><br>Evidence:<br><ul>";
            for (let i = 1; i < global_map.possible_ghosts[id].evidence.length; i++) {
                let evidence_id = Number(global_map.possible_ghosts[id].evidence[i]);
                console.log(evidence_id);
                console.log(evidences_map[evidence_id].name);
                evidenceHTML += "<li>"+evidences_map[evidence_id].name+"</li>";
            }
            evidenceHTML += "</ul>";
            description.innerHTML += evidenceHTML;
        }
        else{

        }
        
    }
}
function chOptionEv(targetId, direction) {
    chOption(targetId, direction);
    evidenceConstructor();
}
function chOptionGhost(targetId, direction) {
    printGhostInfo(chOption(targetId, direction));
}
function optionsReset() {
    let options = document.getElementsByClassName('option-text');
    for (let i = 0; i < options.length; i++) {
        options[i].setAttribute('optionvalue', 9999);
        let id = options[i].id;
        let direction = 1;
        chOptionEv(id, direction);
    }
}
optionsReset();