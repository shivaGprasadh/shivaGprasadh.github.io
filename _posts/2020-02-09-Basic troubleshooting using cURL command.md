---
title: Basic troubleshooting using cURL command
categories: Information-gathering Linux
date: 2020-02-09 
author: shiva G prasadh
published: true
---

As per the manual page description, curl is a tool to transfer data from or to a server, using one of the supported protocols (DICT, FILE, FTP, FTPS, GOPHER, HTTP, HTTPS, IMAP, IMAPS, LDAP, LDAPS, POP3, POP3S, RTMP, RTSP, SCP, SFTP, SMB, SMBS, SMTP, SMTPS, TELNET and TFTP). The command is designed to work without user interaction 
Welcome to your blog post. Use this space to connect with your readers and potential customers in a way that’s current and interesting. Think of it as an ongoing conversation where you can share updates about business, trends, news, and more. 
 
curl offers a busload of useful tricks like proxy support, user authentication, FTP upload, HTTP post, SSL connections, cookies, file transfer resume, Metalink, and more. As you will see below, the number of features will make your head spin! You can easily install curl command on an Ubuntu Linux using following command.

```:~$sudo apt install curl```
 
We can verify it by running following command,

```:~$curl --version```
 

By using curl, we can download images, documents, files and web pages. For instance, lets download torrent file of Kali Linux.

``` 
:~$ curl -o kali.torrent https://images.offensive-security.com/kali-linux-2019.2-amd64.iso.torrent
% Total % Received % Xferd Average Speed Time Time Time Current Dload Upload Total Spent Left Speed 100 250k 100 250k 0 0 50593 0 0:00:05 0:00:05 --:--:-- 53429
```
 
Note: -o, --output <file> Write to file instead of stdout
To retrieve a webpage without header information,

``` 
:~$ curl http://zattackerhub.com
<html>
<head><title>403 Forbidden</title></head>
<body bgcolor="white">
<center><h1>403 Forbidden</h1></center>
<hr><center>nginx</center>
</body>
</html>
```

To retrieve a webpage with header information,

``` 
:~$ curl http://zattackerhub.com -i
HTTP/1.1 403 Forbidden
Server: nginx
Date: Sun, 11 Aug 2019 14:37:34 GMT
Content-Type: text/html
Content-Length: 162
Connection: keep-alive
Vary: Accept-Encoding
 
<html>
<head><title>403 Forbidden</title></head>
<body bgcolor="white">
<center><h1>403 Forbidden</h1></center>
<hr><center>nginx</center>
</body>
</html>
```

If you want to see only header information, use “-I” flag which will be useful while troubleshooting, 
 
```
:~$ curl http://zattackerhub.com -I
HTTP/1.1 403 Forbidden
Server: nginx
Date: Sun, 11 Aug 2019 14:42:05 GMT
Content-Type: text/html
Content-Length: 162
Connection: keep-alive
Vary: Accept-Encoding
```
 
By default, you use curl without explicitly saying which request method to use. If you just pass in a HTTP URL like *curl http://zattackerhub.com*, it will use GET. If you use *-d* or *-F* curl will use POST, -I will cause a HEAD and -T will make it a PUT.
 
 -X, --request <command> specify request method. But its pointless to use to do curl -X GET http://zattackerhub.com -I as GET would be used anyway. When sending data via a POST or PUT request, two common formats (specified via the Content-Type header) are:
```application/jsonapplication/x-www-form-urlencoded ```
 
Many APIs will accept both formats, For instance,
```curl -d "param1=value1&param2=value2" -X POST http://zattackerhub.com/data```
 
 or with data file. [ cat data.txt => param1=value1&param2=value2 ]

```
curl -d "@data.txt" -X POST http://zattackerhub.com/data -I
HTTP/1.1 403 Forbidden
Server: nginx
Date: Sun, 11 Aug 2019 16:09:39 GMT
Content-Type: text/html
Content-Length: 162
Connection: keep-alive
Vary: Accept-Encoding
```
Okay, you may ask why I am getting 403 forbidden in above responses. If origin server has WAF or security plugin, curl request will be blocked because of user-agent. In this scenario, we can bypass it by spoofing user-agent [ -A, --user-agent <name> ] as follows,
 
```
:~$ curl http://zattackerhub.com -I -A chrome
HTTP/1.1 200 OK
Server: nginx
Date: Sun, 11 Aug 2019 14:48:24 GMT
Content-Type: text/html
Content-Length: 830
Connection: keep-alive
Vary: Accept-Encoding
Expires: Thu, 01 Jan 1970 00:00:01 GMT
Cache-Control: no-cache
```
 
Instead of it, you can send the header via curl request to bypass user-agent. You can send any header details by using -H flag. For instance,

```
:~$ curl -I http://zattackerhub.com -H "user-agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Mobile Safari/537.36"
HTTP/1.1 200 OK
Server: nginx
Date: Sun, 11 Aug 2019 15:38:02 GMT
Content-Type: text/html
Content-Length: 830
Connection: keep-alive
Vary: Accept-Encoding
Expires: Thu, 01 Jan 1970 00:00:01 GMT
Cache-Control: no-cache
``` 

It is awesome. If you have a https website, sometime you may see following ssl error while curling,
 
```
:~$ curl -I https://zattackerhub.com
curl: (51) SSL: no alternative certificate subject name matches target host name 'zattackerhub.com'
```
 
It usually happens when the certificate does not match with the host name. The solution would be to contact the host and ask it to fix its certificate. Otherwise you can turn off cURL's verification of the certificate, use the *-k* (or *--insecure*) option. Please note that as the option said, it is insecure. 

```
:~$ curl -IkA “chrome” https://zattackerhub.com 
HTTP/1.1 200 OK
Server: nginx
Date: Sun, 11 Aug 2019 14:48:24 GMT
Content-Type: text/html
Content-Length: 830
Connection: keep-alive
Vary: Accept-Encoding
Expires: Thu, 01 Jan 1970 00:00:01 GMT
Cache-Control: no-cache 
```
 
When target is redirecting to some location, use -L or --location flag to follow redirects.
While debugging, sometimes it can be helpful to bypass CDN and proxy layers when requesting content from the site by sending those web requests directly to a specific IP address [ *--resolve <host:port:address>* Resolve the host+port to this address] without using the site's public DNS records. For instance, lets curl an image by resolving origin.

```
:~$ curl -I https://zattackerhub.com/images/image.jpg –-resolve zattackerhub.com:443: 185.27.134.252
HTTP/2 200
server: nginx
date: Sun, 11 Aug 2019 15:18:52 GMT
content-type: text/html; charset=UTF-8
cache-control: no-store, no-cache, max-age=0, must-revalidate, private, max-stale=0, post-check=0, pre-check=0
access-control-allow-origin: *
vary: Accept-Encoding
x-cache: MISS
accept-ranges: bytes
``` 
 
Its really cool right! We can do many things with this tool. There are a number of other options provided by cURL which can be checked on the man page. I personally recommend this tool for troubleshooting.