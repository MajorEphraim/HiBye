import Navigator from "./navigation/Navigator"
import AppProvider from "./context/AppProvider"

export default function App() {
  return (
    <AppProvider>
      <Navigator/>
    </AppProvider>
  )
}

