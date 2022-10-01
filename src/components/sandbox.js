import { useApp } from './context/appContext';

const Sandbox = () => {
  const { theme } = useApp();
  return <iframe style={{ minHeight: 600, width: '100%' }} src={`sandbox.html?theme=${theme}`} />;
};

export default Sandbox;
