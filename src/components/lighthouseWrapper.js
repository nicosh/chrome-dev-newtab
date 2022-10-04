/* eslint-disable no-undef */
/* see https://github.com/GoogleChrome/lighthouse/blob/master/clients/extension/scripts/popup.js */
import React, { useState } from 'react';
import { Input, Radio, message, Checkbox } from 'antd';
const { Search } = Input;

const VIEWER_URL = 'https://googlechrome.github.io/lighthouse/viewer/';
const avaibleCategories = ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'];

const LightHouse = () => {
  const [strategy, setStrategy] = useState('mobile'); // or desktop
  const [selectedCategories, setSelectedCategories] = useState(avaibleCategories);
  const [reportUrl, setReportUrl] = useState(false);
  const generateReportUrl = (url) => {
    if (isValidURL(url)) {
      const apiUrl = new URL(VIEWER_URL);
      apiUrl.searchParams.append('psiurl', url);
      apiUrl.searchParams.append('strategy', strategy);
      for (const category of selectedCategories) {
        apiUrl.searchParams.append('category', category);
      }
      apiUrl.searchParams.append('utm_source', 'lh-chrome-ext');
      setReportUrl(apiUrl.href);
    } else {
      message.error('Invalid url');
    }
  };

  const isValidURL = (str) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(str);
  };

  const onStrategyChange = (e) => {
    setStrategy(e.target.value);
  };

  const onCategoriesChange = (e) => {
    setSelectedCategories(e);
  };

  return (
    <div className='row'>
      <div className='col-md-12 p-5'>
        <Search onSearch={generateReportUrl} className='search' size='large' placeholder='Url' />
        <Radio.Group
          style={{ width: '100%', textAlign: 'right' }}
          onChange={onStrategyChange}
          defaultValue={strategy}
          className='mt-3 float-end'
        >
          <Radio value={'mobile'}>Mobile</Radio>
          <Radio value={'desktop'}>Desktop</Radio>
        </Radio.Group>
        <Checkbox.Group
          onChange={onCategoriesChange}
          style={{ width: '100%', textAlign: 'right' }}
          options={avaibleCategories}
          defaultValue={avaibleCategories}
          className='mt-3 float-end'
        />
      </div>
      <div className='col-md-12'>
        {reportUrl && <iframe title='lighthouse' style={{ width: '100%', height: 500 }} src={reportUrl}></iframe>}
      </div>
    </div>
  );
};

export default LightHouse;
