
export default function AboutParagraphThree({sectionOneText, buttonGetStarter}){
  return (
    <div>
     <h1 className="section_tittle" style={{ fontSize: "84px" }}>Let's Get Started!</h1>
      <p className="section_text" style={sectionOneText}>
        To get the most out of our platform, the first thing you need to do is <span className="marked-text">create a free account.</span>
        Creating an account on Datety is easy and fast. Simply complete the registration process with your basic information, and you'll be ready to start exploring.
        By creating an account on Datety, you'll have access to all the features available in our application, such as creating dynamic events based on your available schedules and preferences, creating fixed events, being able to share both dynamic and fixed events for group outings, dates, or meetings, and inviting as many friends as you want.
      </p>
      <button style={buttonGetStarter} className="button_register"><a href="/register" className="link_decoration">Register</a></button>

    </div>
  )
}