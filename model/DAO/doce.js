/****************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD no Banco de Dados MySQL
 * Data: 26/05/2026
 * Autor: Giovana
 * Versão: 1.0
 ****************************************************************************************/


//Import da biblioteca do PrismaClient
const {PrismaClient} = require('../../generated/prisma')

//Cria um objeto do prisma client para manipular os scripts sql
const prisma = new PrismaClient()

//Retorna todos os doces do banco de dados 
const getSelectAllCandys = async function () {
    try{
        //Script sql
        let sql = `select * from tbl_doce order by id_doce desc`

        //Executa no bc o script sql
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        } else {
            return false 
        }
    } catch (error) {
        return false 
    }
}

const getSelectByIdCandy = async function (id) {

    try {

        //Script sql
        let sql = `select * from tbl_doce where id= ${id}`

        //Executa no BD o script SQL
        let result = await prisma.$executeRawUnsafe(sql)

         //Validação para verificar se o retorno do banco é um ARRAY (vazio ou com dados)
        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
    
}

const setInsertCandys = async function (doce) {
    try{

        let sql = `INSERT INTO tbl_doce ( tipo, 
        nome, 
        massa, 
        recheio, 
        cobertura, 
        qtd, 
        peso, 
        porcao, 
        preco,
        data_validade, 
        status)
        VALUES (
        '${doce.tipo}',
        '${doce.nome}',
        '${doce.massa}'
        '${doce.recheio}'
        '${doce.cobertura}'
        '${doce.qtd}'
        '${doce.peso}'
        '${doce.porcao}'
        '${doce.preco}'
        '${doce.data_validade}'
        '${doce.status}');`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else 
        return false 
    } catch (error) {
        return false
    }
}

const setUpdateCandys = async function (doce) {

    try{

        let sql = `update tbl_doce set
        tipo,               =   '${doce.tipo}',
        nome                =   '${doce.nome}',
        massa               =   '${doce.massa}'
        recheio             =   '${doce.recheio}'
        cobertura           =   '${doce.cobertura}'
        qtd                 =   '${doce.qtd}'
        peso                =   '${doce.peso}'
        preco               =   '${doce.preco}'
        data_validade       =   '${doce.data_validade}'
        status              =   '${doce.status}'
        where id_doce = ${doce.id_doce}`

        
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false
        
} catch (error) {
    return false
}

}

const setDeleteCandys = async function (id) {
    
    try {
        let sql = `delete from tbl_doce where id_doce = ${id}`


        let result = await prisma.$executeRawUnsafe(sql)

        if(result > 0)
            return true
        else 
        return false 

    } catch (error){
        return false
    }
    
}

module.exports = {
    getSelectAllCandys,
    getSelectByIdCandy,
    setInsertCandys,
    setUpdateCandys,
    setDeleteCandys
}