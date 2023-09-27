import axios from 'axios'
export const request = async (url, method, payload, formData, params) => {
    const api = 'https://4u-spb.m18.ru/choose'

    const finally_url = `${api}/api/${url}`

    try {
        const res = await axios({
            url: finally_url,
            headers: {
                ...(formData && { 'Content-Type': 'multipart/form-data' })
            },
            method,
            data: payload,
            params
        })
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getRooms(params) {
    return await request(`rooms/`, 'GET', null, null, params)
}

export async function getBuild() {
    return await request(`api/levels/?group=1`, 'GET')
}
