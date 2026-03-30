import { createStaffRemote } from '../../offline-modules/staff/staff.api';
import { updateStaffServerId } from '../../offline-modules/staff/staff.service';    
export const syncStaff = async(item) => {
    const payload = JSON.parse(item.payload)

    switch(item.action){
        case 'INSERT':{
            const res = await createStaffRemote(payload)
            const serverId = res?.data?.serverId

            if(!serverId){
                throw new Error("Server did not return server_id")
            }

            return {
                postSync: async ()=>{
                    await updateStaffServerId(
                        item.record_id,   // local_id
                        serverId
                    );
                }
            }
        }
        default: throw new Error('Unknown sync action');

    }
}