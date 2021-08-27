import './grid.css';
import 'antd/dist/antd.css';
import './App.css';
import "easymde/dist/easymde.min.css";
import { Tabs } from 'antd';
import { AppProvider } from './components/context/appContext';
import Search from './components/search';
import InfoBar from './components/infoBar'
import History from './components/history';
import Editor from './components/editor'
import LightHouse from './components/lighthouseWrapper';
import Sandbox from './components/sandbox'
const { TabPane } = Tabs;

const App = () => {
  return (
    <AppProvider>
      <div className="App container">
        <InfoBar />
        <Search />
        <div className="row">
          <History />
          <div className="col-md-8  mt-4">
            <Tabs className="card p-4" defaultActiveKey="1" >
              <TabPane tab="Javascript sandbox" key="1">
                <Sandbox />
              </TabPane>
              <TabPane tab="Lighthouse" key="3">
                <LightHouse />
              </TabPane>
              <TabPane tab="Notes" key="2">
                <Editor />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
