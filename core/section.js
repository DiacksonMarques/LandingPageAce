export function createStore (valueKey, value) {
    window.sessionStorage.setItem(valueKey, value);
}

export const getStore = (valueKey) => {
    const value = window.sessionStorage.getItem(valueKey);

    if(value==null){
        return false;
    } else {
        return value;
    }
}

export const updateStore = (valueKey, value) => {
    deletStore(valueKey);
    createStore(valueKey, value);
}

export const deletStore = (valueKey) => {
    window.sessionStorage.removeItem(valueKey);
}