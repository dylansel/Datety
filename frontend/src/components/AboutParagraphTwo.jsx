export default function AboutParagraphTwo ({sectionOneText}) {
  return (
    <div>
       <h3 className="section_subtittle" style={{ fontSize: "44px" }}>The Smart Agenda</h3>
        <p className="section_text" style={{ ...sectionOneText, margin: "40px 40px 0 0" }}>
          Have you ever wanted to create an event without knowing when you'll be available? With Datety, that's no longer a problem. Our application allows you to <span className="marked-text">create events without a fixed date and dynamically schedule them in your calendar</span>, so you never miss an opportunity!
          But that's not all. Datety also lets you <span className="marked-text">invite your friends and family to any type of event. Create an account in the application to manage all your events efficiently and collaboratively.</span>
          Additionally, Datety is an intelligent application that suggests the best times to schedule your events based on your schedule and preferences. This way, you can find the perfect moment for that dinner with friends or schedule your next work meeting.
          Download it today and discover how organizing yourself has never been so easy!
        </p>
    </div>
  )
}
