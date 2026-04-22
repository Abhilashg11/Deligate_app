

export const staffReducer = (state= [] , action ) => {
    switch(action.type){
        case 'CREATE_STAFF': 
            return [...state, action.payload];
        default:
            return state;
    }
} 