
export function useDecode() {
    const htmlChart = {
        '&lt;': '<',
        '&gt;': '>',
        '&amp;':'&',
        '&apos;': "'",
        '&quot;': '"',
        '&#x2F;': '/',
        '&#x27;': "'"
    }

    const decodeString = (str) => {
        if(str !== '' || str !== null){
            const strArray = str.split(/(&[^&;]+;)/)
            for(let i = 0; i <strArray.length; i++){
               if(htmlChart[strArray[i]]){
                    strArray[i] = htmlChart[strArray[i]]
               }
            }
    
            const newStr = strArray.join('').replace(/(<[^>]+>)/g, '').trim()
            return newStr
        }

        return ''
    }

    return { decodeString }
}
