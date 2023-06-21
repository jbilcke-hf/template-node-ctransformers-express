import express from 'express'
import { python } from 'pythonia'

const { AutoModelForCausalLM } = await python('ctransformers')
const llm = await AutoModelForCausalLM.from_pretrained('marella/gpt-2-ggml')

const app = express()
const port = 7860

app.get('/', async (req, res) => {
  const prompt = '<html><head><title>My Favorite Cookie Recipe</title></head><body><div><p>'
  res.write(prompt)
  const raw = await llm(prompt)
  const output = raw.split('</html>')
  res.write(output + '</html>')
  res.end()
})

app.listen(port, () => { console.log(`Open http://localhost:${port}`) })