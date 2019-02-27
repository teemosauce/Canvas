define(function () {
    'use strict';

    var local = {
        isSupport: function () {
            if (!window.localStorage) return false;
            try {
                window.localStorage.isPrivate = false;
                return true;
            } catch (e) {
                return false;
            }
        },

        set: function (key, value) {
            if (typeof key === "string") {
                return window.localStorage && (window.localStorage[key] = value)
            }
        },
        get: function (key) {
            if (typeof key === "string") {
                return window.localStorage && window.localStorage[key] || null
            }

            return null;
        }
    }

    var session = {
        isSupport: function () {
            if (!window.sessionStorage) return false;
            try {
                window.sessionStorage.isPrivate = false;
                return true;
            } catch (e) {
                return false;
            }
        },
        set: function (key, value) {
            if (typeof key === "string") {
                return window.sessionStorage && (window.sessionStorage[key] = value)
            }
        },
        get: function (key) {
            if (typeof key === "string") {
                return window.sessionStorage && window.sessionStorage[key] || null
            }

            return null;
        }
    }

    return {
        session: session,
        local: local
    }
});