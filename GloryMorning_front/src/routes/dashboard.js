// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import SettingBackground  from '../components/Setting/SettingBackground'
import App from '../App'



// <Route exact path = {`${match.url}/notice`} component ={Board}/>
// <Switch>
//     <Route path = {`${match.url}/notice/writePosts`} component ={WriteBoard}/>
//     <Route exact path = {`${match.url}/notice/:postsNumber`} component ={BoardView}/>
// </Switch>
// <Route path = {`${match.url}/notice/editPosts/:editNumber`} component ={EditBoard}/>


const dashboardRoutes = [
 
  {
    sideView: true,
    //exact : true,
    path: "/seoPage/",
    sidebarName: "seoPage",
    navbarName: "seoPage",
    icon: Dashboard,
    component: App
  },
  {
    sideView: true,
    //exact : true,
    path: "/setting/",
    sidebarName: "setting",
    navbarName: "setting",
    icon: Dashboard,
    component: SettingBackground
  },
 




  //{ redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
