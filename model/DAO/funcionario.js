/****************************************************************************************
 * Objetivo: Arquivo responsável por buscar dados do funcionário no banco
 * Data: 26/05/2026
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/

// Import da biblioteca do PrismaClient
const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

const getSelectByEmailFuncionario = async function (email) {
    try {
        // Script SQL 
        let sql = `select * from tbl_funcionario where email = '${email}'`

        // Executa o script no banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

        // Se retornar um array e conter pelo menos 1 registro, devolve o usuário
        if (Array.isArray(result) && result.length > 0) {
            return result[0] // Retorna o primeiro usuário encontrado
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectByEmailFuncionario
}