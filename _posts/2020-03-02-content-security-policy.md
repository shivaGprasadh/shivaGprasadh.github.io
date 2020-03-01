---
title: Content Security Policy
categories: mitigations
date: 2020-03-02
author: shiva G prasadh
published: true
---

The **Content Security Policy (CSP)** standard is a way to specify which resources should be loaded in web applications. This can be done by whitelisting specific origins, using nonces or hashes. 

Its an another HTTP security header. you can specify the Content Security Policy through a HTTP response header called Content-Security-Policy. Then a web browser that supports CSP, such as Chrome or Firefox, parses the header information and determines which sources are trusted or not based on the instruction sent in the header.

A strong CSP provides an effective second layer of protection against various types of vulnerabilities, such as cross-site scripting vulnerabilities, clickjacking, mixed content security issues, protocol downgrading and any other kind of code injections... A CSP can be used to enforce the use of Subresource Integrity (SRI).


**Content Security Policy can be activated by following methods,**

1. Content-Security-Policy HTTP response header field.
2. <meta> HTML element with http-equiv attribute set to Content-Security-Policy. 
3. Content-Security-Policy-Report-Only HTTP response header when the developer is unsure of the CSP behavior and wants to monitor it.


**Special Directive** 

'none' - No URLs match.
***
'self' - Refers to the origin site with the same scheme and port number.
***
'unsafe-inline' - Allows the usage of inline scripts or styles.
***
'unsafe-eval' - Allows the usage of eval in scripts.
***
'strict-dynamic' - Informs the browser to trust scripts originating from a root trusted script.
***


## [](#header-4)Basic CSP Policy

**To allow the content which come from the site's own origin only (this excludes subdomains),**

```
Content-Security-Policy: default-src 'self'
```

**To allow content from a trusted domain and all its subdomains (it doesn't have to be the same domain that the CSP is set on.)**

```
Content-Security-Policy: default-src 'self' *.domain.com
```

**To allow images from any origin, to allow audio or video ( media files ) from trusted providers, and all scripts allowed from only a specific server,**

```
Content-Security-Policy: default-src 'self'; img-src *; media-src mediaserver1.com mediaserver2.com; script-src scripts.domain.com
```

**To ensure that all its content is loaded using TLS, in order to prevent attackers from eavesdropping on requests.**

```
Content-Security-Policy: default-src https://banking.domain.com
```

**To enabling violation reporting and to deliver a report to specific location,**

```
Content-Security-Policy: default-src 'self'; report-uri http://collector.domain.com/report_collector.cgi
```

**To prevent mixed content ,**

```
Content-Security-Policy: block-all-mixed-content;
```

**If migrated from HTTP to HTTPS, the following directive will ensure that all requests will be sent over HTTPS with no fallback to HTTP,**

```
Content-Security-Policy: upgrade-insecure-requests;
```

**To prevent clickjacking,** 

```
Content-Security-Policy: frame-ancestors 'none';
```

To allow for the site itself, use: `"frame-ancestors 'self';"`

To allow for trusted domain, use: `"frame-ancestors trusted.com;"`


By default CSP disables any unsigned JavaScript code placed inline in the HTML source. In case where the developer needs to use inline scripts, it's recommended to use hashes for static scripts or a nonce on every page request.

## [](#header-4)Nonces

A nonce (a number) is similar to CSRF token but for specific resources. It is activated by using nonce-$random_string in the HTTP response header. 

```
Content-Security-Policy: script-src 'self' 'nonce-hs4gltKzf7Lz3PdC3RIxVb5S5T5nSG7j5h0oR6hSFII='
```

The nonce should be a random string, generated with a cryptographically secure function to make sure it is not predictable. The idea behind a nonce in Content Security Policy is that it is a value that is impossible for the attacker to know, but is known and set by the developer. It has to be refreshed on every new page load. 

```js
<script nonce="hs4gltKzf7Lz3PdC3RIxVb5S5T5nSG7j5h0oR6hSFII=">
     console.log("It works")
</script>
```
With the above CSP setting, all script blocks without a nonce are not executed. Attacket can't understand the nonce as it is randomly generated on every page call.


## [](#header-4)Hashes

CSP can be configured to load resources if only it match defined hashes. Example is, 

```
Content-Security-Policy: script-src 'self' 'sha256-x5l+Ty8LLH9VLl/KvxWBTnAcPFlUXOqpbWgt0yJHkDo='
```

It contains the hash of following script block,

```js
<script>alert("shivaGprasadh");</script>
```

PHP code to implement this is as follows,

```js
header("Content-Security-Policy: script-src 'self' 'sha256-".base64_encode(hash('sha256', 'alert("shivaGprasadh");', true))."'");
```
