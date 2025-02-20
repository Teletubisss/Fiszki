window.onload = function() {
    const location = document.location.href;
    const referrer = document.referrer;
    console.log(location);
    console.log(referrer);
    console.log(location !== referrer);
    if (location !== referrer) {
        const referrerArray = referrer.split('/');
        if (referrerArray[referrerArray.length - 1] = 'MyProjects.html') {
            loadProject();
        } else {
            loadLatestFromStorage();
        }
    } else {
    loadLatestFromStorage();
    }

}