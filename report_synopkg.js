//mailer created for Synology NAS
//instead of yumm we have synopkg for installing packages and I created mailer that tails last 
//150 lines to txt file with todays date and sends it to my mail at 
//23:40 h every day

//reason - restarts of packages, when and why did they restartd
//did it because of MariaDB unusual acting


const nodemailer = require("nodemailer");
let date = require('date-and-time');
let shell = require('shelljs');

var CronJob = require('cron').CronJob;
new CronJob('40 23 * * *', function() {



let transporter = nodemailer.createTransport({
    host: "mail.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "username", // generated ethereal user
        pass: "password" // generated ethereal password
    }
});




let now = new Date();
let datum = date.format(now, 'YYYY-MM-DD');
let an_hour_ago = date.addHours(now, +2);
let vrijeme = date.format(an_hour_ago, 'hh:mm:ss', true);



 shell.tail({'-n': 150}, '/var/log/synopkg.log').to('/reports/synopkg_reports/'+datum+".txt");


async function main() {
    

         try {
             
        
           

            function mySubject() {
                return "(SERVER) Synopkg report for " + datum;


            }

           


        
           let mailOptions = {
            from: '"Admin" <admin@gmail.com>',
            attachments: [
                {   // utf-8 string as an attachment
                    path: '/reports/synopkg_reports/'+ datum+".txt"
                }
            ]
        };


            mailOptions.to = "mymail@gmail.com";
            mailOptions.subject = mySubject();
            mailOptions.html = "Hello, this is your daily Synopkg report for today. <br><br> " + datum + " " + vrijeme + "<br><br> Admin ";
            mailOptions.text = "Hello, this is your daily Synopkg report for today. <br><br> " + datum + " " + vrijeme + "<br><br> Admin ";
            mailOptions.priority = 'high';


            let test = await transporter.sendMail(mailOptions)



        } 
        catch (error) {
              console.error(error)
        }

        finally{

        }

           
        }



main();

console.log("Mail sent for (SERVER) for " + datum);

}, null, true, 'Europe/Zagreb');

