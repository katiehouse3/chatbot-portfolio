import React, { useEffect } from "react"
import { createRoot } from "react-dom/client"
import { BotUI, BotUIAction, BotUIMessageList } from "@botui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { createBot } from "botui"
import Navbar from "./navbar.js"

import axios from 'axios';

import "@botui/react/dist/styles/default.theme.scss"
import './index.css';


const airplane = <FontAwesomeIcon icon={faPaperPlane} />

const mybot = createBot()

function getResponse(data) {
  mybot.wait()
  axios.post('http://localhost:8000/api/botmessages/', { query: data.text })
    .then(function (response) {
      console.log(response.data.response)
      mybot.next()
      mybot.message.add({ text: `${response.data.response}` }, data)
      chatbotLoop();
    })
    .catch(function (error) {
      console.log(error);
    })
}

function chatbotLoop() {
  mybot.action.set({ placeholder: 'Type \'example\' for sample questions or ask me anything' },
    {
      actionType: 'input',
      confirmButtonText: airplane
    },
  )
    .then(function (data) {
      var data;
      if (data.text.toLowerCase() == 'example') {
        mybot.action.set(
          {
            options: [
              { label: 'What are some of Katie\'s skills?', value: 'What are some of Katie\'s skills?' },
              { label: 'How much value has Katie generated at MassMutual?', value: 'How much value has Katie generated at MassMutual?' },
            ],
          },
          {
            actionType: 'select',
            confirmButtonText: airplane
          }
        ).then((data) => getResponse(data))
      } else {
        // Code to execute if the condition is false
        getResponse(data)
      }
    })
}

const runBot = () => {
  mybot.message
    .add({ text: "Hello 👋" })
    .then(() => mybot.wait({ waitTime: 1000 }))
    .then(() => mybot.message.add({ text: "Welcome to my portfolio! I am a Data Scientist with experience building end-to-end machine learning solutions in generative AI, marketing funnel optimization, advisor success and more." }))
    .then(() => mybot.wait({ waitTime: 500 }))
    .then(() => mybot.message.add({ text: "I built this AI chatbot to answer questions about my experience." }))
    .then(() => mybot.wait({ waitTime: 500 }))
    .then(() => chatbotLoop(mybot))
}

const App = () => {


  useEffect(() => {
    runBot(mybot)
  })

  return (
    <div>
      <Navbar />
      <BotUI bot={mybot}>
        <BotUIMessageList />
        <BotUIAction />
      </BotUI>
    </div>
  )
}

const containerElement = document.getElementById("botui")
if (containerElement) {
  const root = createRoot(containerElement)
  root.render(<App />)
}