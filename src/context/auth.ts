// Hay que implementar algo así para poder navegar rutas y validar usuarios

// import { createContext,useState,useEffect } from 'react'
// import jwt_decode from 'jwt-decode';
// import { useNavigate } from "react-router-dom";
// import { errorAnimation } from "./../pages/login/page/LoginScreenTemp";
// const AuthContext = createContext()

// export default AuthContext;


// export const AuthProvider = ({children}) => { //Children Wrapea a todos los componentes childern que haya en este componenete
    
//       // Declare a state variable  with an initial value of null
    
//       let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
//       let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
//       let [loading, setLoading] = useState(true)

//     const navigate = useNavigate(); 


//     function errorAnimation(errorMessage) {
//         let inputsCont = document.querySelectorAll(".input-text")
//         inputsCont.forEach(inputCont => {
//             inputCont.classList.add("red-border")
//         })

//         let errorCont = document.getElementsByClassName("error-container")[0]
//         let errorText = document.getElementsByClassName("error-text")[0]
//         errorText.innerHTML = errorMessage

//         errorCont.style.bottom = "27.5px"
//         setTimeout(() => {
//             errorCont.style.bottom = "0"
//             inputsCont.forEach(inputCont => {
//                 inputCont.classList.remove("red-border")
//             })
//         }, 2500);
//     }


//     let loginUser = async (e ) =>{
//         e.preventDefault()            

//         let response = await fetch('https://darthpedro.pythonanywhere.com/token/',{
//         method: 'POST',
//         headers: {
//                'Content-Type': 'application/json'
//             },
//             body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
//         })

//         let data = await response.json()

        
//         if (response.status === 200){ //Si la response es valida basicamente
//             setAuthTokens(data)
//             setUser(jwt_decode(data.access))
//             localStorage.setItem('authTokens', JSON.stringify(data))
//             navigate('/submit')

//         }else{
//             errorAnimation("Error")
//         } 
//     }

    

//     let registerUser = async (e) => {
//         e.preventDefault();



//         let response = await fetch('https://darthpedro.pythonanywhere.com/create/',{
//             method: 'POST',
//             headers: {
//                    'Content-Type': 'application/json'
//                 },
//                 body:JSON.stringify({'username':e.target.username.value,'email':e.target.email.value, 'password':e.target.password.value})
//             });

//         let anotherResponse = await fetch('https://darthpedro.pythonanywhere.com/token/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ 'username':  e.target.username.value, 'password': e.target.password.value }),
//         });
      
       
      
//         if (anotherResponse.status === 200) {
//           let data = await anotherResponse.json();
//           setAuthTokens(data);
//           setUser(jwt_decode(data.access));
//           localStorage.setItem('authTokens', JSON.stringify(data));
//           navigate('/submit');
//         } else {
//           errorAnimation('Error');
//         }
//       };

//     let logoutUser = () => {
//         setAuthTokens(null)
//         setUser(null)
//         localStorage.removeItem('authTokens')
//     }

//     let updateToken = async ()=> {

//         let response = await fetch('https://darthpedro.pythonanywhere.com/token/refresh/', {
//             method:'POST',
//             headers:{
//                 'Content-Type':'application/json'
//             },
//             body:JSON.stringify({'refresh':authTokens?.refresh})
            
//         },
        
        
//         )
//         let data = await response.json()
        
//         if (response.status === 200){
//             setAuthTokens(data)
//             setUser(jwt_decode(data.access))
//             localStorage.setItem('authTokens', JSON.stringify(data))
//           //  console.log("Updating")
//         }else if (response.status === 401){
//            // console.log("Not Auth")
//         }else{
//             logoutUser()
//         }

//         if(loading){
//             setLoading(false) //Agregar esto
//         }
//     }
    
//     let contextData = {
//         user:user,
//         loginUser:loginUser,
//         logoutUser:logoutUser,
//         registerUser: registerUser,
        
//     }

//     useEffect(()=> {

//         if(loading){
//             updateToken()
//         }

//         let fourMinutes = 1000 * 60 * 4 

//         let interval =  setInterval(()=> {
//             if(authTokens){
//                 updateToken()
//             }
//         }, fourMinutes)
//         return ()=> clearInterval(interval)

//     }, [authTokens, loading])
        
//     return(
//         <AuthContext.Provider value={contextData} >
//             {children}
//         </AuthContext.Provider>
//     )
// }