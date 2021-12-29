export const roundToMult = (num, mult) => {
    let newNum = num + mult / 2; // to round up if necessary
    let diff = newNum % mult;
    return newNum - diff;
  }

 export const roundToMult2 = (num, mult) => {
    let newNum = num; // to round up if necessary
    let diff = newNum % mult;
    return newNum - diff;
  }
