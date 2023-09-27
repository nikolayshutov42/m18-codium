export const getFloorNumber = (value) => {
    if (value) {
        return value?.split('/').pop()
    } else {
        return '-'
    }
}

export const getHousingNumber = (value) => {
    if (value) {
        const arr= value?.split('/')
        return arr[arr.length - 2]
    } else {
        return '-'
    }
}
