import NetInfo from "@react-native-community/netinfo";
import { processSyncQueue } from "./processSyncQueue";
import { api } from "../services/apiServices/syncSevices/patientSyncApi";

let isSyncing = false;

export function startSyncListener() {
  const unsubscribe = NetInfo.addEventListener(async state => {
    if (state.isConnected && !isSyncing) {
      isSyncing = true;
      console.log("🌐 Internet available → starting sync");

      try {
        // await processSyncQueue(api);
        // console.log("✅ Sync completed");
      } catch (e) {
        console.error("❌ Sync failed:", e);
      } finally {
        isSyncing = false;
      }
    }
  });

  return unsubscribe;
}