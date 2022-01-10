import React, { useContext } from 'react' 
import { TempContext } from '../context/favContext';
import {roundNum} from '../myFunc/converter';
import useWeather from '../myhooks/weatherHook';

function Weather({ note }) {
    const [country] = useWeather(note.name.common)
    
    const tempType = useContext(TempContext)
    
    let temp = ''
    if(Object.keys(country).length) {
        if(tempType) {
            temp = `${roundNum(country.current?.temp_f)}°F`
        } else {
            temp = `${roundNum(country.current?.temp_c)}°C`
        }
    } else {
        return null
    }

    return (
        <>
            <span>{temp}</span>
        </>
    )
}

export default Weather