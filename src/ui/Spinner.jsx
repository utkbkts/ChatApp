import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners'

const Spinner = () => {
    let [loading, setLoading] = useState(true);
  return (
    <ClipLoader
        color={"#36d7b7"}
        loading={loading}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}

export default Spinner
