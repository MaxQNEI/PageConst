'use strict';

function ConstructController(Parameters) {
	if(!(this instanceof ConstructController)) {
		return new ConstructController(Parameters);
	}


    // Constants ------------------------------------------------------------ //
    const Parent = Parameters.Parent;

    const SlideName = 'construct';
    const SlideWrap = document.querySelector(`.${SlideName}-slide-wrap`);

    // Properties ----------------------------------------------------------- //

    // Instance ------------------------------------------------------------- //
    function ConstructInstance() {
    	return Instance;
    }
    const Instance = ConstructInstance;

    // Construct ------------------------------------------------------------ //
    return (function Construct() {
        (() => {
            Object.defineProperties(Instance, {
                OnParentInited: { configurable: true, enumerable: true, value: OnParentInited },
                OnInvoke: { configurable: true, enumerable: true, value: OnInvoke },

                Show: { enumerable: true, value: function Show() {
                    SlideWrap.Show();
                    return this;
                } },
                Hide: { enumerable: true, value: function Hide() {
                    SlideWrap.Hide();
                    return this;
                } },
            });
        })();

        (() => {
            Object.defineProperties(SlideWrap, {
                Show: { enumerable: true, value: function Show() {
                    this.removeClass('hidden');
                    return this;
                } },
                Hide: { enumerable: true, value: function Hide() {
                    this.addClass('hidden');
                    return this;
                } },
            });
        })();

        return Instance;
    })();

    // Methods -------------------------------------------------------------- //
    function OnParentInited() {
        console.debug.apply(null, (['OnParentInited()']).concat(Object.values(arguments)));

        delete Instance.OnParentInited;
    }

    function OnInvoke(name) {
        if(name !== SlideName) {
            Instance.Hide();
            return;
        }

        Instance.Show();
    }

    // Helpers -------------------------------------------------------------- //
}
