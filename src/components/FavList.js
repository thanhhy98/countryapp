import React, { useContext } from 'react'
import { DeleteFavContext } from '../context/favContext'
import { Link } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Clear';
import Weather from './Weather'

function FavList({ favNotes }) {
    const handleDeleteFav = useContext(DeleteFavContext)
    if(!favNotes) {
        return null
    }
    return (
        <ul className='fav-list'>
            {favNotes.map(item => (
                <li key={item.cca2}>
                <Link to={`/${item.name.common}`} style={{textDecoration: 'none'}}>
                    <img src={item.flags.png} alt={item.name.common}/>
                    <p>{item.name.common}</p>
                    <div style={{ position: 'absolute', top: 0}}>
                    <Weather note={item}/>
                    </div>
                </Link>
                    <div id='delete'>
                    <ClearIcon onClick={() => handleDeleteFav(item.name.common)} sx={{cursor: 'pointer', fontSize: '2em'}}/>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default FavList