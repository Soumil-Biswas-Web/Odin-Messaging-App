import Header from "./Content/Header/Header"
import Footer from "./Content/Footer/Footer"
import { Outlet, useLocation } from "react-router-dom"
import { Flash } from "./Content/Components/Flash"
import ContactList from "./Content/ContactList/ContactList"
import { useSelector } from "react-redux"

function App() {

  const user = useSelector((state) => state.userReducer);
  // console.log(user)

  const location = useLocation();
  return (
    <div className="bg-background-color-offset flex flex-col items-center min-h-screen justify-between transition-theme inset-10">
      <Header/>
      <Flash/>
      <div className={`flex w-full flex-1`}>
        <div className={`sm:min-w-[200px] w-full sm:w-1/3 ${(location.pathname != "/")? 
          (user.username) ? "hidden sm:flex" : "hidden"          
          :
          (user.username) ? "flex" : "flex sm:hidden"
        }`}>
          {/* {user.username &&  <ContactList/>} */}
          <ContactList/>
        </div>
        <div className={`${(location.pathname == "/")? "hidden sm:block" : "block"} w-full sm:border-l-2 border-slate-500`}>
          <Outlet/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default App
