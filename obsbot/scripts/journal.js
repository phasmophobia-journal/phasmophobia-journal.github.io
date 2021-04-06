function loadObjectives() {

    for (var objCount = 0; objCount < 4; objCount++) {

        var objective = document.getElementsByClassName("objective-select-" + objCount);

        for (var obj = 0; obj < objectives.length; obj++) {

            let option = document.createElement("option");
            option.value = obj;
            option.text = objectives[obj].title;

            objective[0]
                .add(option);

            if (obj === objCount) {

                option.selected = true;
                localStorage.setItem("objective-" + objCount, Number(obj));
            }
        }
    }
}

function loadGhosts() {

    let ghostSelect = document.getElementById("ghost-select");

    let option = document.createElement("option");
    option.value = -1;
    option.text = "Unknown";

    ghostSelect
        .add(option);

    for (let ghostCount = 0; ghostCount < ghosts_map.length; ghostCount++) {

        let ghost = ghosts_map[ghostCount];

        let option = document.createElement("option");
        option.value = ghostCount;
        option.text = ghost.name;

        ghostSelect
            .add(option);
    }
}

function selectGhost(select) {

    if (select === null) return;

    if (select.selectedIndex === 0) return;

    let ghost = ghosts_map[select.selectedIndex - 1];

    for (let eviCount = 1; eviCount < ghost.evidence.length; eviCount++) {

        let evidenceDropdown = document.getElementById("evidence_" + eviCount);

        evidenceDropdown[ghost.evidence[eviCount]].selected = true;
    }
}

function renderTheme(dock_theme) {
    document.getElementById('body').className = dock_theme;
}

function themesMemory() {
    let overlay_theme = localStorage.getItem("overlayTheme");
    let dock_theme = localStorage.getItem("dockTheme");

    //Default values
    if (overlay_theme == null) {
        overlay_theme = "light";
        localStorage.setItem("overlayTheme", overlay_theme)
    }
    if (dock_theme == null) {
        dock_theme = "dark";
        localStorage.setItem("dockTheme", dock_theme);
    }
}
function updateEvidence() {
    let evidence = document.getElementsByClassName('evidence-select');
    let evidenceValues = [];
    for (let i = 0; i < evidence.length; i++) {
        localStorage.setItem("evidence_" + i, evidence[i].value);
        evidenceValues.push(Number(evidence[i].value));/*This HAS to be forced into being a number otherwise a comparison breaks later on*/
    }

    //store any ghost name set
    localStorage.setItem("ghostName", document.getElementById('ghostName').value);

    let ghostResponse = document.getElementsByClassName('response-select');
    localStorage.setItem("ghostResponse", Number(ghostResponse[0].value));

    for (var objCount = 0; objCount < 4; objCount++) {

        var objective = document.getElementsByClassName('objective-select-' + objCount);
        localStorage.setItem("objective-" + objCount, Number(objective[0].value));
    }

    evaluateEvidence(evidenceValues);
}
function evaluateEvidence(evidence) {
    let possible_ghosts = [];

    for (let i = 0; i < ghosts_map.length; i++) {
        let valid_ghost = true;
        for (let a = 0; a < evidence.length; a++) {
            if (!ghosts_map[i].evidence.includes(evidence[a])) {/*Note: "includes()" doesn't work with IE, if IE compatibility is necessary then use the "some()" function instead*/
                valid_ghost = false;
            }
        }
        if (valid_ghost) {
            possible_ghosts.push({ name: ghosts_map[i].name, description: ghosts_map[i].description });
        }
    }
    
    setGhostFromEvidence();
}

function updateSliderValue(element) {
    try {
        num_field = document.getElementById(element.id + "_num");
        num_field.innerHTML = element.value;
    } catch (error) {
        //console.log("original id: "+element.id);
        //console.log(error);
    }
}
function saveOnMemory(element) {
    localStorage.setItem(element.id, element.value);
    updateSliderValue(element);
    toggleAiOAdvancedStyles();
}
function loadFromMemory(element) {
    let saved_value = localStorage.getItem(element.id);
    try {
        if (saved_value.length > 0) {
            element.value = saved_value;
        }
        else {/*loads the deault values into the memory*/
            localStorage.setItem(element.id, element.value);
        }
    } catch (error) {
        /*this isn't actually redundant by nature but it might be for the existent use cases*/
        localStorage.setItem(element.id, element.value);
    }

    updateSliderValue(element);
    toggleAiOAdvancedStyles();
}
function initializeMemory() {
    let inputs = document.getElementsByClassName('memory-input');

    for (let i = 0; i < inputs.length; i++) {
        /*loads the memory*/
        loadFromMemory(inputs[i]);

        /*adds event listener so that the inputs update the memory when changed*/
        inputs[i].addEventListener('change', function () {
            saveOnMemory(inputs[i]);
        });
    }
}


function toggleAiOAdvancedStyles() {
    let aio_advanced_styles = localStorage.getItem("aio_advanced_styles");
    let aio_a_s_container = document.getElementById('aio_a_s_container');
    if (aio_advanced_styles == "true") {
        aio_a_s_container.classList.remove("display-none");
    }
    else {
        aio_a_s_container.classList.add("display-none");
    }
}