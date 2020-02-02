import React, { Component } from 'react';
import api from '../../services/api'
import DropZone from 'react-dropzone'
import socket from 'socket.io-client'

import { MdInsertDriveFile } from 'react-icons/md'
import './styles.css';

export default class Box extends Component {
  state = { box: {} }

  async componentDidMount () {
    this.subscribeToNewFiles()

    const box = this.props.match.params.id
    const res = await api.get(`boxes/${box}`)

    this.setState({ box: res.data })
  }

  subscribeToNewFiles = () => {
      const box = this.props.match.params.id
      const io = socket('https://deev-box.herokuapp.com')

      io.emit('connectRoom', box)

      io.on('file', data => {
          this.setState({ box: { ...this.state.box, files: [data, ...this.state.box.files] } })
      })
  }

  handleUpload = (files) => {
    files.forEach(file => {
        const data = new FormData()
        const box = this.props.match.params.id

        data.append('file', file)

        api.post(`boxes/${box}/files`, data)
    })
  }

  render() {
    return (
        <div id="box-container">
            <header>
              <h1>{this.state.box.title}</h1>
            </header>

            <DropZone onDropAccepted={this.handleUpload}>
              {({ getRootProps, getInputProps }) => (
                <div className="upload" {...getRootProps()}>
                    <input {...getInputProps()}/>

                    <p>Arraste um arquivo, ou clique aqui</p>
                </div>
              )}
            </DropZone>

            <ul>
                { this.state.box.files && this.state.box.files.map(file => (
                  <li key={file._id}>
                    <a className="fileInfo" href={file.url} target="_blank">
                      <MdInsertDriveFile size={24} color="#a5cfff" />
                      <strong>{file.title}</strong>
                    </a>

                    <span>{file.createdAt}</span>
                  </li>
                )) }
            </ul>
        </div>
    )
  }
}
