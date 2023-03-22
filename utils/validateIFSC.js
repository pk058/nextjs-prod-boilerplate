export const validateIFSC = (IFSC = '') => {
    {
        const regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        if (regex.test(IFSC) || IFSC === '') {
            return true;
        } else {
            return false;
        }
    }
};
