import { useState, useEffect } from "react";

import styles from "./input.module.css"

const Input = ({active,setActive,id,setId,list,setList}) => {
    const [inputValue, setInputValue] = useState("");
    const [filteredList, setFilteredList] = useState([]);
    const [checkedList, setCheckedList] = useState([]);
    // const [copyedList, setCopyedList] = useState([])
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    useEffect(() => {
        const tools = document.querySelector("#tools")
        tools.style.display = "none"
        if (list.length <= 0 || filteredList.length > 0) {
            tools.style.display = "none"
        } else {
            tools.style.display = "flex"
        }

    });
    const handleValueAdd = () => {
        if (inputValue !== "") {
            const updatedList = [...list]; // list.slice()
            updatedList.push(inputValue);
            setList(updatedList);
            setInputValue("")
            setFilteredList([])
        }
        // setItemId(itemId + 1)
    }

    const handleSearch = () => {
        const filteredItems = list.filter(item => item.includes(inputValue));
        if (inputValue === "") {
            setFilteredList(["Nothing Found / the input is empty"])
        }
        else if (filteredItems.length <= 0) {
            setFilteredList(["Nothing Found"])
        } else {
            filteredItems.unshift("-------------")
            filteredItems.unshift("/    Found items    /")

            setFilteredList(filteredItems)
        }
        setCheckedList([])
    }

    const handleReset = () => {
        setFilteredList([]);
        setInputValue("")
        if (filteredList.length > 0) {
            setCheckedList([])
        }
    }
    const delItem = (evt) => {
        setActive(true)
        setId(evt.target.id)
        console.log(evt.target.id)
    }
    const handleClear = () => {
        setList([])
        setCheckedList([])
    }
    const handleEditItem = (evt) => {
        const itemTxt = evt.target.parentNode.querySelector(".itemTxt")
        const valueI = itemTxt.innerHTML
        const txtEditor = evt.target.parentNode.querySelector("#txtEditor")
        evt.target.style.display = "none"
        evt.target.parentNode.querySelector("#save").style.display = "block"
        txtEditor.value = valueI
        txtEditor.style.display = "block"
        itemTxt.style.display = "none"
        // setValue(valueI)

    }
    const handleSave = (evt) => {
        evt.target.style.display = "none"
        const txtEditor = evt.target.parentNode.querySelector("#txtEditor")
        const itemTxt = evt.target.parentNode.querySelector(".itemTxt")
        const value = txtEditor.value
        // setValue(value) 
        itemTxt.innerHTML = value
        itemTxt.style.display = "block"
        txtEditor.style.display = "none"
        evt.target.parentNode.querySelector(".edit").style.display = "block"
    }
    const handleCheck = (id) => {
        const box = document.querySelectorAll("#check")
        // const li = [...list]
        const currList = [...checkedList]
        if (box[id].checked === true) {

            currList.push(list[id])
            setCheckedList(currList)
            console.log(currList);
        }
        else {
            if (checkedList.indexOf(list[id]) > -1) {
                let newList = [...checkedList].filter((el) => el !== list[id])
                setCheckedList(newList)
            }
        }
    }
    const handleDelete = () => {
            const myLi = [...list,...checkedList]
            console.log(myLi);
            setList(myLi.filter((el)=>checkedList.indexOf(el)<0))
    }
    return <div className={styles.container}><div className={styles.searchPlace}>
        <input onChange={handleInputChange} value={inputValue} />
        <button onClick={handleValueAdd}>Add</button>
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleClear}>Clear</button>
    </div>
        <div className={styles.itemsDiv}> {/* className={filteredList.length > 0 ? "filter" : "list"} */}
            {filteredList.length > 0 ?
                filteredList.map((item, index) => <div key={index}>{item}</div>) :
                list.map((item, index) => {
                    return <div className={styles.itemDiv} key={index}>
                        <input className={`${styles.check} ${index}`} id="check" onClick={() => handleCheck(index)} type="checkbox" />
                        <div className="itemTxt">{item}</div>
                        <input type="text" id="txtEditor" className={styles.txtEditor} />
                        <button className={styles.butDel} id={index} onClick={delItem}>X</button >
                        <button id={index} className={`${styles.edit} edit`} onClick={handleEditItem}>Edit</button>
                        <button id="save" className={styles.save} onClick={handleSave}>Save</button></div>

                })}
        </div>
        <div className={styles.delTools} id="tools" ><button id="deleteAll"  className={styles.deleteBut} onClick={handleDelete}>delete</button></div>
    </div>

}

export default Input