'use strict'; // ES6

// LockEvent
// (['selectstart', 'contextmenu']).some((evttype) => {
//     window.addEventListener(evttype, LockEvent());
// });

// OnWindowLoad
// window.addEventListener('DOMContentLoaded', InitApp);
window.addEventListener('load', InitApp);

// AppInitializer
function InitApp() {
    // RemoveOnWindowLoad after first OnWindowLoad
    // window.removeEventListener('DOMContentLoaded', InitApp);
    window.removeEventListener('load', InitApp);

    // Init AppController if exists
    (window.AppController || (window.AppController = function AppController() {
        console.debug(`Not found window.AppController!`);
        document.body.classList.add('onloaded');
    })) && Object.defineProperties(window, {
        AppInstance: { enumerable: true, value: new AppController },
    });
}

// LockEvent
function LockEvent(evt) {
    (evt instanceof Event) && evt.preventDefault();

    return function(evt) {
        if(!(evt instanceof Event)) { return; }

        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
    }
}
