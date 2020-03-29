import React, { useState, useEffect } from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem("ongId");
    const ongName = localStorage.getItem("ongName");
    const history = useHistory();

    async function handleDeleteIncident(id) {
        try { 
            await api.delete(`incidents/${id}`, { 
                headers: {
                    authorization: ongId
                }
            });
            setIncidents(incidents.filter(incident => incident.id != id));
        } catch (err) {
            alert('Erro ao deletar o caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push("/");
    }

    useEffect(() => {
        api.get("profile", {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        });

    }, [ongId]);

    return (
        <div className="profile-conteiner">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo, {ongName}</span>
                <Link className="button" to="/incident/new">Cadastrar Novo Caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {
                    incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>Caso:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    ))
                }


            </ul>
        </div>
    );
}