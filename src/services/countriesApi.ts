import type { Countries } from './../types'

const url = process.env.REACT_APP_COUNTRIES_SERVER

function getCountries(): Promise<Countries[]> {

    return fetch(`${url}/all`)
            .then(res => res.json())
            .then(res => {
                    return res as Countries[]
            })
}



export {
    getCountries
}
