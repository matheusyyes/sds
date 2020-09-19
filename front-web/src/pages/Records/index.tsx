import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {formatDate} from './helpers';
import './styles.css';
import { RecordResponse } from './types';
import Pagination from './Pagination'
import {Link} from 'react-router-dom'

const BASE_URL = 'http://localhost:8080'

const Records = () => {
    const [recordsReponse, setRecordsResponse] = useState<RecordResponse>();
    const [activePage, setActivePage] = useState(0);
    console.log(recordsReponse);

    useEffect(() => {
        axios.get(`${BASE_URL}/records?linesPerPage=12&page=${activePage}`)
            .then(response => setRecordsResponse(response.data));
    }, [activePage]);

    const handledPageChange = (index: number) =>{
        setActivePage(index);
    };

    return (

        <div className="page-container">
            <div className="filters-container records-actions">
                <Link to="/charts">
                    <button className="action-filters">
                        VER GRÁFICOS
                    </button>
                </Link>
            </div>
            <table className="records-table" cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <th>INSTANTE</th>
                        <th>NOME</th>
                        <th>IDADE</th>
                        <th>PLATAFORMA</th>
                        <th>GENERO</th>
                        <th>TITULO DO GAME</th>
                    </tr>
                </thead>
                <tbody>
                    {recordsReponse?.content.map(record => (

                        <tr key={record.id}>
                            <td>{formatDate(record.moment)}</td>
                            <td>{record.name} </td>
                            <td>{record.age}</td>
                            <td className="text-secondary">{record.gamePlatform}</td>
                            <td>{record.genreName}</td>
                            <td className="text-primary">{record.gameTitle}</td>
                        </tr>

                    ))}

                </tbody>
            </table>
            <Pagination
            activePage={activePage}
            goToPage={handledPageChange}
            totalPages ={recordsReponse?.totalPages}
            ></Pagination>
        </div>
    );
}

export default Records;