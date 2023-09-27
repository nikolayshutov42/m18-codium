import { useEffect, useRef, useState } from 'react'
import { getBuild } from '../../api'
import './styles.css'
import MouseTooltip from 'guyllkegen-react-sticky-mouse-tooltip'
import { Button, Card, CardBody } from 'reactstrap'

const ViewBuild = () => {
    const [loading, setLoading] = useState({})
    const [isVisible, setVisible] = useState(false)
    const [width, setWidth] = useState(true)
    const [active, setActive] = useState(null)
    const [build, setBuild] = useState({})
    const [filters, setFilters] = useState({
        group: 2,
        building: ''
    })

    const isBuilding = !!filters?.building
    const ref = useRef()
    useEffect(() => {
        setLoading(true)
        getBuild(filters)
            .then((res) => setBuild(res))
            .finally(() => setLoading(false))
    }, [filters?.building, filters?.group])
    useEffect(() => {
        // setWidth(
        //     window.innerWidth >= ref?.current?.clientWidth &&
        //         window.innerHeight < ref?.current?.clientHeight
        // )
        window.addEventListener('resize', (e) => {
            console.log(
                'width',
                e.target.innerWidth,
                ref?.current?.clientWidth,
                width
            )
            setWidth(
                e.target.innerWidth >= ref?.current?.clientWidth && e.target.innerHeight < ref?.current?.clientHeight
            )
        })
    }, [])

    return loading ? <p>Loading...</p> : (
        <div
            className={'position-absolute view '}
            style={{ bottom: 0, top: 0, left: 0, right: 0, overflow: 'hidden' }}
        >
            {isBuilding && <Button style={{position: 'fixed', zIndex: 100000, top: 50, left: 50}} onClick={() => setFilters({ ...filters, building: '' })}>Назад</Button>}
            <img
                className={width ? 'width' : ''}
                ref={ref}
                width="1920"
                height="1200"
                src={
                    isBuilding ? `/${filters.building}.jpeg` : '/stage-3-4.jpeg'
                }
            />
            <svg
                className={width ? 'width' : ''}
                width="1920"
                height="1200"
                viewBox="0 0 1920 1200"
            >
                {build?.levels?.map((level, index) => (
                    <g
                        key={index}
                        onMouseEnter={() => {
                            setActive(level)
                            setVisible(true)
                        }}
                        onMouseLeave={() => {
                            setActive(null)
                            setVisible(false)
                        }}
                        onClick={() => setFilters({...filters, building: level.name})}
                        className={'cursor-pointer'}
                        data-floor="2"
                        data-building="3"
                        data-name="2"
                        data-rooms-count="46"
                    >
                        <path d={level.properties.region.value}></path>
                    </g>
                ))}
            </svg>

            <MouseTooltip visible={isVisible} offsetX={15} offsetY={10}>
                <Card>
                    <CardBody>
                        <div className="d-flex gap-1">
                            {isBuilding ? 'Этаж:' : 'Корпус:'} <span>{active?.name}</span>
                        </div>
                        <div className="d-flex gap-1">
                            {'Квартир:'}{' '}
                            <span>
                                {build?.roomsCount
                                    ? build?.roomsCount[active?.id || 0]
                                    : 0}
                            </span>
                        </div>
                    </CardBody>
                </Card>
            </MouseTooltip>
        </div>
    )
}

export default ViewBuild
