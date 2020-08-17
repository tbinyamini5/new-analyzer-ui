export const dateUtils = {
    dateToStringFormat,
    calcDatesDifferenceInDays
};

function dateToStringFormat(date) {
    const dateArr = date.toLocaleDateString().split('/');
    const month = dateArr[0];
    const day = dateArr[1];
    const year = dateArr[2];

    return `${year}-${month}-${day}`;
}

function calcDatesDifferenceInDays(from, to) {
    // To calculate the time difference of two dates 
    const DifferenceInTime = to.getTime() - from.getTime(); 
    // To calculate the no. of days between two dates 
    const DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24) + 1; 

    return DifferenceInDays;
}
