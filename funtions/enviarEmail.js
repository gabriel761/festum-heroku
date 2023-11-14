const nodemailer = require("nodemailer")


const createEmailTransport = () => {
    try {
        const transporter = nodemailer.createTransport({
            host: "email-ssl.com.br",
            port: 465,
            secure: true,
            auth: {
                user: "suporte@festum.com.br",
                pass: "Gabi@123"
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
            from: 'suporte@festum.com.br',
            replyTo: 'suporte@festum.com.br',
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
            from: 'suporte@festum.com.br',
            replyTo: emailCliente,
            to: emailFornecedor
        })
       
    } catch (error) {
        throw(error)
    }
}