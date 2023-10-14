'use client'
import { createContext, useState } from 'react';
import { faRobot, faNetworkWired, faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import AiGeneraor from '../pages/components/AiGenerator/index';
import Datasource from '../pages/components/Datasource/index';
import { Databases } from '@/pages/components/AiGenerator/Tables';
export const AppContext = createContext()

export default function AppContextProvider({ children }) {
  const [navbarItems] = useState([{ text: 'AI Generator', icon: faRobot,component:<AiGeneraor/> }, { text: 'Data source', icon: faNetworkWired,component:<Datasource/> }, { text: 'Pricing', icon: faMoneyCheck }]);
  const [selectedItem, setSelectedItem] = useState(navbarItems[0]);
  const [aiGeneratorNavbar]=useState(['TEXT to SQL','SQL to TEXT']);
  const [selectedGenerator,setSelectedGenerator]=useState(aiGeneratorNavbar[0]);
  const [human,setHuman]=useState('');
  const [ia,setIa]=useState('');
  const [database,setDatabase]=useState(Databases[0].value);
  const [schemaList,setSchemaList]=useState([])
  const [schema, setSchema] = useState('');

  
  return <AppContext.Provider value={{schema, setSchema,schemaList,setSchemaList,database,setDatabase,ia,setIa ,human,setHuman,selectedGenerator,setSelectedGenerator,aiGeneratorNavbar,navbarItems, selectedItem, setSelectedItem }}>
    {children}
  </AppContext.Provider>
}