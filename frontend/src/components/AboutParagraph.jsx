import React from 'react'

export default function AboutParagraphOne ({sectionOneText }) {
  return (
    <div>
       <h3 className="section_tittle_english" style={{fontSize: "4.375rem"}}>Who Are We?</h3>
        <p className="section_text" style={{ ...sectionOneText, margin: "40px 40px 0 0" }}>
          From the outset, we have been committed to our clients and our values. We strive to understand their needs and work collaboratively to create customized solutions that meet their business objectives.
          Our team consists of experts in a wide range of technologies and programming languages, allowing us to provide solutions that adapt to any technological environment.
          But our commitment to quality goes beyond technology. We also ensure that our solutions are user-friendly, scalable, and secure, delivered within the agreed-upon timeframe and budget.
        </p>
    </div>
  )
}









