+++
banner = "css/images/banners/facebook-open-graph-meta-tags-lg.jpg"
categories = ["SEO"]
date = "2016-02-12T03:01:40-05:00"
description = "Find, investigate, and change Hugo's internal templates, open graph and facebook edition."
images = ["http://brendan-quinn.xyz/css/images/banners/facebook-open-graph-meta-tags-seo.jpg"]
menu = ""
tags = ["SEO", "Hugo", "facebook", "Open Graph"]
title = "Working with Hugo's Internal Partial Templates: Facebook and Open Graph"

[params]
  bannerLg = "css/images/banners/facebook-open-graph-meta-tags-lg.jpg"
  bannerMd = "css/images/banners/facebook-open-graph-meta-tags-md.jpg"
  bannerSm = "css/images/banners/facebook-open-graph-meta-tags-sm.jpg"
+++

Hugo's internal templates are a thoughtful idea, [as I discussed earlier](http://brendan-quinn.xyz/post/working-with-hugos-internal-partial-templates-twitter-cards/), but it is important to check out the [source code](live within hugo](https://github.com/spf13/hugo/blob/e445c35d6a0c7f5fc2f90f31226cd1d46e048bbc/tpl/template_embedded.go) in order to be cognizant that you are making the most out of the helper-template.<!--more-->  In supplementing the [theme](http://themes.gohugo.io/theme/hugo-icarus/) this blog is built on, I saw my meta data wasn't filling out or seemed to have some missing chunks.  After investigating the source code, part of the issue was that I wasn't defining my config files correctly.  Once updated, they got me a bit farther.

~~~html
<!-- config.toml -->
...
[params]
  author = "Brendan Quinn"
  description = "Hey there, I'm Brendan Quinn, an energetic introvert with a love of family, walking/hiking, listening, teaching, and code."
  site_description = "Hey there, I'm Brendan Quinn, an energetic introvert with a love of family, walking/hiking, listening, teaching, and code."
  images = ["http://brendan-quinn.xyz/css/images/Brendan-Quinn-seo.jpg"]
...
[social]
...
  facebook        = "quinn.197"
  facebook_admin  = ""
  facebook_app_id = "<!-- Get from the FB Dev Page -->"
...

<!-- content/post/using-html5-responsive-images.md -->
+++
banner = "css/images/banners/responsive-images-landscape.jpg"
categories = ["Responsive Design"]
date = "2016-02-09T16:30:47-05:00"
description = "Using &lt;picture&gt; &lt;source&gt; and &lt;img&gt; HTML5 elements combined with the \"media\", \"srcset\", and \"size\" attributes, it is possible and even necessary to make responsive images for your users."
images = ["http://brendan-quinn.xyz/css/images/banners/responsive-images-landscape-seo.jpg"]
menu = ""
tags = ["CSS", "HTML5"]
title = "Using HTML5 and Media Queries for Responsive Images"

[params]
  bannerLg = "css/images/banners/responsive-images-landscape-lg.jpg"
  bannerMd = "css/images/banners/responsive-images-landscape-md.jpg"
  bannerSm = "css/images/banners/responsive-images-landscape-sm.jpg"
+++
~~~

While this filled out some more fields one compiled, this didn't get me all the way there.  So I made a supplemental partial template for facebook and open graph meta elements.

~~~html
<!-- the old -->

  <!-- themes/theme/layouts/partials/head.html -->
  {{ template "_internal/opengraph.html" . }}
  {{ template "_internal/google_news.html" . }}
  {{ template "_internal/schema.html" . }}
  {{ template "_internal/twitter_cards.html" . }}

  <!-- internal partial -->
  <meta property="og:title" content="{{ .Title }}" />
  <meta property="og:description" content="{{ with .Description }}{{ . }}{{ else }}{{if .IsPage}}{{ .Summary }}{{ else }}{{ with .Site.Params.description }}{{ . }}{{ end }}{{ end }}{{ end }}" />
  <meta property="og:type" content="{{ if .IsPage }}article{{ else }}website{{ end }}" />
  <meta property="og:url" content="{{ .Permalink }}" />
  {{ with .Params.images }}
    {{ range first 6 . }}
      <meta property="og:image" content="{{ . | absURL }}" />
    {{ end }}
  {{ end }}
  {{ if not .Date.IsZero }}
    <meta property="og:updated_time" content="{{ .Date.Format "2006-01-02T15:04:05-07:00" | safeHTML }}"/>
  {{ end }}
  {{ with .Params.audio }}
    <meta property="og:audio" content="{{ . }}" />
  {{ end }}
  {{ with .Params.locale }}
    <meta property="og:locale" content="{{ . }}" />
  {{ end }}
  {{ with .Site.Params.title }}
    <meta property="og:site_name" content="{{ . }}" />
  {{ end }}
  {{ with .Params.videos }}
    {{ range .Params.videos }}
      <meta property="og:video" content="{{ . | absURL }}" />
    {{ end }}
  {{ end }}
  <!-- If it is part of a series, link to related articles -->
  {{ $permalink := .Permalink }}
  {{ $siteSeries := .Site.Taxonomies.series }}
    {{ with .Params.series }}
      {{ range $name := . }}
        {{ $series := index $siteSeries $name }}
          {{ range $page := first 6 $series.Pages }}
            {{ if ne $page.Permalink $permalink }}
              <meta property="og:see_also" content="{{ $page.Permalink }}" />
            {{ end }}
          {{ end }}
        {{ end }}
      {{ end }}
      {{ if .IsPage }}
        {{ range .Site.Authors }}
          {{ with .Social.facebook }}
            <meta property="article:author" content="https://www.facebook.com/{{ . }}" />
          {{ end }}
          {{ with .Site.Social.facebook }}
            <meta property="article:publisher" content="https://www.facebook.com/{{ . }}" />
          {{ end }}
          <meta property="article:published_time" content="{{ .PublishDate }}" />
          <meta property="article:modified_time" content="{{ .Date }}" />
          <meta property="article:section" content="{{ .Section }}" />
          {{ with .Params.tags }}
            {{ range first 6 . }}
              <meta property="article:tag" content="{{ . }}" />
            {{ end }}
          {{ end }}
        {{ end }}
      {{ end }}
      <!-- Facebook Page Admin ID for Domain Insights -->
      {{ with .Site.Social.facebook_admin }}
        <meta property="fb:admins" content="{{ . }}" />
      {{ end }}

