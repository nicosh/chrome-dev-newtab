/*global chrome*/
/* eslint-disable no-undef */

import React, {useState} from 'react'
import { Input, Radio } from 'antd';
const { Search } = Input;

const SearchBar = () => {
    const [searchEngine,setSearchEngine] = useState(1)
    const onSearch = value => {
        // search on google
        if (value && searchEngine === 1) {
            chrome.search.query({
                disposition: "NEW_TAB",
                text: value
            })
        }
        // search on stackoverflow :D
        if(value && searchEngine === 2){
            chrome.tabs.create({'url': `https://stackoverflow.com/search?q=${value}`}, function(tab) {
                // Tab opened.
            });
        }
    };
    
    const onChange = e => {
        setSearchEngine(e.target.value);
    };

    const searchEngineName = searchEngine === 1 ? "Google" : "Stackoverflow"
    return (
        <div className="row">
            <div className="col-md-12 mt-4">
                <Search onSearch={onSearch} className="search" size="large" placeholder={`Seacrh on ${searchEngineName}`} />
                <Radio.Group onChange={onChange} defaultValue={searchEngine} className="mt-3 float-end">
                    <Radio value={1}>Google</Radio>
                    <Radio value={2}>Stackoverflow</Radio>
                </Radio.Group>
            </div>
        </div>
    )
}
export default SearchBar