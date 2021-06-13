const initialState = {
data:[]
}

const reducer= (state = initialState, action) => {
    switch (action.type) {

    case "ADD":
        let dummy=[]
        let index=state.data.findIndex(el=>el.etag==action.payload.etag)
        dummy=state.data.filter(e=>e.etag!=action.payload.etag)
        if(index==-1){
            return {...state,data:[action.payload,...state.data]}
        }
        
        return {...state,data:[action.payload,...dummy]}

    default:
        return state
    }
}
export default reducer