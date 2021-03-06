import React, { useState, useEffect } from 'react';
import config from '../config'
const { useMutation, useQuery } = require('@apollo/react-hooks');
const gql = require('graphql-tag');

function Upload() {

    const MUTATION = gql`
        mutation($file: Upload!, $url: String!) {
            email{
            upload(file: $file, url: $url) {
                id
                object
                accountId
                contentType
                size
                filename
            }
            }
        }
    `;

    const QUERY = gql`
        query{
            email{
         		labels{
               id
               name
               accountID
               displayName
             }
           }
        }
    `;

    const [selectedFile, uploadFile] = useState(null)
    const [uploadedFile, setUploadFile] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const [uploadFileList, { data, error, loading }] = useMutation(MUTATION);
    const { data: labels, error: labelError, loading: labelLoading } = useQuery(QUERY);

    function resolveImageUploadUrl(ID = 1) {
        return `${config.BASE_PATH}/email/${ID}/images`;
    }

    async function onFileChange({
        target: {
            validity,
            files: [file],
        },
    }) {

        const formData = new FormData();
        formData.append(file.name, file);

        const response = await fetch(resolveImageUploadUrl(), {
            method: 'POST',
            headers: {
                authorization: config.TOKEN || '',
            },
            body: formData,
        });
        let Result = await response.json()
        console.log('response::::::::::::::::;', Result)
        const { data } = Result

        if (data) {
            console.log('innnnnn::::::::::', data)
            await uploadFileList({ variables: { file, url: data.key } })
        } else {
            console.log('errorr::::::::::;')
        }

    }

    useEffect(() => {
        if (loading) {
            setLoading(true)
        }
        if (error) {
            setLoading(false)
            console.log()
        }
        if (data) {
            setLoading(false)
            setUploadFile(data.email.upload)
        }
    }, [error, data, loading]);


    useEffect(() => {
        if (labelLoading) {
            console.log('loading')
        }
        if (labelError) {
            console.log('labelError')
        }
        if (labels) {
            console.log('labels', labels)
        }
    }, [labels, labelError, labelLoading]);

    const fileData = () => {

        if (selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {selectedFile[0].name}</p>
                    <p>File Type: {selectedFile[0].type}</p>
                    <p>
                        Last Modified:{" "}
                        {selectedFile[0].lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    const uploadFileData = () => {

        if (uploadedFile !== null) {

            return (
                <div style={{ marginTop: 50 }}>
                    <h2>Uploaded File Details:</h2>
                    <p>File Id: {uploadedFile.id}</p>
                    <p>File Object Type: {uploadedFile.object}</p>
                    <p>File Account ID: {uploadedFile.accountId}</p>
                    <p>File Content Type: {uploadedFile.contentType}</p>
                    <p>File Size: {uploadedFile.size}</p>
                    <p>File Name: {uploadedFile.filename}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        {isLoading ?
                            <div style={{ color: 'tomato' }}>Loading....</div>
                            :
                            <h4>uploaded details will be displayed here after uploading!!</h4>
                        }
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <h1>
                        File Upload
                    </h1>
                    <div>
                        <input type="file" onChange={onFileChange} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ margin: 25 }}>{fileData()}</div>
                        <div style={{ margin: 25 }}>{uploadFileData()}</div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Upload;
