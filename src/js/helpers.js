//get last segment from url
function GetLastSegment(url){
    return url.substr(url.lastIndexOf('/') + 1);
}

//get current location object from url
function GetLocation(url) {
    var l = document.createElement("a");
    l.href = url;
    return l;
};

//replace placeholder in string from two-dimension array
function Replace(template, args){
    args.forEach(function(element) {
        template = template.replace("{"+element[0]+"}", element[1]);
    }, this);
    return template;
}

//send request to url with specified type
function SendRequest(url, type){
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, false);
    xhr.send();
}

//ask user to enter some string
function GetUserResponse(message){
    return prompt(message);
}

//check if string is empty
function isEmpty(str) {
    return (!str || 0 === str.length);
}

//close extension
function Exit(){
    window.close();
}

//create new tab and redirect to url
function CreateTab(url){
    chrome.tabs.create({ url });
}

//refresh pages in some weird way
function RefreshPage(tabId){
    chrome.tabs.executeScript(tabId, {code: 'window.location.reload();'});
}

//getting current tab and proceed with next function
function SelectCurrentTab(next){
    chrome.tabs.getSelected(null,function(tab) {
        next(tab);
    });
}