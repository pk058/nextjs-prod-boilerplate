export const toCapital = (string = '') => {
    if (string.length) {
        return string[0].toUpperCase() + string.substring(1, string.length).toLowerCase();
    } else {
        return '';
    }
};
