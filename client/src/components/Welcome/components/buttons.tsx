export const welcomeButtons = (nextStep: () => void) => {
    return (
        <div className="center-buttons">
            <button className="standardButton primary" onClick={nextStep}>next</button>
        </div>
    )
}

export const signInButtons = (prevStep: () => void, clickSubmit: (() => void) | null) => {
    // https://stackoverflow.com/questions/37949981/call-child-method-from-parent
    return (
        <div className="center-buttons">
            <button className="standardButton secondary" onClick={prevStep}>back</button>
            {
                clickSubmit ?
                    <button className="standardButton primary"
                        onClick={() => clickSubmit()}>next</button> :
                    null
            }
        </div>
    );
}

export const signInButtonsFinish = (prevStep: () => void, signInRef: null | (() => void)) => {
    // https://stackoverflow.com/questions/37949981/call-child-method-from-parent
    return (
        <div className="center-buttons">
            <button className="standardButton secondary" onClick={prevStep}>back</button>
            {signInRef ?
                <button className="standardButton primary"
                    onClick={() => signInRef()}>submit</button> :
                null
            }
        </div>
    );
}

export const prevNextButtons = (prevStep: () => void, nextStep: () => void) => {
    return (
        <div className="center-buttons">
            <button className="standardButton secondary" onClick={prevStep}>back</button>
            <button className="standardButton primary" onClick={nextStep}>next</button>
        </div>
    );
}

export const finishButtons = (prevStep: () => void, closeWelcome: () => void) => {
    return (
        <div className="center-buttons">
            <button className="standardButton secondary" onClick={prevStep}>back</button>
            <button className="standardButton primary" onClick={closeWelcome}>finish</button>
        </div>
    );
}

