'use strict';

function Storage(name) {
    if(!name || !name.trim()) {
        throw new Error(`Storage name is '${name}'!`);
    }

    if(!(this instanceof Storage)) {
        return new Storage(name);
    }

    return Charge(JSON.parse(window.localStorage[name] || '{}')).Save();

    function Charge(obj) {
        Object.defineProperties(obj, {
            Save: { enumerable: false, value: function Save() {
                window.localStorage[name] = JSON.stringify(this);
                return this;
            } },
            Clear: { enumerable: false, value: function Clear() {
                return Charge({}).Save();
            } },
            Delete: { enumerable: false, value: function Delete() {
                return delete window.localStorage[name];
            } },

            _UpdList: { enumerable: false, value: {} },
            AddUpd: { enumerable: false, value: function AddUpd(name, handle) {
                if(this._UpdList.hasOwnProperty(name)) {
                    throw new Error(`OnUpd '${name}' already exists!`);
                } else if(!(handle instanceof Function)) {
                    throw new Error(`handle is't function!`);
                }

                this._UpdList[name] = handle;
            } },
            Upd: { enumerable: false, value: function Upd(name) {
                if(this._UpdList.hasOwnProperty(name)) {
                    this._UpdList[name].apply(this);
                    this.Save();
                    return true;
                }

                return false;
            } },
        });

        return obj;
    }
}
