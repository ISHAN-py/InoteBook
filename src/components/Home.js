import React, { useContext, useState } from 'react'
import Notes from './Notes'
export default function Home(props) {
  
  return (
    <>
      <Notes showAlert = {props.showAlert}/>
    </>
  )
} 