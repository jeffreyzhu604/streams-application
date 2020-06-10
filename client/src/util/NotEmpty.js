export const notEmpty = (object) => {
    let count = 0;
    if (object) {
        for (let key in object[0]) {
            if (object[0][key]) 
                count = 1;
            if (count == 1)
                return true;
        }            
    }
    return false;
};
