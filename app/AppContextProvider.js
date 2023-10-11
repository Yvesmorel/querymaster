'use client'
import { createContext, useState } from 'react';
import { faRobot, faNetworkWired, faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import AiGeneraor from '../pages/components/AiGenerator/index';
export const AppContext = createContext()

export default function AppContextProvider({ children }) {
  const [navbarItems] = useState([{ text: 'AI Generator', icon: faRobot,component:<AiGeneraor/> }, { text: 'Data source', icon: faNetworkWired }, { text: 'Pricing', icon: faMoneyCheck }]);
  const [selectedItem, setSelectedItem] = useState(navbarItems[0]);
  const [aiGeneratorNavbar]=useState(['TEXT to SQL','SQL to TEXT']);
  const [selectedGenerator,setSelectedGenerator]=useState(aiGeneratorNavbar[0]);

  
  return <AppContext.Provider value={{ selectedGenerator,setSelectedGenerator,aiGeneratorNavbar,navbarItems, selectedItem, setSelectedItem }}>
    {children}
  </AppContext.Provider>
}