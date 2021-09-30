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
import News from './components/news';
import Window from './components/misc/window';
import Github from './components/misc/github';
import Todo from './components/todo';
import 'simplebar/dist/simplebar.min.css';

const { TabPane } = Tabs;


const App = () => {
  return (
    <AppProvider>
      <div className="App container">
        <InfoBar />
        <Search />
        <div className="row">
          <Window size="col-md-3">
            <History />
          </Window>
          <Window size="col-md-9">
            <Tabs className="card p-4" defaultActiveKey="1" >
              <TabPane tab="Javascript sandbox" key="1">
                <Sandbox />
              </TabPane>
              <TabPane tab="Github" key="2">
                <Github />
              </TabPane>
              <TabPane tab="Lighthouse" key="3">
                <LightHouse />
              </TabPane>
              <TabPane tab="Notes" key="4">
                <Editor />
              </TabPane>
              <TabPane tab="Todo" key="5">
                <Todo />
              </TabPane>
            </Tabs>
          </Window>
        </div>
        <div className="row mb-5">
        <Window size="col-md-12 mt-4 mb-5 card p-5">
        <News />

        </Window>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
