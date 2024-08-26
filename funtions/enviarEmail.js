const nodemailer = require("nodemailer")


const createEmailTransport = () => {
    try {
        const transporter = nodemailer.createTransport({
            host: "email-ssl.com.br",
            port: 465,
            secure: true,
            auth: {
                user: "contato@festum.com.br",
                pass: "Aplicativo@1990"
            },

        })
        return transporter
    } catch (error) {
        throw (error)
    }
}


exports.normalNoReply = async (emailFornecedor, subject, html) => {
    try {
        const transporter = createEmailTransport()
        const mailSent = await transporter.sendMail({
            html: html,
            subject: subject,
            from: 'contato@festum.com.br',
            replyTo: 'contato@festum.com.br',
            to: emailFornecedor
        })
    } catch (error) {
        throw (error)
    }
}

exports.orcamento = async (html, emailCliente, emailFornecedor) => {
    try {
        const transporter = createEmailTransport()
        const mailSent = await transporter.sendMail({
            html:html,
            subject: "Solicitação de orçamento Festum",
            from: 'contato@festum.com.br',
            replyTo: emailCliente,
            to: emailFornecedor
        })
       
    } catch (error) {
        throw(error)
    }
}