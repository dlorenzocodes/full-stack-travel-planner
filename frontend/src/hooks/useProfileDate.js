function useProfileDate() {

    const formatProfileDates = (date) => {
        const newDate = new Date(date.replace(/-/g, '/'))
        const month = newDate.toLocaleDateString('en-US',{month: 'short'});
        const day = newDate.getDate()
        return `${month}, ${day}`
    }

    return { formatProfileDates }
}

export default useProfileDate
