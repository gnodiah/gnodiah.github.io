---
layout: post
title: "Fucking GFW with GoAgent"
date: 2013-08-24
author: gnodiah
comments: true
categories: [GoAgent] 
tags: [GoAgent, Tutorial] 

---
GFW真是一个神奇而又无处不在的东西，它总是与时俱进地封杀你想访问的网站。如果有可能，真是枪毙它1W次都不过瘾。不过好歹有Google GoAgent，它强大、免费，每天提供1G的流量，足以让你用Google查阅资料，观看Youtube的视频，刷刷Twitter的信息。

环境：Fedora 19

### 准备工作
Linux下运行GoAgent所需的依赖库有：python python-devel greenlet gevent
用以下命令依次安装上述依赖：

~~~
sudo yum -y groupinstall "Development Tools"
sudo yum -y install python python-devel libevent libevent-devel
curl -L -O https://github.com/python-greenlet/greenlet/archive/0.4.0.tar.gz && tar xvzpf 0.4.0.tar.gz && cd greenlet-0.4.0 && sudo python setup.py install
curl -L -O https://github.com/downloads/surfly/gevent/gevent-1.0rc2.tar.gz && tar xvzpf gevent-1.0rc2.tar.gz && cd gevent-1.0rc2 && sudo python setup.py install
~~~

### 安装GoAgent
1. [下载GoAgent][1]并解压，进入GoAgent目录
2. 进入server目录`cd server`，执行上传服务器命令`python uploader.zip`，
   按照提示输入appid以及邮箱地址和密码。如果没有appid，去[Google App Engine官网][2]申请然后再执行第二步就OK了。
   然后修改local/proxy.ini中的[gae]下的appid=你的appid(多appid请用|隔开)以激活客户端。

### 设置开机启动
安装好后，你当然可以在终端中进入GoAgent目录，然后输入`python local/proxy.py`来启动GoAgent。但每次开机都输入这样一条命令未免太过麻烦，因此我们可以把它加入到自启列表中。这里有两种设置开机自启方式，一种是直接用命令启动：

~~~
终端运行gnome-session-properties
在出现的图形设置界面中新增一条启动项，在Command处填写python [你的GoAgent目录]/local/proxy.py即可
~~~

第二种是以图形界面方式启动，这需要先安装GoAgent的GTK图形界面，依次执行以下命令即可：

~~~
sudo yum -y install python-appindicator vte
cd [你的GoAgent目录]/local/
python addto-startup.py
~~~

请根据自己是否需要GoAgent的图形界面来决定使用上述哪种自启方法。我一般不需要它的图形界面，而是希望开机时它能够默默启动，这样开机后我就能直接在浏览器中使用，所以我选择了第一种方式。

### Chrome设置

1. 安装Proxy Switchy Sharp扩展：打开[Chrome扩展页面][3]，将local/SwitchySharp.crx文件拖入到浏览器中安装
2. 导入配置：点击Proxy SwitchySharp图标=>选项=>导入/导出=>从文件恢复，选择local/SwitchyOptions.bak导入
3. 更新规则：先运行goagent：`python proxy.py`，然后在扩展设置页点击切换规则=>立即更新列表=>保存

好了，一切就绪。赶紧登陆Twitter发布一条推文吧！

### 设置Gravatar头像
设置好GoAgent后，想注册[Gravatar][6]账号，给自己设置一个全球通用头像，却发现注册不成功，始终报"Sorry, but this user-agent is banned from using the password retrieval tool."错误。查阅资料后发现，经过GoAgent访问网站的会在User-Agent中加入一个"AppEngine-Google"标识，可能Worldpress为了安全考虑屏蔽了这类注册。

所以考虑用Free Gate进行注册，但是这家伙翻墙实在是太慢了，而且还不稳定。没办法，买不起VPN，就只能忍受龟速了。好歹最终还是注册成功，然后立马换用GoAgent登陆设置头像，OK，搞定！

> 申请Google App Engine请参考：[GoAgent平台部署教程][4]
>
> Ubuntu上安装GoAgent请参考：[Ubuntu GoAgent使用教程][5]





[1]: https://goagent.googlecode.com/files/goagent-goagent-v3.0.2-11-g52ed37f.zip
[2]: https://appengine.google.com/
[3]: chrome://extensions/
[4]: https://code.google.com/p/goagent/wiki/InstallGuide
[5]: https://code.google.com/p/goagent/wiki/GoAgent_Linux
[6]: http://en.gravatar.com/
