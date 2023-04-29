// import axios from 'axios';
import { useEffect, useState } from 'react';
import VideoContainer from '../components/VideoContainer';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/firebase-config";
import Seo from '../components/Seo';

export default function Home() {

  // const datas = [...links.data.attributes.links].map(item => ({
  //   title: item.title,
  //   src: item.link,
  //   poster: item.poster.data?.attributes.formats.small.url
  // }))

  const [data, setData] = useState('')
  const [arr, setArr] = useState('')
  const [types, setTypes] = useState('')
  const [currentType, setCurrentType] = useState("Hot")

  useEffect(() => {
    const getObject = async () => {
      const type = collection(db, 'category')
      getDocs(type).then(res => setTypes(res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))

      const het = collection(db, 'videos')
      getDocs(het).then(res => {
        setData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        setArr(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })

    }

    getObject()

  }, [])

  const seoContent = {
    metaTitle: "Hot King - No.1 Porn Site For Adult's Hot Sex Videos",
    metaDescription:
      "Hot | Sexy | Hot & Sex",
    shareImage: ``
  };

  const onChangeHandler = e => {
    setCurrentType(e.target.value)
    setArr(data.filter(item => item.type === e.target.value))
  }


  return (
    <>
      <Seo seo={seoContent} />

      <div style={{ background: "#000000" }}>
        <h1 onClick={() => window.open("/upload")}>🩲👙🩱Hot🔥King🩱👙🩲</h1>
        <div className='text-center m-5' style={{color: "white"}}>
          <label for="type" className='mr-3'>Choose a Type: </label>
          <select name="type" id="type" onChange={onChangeHandler}>
            {types && types.map(item => (
              <option value={item.item} key={item.id}>{item.item}</option>
            ))}
          </select>
        </div>

        <div className='container1'>
          {arr && arr.map(item => (
            <>
              <VideoContainer data={item} />
              {console.log(item)}
            </>
          ))}
        </div>
      </div>
    </>

  )
}


//export async function getStaticProps() {
//  const links = await axios.get('https://hotking.herokuapp.com/api/home?populate=links.poster');
  // const awardsrequest = await axios.get('http://localhost:1337/awds');

 // return {
 //   props: {
   //   links: links.data
    //}
  //};
//}
