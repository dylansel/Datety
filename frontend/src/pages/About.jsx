import "../stylesheets/animations.css"
import Header from "../components/utils/Header"
import SvgOne from "../imgs/about_us-img1.svg"
import SvgTwo from "../imgs/about_us-img2.svg"
import SvgThree from "../imgs/about_us-img3.svg"
import ScrollReveal from "scrollreveal"
import { useEffect } from "react"



export default function About() {

  useEffect(() => {
    ScrollReveal().reveal('.section_1', {
      duration: 1500,
      delay: 100,
      distance: '80%',
      easing: 'ease-in-out',
    });
  
    return () => {
      ScrollReveal().destroy();
    };
  }, []);

  useEffect(() => {
    ScrollReveal().reveal('.section_2' , {
      duration: 1200,
      delay: 100,
      distance: '70%',
      easing: 'ease-in-out',
      origin: 'left',
      viewFactor: 0.5,
    });
  
    return () => {
      ScrollReveal().destroy();
    };
  }, []);

  useEffect(() => {
    ScrollReveal().reveal('.section_3', {
      duration: 1200,
      delay: 100,
      distance: '70%',
      easing: 'ease-in-out',
      viewFactor: 0.5,
    });
  
    return () => {
      ScrollReveal().destroy();
    };
  }, []);
  
  

  const aboutContainer= {
    background: "#fafafa",
    fontSize: "16px",
    color: "#3f3f3f"
  }

  const sectionOne= {
    display: "flex",
    height: "calc(100vh - 6.25rem)",
    padding: "2.5rem",
    width: "100%",
    boxSizing: "border-box",
    justifyContent: "space-around",
    alignItems: "center"

  }

  const imgOne= {
    flexGrow: "1",
    minWidth: "50%"
    // maxWidth: "43.75rem"
  }

  const sectionOneTextContainer= {
    flexGrow: "1",
    maxWidth: "40%",
    margin: "0 1rem 3rem 1.5rem"
  }

  const sectionOneText= {
     fontSize: "1.2rem", 
     margin: "2.5rem 0 0 0",
     fontWeight: "600",
     textAlign: "justify"
  }

  const sectionTwoContainer= {
    display: "flex",
    height: "100vh",
    padding: "2.5rem",
    width: "100%",
    boxSizing: "border-box",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row-reverse"
  }

  const imgTwo = {
    flexGrow: "1",
    maxWidth: "37.5rem"
  }

  const buttonGetStarter= {
    border: "none",
    padding: "0.375rem",
    borderRadius: "0.25rem",
    margin: "0.937rem 0 0 0"
  } 

  const isLoged = true;

  return (
    <>

      <Header  isLoged={isLoged} />
      {/* {loged ? <Header isLoged={loged} firstLink="Logout" secondLink="Settings" thirdLink="My Agenda" firstRout="/login" secondRoute="/settings" thirdRoute="/app" /> :
              < Header isLoged={loged} firstLink="Login" secondLink="Register" firstRout="/login" secondRoute="/register" />}  */}
     
      <div className="about_container" style={aboutContainer}>
        <div className="section section_1" style={sectionOne}>
          <img className="img-about" src={SvgOne} alt="img-1-aboutUs" style={imgOne}/>
          <div className="text-section_container text_section-one_container" style={sectionOneTextContainer}>
            <h1  className="section_tittle" style={{fontSize: "4.375rem"}}>¿Quíenes Somos<span className="violet-text">?</span></h1>
            <p className="section_text" style={sectionOneText}>
              Bienvenidos a Date<span className="violet-text">Ty</span>, una aplicacion de <span className="violet-text">X</span>moon, somos una empresa dedicada al desarrollo de software. Somos un equipo <span className="marked-text">dedicado, profesional y responsable</span> que se enorgullece de ofrecer soluciones tecnológicas de alta calidad.
              Desde el principio, hemos estado comprometidos con nuestros clientes y con nuestros valores. Nos esforzamos por entender sus necesidades y trabajar juntos para crear soluciones personalizadas que satisfagan sus objetivos comerciales.
              Nuestro equipo está compuesto por expertos en una amplia variedad de tecnologías y lenguajes de programación, lo que nos permite ofrecer soluciones que se adapten a cualquier entorno tecnológico.
              Pero nuestro compromiso con la calidad va más allá de la tecnología. También nos aseguramos de que nuestras soluciones sean fáciles de usar, escalables y seguras, y de que se entreguen en el plazo y presupuesto acordados.       
            </p>
          </div>
        </div>
        <div className="section section_2" style={sectionTwoContainer}>
          <img className="img-about img-about_2" src={SvgTwo} alt="img-2-aboutUs" style={imgOne} />
          <div className="text-section_container text_section-one_container" style={sectionOneTextContainer}>
            <h2 className="section_tittle" style={{ fontSize: "84px" }}>Date<span className="violet-text">Ty</span></h2>
            <h3 className="section_subtittle" style={{ fontSize: "44px" }}>La agenda smart</h3>
            <p className="section_text" style={{...sectionOneText, margin:" 40px 40px 0 0"}}>
              ¿Alguna vez has querido crear un evento sin saber cuándo podrás asistir? Con Datety, eso ya no es un problema. Nuestra aplicación te permite <span className="marked-text">crear eventos sin fecha y agendarlos dinámicamente en tu calendario</span>, ¡para que no te pierdas ninguna oportunidad!
              Pero eso no es todo. Datety también te permite <span className="marked-text">invitar a tus amigos y familiares a cualquier tipo de evento. Crea una cuenta en la aplicación para administrar todos tus eventos de manera eficiente y colaborativa. </span> 
               Además, Datety es una aplicación inteligente que te sugiere los mejores momentos para programar tus eventos, de acuerdo a tu agenda y preferencias. Así, podrás encontrar el momento ideal para hacer esa cena con amigos o para programar tu próxima reunión de trabajo.
             ¡Descárgala hoy mismo y descubre cómo organizarte nunca fue tan sencillo!
            </p>
          </div>
        </div>
        <div className="section section_3" style={{...sectionTwoContainer, flexDirection: "row"}}>
          <img className="img-about" src={SvgThree} alt="img-1-aboutUs" style={imgOne} />
          <div className="text-section_container text_section-one_container" style={sectionOneTextContainer}>
            <h1 className="section_tittle" style={{ fontSize: "84px" }}>Comencemos!</h1>
            <p className="section_text" style={sectionOneText}>
              Para sacar el máximo provecho de nuestra plataforma, lo primero que debes hacer es <span className="marked-text">crear una cuenta gratuita. </span>
              Crear una cuenta en Datety es muy fácil y rápido. Simplemente completa el proceso de registro con tu información básica y ya estarás listo/a para comenzar a explorar.
              Al crear una cuenta en Datety, podrás acceder a todas las funciones disponibles en nuestra aplicación, como la creación de eventos dinamicos según tus horarios disponibles y preferencias, la creación de eventos fijos, poder compartirl tanto los dinamicos con los fijos en caso de sea una salida grupal,
              una cita, o una reunión, y puedas invitar a tantos amigos como quieras.
            </p>
            <button style={buttonGetStarter}>Registrarse</button>
          </div>
        </div>
      </div>
    </>
  )
}