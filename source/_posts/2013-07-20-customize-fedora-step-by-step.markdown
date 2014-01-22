---
layout: post
title: "Customize Fedora 19"
date: 2013-07-20 01:12
comments: true
categories: [Vim] 

---
## 浏览器
1. Google Chrome

直接进入[Google官网](http://www.google.cn/intl/zh-CN/chrome/)安装即可。

<!-- more -->
## 中文输入法
1. Fcitx（小企鹅）
2. Rime（中州韵）

## 笔记类软件
推荐基于云存储的跨平台笔记类软件wiznote。
fedora上直接到wiz.cn官网下载tar.gz安装包安装即可。

## 添加自定义软件启动快捷方式
gnome 3中默认取消了alacarte，所以安装并设置即可。
> 参考:[How to create custom application launchers in Gnome 3](http://blog.randell.ph/2011/08/01/how-to-create-custom-application-launchers-in-gnome-3/)

## Gnome 3快捷键
*   前进/后退键：alt+left/right，而不再是backspace键
    > 参考:[Set backspace as the Back-Botton](http://linuxg.net/backspace-key-not-working-as-a-back-button-in-nautilus-3-6-2-how-to-fix-this)

## 邮件客户端
1.  thunderbird
```
    官网默认给的是32bit的，64bit机子上不能启动。所以用下面的链接下载64bit版本
    wget ftp://ftp.mozilla.org/pub/mozilla.org/thunderbird/releases/17.0.8/linux-x86_64/en-US/thunderbird-17.0.8.tar.bz2
    tar -jxvf thunderbird-17.0.8.tar.bz2
    cd /usr/bin/
    ln -s ~/Program/thunderbird/thunderbird => 在/usr/bin目录下创建软件启动链接，这样就可以直接用thunderbird命令运行
```

对于邮件客户端，我们通常都希望它能够开机启动，这样才不会错过重要的邮件，并且我们更希望它以最小化的方式启动，就像windows下的开机自动启动软件一样。在linux上，我们可以运行`gnome-session-properties`命令，然后点击'Add'按钮增加一条开机自启命令;然后启动thunderbird，安装名为`MinimizeToTray revived`和`Minimize On Start and Close`的两个扩展程序，前者用于在程序运行过程中最小化到托盘，后者用于设置以最小化形式开机启动。然后设置扩展程序的'Preferences'即可。

2.  配置
    >参考:[thunderbird配置](http://wiki.linux-ren.org/index.php/Thunderbird)

3.  安装Octopress theme时，zsh下执行rake install['octoflat']时要变成rake install\['octoflat'\] why??

## 中文字体推荐
* [文泉驿微米黑](http://wenq.org/wqy2/index.cgi?SpreadWQYMicroHei)
* [微软雅黑](http://yun.baidu.com/share/link?shareid=4210301939&uk=302933770&third=0)
* [宋体](http://www.filecrop.com/simsun.ttf.html)
* [consolas-雅黑]()

因为现在很多网站在设计时选用的字体通常都是**微软雅黑**和**宋体**,但是fedora的默认字体是**文泉驿正黑**，当在系统中找不到网站设计时定义的字体时就会用系统默认的字体去渲染。虽然我们可以在浏览器中设置浏览器的默认显示字体，但由于在网站中定义的字体的优先级高于浏览器所设置的默认字体，所以这些网站在fedora下的显示效果不尽如人意。因此我们通常在装好系统后都要**安装以上两种字体**，这样基本上所有的网站看起来都和windows下差不了太多。

## 必备优化软件
1. Gnome Tweak Tool

[Gnome Tweak Tool](https://wiki.gnome.org/GnomeTweakTool)是一款用来自定义优化Gnome高级特性的图形界面工具。它可以用来安装gnome-shell主题、改变字体、恢复桌面功能、修改标题栏、字体反锯齿等等。
```
    安装方法：sudo yum install gnome-tweak-tool [会同时安装gnome-shell-extension-common和gnome-shell-extension-user-theme]
```

2. Sublime Text

[Sublime Text](http://www.sublimetext.com/3)是一款非常强大且好用的文本编辑器。但它的价格实在是太高了，对于我等来说还不足以支付，所以暂且对其破解之。
```
    破解方法：
    去[官网](http://www.sublimetext.com/3)下载tar.bz2包并解压（当前版本为build 3047）
    进入解压目录并用vim打开其二进制文件: `sudo vim sublime_text`
    将其转换为十六进制: 在vim中输入`:%!xxd`
    搜索字符串`4333 3342 3032`,将`3342`改为`3242`
    转换为二进制并保存: `:%!xxd -r`,然后`:wq`
    运行二进制文件并输入算好的注册码就大功告成了

    附两个算好的注册码：
    —–BEGIN LICENSE—–
    Jat
    Unlimited User License
    EA7E-4656
    D6B5CE42CFFD356FD6F782BE4D8D6E9A
    F2DD8A265E67DD14C9B6627E9103E290
    16FEB67F9DBE65D8434A31D2352A9C80
    D7DDCC7BCCCA381D521F5DF49B0F7E5C
    5A1B8F4ADE30EF20BEF4020B4D899AE4
    60FE1355D8A8B71FE7350B52B4D88969
    F42E6248426E64B6BB85A1217AFB7F04
    51432FBA46AA531550D638910BAD6FE3
    —–END LICENSE—–
    
    —–BEGIN LICENSE—–
    SinoSky
    Unlimited User License
    EA7E-17525
    C14974DF6829CA02CA9C0D9D53ED6D17
    0B753302A37BA6997616AC6A88FF69C8
    E62B834C8250634C2A7E5E5D0BE3A284
    756FD4E2B4FEAC1775868B78E8ACC70C
    F7AA16FF7894A0E3F6B1DBCA940D20A6
    3C86FC4CB4EFE4B55FC65846AB8C129F
    EF9EBEA0476ECAD25CDE43FB6EB3F211
    497120783280FAE7DFA8CEAB405EFECD
    —–END LICENSE—–
```
>   参考[sublime text crack](http://www.sinosky.org/sublime-text-crack-linux.html)
