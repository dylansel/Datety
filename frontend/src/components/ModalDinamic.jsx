import React, { useEffect, useState } from 'react';
import { Modal, Button, Row } from 'react-bootstrap';
import { addEvent, getPossibleAvailableDates } from '../services/eventServices';
import { useAlert } from '../contexts/AlertContext';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getAllUsers, getUser } from '../services/userService';
import "../stylesheets/modals.css"
import { formatDateToString } from './utils/dateUtils';

const formSection = {
  display: "flex",
  flexDirection: "column",
  color: "#fafafa",
  justifyContent: "space-around",
  height: "40rem",
}

const textArea = {
  borderRadius: "0.6rem",
  outline: "none",
  overflow: "hidden"
}

const selectStyle= {
  borderRadius: "8px",
  outline: "none",
  padding: "4px"
}

const timeStyle = {
  display: "flex",
  justifyContent: "space-between"
}

const confirmStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "1rem 0rem 0rem"
}

const daysContainer = {
  display: "flex",
  justifyContent: "space-evenly"
}

const inputStyle= {
  borderRadius: "8px",
  border: "none",
  outline: "none",
  padding: "5px",
}

const buttonStyle= {
  background: "transparent",
  color: "#f2f2f2",
  borderRadius: "10px",
  border: "2px solid #d2d2d2",
  padding: "8px",
  fontWeight: "500"
}

