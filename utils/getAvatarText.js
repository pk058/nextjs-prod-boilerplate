export const getAvatarText = (text = '') => {
    const textArray = text?.trim().split(' ');
    if (textArray.length && textArray.length === 1) {
        return textArray[0][0];
    }
    if (textArray.length && textArray.length > 1) {
        return textArray[0][0] + textArray[textArray.length - 1][0];
    }
    return '';
};



