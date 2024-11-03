import './App.css'

async function getResponse(userMessage) {
  try {
    const ENDPOINT = 'http://localhost:4000/chat' 
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userMessage}) // sends userMessage to the backend
    })
    if (!response.ok) {
      throw new Error('Oops, something went wrong!')
    }
    const {message} = await response.json() 
    return message
  } catch (error) {
    console.error(error)
    return "Oops, something went wrong!"
  }
}

async function onSubmit(event) {
  event.preventDefault() // prevents refresh of page
  const formData = new FormData(event.target)
  const userMessage = formData.get('user-input')
  if (!userMessage) return 
  const response = await getResponse(userMessage) // call the above function

  const responsePara = document.createElement('p')
  responsePara.className = 'chatbot-response'
  responsePara.textContent = response

  const userPara = document.createElement('p')
  userPara.className = 'user-message'
  userPara.textContent = userMessage

  const chatDiv = document.querySelector('#chat')
  chatDiv.appendChild(userPara)
  chatDiv.appendChild(responsePara)
}

function App() {

  return (
    <div id="chat">
      <h1>BostonHacks 2024 Workshop</h1>
      <form onSubmit={onSubmit}>
        <h2>Ask Me A Question</h2>
        <input type="text" name='user-input' id="question-input" placeholder="What would you like to ask?" />
        <button type="submit">Submit</button>
      </form>
      {/* Chatbot messages will be displayed in a <p> tag here */}
    </div>
  )
}

export default App
