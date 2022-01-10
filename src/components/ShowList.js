import React, { useState } from 'react'
import ShowOne from './ShowOne';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Button } from '@mui/material';

function ShowList({ notes }) {
    const init = new Array(notes.length).fill(false);
    const [shows, setShows] = useState(init);
    //neu dat dieu kien render trong function nay:
    // useEffect(() => {
    //   setShows(init);
    // }, [notes]) 
    console.log(shows)
    return (
      <div className='country-list'>
        {notes.map((note,index)=> {
          return (
            <div key={note.cca2}>
            <div className='country-row'><span>{note.name.common}  </span>
            <Button variant={shows[index] ? 'outlined' : 'contained'} size='medium' color='secondary'
              onClick={() => {
              setShows(shows.map((show, thutu) => {
                if(thutu === index) {
                  return !show;
                }
                return show;
              }))
            }} startIcon={shows[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />} >
              {shows[index] ? 'hide' : 'show'}
            </Button>
            </div>
            {shows[index] && <ShowOne note={note} />}  
            </div>
            )
          })}
      </div>
    )
  
  }
export default ShowList