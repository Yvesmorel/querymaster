import './globals.css'
import { Inter } from 'next/font/google'
import AppContextProvider from './AppContextProvider'
const inter = Inter({ subsets: ['latin'] })
import { ConfigProvider } from 'antd'

export default function RootLayout({ children }) {
  return (

    <div className={inter.className}>
      <AppContextProvider>
        <ConfigProvider
          theme={{
            token: {
              // // Seed Token
              colorPrimary: '#635BFF',
            },
          }}
        >
          {children}
        </ConfigProvider>
      </AppContextProvider>
    </div>

  )
}
