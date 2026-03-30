import { db } from '../../database/db';
import * as Q from './staff.queries';

export async function createStaffTable() {
    await db.execute(Q.CREATE_STAFF_TABLE);
}

export async function insertStaff(staff) {
    await db.execute(Q.INSERT_STAFF, [
        staff.local_id,
        staff.server_id,
        staff.fullname,
        staff.dob,
        staff.gender,
        staff.role,
        staff.status,
        staff.created_at,
        staff.updated_at,
        staff.sync_status
    ])
}

export async function getAllStaff() {
    const result = await db.execute(Q.SELECT_ALL_STAFF)
    return result?.rows ?? [];
}

export async function getStaffById(id) {
    const result = await db.execute(Q.SELECT_STAFF_BY_ID, [id]);
    return result?.rows?.[0] ?? null;
}

export async function updateStaff(staff) {
    await db.execute(Q.UPDATE_STAFF, [
        staff.fullname,
        staff.dob,
        staff.role,
        staff.status,
        Date.now(),
        staff.local_id
    ])
}

export async function deleteAllStaff() {
    await db.execute(Q.DELETE_ALL_STAFF);
}

export async function updateStaffServerId(localId, serverId) {
    await db.execute(Q.UPDATE_STAFF_SERVER_ID, [serverId, localId
    ])
}