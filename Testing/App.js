
import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './themes/ThemeProvider';
import { DisplayText } from './components/displayComponents/text';
import { ThemeToggle } from './components/displayComponents/themeToggle';
import { ScreenWrapper } from './themes/screenWrapper';
import { Button } from './components/displayComponents/button';
import { patientWorkflow } from './metadata/home/profile.metadata';
import { useEffect } from 'react';
import { runMigrations } from './database/migrations';
import { WorkflowRenderer } from "./components/renders/workflowRenderer"
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
import { StepFormRenderer } from './components/renders/stepFormRenderer/StepFormRenderer';


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
  const LOCAL_PATIENT_ID = 'patient-001';

  const [isReady, setIsReady] = React.useState(true);
  // Inside AppContent
  const [patient, setPatient] = React.useState(null);

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

  if (!isReady) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1,justifyContent: 'center'}}>
      <AuthGate
      metadata={loginForm}
      />
    </View>
  );
}

export default App;
