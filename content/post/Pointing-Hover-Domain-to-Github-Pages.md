+++
banner = "css/images/banners/GithubPages.jpg"
categories = ["DNS"]
date = "2016-02-02T09:49:50-05:00"
description = "Point your hover.com domain to your static Github Pages hosted site with these tips.  this post will help with DNS settings and setting up a CNAME file."
images = []
tags = ["Github", "Hover"]
title = "Pointing Hover Domain to Github Pages"

[params]
  bannerLg = "css/images/banners/GithubPages-lg.jpg"
  bannerMd = "css/images/banners/GithubPages-md.jpg"
  bannerSm = "css/images/banners/GithubPages-sm.jpg"
+++

I was introduced to [hover](hover.com) by being an info nerd with [99% Invisible](http://99percentinvisible.org/).  Many people still use Go Daddy because it is the industry standard and, for the most part, it is cheaper.  I prefer good customer service and a simple UX, hence my hover preference.  It seems there is still a small lack of resources on integrating hosting services with hover, so I'd like to put my findings here.<!--more-->  This process was made a lot easier with help from [Michael Deeb](http://michaeljdeeb.com/blog/using-a-custom-domain-with-github-pages/), though my explanation aims to be more visual and ELI5.  This post assumes you're familiar with Github and the git cli.  If you're not familiar, begin [here](https://help.github.com/articles/set-up-git/).

This static blog is hosted using [Github's Pages](https://pages.github.com/) (which only handles static sites), which is awesome because it completely free if you don't mind your code being public.  Then spend a couple of dollars your domain of choice from hover and lets begin.

For the following directions I'll use <GH-Pages-URL> in place of your Github Pages URL and <your-hover-URL> as your purchased hover URL.

1. Within your hover account, click your desired domain and traverse to the DNS tab.
2. Delete all DNS records with a "Records" value of "A".
3. Add new records with the following values:
  * Hostname: @, Record Type: A, Value: 192.30.252.153
  * Hostname: @, Record Type: A, Value: 192.30.252.154
  * Hostname: www, Record Type: CNAME, Value: <GH-Pages-URL>
  When complete, your screen should look something like:
  ![hover DNS records example](/css/images/hover-dns-records.jpg)
4. Go to your Github repo's root directory.  To the right of the green "New pull request" button, click "New file".  Give this file the exact name "CNAME" (UPPERCASE!!) and enter <your-hover-URL> on line one with no other content and commit the file.  If you prefer to use your favorite editor to create the file and then push it up, be my guest.  The CNAME file should resemble this:
  ![Github CNAME file](/css/images/Github-CNAME-file.jpg)
5. Thats it! But be patient.  The redirect can take up to 10 min to settle, although usually it happens in much less time.

All the Best,

Brendan
