# reports
Generate daily reports on Linux server and send it to your mail (Synology, distribution Mageia)

generates daily mail from /var/log/auth.log at at 23:50, every day
generates daily mail from /var/log/synopkg.log at 23:40, every day
generates daily mail from /var/log/dnsmasq.log at 23:30, every day

example - today ad 23:50 it will send mail on my mail with txz file called 2019-04-30.txt because we graped all the files from auth.log

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

11.06.2019

Generate txt file for today and sent it to your mail - check your DHCP status

What is Dndsmasq?
Dnsmasq provides network infrastructure for small networks: DNS, DHCP, router advertisement and network boot. 
It is designed to be lightweight and have a small footprint, suitable for resource constrained routers and firewalls. 
It has also been widely used for tethering on smartphones and portable hotspots, and to support virtual networking in 
virtualisation frameworks. Supported platforms include Linux (with glibc and uclibc), Android, *BSD, and Mac OS X.
Dnsmasq is included in most Linux distributions and the ports systems of FreeBSD, OpenBSD and NetBSD. 
Dnsmasq provides full IPv6 support.

**example**
if its working you are going to get info like this

2019-06-11T15:00:10+02:00 SAC-Server dnsmasq-dhcp[4052]: DHCPREQUEST(eth0) 192.168.1.107 7c:5c:f8:89:d6:45
2019-06-11T15:00:10+02:00 SAC-Server dnsmasq-dhcp[4052]: DHCPACK(eth0) 192.168.1.107 7c:5c:f8:89:d6:45 MOB-008

if its not working you are going to get info like this


2019-06-11T15:05:16+02:00 Intern dnsmasq-dhcp[20092]: no address range available for DHCP request via ovs_eth0
2019-06-11T15:06:30+02:00 Intern dnsmasq-dhcp[20092]: no address range available for DHCP request via ovs_eth0

also try this 

https://www.npmjs.com/package/pm2

and start this cron with pm2 start report_dnsmasq.js






