import { useState } from 'react';
import './App.css';
import Input from "../Input/Input"
import Modal from "../Modal/Modal"

const App = () => {
  
  const [modalActive,setModalActive] = useState(false)
  const [id,setId] = useState()
  const [list, setList] = useState(["Like This"]);
  return (
   <div className='container'>
      
    <Input active={modalActive} setActive={setModalActive} id={id} setId={setId} list={list} setList={setList} />
    <Modal active={modalActive} setActive={setModalActive} id={id} setId={setId} list={list} setList={setList} />
   </div>
  );
}

export default App;
