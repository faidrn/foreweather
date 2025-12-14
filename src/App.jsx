import MainLayout from "./components/layout/MainLayout";
import { ThemeProvider } from '../src/context/ThemeContext';
import { LanguageProvider } from "./context/LanguageContext";


function App() {

  return (
    <LanguageProvider>
      <ThemeProvider>
        <MainLayout />
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
