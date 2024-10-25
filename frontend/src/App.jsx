import './App.css'

function App() {
  return (
    <div id="chat">
      <h1>BostonHacks Fall 2024</h1>
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
