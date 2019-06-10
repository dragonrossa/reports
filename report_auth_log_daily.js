//generates daily mail from /var/log/auth.log
//example - today ad 23:50 it will send mail on my mail with txz file called
//2019-04-30.txt because we graped all the files from auth.log
//report that could help you find your vulnerables on Linux server
//try it

//changes:
//Microsoft 365 mail settings, also, had to remove shell.grep out of async because
//the command did not work and could not sent something  that wasnt there
//2019-04-30a.txt -> report has "a" at the end because I store reports in the same file and
//they need to be different to be sent in various time




const nodemailer = require("nodemailer");
let date = require('date-and-time');
let shell = require('shelljs');

var CronJob = require('cron').CronJob;
new CronJob('50 23 * * *', function () {



    let transporter = nodemailer.createTransport({
        host: "outlook.office365.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "user@domain.com", // generated ethereal user
            pass: "mypassword" // generated ethereal password
        }
    });




    let now = new Date();
    let datum = date.format(now, 'YYYY-MM-DD');
    let an_hour_ago = date.addHours(now, +2);
    let vrijeme = date.format(an_hour_ago, 'hh:mm:ss', true);

    shell.grep('--', datum, '/var/log/auth.log').to('/volume1/rosana/reports/' + datum + "a.txt");


    async function main() {


        try {




            function mySubject() {
                return "(JPM-Intern) Info for day " + datum;


            }



            let mailOptions = {
                from: '"Admin" <user@domain.com>',
                attachments: [
                    {
                        path: '/volume1/rosana/reports/' + datum + "a.txt"
                    }
                ]
            };


            mailOptions.to = "me@domain.com";
            mailOptions.subject = mySubject();
            mailOptions.html = "Hello, this is your daily JPM report for today. <br><br> " + datum + " " + vrijeme + "<br><br> Admin ";
            mailOptions.text = "Hello, this is your daily JPM report for today. <br><br> " + datum + " " + vrijeme + "<br><br> Admin ";
            mailOptions.priority = 'high';


            let test = await transporter.sendMail(mailOptions)



        }
        catch (error) {
            console.error(error)
        }

        finally {

        }


    }



    main();

    console.log("Mail sent for this server for " + datum);

}, null, true, 'Europe/Zagreb');

