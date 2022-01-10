function favReducer(tasks, action) {
    switch(action.type) {
        case 'INIT':
            return action.init
        case 'ADD': 
            return tasks.concat(action.name)
        case 'DEL': 
            return tasks.filter(item => item !== action.name)
        default:{
            throw Error('Unknown action: ' + action.type)
        }
    }
}

export default favReducer