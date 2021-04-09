const clientOptions = {
    options: { debug: true },
    connection: { reconnect: true },
    identity: {
        username: '',
        password: ''
    },
    channels: []
};

const client = new tmi.Client(clientOptions);

function saveTwitchClientOptions() {

    localStorage.setItem("twitchbotname", document.getElementById("twitch-bot-name").value);
    localStorage.setItem("twitchbotoauth", document.getElementById("twitch-bot-oauth").value);
    localStorage.setItem("twitchbotchannel", document.getElementById("twitch-channel-name").value);

    connectTwitchClient();
}

function connectTwitchClient() {

    let twitchBotName = localStorage.getItem("twitchbotname");
    let twitchBotOAuth = localStorage.getItem("twitchbotoauth");
    let twitchBotChannel = localStorage.getItem("twitchbotchannel");

    if (!twitchBotName || !twitchBotOAuth) return;

    document.getElementById("twitch-bot-name").value = twitchBotName;
    document.getElementById("twitch-bot-oauth").value = twitchBotOAuth;
    document.getElementById("twitch-channel-name").value = twitchBotChannel;

    clientOptions.identity.username = twitchBotName;
    clientOptions.identity.password = twitchBotOAuth;

    clientOptions.channels.push(twitchBotChannel);


    client.connect().catch(console.error);
}


client.on("connected", (address, port) => console.log(`* Connected to ${address}:${port}`));

client.on('message', (channel, tags, message, self) => {

    if (self || !message.startsWith('!')) return;

    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    console.log(tags);

    let isModUp = tags.mod || (tags.badges.broadcaster !== undefined);

    if (!isModUp) return;

    switch (command) {

        case 'ev1':
            setEvidence(1, args[0]);
            break;

        case 'ev2':
            setEvidence(2, args[0]);
            break;

        case 'ev3':
            setEvidence(3, args[0]);
            break;

        case 'gt':
            setGhostType(args[0])
            break;

        case 'gn':
            setGhostName(args);
            break;

        case 'ob1':
            setObjective(1, args[0]);
            break;
        case 'ob2':
            setObjective(2, args[0]);
            break;
        case 'ob3':
            setObjective(3, args[0]);
            break;
    }
});

const evidenceAbbr = [
    'emf',
    'go',
    'gw',
    'ft',
    'sb',
    'fp'
];

const objectivesAbbr = [
    "witness",
    "capture",
    "emf",
    "motion",
    "smudge",
    "crucifix",
    "salt",
    "candle",
    "escape",
    "repel",
    "sanity"
];

const ghostTypeAbbr = [
    'sha',
    'pha',
    'jin',
    'yur',
    'mar',
    'dem',
    'ban',
    'rev',
    'oni',
    'pol',
    'spi',
    'wra',
];

function setEvidence(slot, evidence) {

    let index = evidenceAbbr.indexOf(evidence.toLowerCase());

    let evidenceSelect = document.getElementById("evidence_" + slot);

    evidenceSelect[index + 1].selected = true;

    setGhostFromEvidence();

    updateEvidence();
}

function setGhostName(name) {

    document.getElementById('ghostName').value = name.join(' ');

    updateEvidence();
}

function setObjective(slot, objective) {

    let index = objectivesAbbr.indexOf(objective.toLowerCase());

    let objectiveSelect = document.getElementById("objective-select-" + slot);

    objectiveSelect[index + 1].selected = true;

    updateEvidence();
}

function setGhostType(type) {

    let index = ghostTypeAbbr.indexOf(type.toLowerCase());

    let ghostSelect = document.getElementById("ghost-select");

    ghostSelect[index + 1].selected = true;

    selectGhost(ghostSelect);

    updateEvidence();
}

function setGhostFromEvidence() {

    let evidenceIndexes = [0, 0, 0];

    for (let eviCount = 0; eviCount < evidenceIndexes.length; eviCount++) {

        let evidenceSelect = document.getElementById("evidence_" + (eviCount + 1));

        if (evidenceSelect[evidenceSelect.selectedIndex].value === "0") continue;

        evidenceIndexes[eviCount] = Number(evidenceSelect[evidenceSelect.selectedIndex].value);
    }

    if (evidenceIndexes.some(e => e === 0)) return;

    let ghostSelectIndex = 0;

    for (let ghostCount = 0; ghostCount < ghosts_map.length; ghostCount++) {

        let ghost = ghosts_map[ghostCount];

        let match = true;

        for (let ghostEviCount = 0; ghostEviCount < evidenceIndexes.length; ghostEviCount++) {

            if (!ghost.evidence.some(g => g == evidenceIndexes[ghostEviCount])) {

                match = false;
            }
        }

        if (!match) continue;

        ghostSelectIndex = ghostCount + 1;
        break;
    }

    if (!ghostSelectIndex) return;

    let ghostSelect = document.getElementById("ghost-select");

    ghostSelect[ghostSelectIndex].selected = true;
}