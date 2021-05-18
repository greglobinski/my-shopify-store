import * as React from "react"

export function useGetAddress() {
  const [address, setAddress] = React.useState(null)

  async function getData() {
    try {
      const data = await fetchAddress({
        latitude: window.geoplugin_latitude(),
        longitude: window.geoplugin_longitude(),
      })

      setAddress(data.result.address)
    } catch (e) {
      if (window.console && console.warn) {
        console.warn("Failed to fetch address", e)
      }
    }
  }

  React.useEffect(() => {
    getData()
  }, [])

  return address
}

async function fetchAddress({ latitude, longitude }) {
  const response = await fetch(
    `/api/getAddress?lat=${latitude}&lng=${longitude}`
  )
  return await response.json()
}
