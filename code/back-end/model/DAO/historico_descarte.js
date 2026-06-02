/****************************************************************************************
 * Objetivo: Arquivo responsável pelo historico de descarte 
 * Data: 26/05/2026
 * Autor: Giovana
 * Versão: 1.0
 ***************************************************************************/

const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

// Insere o registro relacionando o Doce e o Funcionário que realizou a ação
const setInsertDescarte = async function (dadosDescarte) {
    try {

        //Script sql
        let sql = `INSERT INTO tbl_historico_descarte (
                id_doce, 
                id_funcionario,
                data_descarte
        
        ) VALUES(
            ${dadosDescarte.id_doce},
            ${dadosDescarte.id_funcionario},
            Current_date()   
        );`


        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error){
        return false 
    }
}

// Busca o relatório completo juntando as tabelas através das chaves estrangeiras
const getSelectAllDescartes = async function () {
    try {
        // INNER JOIN conecta as três tabelas usando as relações existentes
        let sql = `SELECT 
                        hd.id_historico_descarte, 
                        hd.data_descarte, 
                        d.nome AS nome_doce, 
                        d.tipo AS tipo_doce,
                        u.nome AS nome_funcionario
                   FROM tbl_historico_descarte AS hd
                   INNER JOIN tbl_doce AS d ON d.id_doce = hd.id_doce
                   INNER JOIN tbl_funcioanrio AS u ON u.id_funcionario = hd.id_funcionario
                   ORDER BY hd.data_descarte DESC;`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    setInsertDescarte,
    getSelectAllDescartes
}