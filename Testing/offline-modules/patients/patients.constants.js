export const PATIENT_SYNC_STATUS = {
  PENDING: 'pending',
  SYNCED: 'synced',
  FAILED: 'failed',
};

export const PATIENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DISCHARGED: 'discharged',
};

export function createEmptyPatient() {
  return {
    local_id: null,
    server_id: null,
    first_name: '',
    last_name: '',
    middle_name: '',
    dob: '',
    gender: '',
    ma_number: '',
    status: PATIENT_STATUS.ACTIVE,
    created_at: null,
    updated_at: null,
    sync_status: PATIENT_SYNC_STATUS.PENDING,
  };
}