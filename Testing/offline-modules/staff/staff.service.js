import { getUUID } from "../../utils/uuid.js";
import { insertStaff } from "./staff.repository";
import { addToSyncQueue } from "../offline-sync/offline-sync.service.js";
import * as repo from './staff.repository';


export async function createStaff(data) {
    const {generalData} = data;
    const now = Date.now();
    const staff = {
        local_id: getUUID(),
        server_id: null,
        fullname: generalData.fullname,
        dob: generalData.dob,
        gender: generalData.gender || null,
        role: generalData.role || null,
        status: "active",
        created_at: now,
        updated_at: now,
        sync_status: "pending"
    };

    await insertStaff(staff);

    await addToSyncQueue({
        table: 'staff',
        recordId: staff.local_id,
        action: 'INSERT',
        payload: staff,
    })

    return staff;

}

export async function updateStaff(data) {
    await repo.updateStaff(data);

    await addToSyncQueue({
        table: "staff",
        recordId: data.local_id,
        action: "UPDATE",
        payload: data
    });
}

export async function updateStaffServerId(localId, serverId) {
    await repo.updateStaffServerId(localId, serverId);
}

export async function fetchStaff() {
    return await repo.getAllStaff();
}

export async function deleteAllStaff() {
    await repo.deleteAllStaff();
}