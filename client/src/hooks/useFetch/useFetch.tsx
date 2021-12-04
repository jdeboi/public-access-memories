import { useState, useEffect } from 'react'

const useFetch = url => {
    const [state, setState] = useState([null, true]);

    useEffect(() => {
        (async () => {
            const data = await fetch(url)
                .then(res => res.json());

            setState([data, false]);
        })();
    }, [url]);

    return state;
};

export default useFetch; 