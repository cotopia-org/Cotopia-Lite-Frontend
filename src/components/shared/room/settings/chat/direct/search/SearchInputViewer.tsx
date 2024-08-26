"ues client"

import { ReactNode, useCallback, useState } from "react"
import SearchInput from "."

interface Props {
  onChange?: (val: string) => void
  content: ReactNode
}

const SearchInputShower = ({ onChange, content }: Props) => {
  const [searched, setSearched] = useState("")

  const [blured, setBlured] = useState(false)
  const searchInputHandler = useCallback((val: string) => {
    setSearched(val)
    setBlured(false)
    if (onChange) onChange(val)
  }, [])

  const searchContent = (content: ReactNode) => {
    return (
      <div className="rounded-md shadow-md z-[3] bg-white w-full absolute right-0 left-0 top-full mt-2">
        {content}
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <SearchInput
        onClick={() => setBlured((crt) => !crt)}
        changeValHandler={searchInputHandler}
      />
      {!blured && !!searched && searchContent(content)}
    </div>
  )
}

export default SearchInputShower
