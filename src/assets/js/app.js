'use strict';

function AppController() {
    if(!(this instanceof AppController)) {
        return new AppController;
    }

    // Constants ------------------------------------------------------------ //
    const Controllers = [];
    const ChildParameters = {};

    // Properties ----------------------------------------------------------- //
    var LoginController;
    var ConstructController;

    // Instance ------------------------------------------------------------- //
    function AppInstance() {
        return Instance;
    }
    const Instance = AppInstance;

    // Construct ------------------------------------------------------------ //
    return (function Construct() {
        document.body.addClass('onloaded animate');
        Init();

        return Instance;
    })();

    // Methods -------------------------------------------------------------- //
    function Init() {
        Object.assign(ChildParameters, {
            Parent: Instance,
        });

        Controllers.push(HomeController = new window.HomeController(ChildParameters));
        Controllers.push(LoginController = new window.LoginController(ChildParameters));
        Controllers.push(ConstructController = new window.ConstructController(ChildParameters));

        Object.defineProperties(Instance, {
            UseTheme: { enumerable: true, value: UseTheme },

            DispatchAction: { enumerable: true, value: function DispatchAction(name, parameters) {
                console.group('DispatchAction()');
                console.debug(name, parameters);

                Controllers.some(controller => {
                    if(controller.hasOwnProperty(name) && controller[name] instanceof Function) {
                        console.group(controller.name);
                        controller[name].apply(controller, (parameters instanceof Array ? parameters : [parameters]));
                        console.groupEnd();
                    }
                });

                console.groupEnd();

                return this;
            } },
        });

        InitAppActionClicks();

        Instance.DispatchAction('OnParentInited');
    }

    function InitAppActionClicks() {
        document.querySelectorAll('[app-action]').each(element => {
            const appAction = element.attr('app-action').split(':');

            if(!appAction) {
                throw new Error(`element[app-action] attribute error!`);
            }

            Object.defineProperties(element, {
                actionName: { enumerable: true, value: `On${appAction[0].toUCF()}` },
                actionArgs: { enumerable: true, value: appAction[1].split(':') },
            });
            element.removeAttr('app-action');
            element.addEventListener('click', OnAppActionClick);
        });
    }

    function OnAppActionClick(event) {
        Instance.DispatchAction.apply(Instance, [this.actionName, this.actionArgs]);
    }

    function UseTheme(themeName) {
        Object.values(document.body.classList).some(className => {
            className.match(/^theme\-/) && document.body.removeClass(className);
        });

        document.body.addClass(`theme-${themeName}`);
    }

    // Helpers -------------------------------------------------------------- //
}
