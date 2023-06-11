
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import TemporaryDrawer from './Components/LeftDrower';
import './css/App.css';
import ReviewForm from './Components/Form/ReviewForm'
function App() {

  return (
    <Box>
      <TemporaryDrawer/>
    <div className="App">
      <ReviewForm></ReviewForm>
    </div>
    
    </Box>
  );
}

export default App;
