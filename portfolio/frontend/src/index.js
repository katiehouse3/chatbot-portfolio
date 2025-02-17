import React, { useEffect } from "react"
import { createRoot } from "react-dom/client"
import { BotUI, BotUIAction, BotUIMessageList } from "@botui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { createBot } from "botui"
import Markdown from 'react-markdown';
import Navbar from "./navbar.js"
import axios from 'axios';

import "@botui/react/dist/styles/default.theme.scss"
import './index.css';


const airplane = <FontAwesomeIcon icon={faPaperPlane} />

const mybot = createBot()

function getResponse(data) {
  mybot.wait()
  console.log(data.text.length)
  if (data.text.length < 2 || /^\d+$/.test(data.text)) {
    mybot.message.add({ text: "Please enter at least 2 characters and include non-numeric values." }, data)
    chatbotLoop()
    return
  }
  if (/[\{\}\[\]\(\)\<\>\=\&]/.test(data.text)) {
    mybot.message.add({ text: "Code snippets are not allowed. Please enter a valid query." }, data)
    chatbotLoop()
    return
  }
  axios.post('http://localhost:8000/api/botmessages/', { query: data.text })
    .then(function (response) {
      const response_text=response.data.response.toString();
      const response_converted = <Markdown>{response_text}</Markdown>;
      mybot.next()
      mybot.message.add({ text: response_converted }, data)
      chatbotLoop();
    })
    .catch(function (error) {
      console.log(error);
    })
}

function chatBotExample(){
  mybot.action.set(
    {
      options: [
        { label: 'What are some of Katie\'s skills?', value: 'What are some of Katie\'s skills?' },
        { label: 'How much value has Katie generated at MassMutual?', value: 'How much value has Katie generated at MassMutual?' },
        { label: 'What programming languages does Katie know?', value: 'What programming languages does Katie know?' },
        { label: 'What are some of Katie\'s extracurriculars?', value: 'What are some of Katie\'s extracurriculars?' },
      ],
    },
    {
      actionType: 'select',
      confirmButtonText: airplane
    }
  ).then((data) => getResponse(data))
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
        chatBotExample()
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
    .then(() => mybot.message.add({ text: <Markdown>{"Welcome to my portfolio! I am a **Data Scientist** with experience building **end-to-end machine learning solutions** in generative AI, marketing funnel optimization, advisor success and more. I built this **AI chatbot** to answer questions about my experience." }</Markdown>}))
    .then(() => mybot.wait({ waitTime: 500 }))
    .then(() => mybot.message.add({ text: <Markdown>{"Everything is logged in a database. **Do not submit personal information in queries.** Try an **example question** to get started:"}</Markdown>}))
    .then(() => mybot.wait({ waitTime: 500 }))
    .then(() => chatBotExample(mybot))
}

const App = () => {


  useEffect(() => {
    runBot(mybot)
  })

  return (
    <div>
      <Navbar />
      <div className="div-line"> <hr /> </div>
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