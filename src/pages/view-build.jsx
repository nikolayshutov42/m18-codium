import { useEffect, useState } from 'react'
import { getBuild } from '../../api'

const ViewBuild = () => {
    const [loading, setLoading] = useState({})
    const [build, setBuild] = useState({})

    useEffect(() => {
        setLoading(true)
        getBuild()
            .then((res) => setBuild(res))
            .finally(() => setLoading(false))
    }, [])

    return (
        <svg width="1920" height="1200" viewBox="0 0 1920 1200">
            <g
                data-floor="2"
                data-building="3"
                data-name="2"
                data-rooms-count="46"
            >
                <path d="M682 894l47-3h31l49 1h8l144 4v2l58 1v-1l171 5v1l33 1v-1h44v3l17 1v-22l-17-1v-1l-44-3v-3l-34-1-3 2-167-11v-4l-56-3-3 3-143-10-8 1-47-2h-18l-15-1-47 7z"></path>
            </g>
        </svg>
    )
}

export default ViewBuild
