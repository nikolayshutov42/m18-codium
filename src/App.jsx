import './App.css'
import { useEffect, useState } from 'react'
import { getRooms } from '../api'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from './components/Card'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useDebounce } from 'use-debounce'
import 'react-loading-skeleton/dist/skeleton.css'
import { Button } from 'reactstrap'
import Select from 'react-select'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

function App() {
    const [loading, setLoading] = useState(true)
    const [rooms, setRooms] = useState({})
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState({
        building: [],
        price: null,
        area: null,
        floor: null,
        room: null,
        page: 1
    })

    const [debounced_filters] = useDebounce(filters, 500)

    useEffect(() => {
        setLoading(true)
        setTimeout(
            () =>
                getRooms({
                    ...debounced_filters,
                    room: debounced_filters.room?.length
                        ? debounced_filters.room
                              .map((item) => item.value)
                              .join(',')
                        : null,
                    building: debounced_filters.building?.length
                        ? debounced_filters.building.join(',')
                        : null
                })
                    .then((res) => {
                        const data = {
                            ...rooms,
                            rooms: [...(rooms.rooms || []), ...res.rooms]
                        }
                        setRooms(filters?.page > 1 ? data : res)
                        scrollToTop()
                    })
                    .finally(() => setLoading(false)),
            0
        )
    }, [debounced_filters])

    const room_list = rooms?.rooms

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight ||
            loading
        ) {
            return
        }
        if (rooms?.roomsLeft > 0) {
            setFilters({ ...filters, page: filters.page + 1 })
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [loading])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }

    const setBuilding = (num) => {
        const arr = [...filters.building]
        const find_index = arr.findIndex((item) => item === num)
        if (find_index > -1) {
            arr.splice(find_index, 1)
        } else {
            arr.push(num)
        }
        setFilters({ ...filters, building: arr, page: 1 })
    }

    const roomOptions = [
        { value: 'L', label: '4 Евро | L' },
        { value: '3', label: 'Трехкомнатная | 3' },
        { value: 'M', label: '3-евро | M' },
        { value: '2', label: 'Двухкомнатная | 2' },
        { value: 'S', label: '2-евро | S' },
        { value: '1', label: 'Однокомнатная | 1' },
        { value: 'XS', label: 'Студия | XS' }
    ]

    const filtersView = () => {
        return (
            <div className="d-flex flex-column px-5">
                <Select
                    styles={{
                        // Fixes the overlapping problem of the component
                        menu: (provided) => ({
                            ...provided,
                            zIndex: 9999
                        })
                    }}
                    className="mb-4"
                    placeholder="Выберите тип квартиры"
                    onChange={(e) =>
                        setFilters({ ...filters, room: e, page: 1 })
                    }
                    // closeMenuOnSelect={false}
                    isMulti
                    options={roomOptions}
                />
                <div className="text-start">
                    <strong>Этаж</strong>
                    <div className="mt-1 text-center">
                        {filters.floor || '2-18'}
                    </div>
                    <Slider
                        range
                        defaultValue={[2, 18]}
                        min={2}
                        max={18}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                page: 1,
                                floor: e.join('-')
                            })
                        }
                    />
                </div>

                <div className="mt-5 text-start">
                    <strong>Стоимость</strong>
                    <div className="mt-1 text-center">
                        {filters.price || '2133601-7958762'}
                    </div>
                    <Slider
                        className=""
                        range
                        defaultValue={[2133601, 7958762]}
                        min={2133601}
                        max={7958762}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                page: 1,
                                price: e.join('-')
                            })
                        }
                    />
                </div>

                <div className="mt-5 text-start">
                    <strong className="">Площадь</strong>
                    <div className="mt-1 text-center">
                        {filters.area || '22.02-81.25'}
                    </div>
                    <Slider
                        className=""
                        range
                        defaultValue={[22.02, 81.25]}
                        min={22.02}
                        max={81.25}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                page: 1,
                                area: e.join('-')
                            })
                        }
                    />
                </div>

                <div className="mt-5 d-flex flex-wrap justify-content-center">
                    {[1, 2, 3, 4, 5, 6].map((item, i) => (
                        <Button
                            color={
                                filters?.building?.includes(item)
                                    ? 'primary'
                                    : 'secondary'
                            }
                            onClick={() => setBuilding(item)}
                            key={i}
                            className="m-1"
                        >
                            Building {item}
                        </Button>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="container text-center py-3">
            <Button onClick={() => setOpen(true)} data-toggle="modal" data-target="#exampleModal" className='d-flex d-md-flex d-lg-none rounded-5 bg-primary button-filter p-3'>Filter</Button>

            <Modal open={open} onClose={() => setOpen(false)} center>
                {filtersView()}
            </Modal>

            <div className="row align-items-start position-relative">
                <div className="col-4 position-sticky top-20 d-none d-md-none d-lg-flex">
                    {filtersView()}
                </div>
                <div className="col-auto col-lg-8 text-center">
                    {room_list?.length ? room_list?.map((room, index) => (
                        <Card key={index} data={room} />
                    )) : <span className='text-center'>Список пуст</span>}
                    {loading ? <div>Loading ....</div> : null}
                </div>
            </div>
        </div>
    )
}

export default App
