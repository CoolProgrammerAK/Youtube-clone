const initialState = {
   dark:false
    }
    
    const themereducer= (state = initialState, action) => {
        switch (action.type) {
    
        case "THEME":
           
            return{ dark:action.payload}
    
        default:
            return state
        }
    }
    export default themereducer