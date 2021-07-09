import { useState } from 'react'

// Libary
import axios from 'axios'
import Input from 'react-input-mask'
import { FaExclamationCircle, FaTimes } from 'react-icons/fa'

// Images
import Logo from '../assets/images/logo.svg'
import Painel from '../assets/images/painel.png'

// Styles
import '../assets/styles/main.css'

export function Home() {

    const [cep, setCep] = useState('')
    const [cepData, setCepData] = useState({})
    
    const [error, setError] = useState(false)
    const [visibleModal, setVisibleModal] = useState(false)


    function onSubmit(event) {
        event.preventDefault()

        axios({
            method: 'GET',
            baseURL: `https://viacep.com.br/ws/${cep}/json/`
        })
        .then(response => {
            if(response.data.erro) {
                setError(true)
            } else {
                setCepData(response.data)
                setVisibleModal(true)
            }         
        })
        .catch(() => setError(true))

    }

    function writeInput(event) {
        setCep(event.target.value)
        setError(false)
    }

    return (
        <>
            <main>

                <div className="container">

                    <div className="logo">
                        <img src={Logo} alt="Solar21" />
                    </div>

                    <div className="title">
                        <div className="bar"></div>
                        <h1><strong>Energia solar</strong> por assinatura <br></br> verifique a disponibilidade <br></br> para sua região.</h1>
                    </div>

                    <h2 className="subtitle">Green is the new future</h2>

                    <form className="search" onSubmit={onSubmit}>
                        {error && (<p className="error"><FaExclamationCircle color="#dc3545" /> CEP inconsistente</p>)}

                        <Input mask="99999-999" maskChar=" " type="text" placeholder="Insira seu CEP aqui"  onChange={writeInput} />
                        <button type="submit">Verificar</button>
                    </form>

                </div>

                <footer>
                    <p>Solar21 | Ilumine o futuro</p>

                    <div className="social">
                        <img src="https://www.solar21.com.br/static/images/icons/ic-linkedin.svg" alt="linkedin" />
                        <img src="https://www.solar21.com.br/static/images/icons/ic-instagram.svg" alt="instagram" />
                        <img src="https://www.solar21.com.br/static/images/icons/ic-youtube.svg" alt="youtube" />
                    </div>
                </footer>

            </main>

            {visibleModal && (
                <div className="background">
                    <div className="modal">

                        <p className="close"><FaTimes color="#D8D8D8" onClick={() => setVisibleModal(!visibleModal)} /></p>

                        <div className="content">
                            <img src={Painel} />

                            <p>Sua cidade é {cepData.localidade} - {cepData.uf} e a <br /> <strong>Solar21</strong> já está iluminando sua cidade!</p>
                        
                            <p>Venha fazer parte do futuro!</p>

                            <a href="https://www.solar21.com.br/" >Assinar agora mesmo</a>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}