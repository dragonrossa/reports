//mailer created for Synology NAS for dnsmasq
//******************//
//What is Dndsmasq?

// Dnsmasq provides network infrastructure for small networks: 
//DNS, DHCP, router advertisement and network boot. 
// It is designed to be lightweight and have a small footprint,
// suitable for resource constrained routers and firewalls. 
// It has also been widely used for tethering on smartphones and
// portable hotspots, and to support virtual networking in 
// virtualisation frameworks. Supported platforms include Linux 
//(with glibc and uclibc), Android, *BSD, and Mac OS X.
// Dnsmasq is included in most Linux distributions and the
// ports systems of FreeBSD, OpenBSD and NetBSD. 
// Dnsmasq provides full IPv6 support.



const nodemailer = require("nodemailer");
let date = require('date-and-time');
let shell = require('shelljs');

var CronJob = require('cron').CronJob;
new CronJob('40 23 * * *', function() {



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



 shell.tail({'-n': 150}, '/var/log/synopkg.log').to('/volume1/rosana/reports/'+datum+".txt");


async function main() {
    

         try {
             
        
           

            function mySubject() {
                return "(JPM-SERVER) Synopkg report for " + datum;


            }

           


        
           let mailOptions = {
            from: '"Admin" <user@domain.com>',
            attachments: [
                {   // utf-8 string as an attachment
                    path: '/volume1/rosana/reports/'+ datum+".txt"
                }
            ]
        };


            mailOptions.to = "r.duga@concepts.hr";
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

console.log("Mail sent for this server for " + datum);

}, null, true, 'Europe/Zagreb');

