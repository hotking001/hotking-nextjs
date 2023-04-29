import axios from 'axios';
import { useState } from 'react'

export default function Home({data}) {

  const [src, setSrc] = useState("");
  const [popup, setPopup] = useState(false)

  const datas = [...data.data.attributes.media.data,...data.data.attributes.links].map(item => ({
  title: item.attributes ? item.attributes.name : item.title,
  src: item.attributes ? item.attributes.url : item.link,
  poster: item.thumb ?  item.thumb : item.attributes.url
  }))

  //const datas = [{
   // title: "hi",
   // src: : "https://hotking.s3.ap-south-1.amazonaws.com/Two_Indian_Lesbian_G_amster_3_75d7b3dc0c.mp4"
  //}]
  // console.log([...data.data.attributes.media.data,...data.data.attributes.links].map(item => ({
  //  title: `${item.title ? item.title : item.attributes.name}`,
  //  src: `${item.link ? item.link : item.attributes.url}`,
  // })))
  console.log(datas)
  return (
    <>
    
    {popup ? (
      <div className="main-video" style={{ backgroundImage: `url(${data.data.attributes.images.data[1].attributes.url})`}}>
        <div style={{textAlign:"end", width: "80%"}}>
          <div onClick={() => {
            setPopup(false);
            setSrc("")
          }}>X</div>
          </div>
        <video src={src} muted controls autoplay></video>
      </div>
    ) : (
      <div className="container" style={{ backgroundImage: `url(${data.data.attributes.images.data[0].attributes.url})`}}>
      <div className="videos">
        {datas.map(item => (
          // eslint-disable-next-line react/jsx-key
          <div style={{width: "30%", height: "40%", margin:"30px 0"}}>
          <video className='video-play' poster={item.poster} style={{width: "100%", height: "100%"}} src={item.src} muted preload='none' onClick={() => {
            setSrc(item.src);
            setPopup(true)
          }}></video>
          <h4 style={{margin:"0"}}>{item.title}</h4>
          </div>
          
        ))}
      </div>
    </div>
    )}
    </>
    
  )
}


export async function getServerSideProps() {
  const awardsrequest = await axios.get('https://hotking.herokuapp.com/api/home?populate=*');
  // const awardsrequest = await axios.get('http://localhost:1337/awds');

  return {
    props: {
      data: awardsrequest.data
    }
  };
}