export default function ModalDinamic({ refresh, show, setShow, isDinamic }) {

  const handleClose = () =>{
    setShow(false)
    setForm({...initialForm})
    setErrorMsg("")
  } ;

  let initialForm= {
    tittle: "",
    description: "",
    startDateTime: "",
    endDateTime: "", 
    repeat: {
      until: ""
    },
    participants: "",
    isDinamic
  }

  let initalFormAvailableDates = {
    participants: [],
    duration: ""
  }

  const [form, setForm]= useState(initialForm);
  const [errorMsg, setErrorMsg]= useState(false)
  const { alertConfig, setAlertConfig } = useAlert(); // Usa el contexto alert
  const [usersFilter, setUsersFilter] = useState([]);
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [id, setId] = useState(0);
  const [availableDates, setAvailableDates] = useState([]);
  const [chosenDate, setChosenDate] = useState({})

  // const [askForAvailableDates, setAskForAvailableDates] = useState(initalFormAvailableDates);

  useEffect(()=>{
    const fetchUsers = async ()=>{
      const usersFetched = await getAllUsers();
      const users = await usersFetched.data
      const myId = await getUser()
      setId(myId.data.idUser)
      let temporalUsers = [];

      for (let i = 0; i < users.length; i++) {
        const temporalUser = {
          value: users[i].idUser,
          label: `${users[i].name} ${users[i].surname }`
        }     
        
        temporalUsers.push(temporalUser) 
      }

      const filteredUsers = temporalUsers.filter(u => u.value != myId.data.idUser)

      console.log("USERS::::", filteredUsers)
      setUsersFilter(filteredUsers)
    }

    fetchUsers()
  }, [])

  const handleSubmit= async( )=>{

    try {
      if(!form.tittle && !chosenDate.startDateTime && !chosenDate.endDateTime ){
        setErrorMsg("Completa todos los campos")
        return
      }
      console.log("CHOSEN DATA: ", chosenDate)
      // const dates = chosenDate.split(" ")

      const formToSend = {
        tittle: form.tittle,
        description: form.description,
        startDateTime: chosenDate.startDateTime,
        endDateTime: chosenDate.endDateTime, 
        repeat: {
          until: ""
        },
        participants: selectedOptions,
        isDinamic: true
      }

      console.log("EVENTO QUE SE ENVÍA: ", formToSend)

      const res = await addEvent(formToSend)
        
        if(res.status == 200){
          setAlertConfig({
            show: true,
            status: 'success',
            title: 'Creado',
            message: 'Se creo el evento exitosamente',
            timeOff:3000
          })
        }else{
          setAlertConfig({
            show: true,
            status: 'danger',
            title: 'Error',
            message: 'Error al crear el evento',
            timeOff:3000
          })
        }
      

      refresh()
      handleClose()


      

      
    } catch (error) {
      setErrorMsg(`Error! ${error.message}`)
    }
    
  }

    const handleChange= (e)=>{
        setErrorMsg("")
        setForm({
          ...form,
          [e.target.name] : e.target.value
        })

        if(e.target.name == "until"){
          setForm({
            ...form,
            repeat:{
              ...form.repeat,
              until: e.target.value
            }
          })
        }
      }


    const animatedComponents = makeAnimated();

    const darkTheme = (theme) => ({
      ...theme,
      colors: {
        ...theme.colors,
        primary: '#f2f2f2', // selected option
        primary75: 'white', //no se
        primary50: '#787777', // al hacer click
        primary25: '#3943B7', //selected option default
        danger: 'red',
        dangerLight: 'white',
        neutral0: '#150578', //background
        neutral5: 'white',
        neutral10: '#284B63',
        neutral20: 'white', //flecha select control
        neutral30: 'gray', // hover del input controler
        neutral40: 'white', //text not option 
        neutral50: 'white', //texto placeholder
        neutral60: 'white', // flecha selected contrtol
        neutral70: '#212020',
        neutral80: 'white', //texto select control
        neutral90: 'red',
      },
    });
    const styleSelect = {
      control: (provided, state) => ({
        ...provided,
        backgroundColor: 'transparent',
        border: '1px solid #ccc',
        color: 'white', 
        cursor:"pointer"

      }),
      option: (provided, state) => ({
          ...provided,
          cursor:"pointer"

        })
    };

    const calculateTotalMinutes = (hours, minutes) => {
      const temporalHours = parseInt(hours, 10);
      const temporalMinutes = parseInt(minutes, 10);
  
      const total = temporalHours * 60 + temporalMinutes;
  
      return total;
    };

    const handleHours = (e)=>{
      setHours( e.target.value)
    }

    const handleMinutes = (e)=>{
      setMinutes( e.target.value)
    }


  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };


  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
  
    // Extract the date in the "YYYY-MM-DD" format
    const date = dateTime.toISOString().slice(0, 10);
  
    // Extract the initial hour and minutes in "HH:MM" format
    const initialTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    // Clone the dateTime object to get the final hour and minutes
    const finalDateTime = new Date(dateTimeString);
  
    // Simulate a time difference to get the final hour and minutes
    finalDateTime.setMinutes(finalDateTime.getMinutes() + 30); // For example, add 30 minutes
  
    // Extract the final hour and minutes in "HH:MM" format
    const finalTime = finalDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    // Format the complete string
    const formattedString = `${date} ${initialTime} : ${finalTime}`;
  
    return formattedString;
  }

  const handleAvailableDatesForm = async (e)=>{
    let temporalParticipants = [{idUser: id}]

    for (let i = 0; i < selectedOptions.length; i++) {
      const temporalParticipant = {
        idUser: selectedOptions[i].value
      }
     
      temporalParticipants.push(temporalParticipant)
    }
    const formToSend = {
      participants: temporalParticipants,
      duration: calculateTotalMinutes(hours, minutes)
    }

    // console.log("Lo que se envía: ", formToSend)
    const fetchPossibleDates = await getPossibleAvailableDates(formToSend)
    // console.log("RESULT: ", fetchPossibleDates.data)

    let temporalAvailableDates = [];


    fetchPossibleDates.data.forEach((date, index) => {
      const temporalAvailableDate = {
        
        value: date.startDateTime,
        label: `${formatDateToString(new Date(date.startDateTime),"DD/MM/YYYY hh:mm:ss")}  -  ${formatDateToString(new Date(date.endDateTime),"DD/MM/YYYY hh:mm:ss")}`,
        start: date.startDateTime,
        end: date.endDateTime,
      }

      // console.log(`$Fecha ${index}`, formatDateTime( date.startDateTime))
      temporalAvailableDates.push(temporalAvailableDate)
    })

    

    setAvailableDates(temporalAvailableDates)
  }



  const handleSelectDateChange = (selectedOptions) => {
    const dates = {
      startDateTime : selectedOptions.start,
      endDateTime: selectedOptions.end
    }
    setChosenDate(dates);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered data-bs-theme="dark" >
        <Modal.Header  closeButton  className='bg-dark text-white'>
          <Modal.Title>Crea evento Dinámico</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark text-white p-4'>
          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              <span className="fw-bold"></span>
              {errorMsg}
            </div>
          )}
          <form style={formSection}> 
            <input type="text" name="tittle" value={form.tittle} onChange={handleChange} placeholder="Añade un título" style={inputStyle} className="input_modal_creacion"></input>
            <textarea style={textArea} name="description" value={form.description} onChange={handleChange} placeholder="Descripción"/>
            <div style={timeStyle}>
              <div className='d-flex justify-content-between col-12'>
              </div>
            </div>
            <div>
                <p>Duración: </p>
                <div className='inputs_time_container'>
                <label className='mx-2'>Horas:</label><input type="number" name="hours" value={hours} className="input_time"  onChange={handleHours}/> 
                <label className='mx-2'>Minutos:</label><input  type="number" name="minutes" value={minutes} className="input_time"  onChange={handleMinutes}></input>
                </div> 
              </div>
            <div>
              <p>¿Quieres invitar a alguien?</p>
              <Select
                onChange={handleSelectChange}
                theme={darkTheme}
                styles={styleSelect}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={usersFilter}
              />
            </div>
            {availableDates.length > 1 && 
               <Select
               onChange={handleSelectDateChange}
                theme={darkTheme}
                styles={styleSelect}
                closeMenuOnSelect={false}
                components={animatedComponents}
                options={availableDates}
             />
            }

        </form>
        </Modal.Body>
        <Modal.Footer className='bg-dark'>
          <Button variant="secondary" className='fs-4 px-4' onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="success" className='fs-4 px-4' onClick={handleSubmit}>
            Crear
          </Button>
          <Button variant="success" className='fs-4 px-4' onClick={handleAvailableDatesForm}>
            Solicitar Disponibilidad
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}