+++

banner = "css/images/banners/hover.jpg"
categories = ["DNS"]
date = "2016-02-03T09:12:34-05:00"
description = "Want to point your hover domain to your Heroku app?  This article will ELI5 how to alter the DNS records and Heroku settings to do just that."
images = []
tags = ["Heroku", "Hover"]
title = "Pointing Hover Domain to Your Heroku App"

+++

Hosting static sites for free on Github's Pages is fantastic, but it might be more preferable to ru your own server.  My go-to for that is [Heroku](https://www.heroku.com/).  This post will not go into how to host on Heroku (I will assume you already are hosting there), but how to point your purchased [hover](hover.com) domain to your Heroku-hosted web-app.<!--more-->  The process has a few more nuances than my previous post on [pointing to gh-pages](/blog/pointing-hover-domain-to-github-pages/).

For the following directions I'll use <your-Heroku-URL> in place of your heroku URL and <your-hover-URL> as your purchased hover URL.

1. On hover click through your desired domain (https://hover.com/domain/<your-hover-URL>).  Under the initial "Domain Details" tab, edit the "Forward This Domain" value and enter <your-Heroku-URL>.
  ![hover to Heroku Domain Details example](/css/images/hover-to-heroku-domain-details.jpg)
2. Still on hover, move over to the "DNS" tab.  Click "ADD NEW".  Enter the following values:
  * Hostname: www, Record Type: CNAME, Value: <your-Heroku-URL>
  And Save.  Your screen should look like this:
  ![hover to Heroku DNS record example](/css/images/hover-to-heroku-dns-records.jpg)
3. Within your Heroku dashboard, open your app and go to the settings tab (the URL should resemble https://dashboard.heroku.com/apps/<your-Heroku-URL>/settings).  Scroll down to the Domains section and click "Add domain" and enter the following values:
  * Domain Name: <your-hover-URL>, DNS Target: <your-Heroku-URL>.
4. Boom goes the dynomite.  Give it a few minutes to settle (it took mine 10-15 min) and you're off and ready!  If you have any trouble, I used hover's chat to talk with a super helpful guy named Ryan.  While you might not get Ryan, hover's service is top-notch and they'll help you out and send you, in my opinion, a few too many emails assuring your issue was resolved.
