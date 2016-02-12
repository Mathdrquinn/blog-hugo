+++
banner = "css/images/banners/social-meta-tags-lg.jpg"
categories = ["SEO"]
date = "2016-02-12T03:01:40-05:00"
description = "Find, investigate and change Hugo's internal templates, twitter cards edition."
images = ["http://brendan-quinn.xyz/css/images/banners/social-meta-tags-seo.jpg"]
menu = ""
tags = ["SEO", "Hugo"]
title = "Working with Hugo's Internal Partial Templates: twitter-cards"

[params]
  bannerLg = "css/images/banners/social-meta-tags-lg.jpg"
  bannerMd = "css/images/banners/social-meta-tags-md.jpg"
  bannerSm = "css/images/banners/social-meta-tags-sm.jpg"

+++
Hugo's internal template are neat and helpful.  They are templates that [live within hugo](https://github.com/spf13/hugo/blob/e445c35d6a0c7f5fc2f90f31226cd1d46e048bbc/tpl/template_embedded.go) and can be referenced similar to other templates.<!--more-->

~~~html
{{ template "_internal/opengraph.html" . }}
{{ template "_internal/google_news.html" . }}
{{ template "_internal/schema.html" . }}
{{ template "_internal/twitter_cards.html" . }}
~~~

As I developed this blog with Hugo's help, I needed to dive into the <code>\_internal/twitter_cards.html</code> template to make sure I had my <code>config.toml</code> set up correctly.  That search led me [here](https://github.com/spf13/hugo/blob/e445c35d6a0c7f5fc2f90f31226cd1d46e048bbc/tpl/template_embedded.go#L147).  While helpful, I think it is still in alpha.

~~~html
{{ if .IsPage }}
  {{ with .Params.images }}
    <!-- Twitter summary card with large image must be at least 280x150px -->
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:image:src" content="{{ index . 0 | absURL }}"/>
{{ else }}
  <meta name="twitter:card" content="summary"/>
{{ end }}
  <!-- Twitter Card data -->
  <meta name="twitter:title" content="{{ .Title }}"/>
  <meta name="twitter:description" content="{{ with .Description }}{{ . }}{{ else }}{{if .IsPage}}{{ .Summary }}{{ else }}{{ with .Site.Params.description }}{{ . }}{{ end }}{{ end }}{{ end }}"/>
  {{ with .Site.Social.twitter }}
    <meta name="twitter:site" content="@{{ . }}"/>
  {{ end }}
  {{ with .Site.Social.twitter_domain }}
    <meta name="twitter:domain" content="{{ . }}"/>
  {{ end }}
  {{ range .Site.Authors }}
    {{ with .twitter }}
      <meta name="twitter:creator" content="@{{ . }}"/>
    {{ end }}
  {{ end }}
{{ end }}
~~~

I'm still new to Go templating, but it seems to me that the <code>{{ with }}</code> statement on the second line is missing an <code>{{ end }}</code> tag.  If true, and once fixed, that would leave the index page without a <code>&lt;meta name="twitter:image" content="{{ index . 0 | absURL }}"/&gt;</code> tag.  To fix this I ceated a partial template: <code>ROOT/layouts/seo/twitter.html</code>.  Here's where my adjustments brought me:

~~~html
<!-- layouts/partials/head.html -->
{{ template "_internal/opengraph.html" . }}
{{ template "_internal/google_news.html" . }}
{{ template "_internal/schema.html" . }}
{{ partial "seo/twitter.html" . }}

<!-- layouts/partials/seo/twitter.html -->
{{ if .IsPage }}
  {{ with .Params.images }}
  <!-- Twitter summary card with large image must be at least 280x150px -->
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:image:src" content="{{ index . 0 | absURL }}"/>
    <meta name="twitter:card" content="summary"/>
  {{ end }}
  <!-- Twitter Card data -->
  <meta name="twitter:title" content="{{ .Title }}"/>
  <meta name="twitter:description" content="{{ with .Description }}{{ . }}{{ else }}{{if .IsPage}}{{ .Summary }}{{ else }}{{ with .Site.Params.description }}{{ . }}{{ end }}{{ end }}{{ end }}"/>
  {{ with .Site.Social.twitter }}
    <meta name="twitter:site" content="@{{ . }}"/>
  {{ end }}
  {{ with .Site.Social.twitter_domain }}
    <meta name="twitter:domain" content="{{ . }}"/>
  {{ end }}
  {{ range .Site.Authors }}
    {{ with .twitter }}
      <meta name="twitter:creator" content="@{{ . }}"/>
    {{ end }}
  {{ end }}
{{ else }}
  <meta name="twitter:card" content="summary" />
  {{ with .Site.Social.twitter }}
    <meta name="twitter:site" content="@{{ . }}"/>
  {{ end }}
  <meta name="twitter:title" content="{{ .Title }}"/>
  <meta name="twitter:description" content="{{ with .Description }}{{ . }}{{ else }}{{if .IsPage}}{{ .Summary }}{{ else }}{{ with .Site.Params.description }}{{ . }}{{ end }}{{ end }}{{ end }}"/>
  {{ with .Site.Params.images }}
    {{ range first 6 . }}
      <meta name="twitter:image" content="{{ . | absURL }}" />
    {{ end }}
  {{ end }}
{{ end }}
~~~

If you choose to do the same or make our own modifications, don't hesitate to test them with Twitter's [card validator](https://cards-dev.twitter.com/validator).  Hopefully it turns out beautifully.

![Successful Twitter Card Validation](http://brendan-quinn.xyz/css/images/twitter-card-validator.jpg)

All the Best,

Brendan
