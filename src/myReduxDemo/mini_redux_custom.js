function createStore(reducer){
    let currentState={},currentListeners=[];
    function getState(){
        return currentState;
    }
    function subscribe(listener){
       currentListeners.push(listener);
    }
    function dispatch(action){
        reducer(currentState,action);
        currentListeners.forEach(item=>item());
    }
    return {getState,subscribe,dispatch};
}

function reducer(state={},action){
    switch(action.type){

    }
}

let store=createStore(reducer);
const init=store.getState();
console.log(`state in the beginning:${init}`);
function listener(){
    const current=store.getState();
    console.log(`current state:${current}`);
}
store.subscribe(listener);
store.dispatch({type:'a'});