/*global chrome*/
/* eslint-disable no-undef */

import {  Select,Button ,message } from 'antd';
import { useEffect, useState } from "react"
import { useApp } from '../context/appContext';
const { Option } = Select;
const plainOptions = ["appcache", "cache", "cacheStorage", "cookies", "downloads", "fileSystems", "formData", "history", "indexedDB", "localStorage", "passwords", "serviceWorkers", "webSQL"];
const trash = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
    </svg>
)

const Cache = () => {
    const [itemsToDelete,setItemsToDelete] = useState(['history'])
    const {loadHistory} = useApp()

    // delete selected items 
    const deleteItems = () =>{
        if(itemsToDelete.length > 0){
            let object = itemsToDelete.reduce((acc,el)=>{
                acc[el] = true
                return acc
            },{})
            chrome.browsingData.remove({since: 0 }, object, ()=>{
                message.success('All items deleted');
                loadHistory()
            });
        }
    }

    return (
        <div style={{ fontSize: 14, alignItems: "center", display: "flex" }} className="col-md-6  text-start">
              <Select 
              className="delete-cache"
              onChange={(v)=>{setItemsToDelete(v)}}
              defaultValue={itemsToDelete}  
              mode="tags"
              maxTagCount={3}
              style={{ width: 350 }}  
              tokenSeparators={[',']}>
                  {plainOptions.map((el,index)=>{
                      return(
                        <Option value={el}  key={index}>{el}</Option> 
                      )
                  })}
              </Select>
              <Button onClick={deleteItems} size="large" className="ms-3" type="primary"  shape="circle"  icon={trash}></Button>
        </div>
    )
}
export default Cache