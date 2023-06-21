import express from 'express'
import { python } from 'pythonia'

// make it easier to import local Python modules (optional)
const sys = await python('sys')
await sys.path.insert(0, '.')

const { AutoModelForCausalLM } = await python('ctransformers')
const llm = await AutoModelForCausalLM.from_pretrained$('marella/gpt-2-ggml', { lib: 'avx' })

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

process.on('SIGINT', () => {
  try {
    (python as any).exit()
  } catch (err) {
    // exiting Pythonia can get a bit messy: try/catch or not,
    // you *will* see warnings and tracebacks in the console
  }
  process.exit(0)
})

app.listen(port, () => { console.log(`Open http://localhost:${port}`) })