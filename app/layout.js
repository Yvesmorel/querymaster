import './globals.css'
import { Inter } from 'next/font/google'
import AppContextProvider from './AppContextProvider'
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
  
      <div className={inter.className}>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </div>

  )
}
