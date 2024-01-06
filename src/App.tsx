import { useState, ChangeEvent } from 'react'
import './App.css'

export interface AutoCompleteSuggestions {
  suggestions: string[]
}

export const AutoComplete = ({ suggestions }: AutoCompleteSuggestions) => {
  const [search, setSearch] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVisible(true)
    setSearch(e.target.value)
  }

  const handleOnClick = (s: string) => {
    setSearch(s)
    setVisible(false)
  }

  const clearInput = () => {
    setSearch('')
    setVisible(false)
  }

  return (
    <div>
      <div
        style={{
          display: 'grid',
          border: '1px solid #000',
          borderRadius: '5px',
          gridTemplateColumns: '260px 40px',
          overflow: 'hidden',
        }}
      >
        <input
          style={{
            width: '270px',
            height: '40px',
            border: 0,
            padding: '0 15px',
            position: 'relative',
          }}
          placeholder="Select A Fruit"
          onChange={e => handleOnChange(e)}
          type="text"
          value={search}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {search && (
            <i
              style={{
                cursor: 'pointer',
                fontWeight: 'bolder',
                fontStyle: 'normal',
                textAlign: 'center',
                flex: '1 1 100%',
              }}
              onClick={() => clearInput()}
            >
              x
            </i>
          )}
        </div>
      </div>

      {visible && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '10px 0',
          }}
        >
          <span
            style={{
              display: 'flex',
              borderBottom: '1px solid #000',
              padding: '10px 0',
              width: '100%',
            }}
          >
            Suggestions
          </span>
          <ul style={{ padding: 0 }}>
            {suggestions
              .filter(s => s.toLocaleLowerCase().includes(search))
              .map(s => (
                <li
                  style={{
                    cursor: 'pointer',
                    textAlign: 'left',
                    listStyle: 'none',
                    marginBottom: '5px',
                  }}
                  key={crypto.randomUUID()}
                  onClick={() => handleOnClick(s)}
                >
                  {s}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function App() {
  const suggestions = [
    'Apples',
    'Bananas',
    'Cherries',
    'Grapes',
    'Kiwis',
    'Strawberries',
  ]
  return (
    <>
      <AutoComplete suggestions={suggestions} />
    </>
  )
}

export default App
