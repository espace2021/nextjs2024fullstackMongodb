'use client'
import React, { useState, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import axios from 'axios';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function PageUploadImages() {
  const [img, setImg] = useState(null);
  const [files, setFiles] = useState([]);
  const [model, setModel] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    async function loadModel() {
      console.log("Model loading...");
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
      setModelLoaded(true);
      console.log("Model loaded.");
    }
    loadModel();
  }, []);

  const serverOptions = () => {
    return {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        const data = new FormData();

        data.append('file', file);
        data.append('upload_preset', 'Ecommerce_cloudinary');
        data.append('cloud_name', 'iset-sfax');
        data.append('public_id', file.name);

        axios.post('https://api.cloudinary.com/v1_1/iset-sfax/image/upload', data)
          .then((response) => response.data)
          .then((data) => {
            setImg(data.url);
            if (modelLoaded) {
              classifyImage(file); // Pass the file directly here
            } else {
              console.error('Model not loaded yet.');
            }
            load(data);
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
            error('Upload failed');
            abort();
          });
      },
    };
  };

  async function classifyImage(file) {
    if (!modelLoaded) {
      console.error('Model not loaded yet.');
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;

    img.onload = async () => {
      const predictions = await model.classify(img);
      document.getElementById("prediction").innerHTML =
        `Predicted:<br /> ${predictions.map(p => `${p.className}: ${p.probability.toFixed(2)}`).join("<br />")}`;
      URL.revokeObjectURL(url); // Clean up the object URL after using it
    };
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '4em' }}>
      <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
      { modelLoaded ?
      <FilePond
      files={files}
      acceptedFileTypes="image/*"
      onupdatefiles={setFiles}
      allowMultiple={false}
      server={serverOptions()}
      name="file"
    />
     : "Loading Model please wait ..."}  
      </div>
      <br />
      <div>
        <p id="prediction"></p>
      </div>
    </div>
  );
}
