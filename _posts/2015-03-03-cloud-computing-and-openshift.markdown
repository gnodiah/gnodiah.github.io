---
layout: post
title: "谈谈对云计算的一些理解"
date: 2015-03-03
author: Hayden Wei
comments: true
categories: [云计算]
tags: [云计算, OpenShift]
duoshuo_thhead_key: 3

---
现如今无论公司还是个人，都在讲云计算，似乎一听到**云计算**这个词就觉得高大上。那么到底什么是云计算呢？

### 什么是云计算？

目前使用最多的对云计算的定义是这样的：

> **云计算**是一种按使用量付费的模式，这种模式提供可用的、便捷的、按需的网络访问， 进入可配置的计算资源共享池（资源包括网络，服务器，存储，应用软件，服务），这些资源能够被快速提供，只需投入很少的管理工作，或与服务供应商进行很少的交互。

以上是美国国家标准技术研究所（NIST）给出的定义[^CloudComputing]，大家千万不要被云计算这三个字中的“计算”两个字所误导而认为这是一种关于数学计算方面的新技术；实际上它代表的是一种模型或者叫模式。

举个例子来说，我做了一个网站来提供图片存储服务，你通过访问网站来上传和下载你存储的图片。对于你（使用者）来说，上传的图片存到什么地方去了、后台有多少台服务器、服务器的网络带宽是多少...等等这些问题你一无所知，就像被云遮住了一样什么都看不见（整个网站服务就像是一朵云，你把图片扔进云里它就存储好了，要用的时候直接从云里去拿，至于这是一朵什么云你一概不知也不需要知道，这就是**云**的概念）；再加上这些服务都跟计算机或者大量计算相关，所以类似于我提供的这种服务模式就叫做**云计算**，而我就叫做**云计算服务提供方**。

目前云计算领域主要包含3大部分内容，即Infrastructure as a Service（IaaS，基础设施即服务）、Platform as a Service（PaaS，平台即服务）、 Software as a Service（SaaS，软件即服务）。

### IaaS, PaaS和SaaS的区别

IaaS, PaaS和SaaS是目前云计算领域的主要组成部分。如果把整个云计算想象成一个栈的话，那么IaaS就在最底层，SaaS在最顶层，而PaaS在它们之间。

