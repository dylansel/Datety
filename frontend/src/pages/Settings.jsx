import React,{useState, useEffect} from "react"
import Header from "../components/utils/Header"
import "../stylesheets/settings.css"
import { useAlert } from "../contexts/AlertContext"
import { useNavigate } from "react-router-dom";
import Input from "../components/utils/Input";
import { editUser, getUser, deleteUser, disableUser } from "../services/userService";
import { compareObjects } from "../helpers/misc/objectsUtils";
import { useAuth } from "../contexts/authContext";

const formSection = {
  padding:"5rem"
}

const doubleInput = {
  display: "flex",
  gap: "18px"
}

const buttonsStyle = {
  display: 'flex',
  justifyContent: 'end',
  paddingTop: '5%',
}




const isLoged = true;

export default function Setting(){
 //-----------------AUTHENTHICATION------------
 const { user, login, logout } = useAuth()
 const navigate = useNavigate();
 useEffect(()=>{
   if(!user){
     navigate('/login');
   }
 },[user])
 //-----------------FIN AUTHENTHICATION------------


  const initialFilds = {
    name: '',
    surname: '',
    userName: '',
    password: '',
    // photo: '',
    startSleep: '',
    endSleep: '',
    darkTheme: null,
    is_active: null,
  }

  const [errorMsg, setErrorMsg] = useState();
  const [check, setCheck]= useState(false)
  const { alertConfig, setAlertConfig } = useAlert();
  const [fetchData, setFetchData] = useState();
  const [userToEdit, setUserToEdit] = useState(initialFilds);
  const [settingsToEdit, setSettingsToEdit] = useState(initialFilds);
  const [loaded, setLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleClose = () => {
    setErrorMsg(null);
    setFetchData(null);
    setUserToEdit(initialFilds);
    setSettingsToEdit(initialFilds);
    setLoaded(false);
    setIsSaving(false);
    navigate(-1)
  }

  const fetch = async () => {
    if (!user) {
      return;
    }
    try {
      setLoaded(false);
      const profile = await getUser();
      profile.data.password = "";
      if (profile.status != 200) {
        throw new Error(profile.data.message || profile.data.error)
      }
      setFetchData({ profile:profile.data })
      setUserToEdit(profile.data);
      setLoaded(true)
    } catch (error) {
      console.error(error);
      setAlertConfig({
        show: true,
        status: 'danger',
        title: 'Error',
        message: `Hubo un error al traer los datos: ${error.message}`
      });
    }

  }

  const isChanged = () =>{
    const userEdited = compareObjects(fetchData?.profile, userToEdit);
    return Object.keys(userEdited).length > 0;
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    setUserToEdit({
      ...userToEdit,
      [e.target.name] : e.target.value
    })
  }

  const handleChangeCheck = (e) => {
    console.log(e.target.checked)
    setUserToEdit({
      ...userToEdit,
      [e.target.name] : e.target.checked
    })
  }

  const refresh = () => {
    fetch();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const userEdited = compareObjects(fetchData?.profile, userToEdit);
      if(userEdited.darkTheme){
        userEdited.darkTheme = (userEdited.darkTheme == 1)
      }
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

  const handleDisable = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const userDisable = compareObjects(fetchData?.profile, userToEdit)
      if (isChanged()) {
        const disable = await disableUser(userDisable, fetchData.profile.id);
        if (disable.status == 200) {
          setAlertConfig({
            show: true,
            status: 'success',
            title: 'Deshabilitado',
            message: 'Se ha deshabilitado el usuario'
          });
          refresh();
          handleClose();
        } else {
          throw new Error('ErrBackend', disable.data?.error || disable.data?.message);
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(`Error, ${error.message}`)
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
      <div className="row ">
        <div  style={formSection}>
          <h2>User Settings</h2>
          <form  className="row ">
            <div class="form-group col-md-6 col-12">
              <label>Cambiar nombre y apellido</label>
              <div style={doubleInput}>
                <Input name='name' type="text" value={userToEdit.name} onChange={handleChange}/>
                <Input name='surname' type="text" value={userToEdit.surname} onChange={handleChange}/>
              </div>
            </div>

            <div className="form-group col-md-6 col-12">
              <label>Cambiar nombre de usuario</label>
              <Input name='userName' type="text" value={userToEdit.userName} onChange={handleChange}/>
            </div>  

            <div className="form-group col-md-6 col-12">
              <label>Cambiar contraseña</label>
              <Input placeholder="Ingrese una nueva contraseña" name='password' value={userToEdit.password} type={check ? "text" : "password"} onChange={handleChange}/>
              <div style={{marginTop:"-10px"}}><label htmlFor="mostrar_pass">Mostrar Contraseña</label> <input name="mostrar_pass" type="checkbox" onChange={handleCheck}/></div>
            </div>    
            
            <div className="form-group col-md-6 col-12 row">
              <div className="col-md-6 col-12"><label>Hora de inicio de sueño</label> <Input name="startSleep" className="form-control" type="time" value={userToEdit.startSleep} onChange={handleChange} /> </div>
              <div className="col-md-6 col-12"><label>Hora de fin de sueño</label><Input className="form-control" name="endSleep" type="time" value={userToEdit.endSleep} onChange={handleChange} /></div>
            </div>
            
            <div className="">
              <label htmlFor="">Dark Mode</label>
              <input className="m-2" type="checkbox" name="darkTheme" checked={userToEdit.darkTheme} onChange={handleChangeCheck}/>
            </div>

            <div style={buttonsStyle} >
              <input className="btn btn-success p-3 m-2 fs-5" type="submit" value="Guardar cambios"  onClick={handleSubmit} />
              <button className="btn btn-danger p-3 m-2 fs-5" type="button" name="is_active" onClick={handleDisable}>Eliminar cuenta</button>
            </div>

          </form>
        </div>
        
      </div>
    </>
  )
}