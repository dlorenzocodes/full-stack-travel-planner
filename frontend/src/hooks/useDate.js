
function useDate() {

    const weekDays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]

    const formatDate = (entry) => {
        if(entry !== ''){
            console.log(entry)
            const date = new Date(entry)
            const week = weekDays[date.getDay() + 1];
            const month = date.toLocaleDateString('en-US',{month: 'short'});
            const day = date.getDate() + 1
            return `${week}, ${month} ${day}`
        } else{
            return ''
        }
    }

    return { formatDate }
}

export default useDate
