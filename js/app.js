'use strict';

function AppController() {
    if(!(this instanceof AppController)) {
        return new AppController;
    }

    // Constants ------------------------------------------------------------ //

    // Properties ----------------------------------------------------------- //

    // Instance ------------------------------------------------------------- //
    function AppInstance() {
        return Instance;
    }
    const Instance = AppInstance;

    // Construct ------------------------------------------------------------ //
    return (function Construct() {
        document.body.classList.add('onloaded');

        return Instance;
    })();

    // Methods -------------------------------------------------------------- //

    // Helpers -------------------------------------------------------------- //
}
