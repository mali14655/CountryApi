import { useRef, useState } from "react"
import axios from 'axios'

function Country(){
    // const[mydata,setdata]=useState('')
    const[name,setname]=useState('pakistan')
    const[flag1,setflag]=useState('')
    const[nameapi,setnameapi]=useState('')
    const[currencie,setcurrencie]=useState('')
    const[symbol,setsymbol]=useState('')
    const[population,setpopulation]=useState('')
    const[language,setlanguage]=useState([])
    const reference=useRef(null);

    let gitcountry=(e)=>{
        if(name){
        e.preventDefault();
        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then(function(response){
            // console.log(response.data[0])
            let newdata=response.data[0]
            console.log(newdata)
            let languag=(newdata.languages)
            // console.log(languag);
            let langarray=[];
            for(const key in languag){
                // console.log(languag[key])
                langarray.push(languag[key])
            };
            setlanguage(langarray)
            // console.log(langarray)



            let mycurr=[];
            // console.log(newdata.currencies)
            for(const key in newdata.currencies){
                // console.log(newdata.currencies[key])
                mycurr.push(newdata.currencies)

            }
            console.log(mycurr[0])
            // let newmycurr=mycurr.map((value)=>(value));
            // console.log(newmycurr);
            for(const key in mycurr[0]){
                // newcurr.push(mycurr[0][key])
                setcurrencie(mycurr[0][key].name)
                setsymbol(mycurr[0][key].symbol)
            }

            // for(const key in newcurr){
            //     console.log(newcurr.name)
            // }

            // setdata(newdata);
            setflag(newdata.flags.png)
            setnameapi(newdata.name.official)
            setpopulation(newdata.population)
            // console.log(mydata)
            reference.current.value='';
            
        })
        .catch(function(error){
            console.log(error)
        })
    }}

    return(
        <div className="maindiv" >
            <div className="form">
            <form action="" onSubmit={gitcountry}>
                <input placeholder="Enter Country Name" type="text" name="" id="" ref={reference} onChange={(event)=>{
                    setname(event.target.value)
                    console.log(event.target.value)
                }} />
                <button>Enter</button>
            </form>
                    </div>

            <div className="details">
                <img src={flag1} alt="" />
                <p>{nameapi}</p>
                <div>
                <i className="lang fa-solid fa-person"></i>&ensp;
                <span className="lang">{`${population} People`}</span>
                </div>
                {
                    language.map((value,index)=>(
                        <div key={index}>
                            <i className="lang fa-solid fa-head-side-cough"></i>
                            &ensp;
                            <span className="lang">{value}</span>

                        </div>
                    ))
                }
                <span className="lang">{`${currencie} ( ${symbol} )`}</span>
                {/* <h2>{symbol}</h2> */}
            </div>


        </div>
    )
}

export default Country;