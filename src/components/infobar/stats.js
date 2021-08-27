/*global chrome*/
/* eslint-disable no-undef */

import { useEffect, useState } from "react"
import { Progress } from 'antd';

const Stats = () => {
    const [memoryPercentage, setMemoryrcentage] = useState(false)
    const [cpuPercentage, setCpuPercentage] = useState(false)

    // load memory and cpu usage from chrome apis
    const loadData = () => {
        chrome.system.memory.getInfo(function (info) {
            const usedMemory = info.availableCapacity && info.capacity ? info.capacity - info.availableCapacity : 0
            const percentage = info.availableCapacity && info.capacity ? Math.round((usedMemory * 100) / info.capacity) : 0
            setMemoryrcentage(percentage)
        });

        chrome.system.cpu.getInfo(function (info) {
            let totalUsage = info.processors.reduce((acc, el, index) => {
                let used = Math.floor((el.usage.kernel + el.usage.user) / el.usage.total * 100);
                acc += used
                return acc
            }, 0)
            setCpuPercentage(totalUsage)
        });
    }

    useEffect(() => {
        loadData()
        const interval = setInterval(() => {
            loadData()
        }, 1000);
        return () => clearInterval(interval);
    }, [])


    return (
        memoryPercentage && cpuPercentage ?
            <div className="col-md-6  text-end">
                <label style={{ fontSize: 12 }} className="me-3">Memory used : </label>
                <Progress width={50} type="circle" percent={memoryPercentage} />
                <label style={{ fontSize: 12 }} className="ms-3 me-3">Cpu used : </label>
                <Progress width={50} type="circle" percent={cpuPercentage} />
            </div>
            :
            <div className="col-md-6 offset-md-6 text-end">
            </div>

    )
}
export default Stats