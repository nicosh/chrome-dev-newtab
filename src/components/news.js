import fetch from "node-fetch"
import React, { useState, useEffect } from "react"
import {Tag} from 'antd'
const subReddits = [
    "https://www.reddit.com/r/javascript/",
    "https://www.reddit.com/r/webdev/",
    "https://www.reddit.com/r/computerscience/",
    "https://www.reddit.com/r/programming/",
    "https://www.reddit.com/r/css/",
    "https://www.reddit.com/r/Frontend/"

]

const  timeConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year  ;
    return time;
}

const News = () => {
    const [news, setNews] = useState([])
    const loadData = async () => {
        let list = []
        for (const subReddit of subReddits) {
            try{
                let url = `${subReddit}top/.json?t=week&limit=2`
                let data = await fetch(url)
                let json = await data.json()
                list = [...list, ...json.data.children]
            }catch(e){
                console.log(e)
            }
        }
        setNews(list)
    }
    useEffect(() => {
        loadData()
    }, [])
    return (
            <div key={news.length} className="row">
                <div className="col-md-12">
                    <h2>News</h2>
                </div>
                {news.map((el, index) => {
                    return (
                        <div key={index} className="col-md-3 p-3 mt-5">
                            <div className="p-3 news-feed">
                                <a  style={{fontSize : 12}} target="_blank" href={el.data.url}>{el.data.title}</a>
                                <div className="text-end mt-3 labels">
                                    <small className="me-3" style={{fontSize : 10}}>{timeConverter(el.data.created)}</small>
                                    <Tag>{el.data.subreddit}</Tag>
                                </div>                             
                            </div>
                        </div>
                    )
                })}

            </div>
    )
}
export default News