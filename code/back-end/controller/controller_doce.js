/****************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model
 * (validações, tratamento de dados, tratamento de erros, etc)
 * Data: 29/05/2026
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/ 

//import do arquivo DAO para manipular o crud no bd
const doceDAO = require('../model/DAO/doce.js')

const MESSAGE_DEFAULT = require('./modulo/config_messages.js')


const listarDoces = async function () {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))


    try {
        let result = await doceDAO.getSelectAllCandys()

        if(result) {
            if(result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                MESSAGE.HEADER.response.candy = result

                return MESSAGE.HEADER //200
            } else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }

        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarDoceId = async function (id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            //Chamando a função para filtrar pelo ID
            let result = await doceDAO.getSelectByIdCandy(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.candy = result

                    return MESSAGE.HEADER //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND //404 
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] inválido!'
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


const inserirDoce = async function (doce) {
     let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    
    try{
        if(doce.tipo == '' || doce.tipo == undefined || doce.tipo.length > 120 ||
            doce.nome == '' || doce.nome == undefined || doce.nome.length > 120 ||
            doce.massa == '' || doce.massa == undefined || doce.massa.length > 120 ||
            doce.recheio == '' || doce.recheio == undefined || doce.recheio.length > 120 ||
            doce.cobertura == '' || doce.cobertura == undefined || doce.cobertura.length > 120 ||
            doce.qtd == '' || doce.qtd == undefined || isNaN(doce.qtd) ||
            doce.peso == '' || doce.peso == undefined || isNaN(doce.peso) ||
            doce.porcao == '' || doce.porcao == undefined || isNaN(doce.porcao) ||
            doce.preco == '' || doce.preco == undefined || isNaN(doce.preco) ||
            doce.data_validade == '' || doce.data_validade == undefined ){
                
                return MESSAGE.ERROR_REQUIRED_FIELDS

                if(doce.status == '' || doce.status == undefined ||
                    doce.status == 'Disponível'){
                        doce.status = 'Disponivel'
                    }
            }

        let novoDoce = await doceDAO.setInsertCandys(doce)

        if(novoDoce) {
            return MESSAGE.SUCESS_CREATED_ITEM
        }else{
            return {status: 500, message: "Não foi possível cadastrar o doce no banco de dados." }
        }
        } catch (error) {
            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
        }
    }

    const atualizarDoce = async function ( doce, id, contentType) {
        let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
        try{
            if(id == '' || id == undefined || isNaN(id)){
                return MESSAGE.INVALID_ID
            }
            if(doce.tipo == '' || doce.tipo == undefined || doce.tipo.length > 120 ||
            doce.nome == '' || doce.nome == undefined || doce.nome.length > 120 ||
            doce.massa == '' || doce.massa == undefined || doce.massa.length > 120 ||
            doce.recheio == '' || doce.recheio == undefined || doce.recheio.length > 120 ||
            doce.cobertura == '' || doce.cobertura == undefined || doce.cobertura.length > 120 ||
            doce.qtd == '' || doce.qtd == undefined || isNaN(doce.qtd) ||
            doce.peso == '' || doce.peso == undefined || isNaN(doce.peso) ||
            doce.porcao == '' || doce.porcao == undefined || isNaN(doce.porcao) ||
            doce.preco == '' || doce.preco == undefined || isNaN(doce.preco) ||
            doce.data_validade == '' || doce.data_validade == undefined ){

                return {status: false, status_code: 400, message: "Dados atualizados contem campos inválidos!"}
            }
            // Injeta o id da URL para dentro do objeto que vai para o Knex
            doce.id_doce = id

            let doceExiste = await doceDAO.getSelectByIdCandy(id)
            if(!doceExiste || doceExiste.length === 0) {
                return MESSAGE.ERROR_NOT_FOUND
            }

            let doceAtualizado = await doceDAO.setUpdateCandys(doce)

            //console.log("Retorno da Model Knex:", doceAtualizado)
            if(doceAtualizado) {
                return {status: true, status_code: 200, message: "Doce atualizado!"}
            }else {
                
                return {status: false, status_code: 500, message: "Erro ao atualizar doce!"}
                
            }
        }catch(error){
            //console.log(error)
            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
        }
    }


    const excluirDoce = async function (id) {
        let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
        try{
            if(id == '' || id == undefined || id == isNaN(id)){
                return MESSAGE.INVALID_ID
            }

            let doceExiste = await doceDAO.getSelectByIdCandy(id)
            if(!doceExiste || doceExiste.length === 0) {
                return MESSAGE.ERROR_NOT_FOUND
            }

            let doceExcluido = await doceDAO.setDeleteCandys(id)

            if(doceExcluido) {
                return MESSAGE.SUCESS_DELETED_ITEM
            }else{
                return {staus: 500, message: "Não foi possível apagar o doce!"}
            }
        } catch (error){
            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
        }
    }


module.exports = {
    listarDoces,
    buscarDoceId,
    inserirDoce,
    atualizarDoce,
    excluirDoce
}