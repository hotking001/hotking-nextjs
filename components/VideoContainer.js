import React, { useState } from 'react'
import Image from 'next/image'
import { FaEdit } from "react-icons/fa";


export default function VideoContainer({ data }) {
    const [play, setPlay] = useState(false)
    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    const onClickHandler = () => {
        window.open(`/upload?id=${data.id}`, "_blank")
    }
    return (
        <div className='video-container'>
            <div className='video-box'>
                

                {play ? (
                    <video width="300px" height='190px' poster={data.imageUrl} controls preload='none'>
                        <source src={data.videoUrl} type="video/mp4" />
                    </video>

                ) : (
                    <div style={{ position: "relative" }}>
                        <div className="span-type">{data.type}</div>
                        <div onClick={() => setPlay(true)} style={{ position: "absolute" }}>
                            <Image
                                src={data.imageUrl}
                                alt="Picture of the author"
                                width={300}
                                height={190}
                                quality={75}
                                priority
                            />
                        </div>
                        <div style={{ position: "absolute", right: "10px", top: "5px" }} className="edit-icon" onClick={onClickHandler}><FaEdit /></div>
                    </div>


                )}

            </div>
            <h4><a href={`/video?src=${data.videoUrl}&poster=${data.imageUrl}`}>{data.title}</a></h4>
        </div>
    )
}
