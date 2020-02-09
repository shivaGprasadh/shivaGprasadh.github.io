---
title: Google Dorks
categories: Information gathering
date: 2020-02-09 
author: shiva G prasadh
published: true
---
 
We all know that Google is incredibly popular search engine for years in the world. Searching in Google is an art. For normal people, Its just a search engine. But Google has advanced search options. In the hacking world, Google is a powerful hacking tool; the so called as Google Dorks also known as Google hacking or Google dorking. We can find vulnerable servers and web applications by using it. Let's learn some tricks in the face of ethical hacking.

``` 
## [](#header-2) Caution: 
This blog is strictly for educational purpose. In case of any illegal actions done with reference to this blog, you are fully responsible.
 
``` 
  
## [](#header-2) Google Cache
 
We can use Google's search engine cache to view a website anonymously.  
This dork will show you the cached version of any website.
```E.g. cache:zattackerhub.com```
 
Lets look some popular Google dork operators

``` 
allintext: Searches for specific text contained on any web page.  e.g. allintext: hacking tools
* * *
allintitle: Searches for web pages that contained titles. e.g. allintitle: “zattacker hub”
* * *
allinurl: Used to fetch results whose URL contained all the specified characters. e.g. allinurl: hollywood movies
* * *
inurl: It is exactly same as allinurl, but it is useful for single keyword search. e.g. inurl: admin
* * *
intitle: It is used to search for various keywords inside the title, e.g. intitle: login page
* * *
filetype: Used to search for specific types of files such as PDF, DOC or TXT file types.
* * *
site:  It limits the scope of a query to single website. e.g. site: zattacker.ga
* * *
inanchor: this is useful when you need to search for an exact anchor text used on any links, e.g. inanchor:"ethical hacking"
* * *
```
Now, we have some basic understanding of Google dorks. Lets see query syntax. The following is the high level structure of Google Dorks that targets a specifi domain.
“inurl:domain.com/” “additional dorks”

 
If you want to search directory listening of a specific domain, just concatenate the previous dorks with site:[domain].
Directory listening
If there is no protection is applied on directories, they could be discovered and browsed through URL. It is called “directory listening”. We can find sensitive information through Google dorks. For instance,  
 

To find emails with which you can later perform social engineering using the following dork,

 
To find lists of email, fetch excel files by following dorks.

 We can filter results by specifying domain name, like site:.edu with above query.
 
To find subdomains: site:google.com - www.google.com
To search for error pages: site:domain.com intitle:error|warning
To search for logins:  site:domain.com login|logon or inurl:login.jsp intitle:login
To search for admin pages:  site:domain.com admin|administrator
To display all files in the domain except those with an html extension:  site:domain.com -ext:html
To search for user list:  site:domain.com inurl:admin inurl:uselist
To search vulnerable/hacked web servers: inurl:/proc/self/cwd
To find SSH private keys, intitle:index.of id_rsa -id_rsa.pub
 
Not only http based servers, we can also indexes open FTP servers.
```intitle:"index of" inurl:ftp```
Be careful with results, You may find some government server.
 
You can find intranets using following Google dorks,

You would be surprised at how easy this is. It can be used for some evil purpose. You are going to amaze if you try following dorks.
Wanna see some documents? Try this... filetype:pdf not for public release 
 
Want more sensitive documents? Try this... 

You can find some unprotected PHPmyAdmin from which we can create our own database on a site, "Welcome to phpMyAdmin" AND " Create new database"
 
If you want to find some live camera view, you can try this.  inurl:”viewerframe?mode=motion”
 
To fetch various IP based cameras: inurl:top.htm inurl:currenttime
To find WebcamXP-based transmissions: intitle:"webcamXP 5"
And for general live cameras: inurl:"lvappl.htm"
 
Running a server on your local computer?  Try this,  intitle:”index of” “parent directory” “desktop.ini” site:[domain]
 
Wanna access some personal directories? why not…  intitle:”index.of.personal”   
For more information, you should go through Google Hacking Database: https://www.exploit-db.com/google-hacking-database
 
Protect yourself:
*   One of the best ways to prevent Google dorks is by using a robots.txt file. Following configuration will deny all crawling from Google.
 
```js
User-agent: *   
Disallow: / 
```
    Make sure Google is blocked from all sensitive directories.

*   Avoid to uploading sensitive information online. 
*   Encrypt your sensitive data
*   Run Google Dork queries against your website to see any information leakage.
*   Password protected directories.





