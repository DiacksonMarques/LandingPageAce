import {getStore,createStore} from '../../core/section.js';

(() => {
    'use strict';

    if (getStore("keyNaipe")==null) {
        createStore("keyNaipe", "FEM");
    }
})();