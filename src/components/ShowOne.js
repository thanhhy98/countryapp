import React, { useState, useContext, useEffect } from 'react' 
import { AddFavContext, CountriesContext, DeleteFavContext, HandleTempContext, TempContext } from '../context/favContext';
import useWeather from '../myhooks/weatherHook';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Paper, Button } from '@mui/material'
import { roundNum, numberWithCommas } from '../myFunc/converter';

function ShowOne({ note }) {
    const countries = useContext(CountriesContext)
    const countryName = note ? note.name.common : 'Vietnam'
    const [country] = useWeather(countryName)
    const [like, setLike] = useState( countries.length > 0 
      ? countries.some(n => n === countryName) 
      : false)

    useEffect(() => {
      if(countries.length > 0 && countries.some(n => n === countryName) ) {
        setLike(true)
      } else {
        setLike(false)
      }
    }, [countries, countryName])
    console.log()
    const tempType = useContext(TempContext)
    const setTempType = useContext(HandleTempContext)
    const handleAddFav = useContext(AddFavContext)
    const handleDeleteFav = useContext(DeleteFavContext)

    const length = Object.keys(country).length
    const langArr = note && Object.values(note.languages)
    function handleClick() {
      if(!like) {
        handleAddFav(note.name.common)
      } else {
        handleDeleteFav(note.name.common)
      }
      setLike(!like)
    }

  if(!note) {
    return null
  }
  return (
    <Paper elevation={3} sx={{p: 3, mr: 4, mt: 1, backgroundColor: 'rgb(250, 250, 250)'}}>
    <div className='show-one'>
      <div className='country-info'>
        <h1>{note.name.common}</h1>
        <img src={note.flags.png} alt={note.name.common} id='flag'/>
        <p><strong>Capital:</strong>  {note.capital}</p>
        <p><strong>Population:</strong> {numberWithCommas(note.population)}</p>
        <p><strong>Subregion:</strong> {note.subregion}</p>
        <p><strong>Languages:</strong></p>
        <ul>
          {langArr.map(language => 
            <li key={language}>{language}</li>)}
        </ul>
      </div>
    <div >
    <h3 style={{ marginTop: '40px'}}>Weather in {country.location?.name}</h3>
    <p id='temp' onClick={() => setTempType(!tempType)}>
      {tempType 
        ? `${length ? roundNum(country.current?.temp_f) : ''}°F` 
        : `${length ? roundNum(country.current?.temp_c) : ''}°C`}
    </p>
    <img src={country.current?.condition.icon} alt={length ? `${country.current?.condition.text}` : ''}  id='weather'/>
    <p><b>Wind</b> {country.current?.wind_kph} km/h, direction {country.current?.wind_dir}</p>
    {like 
    ? <Button variant='outlined' color='error' size='medium' onClick={() => handleClick()} startIcon={<FavoriteIcon />} sx={{ mt:3 }} >
      ADDED
      </Button>
    : <Button variant='contained' color='error' size='medium' onClick={() => handleClick()} startIcon={<FavoriteBorderIcon />} sx={{ mt:3 }} >
      ADD
      </Button>}
    </div>
  </div>
  </Paper>
  )
}

export default ShowOne