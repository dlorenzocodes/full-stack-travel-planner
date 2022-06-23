
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
            const date = new Date(entry.replace(/-/g, '/'))
            const week = weekDays[date.getDay()];
            const month = date.toLocaleDateString('en-US',{month: 'short'});
            const day = date.getDate()
            return `${week}, ${month} ${day}`
        } else{
            return ''
        }
    }

    return { formatDate }
}

export default useDate
