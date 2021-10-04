/*global chrome*/
/* eslint-disable no-undef */

import { useEffect, useState } from "react"
import { Progress,Switch  } from 'antd';
import { useApp } from "../context/appContext";
import useInterval from "./useInterval";
const Stats = () => {
    const [memoryPercentage, setMemoryrcentage] = useState(false)
    const [cpuPercentage, setCpuPercentage] = useState(0)
    const [previousCpuInfo,setPreviousCpuInfo]= useState(false)

    const {theme,switchTeme } = useApp()

    // load memory and cpu usage from chrome apis
    const loadData = () => {
        chrome.system.memory.getInfo(function (info) {
            const usedMemory = info.availableCapacity && info.capacity ? info.capacity - info.availableCapacity : 0
            const percentage = info.availableCapacity && info.capacity ? Math.round((usedMemory * 100) / info.capacity) : 0
            setMemoryrcentage(percentage)
        });

        chrome.system.cpu.getInfo(function (info) {
            let totalp = 0
            info.processors.forEach((el,index)=>{
                let percentage = 0;
                let usage = el.usage;
                if (previousCpuInfo) {
                    let oldUsage = previousCpuInfo.processors[index].usage;
                    percentage = Math.floor((usage.kernel + usage.user - oldUsage.kernel - oldUsage.user) / (usage.total - oldUsage.total) * 100);
                  } else {
                    percentage = Math.floor((usage.kernel + usage.user) / usage.total * 100);
                  }
                totalp+= percentage
            })
            let p =  Math.floor(totalp/info.processors.length)
            if(p > 0){
                setCpuPercentage(p) // prevent flashing
            }
            setPreviousCpuInfo(info)

        });
    }

    useEffect(()=>{
        loadData()
    },[])
    useInterval(() => {
        loadData()
    }, 1000);


    return (
        memoryPercentage && cpuPercentage ?
            <div className="col-md-6  text-end">
                <label style={{ fontSize: 12 }} className="me-3">Memory used : </label>
                <Progress width={50} type="circle" percent={memoryPercentage} />
                <label style={{ fontSize: 12 }} className="ms-3 me-3">Cpu used : </label>
                <Progress width={50} type="circle" percent={cpuPercentage} />
                <Switch onChange={switchTeme} className="ms-3 me-3" checkedChildren="🌙" unCheckedChildren="🌙" defaultChecked={theme !== "light"} />
            </div>
            :
            <div className="col-md-6 offset-md-6 text-end">
            </div>

    )
}
export default Stats