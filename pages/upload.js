import Head from 'next/head'
import styles from '../styles/Home.module.css';
import { Line } from 'rc-progress';
import { db } from "../components/firebase-config";
import { collection, getDocs, getDoc, addDoc, updateDoc, doc } from "firebase/firestore";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3'
import links from '../components/data.json';


export default function Home() {
    const datas = [...links.data.attributes.links].map(item => ({
        title: item.title,
        src: item.link,
        poster: item.poster.data?.attributes.formats.small.url
    }))


    const collectionRef = collection(db, 'videos');

    // const test =() =>{
    // datas.forEach(item => {
    //     addDoc(collectionRef, {
    //         title : item.title,
    //         videoUrl: item.src,
    //         imageUrl: item.poster ? item.poster : "https://hotking.s3.ap-south-1.amazonaws.com/small_best_sexe_girls_hd_wallpaper_5_7cd0ba9545.jpg?w=384&q=75",
    //         type: "Hot"
    //     })
    //         .then(res => console.log(res))  
    // })
    // }

    const [title, setTitle] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [type, setType] = useState('');
    const [types, setTypes] = useState('')
    const [addType, setAddType] = useState(false)
    const [newType, setNewType] = useState('')



    const router = useRouter();

    const s3 = new S3({
        accessKeyId: 'AKIA6IKDPNWEYKRFPW6U',
        secretAccessKey: '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',
        region: 'ap-south-1'
    });

    const s3Url = 'https://hotking.s3.ap-south-1.amazonaws.com';

    const [fileToUpload, setFileToUpload] = useState('')
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const getObject = async () => {

            const snap = await getDoc(doc(db, 'videos', `${router.query.id}`))
            if (snap) {
                setTitle(snap.data().title);
                setVideoUrl(snap.data().videoUrl);
                setImageUrl(snap.data().imageUrl);
                setType(snap.data().type);
            }
        }
        router.query.id ? getObject() : null;
        const getType = () => {
            const het = collection(db, 'category')
            getDocs(het).then(res => setTypes(res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
        }
        getType();
    }, [router.query.id])

    const handleSubmitFirebase = async (event) => {
        event.preventDefault();

        addDoc(collectionRef, {
            title,
            videoUrl,
            imageUrl,
            type
        })
            .then(res => {
                console.log(res)
                setTitle("");
                setVideoUrl("");
                setImageUrl("");
                setType("");
            })
    }

    const handleUpdateFirebase = async (e) => {
        e.preventDefault()

        const update = doc(db, 'videos', router.query.id)
        updateDoc(update, {
            title: title,
            videoUrl: `${videoUrl}`,
            imageUrl: `${imageUrl}`,
            type: `${type}`
        }).then(res => {
            console.log(res);
            setTitle("");
            setVideoUrl("");
            setImageUrl("");
            setType("");
        })
    }

    const handleFile = async (event) => {
        setFileToUpload(event.target.files[0]);
        setIsUploading(false)
    }

    const handleSubmitS3 = async (e) => {
        e.preventDefault();
        const file = fileToUpload;
        const fileName = file?.name;
        const fileType = file?.type;

        setIsUploading(true)
        navigator.clipboard.writeText(`${s3Url}/${fileName}`);

        const upload = new ManagedUpload({
            partSize: 10 * 1024 * 1024,
            params: {
                Bucket: 'hotking',
                Key: fileName,
                Body: file,
                ContentType: fileType,
                ACL: 'public-read'
            },
            service: s3
        });

        upload.on('httpUploadProgress', (progress) => {
            setUploadProgress((progress.loaded / progress.total) * 100);
        });

        try {
            await upload.promise();
            console.log(`File uploaded successfully. ${fileName}`);

        } catch (error) {
            console.log(`Error uploading file: ${error}`);
        }
    }

    const onSubmitAddType = (e) => {
        e.preventDefault();
        addDoc(collection(db, 'category'), {
            item: newType
        })
            .then(res => console.log(res))
    }

    return (
        <div className={styles.container}>
            <div className='upload'>
                <form className='form-group' autoComplete="off"
                    onSubmit={handleSubmitS3}>
                    <div className='text-center'>
                        <label><h5>Upload Video or Image</h5></label>
                    </div>
                    <br></br>

                    <div>
                        <input type='file' className='form-control mb-2'
                            onChange={handleFile} accept=".png, .jpg, .jpeg, video/mp4"
                            required />
                    </div>

                    <div className='text-center'>
                        {isUploading ?
                            <>
                                <Line percent={uploadProgress} strokeWidth={2} strokeColor="green" /><span>{String(uploadProgress).slice(0, 5)}%</span>
                            </> :
                            <button type='submit' className='btn btn-success mt-2'>Upload</button>
                        }
                    </div>
                </form>

                <form className='form-group mt-5' autoComplete="off"
                    onSubmit={!router.query.id ? handleSubmitFirebase : handleUpdateFirebase}>
                    <div className='text-center'>
                        <label><h5 >{router.query.action === 'upload' ? "Upload" : "Update"}</h5></label>
                    </div>
                    <br></br>

                    <div>
                        <label>Title</label>
                        <input type="text" className="form-control mb-2"
                            defaultValue={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div>
                        <label>Video URL</label>
                        <input type="text" className="form-control mb-2"
                            defaultValue={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
                    </div>

                    <div>
                        <label>Image URL</label>
                        <input type="text" className="form-control mb-2"
                            defaultValue={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                    </div>

                    <div>
                        <label>Type</label>
                        <div className='d-flex justify-content-center align-items-center'>
                            <select class="form-select" aria-label="Default select example" onChange={(e) => setType(e.target.value)}>
                                <option selected>Select</option>
                                {types && types.map(item => (
                                    <option value={item.item} selected={type === item.item} key={item.id}>{item.item}</option>
                                ))}
                            </select>
                            <div style={{
                                margin: "0 0 3px 5px",
                                fontSize: "20px",
                                cursor: "pointer"
                            }} onClick={() => setAddType(!addType)}>+</div>

                        </div>

                        {addType && (
                            <div>
                                <label>New Type</label>
                                <input type="text" className="form-control mb-2"
                                    value={newType} onChange={(e) => setNewType(e.target.value)} />
                                <button onClick={onSubmitAddType} className="btn btn-success mt-3">Add</button>


                            </div>
                        )}

                    </div>
                    <div className='text-center'>
                        <button type='submit' className='btn btn-success mt-3'>{!router.query.id ? "Upload" : "Update"}</button>
                    </div>
                </form>
            </div>


        </div>
    )
}
