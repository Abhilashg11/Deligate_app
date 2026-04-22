
import React, { useMemo, useRef } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './themes/ThemeProvider';
import { DisplayText } from './components/displayComponents/text';
import { ThemeToggle } from './components/displayComponents/themeToggle';
import { ScreenWrapper } from './themes/screenWrapper';
import { Button } from './components/displayComponents/button';
import { patientWorkflow } from './metadata/home/profile.metadata';
import { useEffect } from 'react';
import { runMigrations } from './database/migrations';
// import { WorkflowRenderer } from "./components/renders/workflowRenderer"
import Test2 from './components/systemComponents/date/Test2';
import AuthGate from './screens/Auth/AuthGate'
import { homeForm } from './metadata/home/profile.metadata'
import {
  clearDatabase,
  getTableInfo,
  listAllTables,
} from './offline-modules/patients/patients.repository';
import { fetchPatients } from './offline-modules/patients/patients.service';
import {
  getAllSyncQueue,
  getPendingSyncItems,
} from './offline-modules/offline-sync/offline-sync.repository';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux-store/store';
import { startSyncListener } from './network/network_listener';
import LoginFrom from './screens/Auth/LoginForm'
import LoginScreen from './screens/Auth/LoginForm';
import { ScreenRenderer } from './components/renders/screenRenderer';
import { loginForm } from './metadata/home/login.metadata'
// import { StepFormRenderer } from './components/renders/stepFormRenderer/StepFormRenderer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { FormProvider, useForm } from 'react-hook-form';



function App() {
  // console.log("App metadata:", homeForm);


  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider>   
            {/* <ScreenWrapper> */}
              <AppContent />
            {/* </ScreenWrapper> */}
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

function AppContent() {
const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const openSheet = () => {
    console.log("pressed")
    sheetRef.current?.expand(); // 🔥 open
  };

  const closeSheet = () => {
    sheetRef.current?.close(); // optional
  };
  
   useEffect(() => {

    runMigrations();
    
    getAllSyncQueue();

    // listAllTables()
    // clearDatabase()
    getTableInfo();
    const result = fetchPatients();
    console.log('Fetched patients:', result);

    // setPatient(data || {});
    // setIsReady(true);
    const unsubscribe = startSyncListener();
    return () => {
    unsubscribe(); // Clean up listener
  };

  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1,justifyContent: 'center'}}>
      {/* <BottomSheetModalProvider> */}
      <AuthGate
      metadata={loginForm}
      />
      {/* </BottomSheetModalProvider> */}
    </GestureHandlerRootView>
  );
}

export default App;



// function App() {
// }

// function AppContent() {
// }