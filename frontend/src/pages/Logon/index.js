import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import api from '../../services/api';

import './styles.css';


export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await api.post('session', { id } );

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile');

            console.log(response.data.name);
        } catch (err) {
            alert("Erro no login, tente novamente.");
        }
    }


    return (
        <div className="logon-container">
            <section className="form">

                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça o seu logon</h1>

                    <input value={id} onChange={e => setId(e.target.value)} placeholder="Sua ID"/>

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>

            </section>
            <img src={heroesImg} alt="Heroes" /> 
        </div>
 
    );
}