import { createStaff } from "../src/offline-modules/staff/staff.service"
export const handleSubmit = async (formData,event) =>{
    try{
        switch(event){
        case "CREATE_STAFF":
            const res = await createStaff(formData)
            return {
                sucess: true,
                message: "Saved locally. Will sync when online.",
                data: res
            }
        default:
            return {
                success: false,
                message: "No handler for this event"
            }

    }
    }catch(error){
        console.error("Error handling event:", error);
        return {
      success: false,
      message: "Failed to save staff",
      error,
    };
    }
    
}
