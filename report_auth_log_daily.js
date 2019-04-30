//generates daily mail from /var/log/auth.log
//example - today ad 23:50 it will send mail on my mail with txz file called
//2019-04-30.txt because we graped all the files from auth.log
//report that could help you find your vulnerables on Linux server
//try it


const nodemailer = require("nodemailer");
let date = require('date-and-time');
let shell = require('shelljs');

  var CronJob = require('cron').CronJob;
  new CronJob('50 23 * * *', function() {



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

 shell.grep('--', datum, '/var/log/auth.log').to('/reports/'+datum+".txt"); // Search for "-v", no grep options



async function main() {
    

         try {
             
        
           

            function mySubject() {
                return "(SERVER) Info for day " + datum;


            }

           

           

          

        
           let mailOptions = {
            from: '"Server admin" <abcd@gmail.com>',
            attachments: [
                {   // utf-8 string as an attachment
                    path: '/reports/'+ datum+".txt"
                }
            ]
        };


            mailOptions.to = "r.duga@concepts.hr";
            mailOptions.subject = mySubject();
            mailOptions.html = "Hello, this is your daily server report for today. <br><br> " + datum + " " + vrijeme + "<br><br> Server Admin ";
            mailOptions.text = "Hello, this is your daily server report for today. <br><br> " + datum + " " + vrijeme + "<br><br> Server Admin ";
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

console.log("Mail sent for (Server) for " + datum);

  }, null, true, 'Europe/Zagreb');

