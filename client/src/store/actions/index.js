
export const RESETAPP = 'RESETAPP';
export const LOADINGAPP = 'LOADINGAPP';
export const DONELOADINGAPP = 'DONELOADINGAPP';
export const STARTCOMPOSITION = 'STARTCOMPOSITION';
export const RESETCOMPOSITION = 'RESETCOMPOSITION';
export const RESIZEAPP = 'RESIZEAPP';

export const loadingApp = () => {
  return {
    type: LOADINGAPP
  }
}

export const doneLoadingApp = () => {
  return {
    type: DONELOADINGAPP
  }
}

export const startComposition = () => {
  return {
    type: STARTCOMPOSITION
  }
}

// export const resetComposition = () => {
//   return {
//     type: RESETCOMPOSITION
//   }
// }

export const resetApp = () => {
  return {
    type: RESETAPP
  }
}

export const resizeApp = (width, height) => {
  return {
    type: RESIZEAPP,
    payload : {width, height}
  }
}
