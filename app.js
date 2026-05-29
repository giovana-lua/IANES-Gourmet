const express = require('express')
const cors = require('cors')
const bodyParser = require ('body-parser')

//cria um objeto especialista no formato JSON paa receber os dados do body (post e put)
const bodyParserJSON = bodyParser.json()

//cria o objeto app para criar a api
const app = express()

const PORT = process.PORT || 8080

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()

})

const controllerDoce = require('./controller/controller_doce.js')

//Retorna uma lista de doces 
app.get('/v1/doceria/doce', cors(), async function (request, response) {

    let doce = await controllerDoce.listarDoces()

    console.log(doce)

    response.status(doce.status_code)
    response.json(doce)
})

app.listen(PORT, function() {
    console.log('API aguardando resposta...')
})


app.get('/v1/doceria/doce/:id', cors(), async function (request, response) {

    //Recebe o id enviado na requisição via parametro 
    let doceId = request.params.id

    //chama a fun'ão da controller para retornar o doce pelo id
    let doce = controllerDoce.buscarDoceId(doceId)

    response.status(doce.status_code)
    response.json(doce)
})