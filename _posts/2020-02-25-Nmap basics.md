---
title: Nmap Basics
categories: Tool
date: 2020-02-26 
author: shiva G prasadh
published: true
---

**Nmap ("Network Mapper")** is a free and open source utility for network discovery and security auditing. It was designed to rapidly scan large networks, but works fine against single hosts. 

Nmap can be used to detect the,

 Markup : * Live host on the network (host discovery)
		  * Open ports on the host (Port discovery)
          * application name and the version to the respective port (service discovery)
          * operating system, hardware address and the software version
          * type of packet filters/firewalls are in use
          * vulnerability and security holes (Nmap scripts)

**How to use Nmap effectively?**

The usage of Nmap depends on the target machine; We need to use some advanced techniques to bypass the firewall and intrusion detection/preventative software to get the right result.

To scan a single system,

```# nmap target_host```

```console
# nmap 192.168.1.10
```

To scan entire subnet,

```# nmap target_host/CIDR```

```console
# nmap 192.168.1.1/24
```

To scan multiple targets,

```console
# nmap 192.168.1.20 192.168.1.30
```

To scan a range of IP addresses (not entire subnets), 

```console
# nmap 192.168.1.1-100
```

To scan a list of target hosts (Input from list),

```console
# nmap -iL target_host_list.txt  
```

To scan the list of all the host, use List Scan (-sL); It simply lists each host of the network(s) specified, without sending any packets to the target hosts ( It does reverse-DNS resolution on the hosts),

```# nmap -sL target_host/CIDR```

```console
# nmap -sL 192.168.1.1/24
```

To exclude specific IP address while scan entire subnets,

```console
# nmap 192.168.1.1/24 --exclude 192.168.1.1
```

To scan a specific port on target machine,

```console
# nmap -p80,443,21 192.168.1.1
```

## [](#header-2) Scanning Techniques

Most popular scanning techniques are as follows,


## [](#header-4) TCP SYN Scan or Stealth Scan (-sS)

This technique allows Nmap to get information from the remote host without the complete TCP handshake process (half-open scanning), Nmap sends SYN packets to the destination, but it doesn't create any sessions, As a result, the target host can’t create any log of the interaction because no session was initiated.

If there is no scan type mentioned on the command, then a TCP SYN scan is used by default, but it requires the root/administrator privileged.

```console
# nmap -sS 192.168.1.1
```

## [](#header-4) TCP Connect() Scan (-sT)

Unlike the TCP SYN scan, it completes the normal TCP three way handshake process and requires the system to call connect(), which is a part of the operating system. It can be used to find out the TCP ports, not the UDP ports.

This the default scanning technique used, if only the SYN scan is not an option, because the SYN scan requires root privilege.

```console
# nmap -sT 192.168.1.1
```

## [](#header-4) UDP Scan (-sU)

This technique is used to find an open UDP port of the target machine. UDP scans send the UDP packets to the target machine, and waits for a response. If an error message arrives saying the ICMP is unreachable, then it means that the port is closed; but if it gets an appropriate response, then it means that the port is open.

We can make the scanning more effective by using -sS along with –sU.

```console
# nmap -sU 192.168.1.1
```

## [](#header-4) FIN Scan (-sF)

A firewall will usually block the SYN packets. So normal TCP SYN scan is not the best solution.

A FIN scan sends the packet only set with a FIN flag, so it is not required to complete the TCP handshaking.

```console
# nmap -sF 192.168.1.10
```

The target host is not able to create a log of this scan. We can also use xmas scan (-sX) and Null scan (-sN).

FIN scan sends the packets containing only the FIN flag, where as the Null scan does not send any bit on the packet, and the xmas sends FIN, PSH, and URG flags.


## [](#header-4) TCP ACK Scan (-sA)

It is always good to send the ACK packets rather than the SYN packets because if there is any active firewall working on the remote computer then because of the ACK packets the firewall cannot create the log, since firewalls treat ACK packet as the response of the SYN packet. ACK scan is slightly different from the other types of scanning techniques because it has not been designed to discover the open ports, but it has an ability to determine the filtered and unfiltered responses. 

```console
# nmap -sA 192.168.1.10
```

It shows the message like "All 1000 scanned ports on 192.168.1.9 are filtered/unfiltered". it is very easy to find out whether the target computer has a firewall enabled or not

## [](#header-4) Ping Scan (-sP)

It is not used to discover open ports; It used to find out whether the host is alive or not.

```console
# nmap -sP 192.168.1.10
```

## [](#header-4) Version Detection (-sV)

It is used to find out what software version is running on the target host and on the respective ports. Version detection uses the TCP SYN scan to find out which ports are open.

```console
# nmap -sV 192.168.1.10
```

## [](#header-4) Idle Scan (-sI)

It is an advance scan that provides complete anonymity while scanning, where Nmap doesn’t send the packets from your real IP address. Nmap uses another host from the target network to send the packets.

# nmap -sI zombie_host target_host

```console
# nmap -sI 192.168.1.10 192.168.1.1
```

The idle scan technique is used to discover the open ports on 192.168.1.1 while it uses the zombie_host (192.168.1.10) to communicate with the target host. So this is an ideal technique to scan a target host anonymously.


## [](#header-4) OS Detection

It has the ability to detect remote operating systems and software. Nmap has a database called nmap-os-db, the database contains information of more than 2,600 operating systems. OS detection involves the process of finding open ports and then sends TCP and UDP packets to the target machine and then it examines the response by comparing the result with the database. 

If the target machine has a firewall, IDS, and IPS all enabled, You can use the switch -PN to ensure that you do not ping to find the remote operating system (The -PN tells Nmap not to ping the remote computer).

```console
# nmap -O -PN 192.168.1.1/24
```

Nmap OS detection technique works on the basis of an open and closed port. If Nmap fails to discover the open and closed port, then it gives the error.