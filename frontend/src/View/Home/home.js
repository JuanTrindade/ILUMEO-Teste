import "./home.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import Modal from "react-modal";
import Api from "../../Services/api";

function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [workingList, setWorkingList] = useState([]);
    const [workedHour, setworkedHour] = useState("");
    const [userId, setUserId] = useState(null)
    const [isEntryTimeSelected, setEntryTimeSelected] = useState(false);
    const [isTurneActivate, setIsTurne] = useState(false)
    
    const currentDate = new Date().toISOString()

    const userData = location.state?.data;


    async function fetchWorkedHours() {
        await Api.get(`workinglist/${userId}`)
        .then((res) => {
            setWorkingList(res.data);
        })
        .catch((err) => console.log(err))
    }
    

    function modalState(entryTimeState) {
        setEntryTimeSelected(entryTimeState);
        setModalIsOpen(!modalIsOpen);   
    }


    async function postWorkingHour(e) {
        e.preventDefault();
        let user_id = userId

        if (!isEntryTimeSelected) {
            const departure_time = new Date(workedHour).toISOString()

            const data = {
                departure_time,
                user_id
            }
    
            await Api.post("workingcreate", data).then((res) => {
                console.log(res.data)
                fetchWorkedHours()
                setModalIsOpen(!modalIsOpen)
            })
            .then((err) => console.log(err))

        } else {
            const entry_time = new Date(workedHour).toISOString()

            const data = {
                entry_time,
                user_id
            }
    
            await Api.post("workingcreate", data).then((res) => {
                console.log(res.data)
                fetchWorkedHours()
                setModalIsOpen(!modalIsOpen)
            })
            .then((err) => console.log(err))
        }
    }


    function getHourDifference() {
        let getEntryTime;
        let getDepartureTime;
        let hoursDifference;

        workingList.forEach((value) => {
            const current_date = moment(currentDate).format("DD/MM/YYYY")
            const leave = moment(value.departure_time);
            const entry = moment(value.entry_time);

    
            if (entry.format("DD/MM/YYYY") === current_date) {
                getEntryTime = entry;
            }
            if (leave.format("DD/MM/YYYY") === current_date) {
                getDepartureTime = leave;
            }
        });

        if (getEntryTime !== undefined && getDepartureTime !== undefined) {
            if (getEntryTime.format("DD/MM/YYYY") === getDepartureTime.format("DD/MM/YYYY")) {
                const hours = getDepartureTime.diff(getEntryTime, "hours");
                const minutes = getDepartureTime.minutes() - getEntryTime.minutes()

                hoursDifference = hours + ":" + minutes;
            }
        }

        return hoursDifference;

    }


    function startTurn() {
        setIsTurne((prevTurne) => { 
            const current = !prevTurne
            return current; 
        })
    }
    

    useEffect(() => {
        if (userId) {
            fetchWorkedHours()
        }
    }, [userId])
    

    useEffect(() => {
        if (!userData || !Array.isArray(userData)) {
            navigate(-1);
        } else {
            setUserId(userData[0]?.id)
        }
    }, [userData, navigate, workingList])


    return(
        <div className="container">
            {
                userData && userData.length > 0 ? (
                    <div className="home-container">
                        {
                            userData.map((value, key) => (
                                <div className="text-between mb-2 ">
                                    <h3>{value.name}</h3> <h3>#{value.user_code}</h3>
                                </div>
                            ))
                        }

                        <h2>HORAS TRABALHADAS</h2>
                        <h3>
                            {getHourDifference()}
                        </h3>

                        {
                            isTurneActivate === false
                            ? <button className="start-button mt-1" onClick={startTurn}>Iniciar Turno</button>
                            :(
                                <>
                                    <button className="login-button mt-1" onClick={() => modalState(true)}>
                                        Cadastrar Hora de Entrada
                                    </button>

                                    <button  className="login-button mt-1" onClick={() => modalState(false)}>
                                        Cadastrar Hora de Saída
                                    </button>

                                    <div className="working-history-container">
                                        <div>
                                            <p>Dias anteriores</p>
                                            {
                                                workingList.map((value) => (
                                                    <div>
                                                        <input disabled class="login-input" type="text" value={
                                                            value.entry_time 
                                                            ? "Entrada: " + moment(value.entry_time).format("DD/MM/YYYY | HH:mm")
                                                            : "Saida: " + moment(value.departure_time).format("DD/MM/YYYY | HH:mm")
                                                        } />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <button className="close-button mt-1" onClick={startTurn}>Finalizar Turno</button>
                                </>
                            )
                        }

                        <div>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={modalState}
                                contentLabel="Modal is Open"
                                className="modal-container"
                            >
                                <h3 className="mb-2">Cadastrar Horário</h3>
                                <hr style={{width: "80%"}} />

                                <form className="form-container" onSubmit={postWorkingHour}>
                                    <input 
                                        placeholder="Hora de Entrada" 
                                        type="datetime-local" 
                                        className="login-input mt-1" 
                                        onChange={(e) => setworkedHour(e.target.value)}
                                    />

                                    <button className="login-button">Cadastrar</button>
                                </form>   

                                <button className="close-button mt-1" onClick={modalState}>Fechar</button>
                            </Modal>
                        </div>

                    </div>
                ): <h3>Loading...</h3>
            }
        </div>
    );
}

export default Home;