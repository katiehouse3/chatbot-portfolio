import { createBot } from "botui"
import React, { useEffect } from "react"
import { createRoot } from "react-dom/client"
import { BotUI, BotUIAction, BotUIMessageList } from "@botui/react"
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core'
import axios from 'axios';

import "@botui/react/dist/styles/default.theme.scss"
import './index.css';

const glasses = findIconDefinition({ prefix: 'fas', iconName: 'glasses' })


const mybot = createBot()

const App = () => {
  useEffect(() => {
    mybot.message
      .add({ text: "Hello" })
      .then(() => mybot.wait({ waitTime: 1000 }))
      .then(() => mybot.message.add({ text: "Welcome to my portfolio!" }))
      .then(() => mybot.wait({ waitTime: 500 }))
      .then(() => mybot.message.add({ text: "I am a Data Scientist with experience building end-to-end machine learning solutions in generative AI, marketing funnel optimization, advisor success and more. What would you like to learn about me?" }))
      .then(() => mybot.wait({ waitTime: 500 }))
      .then(() =>
        mybot.action.set({ placeholder: 'Ask me anything' },
          {
            actionType: 'input',
            confirmButtonText: "send"
          },
        )
      )
      .then((data) => mybot.wait({ waitTime: 500 }, data))
      .then(function (data) {
        mybot.message.add({ text: `${data.text}` }, data)
        axios.post('http://localhost:8000/api/usermessages/', {
          message: `${data.text}`
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
      }
      )


  }, [])

  return (
    <div>
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