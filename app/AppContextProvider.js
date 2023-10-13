'use client'
import { createContext, useState } from 'react';
import { faRobot, faNetworkWired, faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import AiGeneraor from '../pages/components/AiGenerator/index';
import { Databases } from '@/pages/components/AiGenerator/Tables';
export const AppContext = createContext()

export default function AppContextProvider({ children }) {
  const [navbarItems] = useState([{ text: 'AI Generator', icon: faRobot,component:<AiGeneraor/> }, { text: 'Data source', icon: faNetworkWired }, { text: 'Pricing', icon: faMoneyCheck }]);
  const [selectedItem, setSelectedItem] = useState(navbarItems[0]);
  const [aiGeneratorNavbar]=useState(['TEXT to SQL','SQL to TEXT']);
  const [selectedGenerator,setSelectedGenerator]=useState(aiGeneratorNavbar[0]);
  const [human,setHuman]=useState('');
  const [ia,setIa]=useState('');
  const [database,setDatabase]=useState(Databases[0].value);

  
  return <AppContext.Provider value={{database,setDatabase,ia,setIa ,human,setHuman,selectedGenerator,setSelectedGenerator,aiGeneratorNavbar,navbarItems, selectedItem, setSelectedItem }}>
    {children}
  </AppContext.Provider>
}