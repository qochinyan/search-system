import "./Modal.css"

const Modal = ({active,setActive,id,list,setList})=>{
    return <div className={active ? "modal active" : "modal"}  >
                <dir className="box1" onClick={(evt)=>evt.stopPropagation()}>
                    <h3 className="sure">Are You Sure?</h3>
                    <div className="buts">
                       <div><button className="yes" onClick={()=>{
                        setActive(false);
                        const myLi = [...list]
                        myLi.splice(id, 1)
                        setList(myLi);
                       }} >YES</button></div>
                        <div><button className="no" onClick={()=>setActive(false)} >NO</button></div>
                    </div>
                </dir>
            </div>
}
export default Modal