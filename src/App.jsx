import { useEffect, useState } from "react";
function App(){
    const obj={
        name:"",
        email:""
    };
    const[data,setdata]=useState(obj);
    const[activity,setactivity]=useState([]);
    useEffect(()=>{
        const result=localStorage.getItem("contacts");
        const result2=JSON.parse(result);
        setactivity(result2 || []);
    },[]);
    useEffect(()=>{
        localStorage.setItem("contacts",JSON.stringify(activity));
    },[activity]);
    function handleclick(){
        if(data.name===""||data.email===""){
            alert("enter fields");
        }
        else{
            setactivity(()=>{
                const result=([...activity,data]);
                console.log(result);
                setdata(obj);
                return result;
            });
        }
    }
    function handlechange(e){
        setdata(()=>{
            const result=({...data,[e.target.name]:e.target.value});
            return result;
        })
    }
    function remove(email){
        setactivity(()=>{
            const result=activity.filter((val,i)=>{
                return val.email!==email;
            })
            return result;
        })
    }
    function removetask(){
        setactivity([]);
    }
    return(
        <div>
            <h1>contact manager</h1>
            <input type="text" placeholder="name" name="name" value={data.name} onChange={handlechange}/>
            <input type="email" placeholder="email" name="email" value={data.email} onChange={handlechange}/>
            <button onClick={handleclick}>add</button>
            {activity && activity.map((val,index)=>{
                return(
                    <div key={val.email}>
                        {val.name}-{val.email}
                        <button onClick={()=>remove(val.email)}>remove</button>
                    </div>
                )
            })}
            {activity.length>=1 && <button onClick={removetask}>removeall</button>}
        </div>
    )
}
export default App;