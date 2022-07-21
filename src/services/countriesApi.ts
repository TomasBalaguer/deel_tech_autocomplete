import type { Countries } from './../types'

function getCountries(): Promise<Countries[]> {

    return fetch("https://restcountries.com/v3.1/all")
            .then(res => res.json())
            .then(res => {
                    return res as Countries[]
            })
}


function getCountry(value: string): Promise<Countries> {

    return fetch(`https://restcountries.com/v3.1/alpha/${value}`)
            .then(res => res.json())
            .then(res => {
                    return res as Countries
            })
}



export {
    getCountries,
    getCountry
}
