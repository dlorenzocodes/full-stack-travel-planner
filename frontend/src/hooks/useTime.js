
function useTime() {

    const hoursPM = {
        13: '1',
        14: '2',
        15: '3',
        16: '4',
        17: '5',
        18: '6',
        19: '7',
        20: '8',
        21: '9',
        22: '10',
        23: '11',
        24: '12',
    }

    const formatTime = (entry) => {
        if(entry !== ''){
            const timeComponents = entry.toString().split('')
            let hour = `${timeComponents[0]}${timeComponents[1]}`
            const minutes = `${timeComponents[3]}${timeComponents[4]}`
            
            if(hour > 12 ){
                hour = hoursPM[hour]
                return `${hour}:${minutes} PM`
            }

            return `${hour}:${minutes} AM`
        } 

        return ''
    }

    return { formatTime }
}

export default useTime