![云计算](http://7x2vza.com1.z0.glb.clouddn.com/cloud-computing.png)

* **IaaS（基础设施即服务）**

  IaaS是一种将服务器、存储资源、网络配置、防火墙等一系列基础设备综合起来提供给用户按需付费使用的服务。

  例如，一个公司如果需要上线一个web产品，那么运维部需要提前采购服务器、购买网络带宽、配置网络和防火墙等等，往往光是采购服务器这一步就可能需要花费一周的时间，大大延迟了产品的上线时间；而且每次新增服务器都需要重复以上过程。有了IaaS以后，你只需要考虑选择哪一个IaaS服务提供方，选定后按自己对基础资源的需求购买相应的资源即可（大部分IaaS提供方都可以免费试用），所有关于采购、配置等步骤你都不用管，你只需要在购买的资源上配置运行公司的产品所需要的环境即可。这让你仅仅聚焦于如何搭建和发布产品环境而不是繁琐的服务器采购和配置工作。

  目前IaaS服务主要提供云存储和硬件资源虚拟化（比如上例中的服务器资源），在这方面做的最好最大的是[Amazon Web Service（AWS）](http://aws.amazon.com/cn/)，国内也有诸如[腾讯云](http://www.qcloud.com/)这样的服务。

* **PaaS（平台即服务）**

  PaaS通常是在IaaS基础上提供的一种平台服务，且多聚焦于web解决方案。它在IaaS基础上将运行某一语言所需要的环境安装好后直接提供给用户（**主要是开发者**）使用，让用户专注于产品的创新和快速原型的开发，而不是完成从购买服务器、安装产品运行环境到部署代码等整个繁琐的过程。

  比如，你有一个很好的idea，已经用Rails来实现了它，现在迫切需要发布到网上进行推广验证。因此接下来你要购买一个服务器、购买域名、安装和配置Nginx、安装Ruby和Rails、安装MySQL数据库...然后部署代码进行测试是否部署成功。天啦，想想都觉得头痛！现在有了PaaS，你只需要两步：第一步选择开发平台（比如Rails），第二步提交代码，然后就可在线上进行访问了。所有有关该开发平台的环境配置、服务器配置、数据库安装都由PaaS帮你完成，让你更专注于代码开发从而快速实现一个好的创意。

  PaaS平台现在有很多，比如GAE，OpenShift，Heroku，国内的SAE， BAE等等。

* **SaaS（软件即服务）**

  回想一下我们平常是怎样使用软件的？当我们需要使用一个软件时，我们需要下载它、安装它，然后才能使用，此时该软件是实实在在存在于我们的计算机上的。比如在以前你要收发邮件时需要下载并安装邮件客户端，还需要配置POP/SMTP地址，而且还需要时刻小心垃圾邮件占尽了磁盘空间，当软件有更新时你还需要下载更新...但有了SaaS就不一样了，再想一下你使用Gmail的场景：你仅仅在浏览器中输入了一个网址，再登录以后居然就可以收发邮件了。

  这就是SaaS，它是一种通过Internet提供软件的模式，用户无需购买和安装软件，直接向提供方租用（免费或者付费）基于Web的软件。典型的SaaS应用有Gamil, [Microsoft Office Online](https://office.live.com)等等。

当然，作为一名开发者，最为关心的应该就是PaaS了，因此下面就来谈谈OpenShift的使用。

### OpenShift的使用

####  1. 什么是OpenShift？

[OpenShift](https://www.openshift.com/)是Red Hat公司推出的一种PaaS服务，它支持Java（Wildfly, JBossEAP, Tomcat）, PHP, Node.js, Python, Ruby, Perl, MySQL, PostgreSQL, MongoDB, Jenkins, Cron, 以及JBoss xPaaS Services (Fuse, BPM Suite, BRMS, Data Virtualization, Aerogear等等)，可以说包含了目前所有的主流开发平台。

OpenShift提供了3种版本：OpenShift Origin，OpenShift Online和OpenShift Enterprise。其中OpenShift Origin开源并托管于[Github](https://github.com/openshift/origin)上，你可以用它来搭建自己的本地PaaS服务；OpenShift Online则是定期从OpenShift Origin打包发布的主要针对开发者的PaaS服务；而OpenShift Enterprise则主要提供给企业用户使用。因此作为开发者来讲，我们主要关心并使用的是OpenShift Online。

[注册](https://www.openshift.com/app/account/new)一个OpenShift Online账号后，每个账号就可以**免费**创建并部署3个小应用程序了（small gear），每个应用程序的服务器配置为 512M RAM 和 1G 存储容量，这对于个人项目或者刚刚诞生的Good idea来说已经足够了。

#### 2. 安装OpenShift

OpenShift提供了3种方式来创建和管理应用程序：Web Console、客户端命令行工具rhc，以及Eclipse插件。对绝大多数开发者来说最强大最完整的方式肯定是命令行工具，因此下面就以在CentOS系统上使用命令行工具rhc创建一个Ruby应用的方式来简单介绍一下OpenShift的使用。其他系统安装rhc的方法请参考[这里](https://developers.openshift.com/en/managing-client-tools.html)。

* 准备条件

  rhc是一个Gem包，因此你需要先安装RubyGems。Ruby 1.9+已经内置了RubyGems，所以如果你的系统上已经安装过Ruby 1.9+的版本的话，RubyGems就已经在你的系统上了。如果没有安装过请参考[这里](https://rubygems.org/pages/download)。此外，rhc使用SSH和Git来管理和上传源代码，因此这两个工具也需要安装。

* 安装rhc

~~~
gem install rhc
~~~

* 运行`rhc setup`按提示一步一步[配置rhc](https://developers.openshift.com/en/getting-started-overview.html)

* 配置完成后，即可创建一个应用程序：

~~~
# 可运行rhc cartridge list查看OpenShift支持的所有开发平台
# 创建一个名称为funny的应用程序，开发平台为ruby-2.0
rhc create-app funny ruby-2.0
~~~

OK，就这4步，一个名为funny的Ruby应用程序已经创建并部署到OpenShift上了，现在你就可以访问OpenShift返回给你的应用程序URL来查看它了，厉害吧！

但遗憾的是上述URL并不能在华夏国内访问，因为它已经被功夫网（GFW）给封了。好在**绑定独立域名后是可以访问的**。具体方法为：

1. 首先在你所购买的域名的管理界面中新增域名解析CNAME类型，将OpenShift给你的应用程序的URL解析到你所购买的域名；
2. 在OpenShift应用程序根目录中执行`rhc alias add <应用程序名称> <你购买的域名>`绑定独立域名。

OK，刚刚部署的应用程序现在终于可以正常访问了。关于rhc的更多用法请运行`rhc -h`查看。要了解更多的OpenShift知识或查看每种开发平台的帮助文档请阅读OpenShift的[开发者文档](https://developers.openshift.com/)。

---

[^CloudComputing]: http://www.nist.gov/itl/cloud/
