import Empty from '../../assets/empty.png'
import { getFloorNumber, getHousingNumber } from '../../utils'

export function Card({ data, key }) {
    return (
        <div key={key} className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={Empty}
                        className="img-fluid rounded-start"
                        alt="..."
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body d-flex flex-row">
                        <div className="col-6 text-start">
                            <p className="card-text">
                                Корпус:{' '}
                                <strong>{getHousingNumber(data?.level)}</strong>
                            </p>
                            <p className="card-text">
                                Площадь:{' '}
                                <strong>
                                    {data?.layout?.areas.total.value} м²
                                </strong>
                            </p>
                            <p className="card-text">
                                Комнаты:{' '}
                                <strong>
                                    {data?.layout?.properties?.rooms?.value}
                                </strong>
                            </p>
                        </div>
                        <div className="col-6 text-start">
                            <p className="card-text">
                                Этаж:{' '}
                                <strong>
                                    {getFloorNumber(data?.level)}
                                </strong>
                            </p>
                            <p className="card-text">
                                Стоимость: <strong>По запросу</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
