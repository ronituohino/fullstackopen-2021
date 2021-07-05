import React, { useState, useEffect } from "react";
import axios from 'axios'

const App = () => {
  const [countryData, setCountryData] = useState([])
  const [searchResults, setSearchResults] = useState([])

  const [shownCountry, setShownCountry] = useState('')
  const [weatherData, setWeatherData] = useState({})



  const handleSearchChange = (event) => {
    setSearchWord(event.target.value)
  }

  const countryInfoButton = (countryName) => {
    setSearchWord(countryName)
  }

  const setSearchWord = (word) => {
    const filtered = countryData.filter((country) => {
      return country.name.toLowerCase().includes(word.toLowerCase())
    })

    setSearchResults(filtered);
    if (filtered.length === 1) {
      setShownCountry(filtered[0])
    }
  }



  // Fetch country database once app is loaded
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((data) => {
        setCountryData(data.data)
      })

  }, [])

  // Fetch weather data once the shown country is updated
  useEffect(() => {
    if (shownCountry !== '') {
      axios
        .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${shownCountry.capital}`)
        .then((weatherData) => {
          setWeatherData(weatherData)
        })
    }
  }, [shownCountry])


  //Weather data doesn't yet exist!!!
  return (
    <div>
      <Search handleSearchChange={handleSearchChange} />

      <Display searchResults={searchResults}
        showCallback={countryInfoButton}
      />

      <Weather searchResults={searchResults} weatherData={weatherData} />
    </div>
  );
}

const Search = (props) => {
  return (
    <>
      <p>
        find countries <input onChange={props.handleSearchChange} />
      </p>
    </>
  )
}

const Display = (props) => {
  return (
    <div>
      {
        props.searchResults.length > 10
          ? 'Too many matches, specify another filter'
          : props.searchResults.length === 1
            ? <CountryInfo result={props.searchResults[0]} />
            : <CountryList
              searchResults={props.searchResults}
              showCallback={props.showCallback}
            />
      }
    </div>
  )
}

const CountryList = (props) => {
  return (
    <>
      {
        props.searchResults.map((country) => {
          return (
            <div key={country.name}>
              <p>
                {country.name}
                <button onClick={() => props.showCallback(country.name)}>show</button>
              </p>
            </div>
          )
        })
      }
    </>
  )
}

const CountryInfo = (props) => {
  return (
    <>
      <h1>{props.result.name}</h1>
      <p>capital {props.result.capital}</p>
      <p>population {props.result.population}</p>

      <h2>languages</h2>
      <ul>
        {props.result.languages.map((language) => {
          return <li key={language.name}>{language.name}</li>
        })}
      </ul>

      <img src={props.result.flag} height="66" width="99" alt='flag' />
    </>
  )
}

const Weather = ({ searchResults, weatherData }) => {
  if (searchResults.length === 1 && Object.keys(weatherData).length > 0) {
    const country = searchResults[0]
    if (country.name === weatherData.data.location.country) {
      return (
        <>
          <h2>Weather in {country.capital}</h2>
          <p><b>temperature:</b> {weatherData.data.current.temperature} Celcius</p>
          <img src={weatherData.data.current.weather_icons[0]} alt={weatherData.data.current.weather_descriptions[0]} />
          <p><b>wind:</b> {weatherData.data.current.wind_speed} mph direction {weatherData.data.current.wind_dir}</p>
        </>
      )
    }
    else {
      return ''
    }
  }
  else {
    return ''
  }
}
export default App;