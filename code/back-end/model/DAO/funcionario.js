/****************************************************************************************
 * Objetivo: Arquivo responsável por buscar dados do funcionário no banco
 * Data: 26/05/2026
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/

// Import da biblioteca do knex
const db = require('../connection.js')

const getSelectByEmailFuncionario = async function (email) {
    try {
       
        // Executa o script no banco de dados
        let result = await db('tbl_funcionario').where('email', email).first()
        return result || null 

    } catch (error) {
        console.log("Erro na model funcionário", error)
        return null
    }
}

module.exports = {
    getSelectByEmailFuncionario
}