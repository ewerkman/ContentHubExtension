var CONSTANTS = {
    PATH: {
        APIENTITY: "{origin}/api/entities/{entityId}",
        APIASSET: "{origin}/en-us/asset/{entityId}",
        APIENTITYIDENTIFIER: "{origin}/api/entities/identifier/{entityIdentifier}",
        ENTITYMGMT: "{origin}/en-us/admin/entitymgmt/entity/{entityId}",
        MESSAGEMGMT: "{origin}/api/status/messages/{entityId}",
        INITSEARCH: "{origin}/api/search/InitSearch",
        OPTIONLIST: "{origin}/api/datasources/{datasource}",
        ENTITYDEFINITION: "{origin}/api/entitydefinitions/{definition}?includeConditionalMembers=true",
        QUEUES: "{origin}/api/status/queues",
        EDITPAGE: "{origin}/admin/page/{pageId}"
    }
};

//on extension load bind events to buttons clicks
document.addEventListener('DOMContentLoaded', function () {

    var apiEntityBtn = document.getElementById("api-entity");
    apiEntityBtn.addEventListener("click", BaseFunction(GoToEntity));

    var apiAssetBtn = document.getElementById("asset-entity");
    apiAssetBtn.addEventListener("click", BaseFunction(GoToAsset));

    var apiEntityIdBtn = document.getElementById("api-entity-id");
    apiEntityIdBtn.addEventListener("click", BaseFunction(GoToEntityById));

    var apiEntityIdentifierBtn = document.getElementById("api-entity-identifier");
    apiEntityIdentifierBtn.addEventListener("click", BaseFunction(GoToEntityByIdentifier));

    var entityManagementBtn = document.getElementById("entitymngmt");
    entityManagementBtn.addEventListener("click", BaseFunction(GoToEntityMgmt));

    var entityManagementIdBtn = document.getElementById("entitymngmt-id");
    entityManagementIdBtn.addEventListener("click", BaseFunction(GoToEntityMgmtById));

    var messageManagementIdBtn = document.getElementById("messagemngmt-id");
    messageManagementIdBtn.addEventListener("click", BaseFunction(GoToMessageMgmtById));

    var entityDefinition = document.getElementById("entity-definition");
    entityDefinition.addEventListener("click", BaseFunction(GoToEntityDefinition));

    var optionList = document.getElementById("option-list");
    optionList.addEventListener("click", BaseFunction(GoToOptionList));

    var queues = document.getElementById("queues");
    queues.addEventListener("click", BaseFunction(GoToQueues));

    var editPage = document.getElementById("editPage");
    editPage.addEventListener("click", BaseFunction(EditPage));

    var manageSection = document.getElementsByClassName('nostyle');
    for (var i = 0; i < manageSection.length; i++) {
        manageSection[i].addEventListener("click", BaseFunction(GoToManageSection, manageSection[i].getAttribute("data")));
    }
});

//base wrapper to execute all commands. bind tab and location context to each method
function BaseFunction(next, data) {
    console.log("BaseFunction: " + data);
    return function () {
        SelectCurrentTab(function (tab) {
            var location = GetLocation(tab.url);
            next(location, tab.id, data);
        });
    };
}

//redirects to api/entities
function GoToEntity(location) {
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "entityId",
            GetLastSegment(location.href)
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.APIENTITY, args));
}

//redirects to api/entities
function GoToQueues(location) {
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "entityId",
            GetLastSegment(location.href)
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.QUEUES, args));
}

//redirects to api/entities
function GoToAsset(location) {
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "entityId",
            GetLastSegment(location.href)
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.APIASSET, args));
}


function GoToManageSection(location, tabId, data) {
    var args = [
        [
            "origin",
            location.origin
        ]
    ];
    CreateTab(Replace(data, args));
}

//ask for id and redirect to api/entities
function GoToEntityById(location) {
    var entityId = GetUserResponse("Enter entity ID");
    if (isEmpty(entityId)) {
        alert("You haven't specified entity ID");
        return;
    }
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "entityId",
            entityId
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.APIENTITY, args));
}
//ask for id and redirect to api/entities
function GoToEntityByIdentifier(location) {
    var entityIdentifier = GetUserResponse("Enter entity Identifier");
    if (isEmpty(entityIdentifier)) {
        alert("You haven't specified entity Identifier");
        return;
    }
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "entityIdentifier",
            entityIdentifier
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.APIENTITYIDENTIFIER, args));
}

//ask for id and redirect to api/datasources
function GoToOptionList(location) {
    var datasource = GetUserResponse("Enter Option List name");
    if (isEmpty(datasource)) {
        alert("You haven't specified any Option List name");
        return;
    }
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "datasource",
            datasource
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.OPTIONLIST, args));
}

//asks for entity id and redirects to entity management
function GoToEntityMgmtById(location) {
    var entityId = GetUserResponse("Enter entity ID");
    if (isEmpty(entityId)) {
        alert("You haven't specified entity ID");
        return;
    }
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "entityId",
            entityId
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.ENTITYMGMT, args));
}

//asks for message id and redirects to entity management
function GoToMessageMgmtById(location) {
    var entityId = GetUserResponse("Enter message ID");
    if (isEmpty(entityId)) {
        alert("You haven't specified message ID");
        return;
    }
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "entityId",
            entityId
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.MESSAGEMGMT, args));
}

//asks for definition name and redirects to api/definition
function GoToEntityDefinition(location) {
    var definitionName = GetUserResponse("Enter entity definition");
    if (isEmpty(definitionName)) {
        alert("You haven't specified entity definition name");
        return;
    }
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "definition",
            definitionName
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.ENTITYDEFINITION, args));
}

//redirect to current entity management
function GoToEntityMgmt(location) {
    var args = [
        [
            "origin",
            location.origin
        ],
        [
            "entityId",
            GetLastSegment(location.href)
        ]
    ];
    CreateTab(Replace(CONSTANTS.PATH.ENTITYMGMT, args));
}

chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == "getSource") {
        // Look for page id in the source
        let re = /data: {"id":(\d+),"identifier":"(.*?)",/gm
        var result = re.exec(request.source)

        const url = new URL(request.location);
        const pathSegments = url.pathname.split('/');

        var args = [
            [
                "origin",
                url.origin+"/"+pathSegments[1]
            ],
            [
                "pageId",
                result[1]
            ]
        ];
        CreateTab(Replace(CONSTANTS.PATH.EDITPAGE, args));
    }
});

function EditPage(location) {
    chrome.tabs.executeScript(null, {
        file: "js/getPagesSource.js"
    }, function () {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
           alert('There was an error injecting script : \n' + chrome.runtime.lastError.message);
        }
    });

}

//clear cache
function ClearCache(location) {
    var args = [
        [
            "origin",
            location.origin
        ]
    ];
    SendRequest(Replace(CONSTANTS.PATH.CLEARCACHE, args), "DELETE");
    SendRequest(Replace(CONSTANTS.PATH.INITSEARCH, args), "POST");
}

//clear cache and reload the page
function ClearCacheAndReload(location, tabId) {
    ClearCache(location);
    RefreshPage(tabId);
    Exit();
}
