export const detectTimeZoneOffset = () => {
    var dtDate = new Date('1/1/' + new Date().getUTCFullYear());
    var intOffset = 10000; //set initial offset high so it is adjusted on the first attempt
    var intMonth;

    // Go through each month to find the lowest offset to account for DST
    for (intMonth = 0; intMonth < 12; intMonth++) {
        //go to the next month
        dtDate.setUTCMonth(dtDate.getUTCMonth() + 1);

        // To ignore daylight saving time look for the lowest offset.
        // Since, during DST, the clock moves forward, it'll be a bigger number.
        if (intOffset > dtDate.getTimezoneOffset() * -1) {
            intOffset = dtDate.getTimezoneOffset() * -1;
        }
    }

    return intOffset / 60;
};
