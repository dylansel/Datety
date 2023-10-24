import React,{useState, useEffect} from "react"
import Header from "../components/utils/Header"
import "../stylesheets/settings.css"
import { useAlert } from "../contexts/AlertContext"
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/utils/Input";
import { editUser, getUser, deleteUser } from "../services/userService";
import { compareObjs } from "@fullcalendar/core/internal";

const isLoged = true;

const mainContainerStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  height: "100vh",
  // background: "blue"
}

const userSection = {
  margin: "5rem",
  display: "flex",
  flexDirection: "column",
  width: "35%",
  // background: "red"
}

const accountSection = {
  margin: "5rem",
  flexDirection: "column",
  width: "35%",
  // background: "red"
  
}

const formSectionOne = {
  display: "flex",
  flexDirection: "column",
  marginTop: "10px",
  // background: "green",
  justifyContent: "space-between"
}

const formSectionTwo = {
  display: "flex",
  flexDirection: "column",
  marginTop: "10px",
  // background: "yellow",
  justifyContent: "space-evenly"
}

const buttonsStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '5%'
}

export default function Setting({auth}){
  //-----------------AUTHENTHICATION------------
  const navigate = useNavigate();
  const reloaded = async () =>{
    const authe = await auth.reloaded();
    if(!authe){
        navigate('/login'); //redireciona al login en caso de no estar authenticado
    }
  }
  useEffect(()=>{
    if(!auth.user){
      reloaded()
    }
  },[auth.user])
  //-----------------FIN AUTHENTHICATION------------

  const initialFilds = {
    userName: '',
    password: '',
  }

  const [errorMsg, setErrorMsg] = useState();
  const [check, setCheck]= useState(false)
  const { alertConfig, setAlertConfig } = useAlert();
  const [fetchData, setFetchData] = useState();
  const [userToEdit, setUserToEdit] = useState(initialFilds);
  const [loaded, setLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleClose = () => {
    setErrorMsg(null);
    setFetchData(null);
    setUserToEdit(initialFilds);
    setLoaded(false);
    setIsSaving(false);
    navigate(-1)
  }

  const fetch = async () => {
    if (!auth?.user) {return}
    try {
      setLoaded(false);
      const profile = await getUser();
      if (profile.status != 200) {
        throw new Error(profile.data.message || profile.data.error)
      }
      setFetchData({profile:profile.data})
      setUserToEdit(profile.data);
      setLoaded(true)
    } catch (error) {
      console.error(error);
      setAlertConfig({
        show: true,
        status: 'danger',
        title: 'Error',
        message: `Hubo un error al traer los datos ${error.message}`
      });
    }

  }

  const isChanged = () =>{
    const userEdited = compareObjs(fetchData?.profile, userToEdit);
    return Object.keys(userEdited).length > 0;
  }

  const handleChange = (e) => {
    setUserToEdit({
      ...userToEdit,
      [e.target.name] : e.target.value
    })
  }

  const refresh = () => {
    fetch();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const userEdited = compareObjs(fetchData?.profile, userToEdit);
      if (isChanged()) {
        const save = await editUser(userEdited, fetchData.profile.id);
        if (save.status == 200) {
          setAlertConfig({
            show: true,
            status: 'success',
            title: 'Guardado',
            message: `Se han guardado los cambios`
          });
          refresh();
          handleClose();
        } else {
          throw new Error('ErrBackend', save.data?.error || save.data?.message);
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(`Error al guardar, ${error.message}`)
    } finally {
      setIsSaving(false);
    }
  }

  const handleCheck= (e)=>{
    setCheck(!check);
  }

  useEffect(() => {
    fetch();
  }, []);

  return(
    <>
      <div style={mainContainerStyle}>
        <div style={userSection}>
          <h2>User Settings</h2>
          <form style={formSectionOne} onSubmit={handleSubmit}>
            <label>Cambiar nombre de usuario</label>
            <Input name='name' type="text" value={userToEdit.userName} onChange={handleChange}/>
            <label>Cambiar contraseña</label>
            <Input placeholder="Ingrese una nueva contraseña" name='password' value={userToEdit.password} type={check ? "text" : "password"} onChange={handleChange}/>
            <div>
                <label htmlFor="mostrar_pass">Mostrar Contraseña</label> <input name="mostrar_pass" type="checkbox" onChange={handleCheck}/>
              </div>
            <div style={buttonsStyle}>
              <input className="inputSubmit" type="submit" value="Guardar cambios"/>
              <input className="inputDanger" type="submit" value="Eliminar cuenta"/>
            </div>

          </form>
        </div>
        <div style={accountSection}>
          <h2>Account Preferences Setting</h2>
          <form style={formSectionTwo} onSubmit={handleSubmit}>
            <label>Comienzo de semana</label>
            <Input onChange={handleChange}/>
            <label>Sleep time <input type="time" onChange={handleChange}/> <span>to</span> <input type="time" onChange={handleChange}/></label>
          </form>
        </div>
      </div>
    </>
  )
}