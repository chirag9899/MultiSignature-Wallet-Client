import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import Provider from './Provider'
import ReduxProvider from './redux/ReduxProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vaulto',
  description: 'MultiSig, A lock that only opens with enough keys',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/TitleLogo.jpg'/>
      </head>
      <body className={inter.className} >
        <Provider>
          <ReduxProvider>
            <Header />
            {children}
            <Footer />
          </ReduxProvider>
        </Provider>
      </body>
    </html>
  )
}