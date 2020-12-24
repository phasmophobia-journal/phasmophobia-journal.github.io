/*
Evidence Values:
Default/No evidence = 0     Note: This value is a default value required for the javascript to work, every ghost entry should have it as an acceptable evidence
EMF Level 5     = 1
Ghost Orbs      = 2
Ghost Writing  = 3
Freezing Temps  = 4
Spirit Box      = 5
Finger Prints   = 6
*/

var evidences_map = [/* This is formatted this way so that the algorithms that work using "ghosts_map" also work with this object */
    {
        name:"No Evidence"
    },
    {
        name:"EMF Level 5"
    },
    {
        name:"Ghost Orbs"
    },
    {
        name:"Ghost Writing"
    },
    {
        name:"Freezing Temps"
    },
    {
        name:"Spirit Box"
    },
    {
        name:"Finger Prints"
    }
];

var ghosts_map = [
    {
        ignore:true,
        name:"Not yet discovered",
        evidence:[
            0,
            0,
            0,
            0
        ],
        description:"Gather evidence to narrow down the list of possible ghosts.<br><br>Flick through the pages using the arrows below to see all the ghosts' descriptions"
    },
    {
        name:"Shade",
        evidence:[
            0,
            1,
            2,
            3
        ],
        description:"A Shade is known to be a Shy Ghost. There is evidence that a Shade will stop all paranormal activity if there are multiple people nearby.<br><br>Unique Strengths: Being shy means the Ghost will be harder to find.<br><br>Weaknesses: The Ghost will not enter hunting mode if there is multiple people nearby."
    },
    {
        name:"Phantom",
        evidence:[
            0,
            1,
            2,
            4
        ],
        description:"A Phantom is a Ghost that can possess the living, most commonly summoned by a Ouija Board. It also induces fear into those around it.<br><br>Unique Strengths: Looking at a Phantom will considerably drop your sanity.<br><br>Weaknesses: Taking a photo of the Phantom will make it temporarily disappear."
    },
    {
        name:"Jinn",
        evidence:[
            0,
            1,
            2,
            5
        ],
        description:"A Jinn is a territorial Ghost that will attack when threatened. It also has been known to travel at significant speed.<br><br>Unique Strengths: A Jinn will travel at a faster speed if it’s victim is far away.<br><br>Weaknesses: Turning off the locations power source will prevent the Jinn from using it’s ability."
    },
    {
        name:"Yurei",
        evidence:[
            0,
            2,
            3,
            4
        ],
        description:"A Yurei is a Ghost that has returned to the physical world, usually for the purpose of revenge or hatred.<br><br>Unique Strengths: Yurei’s have been known to have a stronger effect on people’s sanity.<br><br>Weaknesses: Smudging the Yurei’s room will cause it to not wander around the location for a long time."
    },
    {
        name:"Mare",
        evidence:[
            0,
            2,
            4,
            5
        ],
        description:"A Mare is the source of all nightmares, making it most powerful in the dark.<br><br>Unique Strengths: A Mare will have an increased chance to attack in the dark.<br><br>Weaknesses: Turning the lights on around the Mare will lower it’s chance to attack."
    },
    {
        name:"Demon",
        evidence:[
            0,
            3,
            4,
            5
        ],
        description:"A Demon is one of the worst Ghosts you can encounter. It has been known to attack without a reason.<br><br>Unique Strengths: Demons will attack more often then any other Ghost.<br><br>Weaknesses: Asking a Demon successful questions on the Ouija Board won’t lower the users sanity."
    },
    {
        name:"Banshee",
        evidence:[
            0,
            1,
            4,
            6
        ],
        description:"A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill.<br><br>Unique Strengths: A Banshee will only target one person at a time.<br><br>Weaknesses: Banshees fear the Crucifix and will be less aggressive when near one."
    },
    {
        name:"Revenant",
        evidence:[
            0,
            1,
            3,
            6
        ],
        description:"A Revenant is a slow but violent Ghost that will attack indiscriminantly. It has been rumored to travel at a significantly high speed when hunting.<br><br>Unique Strengths: A Revenant will travel at a significantly faster speed when hunting a victim.<br><br>Weaknesses: Hiding from the Revenant will cause it to move very slowly."
    },
    {
        name:"Oni",
        evidence:[
            0,
            1,
            3,
            5
        ],
        description:"Onis are a cousin to the Demon and possess extreme strength. There have been rumors that they become more active around their prey.<br><br>Unique Strengths: Oni’s are more active when people are nearby and have been seen moving objects at great speed.<br><br>Weaknesses: Being more active will make the Oni easier to find and identify."
    },
    {
        name:"Poltergeist",
        evidence:[
            0,
            2,
            5,
            6
        ],
        description:"One of the most famous Ghosts, a Poltergeist, also known as a noisy ghost can manipulate objects around it to spread fear into it's victims.<br><br>Unique Strengths: A Poltergeist can throw huge amounts of objects at once.<br><br>Weaknesses: A Poltergeist is almost ineffective in an empty room"
    },
    {
        name:"Spirit",
        evidence:[
            0,
            3,
            5,
            6
        ],
        description:"A Spirit is the most common Ghost you will come across however it is still very powerful and dangerous. They are usually discovered at one of their hunting grounds after an unexplained death.<br><br>Unique Strengths: Nothing<br><br>Weaknesses: Using Smudge Sticks on a Spirit will stop it attacking for a long period of time."
    },
    {
        name:"Wraith",
        evidence:[
            0,
            4,
            5,
            6
        ],
        description:"A Wraith is one of the most dangerous Ghosts you will find. It is also the only known ghost that has the ability of flight and has sometimes been known to travel through walls.<br><br>Unique Strengths: Wraiths almost never touch the ground meaning it can’t be tracked by footsteps.<br><br>Weaknesses: Wraiths have a toxic reaction to Salt"
    }
];
var global_map = {evidences_map:evidences_map, ghosts_map:ghosts_map, possible_ghosts:[]};