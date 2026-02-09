const nodemailer = require("nodemailer")
const {Resend} = require("resend")


const resend = new Resend('re_a1xEgRi9_NFXUtay2h17JquwZeGTaakAZ');


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
    
        const { data, error } = await resend.emails.send({
            from: 'Festum <no-reply@webvanguardtests.com.br>',
            to: [emailFornecedor],
            subject: subject,
            html: html,
        });
    if (error) {
        throw new Error(`Failed to send email: ${error.message}`);
    }
    console.log({ data });
    
}

exports.orcamento = async (html, emailCliente, emailFornecedor) => {
    const { data, error } = await resend.emails.send({
        from: 'Festum <no-reply@webvanguardtests.com.br>', // domínio verificado
        to: [emailCliente],
        reply_to: emailFornecedor,
        subject: 'Solicitação de Orçamento pelo app Festum',
        html,
    });

    if (error) {
        throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log({ data });
};
