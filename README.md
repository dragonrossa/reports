# reports
Generate daily reports on Linux server and send it to your mail

generates daily mail from /var/log/auth.log

example - today ad 23:50 it will send mail on my mail with txz file called

2019-04-30.txt because we graped all the files from auth.log

report that could help you find your vulnerables on Linux server

try it

02.05.2019

mailer (report) created for Synology NAS

instead of yumm we have synopkg for installing packages and I created mailer that tails last 

150 lines to txt file with todays date and sends it to my mail at 

23:40 h every day

reason - restarts of packages, when and why did they restart

did it because of MariaDB unusual acting

HOW TO USE IT:

save it as js file and put it in some folder on server

instal nodejs 8+ version

assign it as bg worker with nohup, example

nohup node report_synopkg.js &

and then

disown

test this before you put it as bg worker
