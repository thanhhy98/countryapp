import React, {useState, useEffect, useReducer} from 'react';
import axios from 'axios';
import ShowList from './components/ShowList';
import ShowOne from './components/ShowOne';
import FavList from './components/FavList';
import favReducer from './reducers/favReducer';
import { AddFavContext, CountriesContext, DeleteFavContext, HandleTempContext, TempContext } from './context/favContext'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { Box, AppBar, Toolbar, Typography, InputBase, Button, FormControlLabel, FormGroup, Switch  } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import {styled, alpha, ThemeProvider, createTheme} from '@mui/material/styles'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [tempType, setTempType] = useState(false)
  const [save, dispatch] = useReducer(favReducer, [])
  useEffect(() => {
      axios.get('https://restcountries.com/v3.1/all')
        .then(response => {
          const data = response.data;
          setNotes(data);
        });
        const init = getDataLS()
      dispatch({
        type: 'INIT',
        init
      })
  }, []);
  function handleAddFav(name) {
    const arr = getDataLS()
    localStorage.setItem('flag', JSON.stringify(arr.concat(name)))
    dispatch({
      type: 'ADD',
      name
    })
  }
  function handleDeleteFav(name) {
    const arr = getDataLS()
    localStorage.setItem('flag', JSON.stringify(arr.filter(item => item !== name)))
    dispatch({
      type: 'DEL',
      name
    })
  } 
  const match = useMatch('/:name')
  const selectedItem = match
  ? notes.find(note => note.name.common === match.params.name)
  : null
  const savedNotes = notes.length > 0  
  ? save.map(note => {
    const value = notes.find(n => note === n.name.common)
    return value
  }) 
  : null
  console.log(savedNotes, notes.length)
  const newNotes = notes.filter(note => {
    const searchLower = search.toLowerCase();
    if(note.name.common.toLowerCase().includes(searchLower)) {
      return true
    } else {
      return false
    }
  })
  
  const specific = notes
    ? notes.filter(note => note.name.common === 'Vietnam') 
    : null
  console.log(specific)

  return (
    <HandleTempContext.Provider value={setTempType}>
    <TempContext.Provider value={tempType}>
    <CountriesContext.Provider value={save}>
    <DeleteFavContext.Provider value={handleDeleteFav}>
    <AddFavContext.Provider value={handleAddFav}>
      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={darkTheme}>
          <AppBar position='static' color="primary">
            <Toolbar>
              <Typography variant='h5'>Countries info</Typography>
                {!match && <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search country…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={search}
                    onChange={e => setSearch(e.target.value)} />
                </Search>}
              <Box sx={{ flexGrow: 1 }} />           
              {selectedItem 
                && <Button color='inherit' component={Link} to='/' sx={{ mr: 3 }}>Go Back</Button>}
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={tempType}
                      onChange={() => setTempType(!tempType)}
                      aria-label="login switch" /> }
                      label={tempType ? 'Fahrenheit' : 'Celsius'} />
              </FormGroup>
              {/* <Button color='inherit' component={Link} to='/'>{tempType ? ''}</Button> */}
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Box>
    <div className='grid-view'>
      <div className='main'>
        <Routes>
          <Route path='/:name' element={<ShowOne note={selectedItem} />} />
          {/* {newNotes.length > 10 && <ShowOne note={specific[0]} />} */}
          <Route path='/' 
                 element ={newNotes.length <10 && newNotes.length > 1 
                  ? <ShowList notes={newNotes}/>
                  : newNotes.length > 10 
                  ? <ShowOne note={specific[0]} /> 
                  : newNotes.length === 1 && <ShowOne note={newNotes[0]} />} />
        </Routes>
      </div>
      <div className='fav'>
        <h3 style={{padding: '10px'}}>Following</h3>
        {<FavList favNotes={savedNotes}/>}
      </div>
    </div>
    </AddFavContext.Provider>
    </DeleteFavContext.Provider>
    </CountriesContext.Provider>
    </TempContext.Provider>
    </HandleTempContext.Provider>
  );
}

function getDataLS() {
  return localStorage.getItem('flag')
  ? JSON.parse(localStorage.getItem('flag'))
  : []
}

export default App;
