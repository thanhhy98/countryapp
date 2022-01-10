export function roundNum(temp) {
    if(temp < 0) {
        const str = temp.toString().split('.')[1]
        if(parseInt(str) === 5) {
            return Math.floor(temp)
        }
    }
    return Math.round(temp)
}

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
