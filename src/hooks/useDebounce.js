import { useState, useEffect } from 'react'

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedVale] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedVale(value), delay)

        return () => clearTimeout(handler) // eslint-disable-next-line
    }, [value])

    return debouncedValue
}

export default useDebounce