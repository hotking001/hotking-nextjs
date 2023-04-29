import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';

export default function video({src, poster}) {
    
    return (
        <div className='video-page'>
            <video width="100%" poster={poster} controls preload='none'>
                <source src={src} type="video/mp4" />
            </video>
        </div>
    )
}

export async function getServerSideProps(context) {
    // const awardsrequest = await axios.get('https://hotking.herokuapp.com/api/home?populate=*');
    // const awardsrequest = await axios.get('http://localhost:1337/awds');

    console.log(context)
  
    return {
      props: {
        src: context.query.src,
        poster: context.query.poster
      }
    };
  }