<!-- the new -->
  <!-- layouts/partials/head.html -->
  {{ partial "seo/og.html" . }}
  {{ template "_internal/google_news.html" . }}
  {{ template "_internal/schema.html" . }}
  {{ template "_internal/twitter_cards.html" . }}

  <!-- layouts/partials/seo/og.html -->
  <meta property="og:title" content="{{ .Title }}" />
  <meta property="og:description" content="{{ with .Description }}{{ . }}{{ else }}{{if .IsPage}}{{ .Summary }}{{ else }}{{ with .Site.Params.description }}{{ . }}{{ end }}{{ end }}{{ end }}" />
  <meta property="og:type" content="{{ if .IsPage }}article{{ else }}website{{ end }}" />
  <meta property="og:url" content="{{ .Permalink }}" />
  {{ if .IsPage }}
    {{ with .Params.images }}
      {{ range first 6 . }}
        <meta property="og:image" content="{{ . | absURL }}" />
      {{ end }}
    {{ end }}
  {{ else }}
    {{ with .Site.Params.images }}
      {{ range first 6 . }}
        <meta property="og:image" content="{{ . | absURL }}" />
      {{ end }}
    {{ end }}
  {{ end }}
  {{ if not .Date.IsZero }}
    <meta property="og:updated_time" content="{{ .Date.Format "2006-01-02T15:04:05-07:00" | safeHTML }}"/>
  {{ end }}
  {{ with .Params.audio }}
    <meta property="og:audio" content="{{ . }}" />
  {{ end }}
  {{ with .Params.locale }}
    <meta property="og:locale" content="{{ . }}" />
  {{ end }}
  {{ with .Site.Params.title }}
    <meta property="og:site_name" content="{{ . }}" />
  {{ end }}
  {{ with .Params.videos }}
    {{ range .Params.videos }}
      <meta property="og:video" content="{{ . | absURL }}" />
    {{ end }}
  {{ end }}
  <!-- If it is part of a series, link to related articles -->
  {{ $permalink := .Permalink }}
  {{ $siteSeries := .Site.Taxonomies.series }}
  {{ with .Params.series }}
    {{ range $name := . }}
      {{ $series := index $siteSeries $name }}
        {{ range $page := first 6 $series.Pages }}
          {{ if ne $page.Permalink $permalink }}
            <meta property="og:see_also" content="{{ $page.Permalink }}" />
          {{ end }}
        {{ end }}
      {{ end }}
    {{ end }}
    {{ if .IsPage }}
      {{ range .Site.Authors }}
        {{ with .Social.facebook }}
          <meta property="article:author" content="https://www.facebook.com/{{ . }}" />
        {{ end }}
        {{ with .Site.Social.facebook }}
          <meta property="article:publisher" content="https://www.facebook.com/{{ . }}" />
        {{ end }}
        <meta property="article:published_time" content="{{ .PublishDate }}" />
        <meta property="article:modified_time" content="{{ .Date }}" />
        <meta property="article:section" content="{{ .Section }}" />
        {{ with .Params.tags }}
          {{ range first 6 . }}
            <meta property="article:tag" content="{{ . }}" />
          {{ end }}
        {{ end }}
      {{ end }}
    {{ end }}
    <!-- Facebook Page Admin ID for Domain Insights -->
    {{ with .Site.Social.facebook_admin }}
      <meta property="fb:admins" content="{{ . }}" />
    {{ end }}
    {{ with .Site.Social.facebook_app_id }}
      <meta property="fb:app_id" content="{{ . }}" />
    {{ end }}
~~~

As you can see I still have some work to do here.  Even after cleaning it up and making some small changes to <code>og:image</code>  I still think this is one <code>{{ end }}</code> tag away from complete.  But, hey, during testing it worked out, so I will continue to play and update this post if any new information comes to light.  

Oh, and as always, don't forget to test your meta data with facebook's [Open Graph Object Debugger](https://developers.facebook.com/tools/debug/og/object/)!

![Facebooks Open Graph Debugger](http://brendan-quinn.xyz/css/images/facebook-open-graph-debugger.jpg)

All the Best,

Brendan
