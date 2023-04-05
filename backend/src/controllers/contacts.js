import { error, success } from "../helpers/index.js";
import nodemailer from 'nodemailer';

export const sendMessage = async (req,res) => {

    const contactEmail = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port : 587,
        auth: {
          user: "stefanie.nolan57@ethereal.email",
          pass: "RRK9UkkjatyjXYZFrv",
        },
    });
      
    contactEmail.verify((error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Ready to Send");
        }
    });

    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    const mail = {
        from: name,
        to: "stefanie.nolan57@ethereal.email",
        subject: "Contact Form Submission",
        html: `<p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>`,
    };

    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: "ERROR" });
        } else {
            res.status(201).json(success("Message Sent ✅"));
        }
    });
}
