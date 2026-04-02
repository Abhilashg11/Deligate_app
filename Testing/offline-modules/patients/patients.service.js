// src/offline-modules/patients/patients.service.js

import * as repo from './patients.repository';
import { addToSyncQueue } from '../offline-sync/offline-sync.service';
import { getUUID } from '../../utils/uuid';
import { PATIENT_SYNC_STATUS, PATIENT_STATUS } from './patients.constants';

export async function createPatient(data) {
  const now = Date.now();

  const patient = {
    local_id: getUUID(),
    server_id: null,
    first_name: data.first_name,
    last_name: data.last_name,
    middle_name: data.middle_name || null,
    dob: data.dob,
    gender: data.gender,
    ma_number: data.ma_number || null,
    status: 'active',
    created_at: now,
    updated_at: now,
    sync_status: 'pending',
  };

  await repo.insertPatient(patient);

  await addToSyncQueue({
    table: 'patients',
    recordId: patient.local_id,
    action: 'INSERT',
    payload: patient,
  });

  return patient;
}

export async function updatePatient(data) {
  await repo.updatePatient(data);

  await addToSyncQueue({
    table: 'patients',
    recordId: data.id,
    action: 'UPDATE',
    payload: data,
  });
}

export async function updatePatientServerId(localId, serverId) {
  await repo.updatePatientServerId(localId, serverId);
}

export async function fetchPatients() {
  return await repo.getAllPatients();
}

export async function deleteAllPatients() {
  await repo.deleteAllPatients();
}
