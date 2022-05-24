import { useState, useEffect } from 'react';
import './App.css';
import List from './components/List';
import { useDebounce } from './hooks/debounceHook';
import { IoIosSearch } from 'react-icons/io';

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [eventsList, setEventsList] = useState(null)
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (searchQuery === "") {
      setEventsList(null)
      setShowList(false)
    }
  }, [searchQuery])

  useEffect(() => {
    if (eventsList) {
      setShowList(true)
    }
  }, [eventsList])

  const handleText = (e) => {
    setSearchQuery(e.target.value)
  }

  const onBlur = () => {
    setShowList(false)
  }

  const onFocus = () => {
    if (eventsList) {
      setShowList(true)
    }
  }

  const prepSearchURL = (query) => {
    const url = `https://mobile-staging.gametime.co/v1/search?q=${query}`

    return encodeURI(url);
  }

  const searchEvent = async () => {
    if (!searchQuery || searchQuery.trim() === "")
      return;

    const URL = prepSearchURL(searchQuery)

    const response = await fetch(URL)
    const events = await response.json()

    // console.log(events)

    //newList[sort_order]

    var newList = [];

    Object.keys(events).forEach(key => {
      if (key !== "display_groups") {
        events[key].map((val) => {
          newList[val.meta["sort_order"]] = val
        })
      }
    });

    setEventsList(newList)
  }

  useDebounce(searchQuery, 500, searchEvent)

  return (
    <div className="App">
      <h1>GAMETIME</h1>
      <div className="SearchContainer">
        <IoIosSearch 
          size={'30px'}
        />
        <input 
          autoFocus
          type={"search"}
          value={searchQuery}
          onChange={handleText}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </div>
      {showList && <List searchQuery={searchQuery} items={eventsList}/>}
    </div>
  );
}

export default App;
