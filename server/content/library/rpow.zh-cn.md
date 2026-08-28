---
title: RPOW - 可复用的工作量证明
authors:
  - hal-finney
date: 2004-08-15
categories:
  - cryptography
doctype: email
external: http://cryptome.org/rpow.htm
---

<pre>
To: cypherpunks@al-qaeda.net
Subject: RPOW - Reusable Proofs of Work
Date: Sun, 15 Aug 2004 10:43:09 -0700 (PDT)
From: hal at finney dot org ("Hal Finney")
</pre>

我想邀请本邮件列表的成员试用我新的基于 hashcash 的服务器 [rpow.net](/finney/rpow/index.html)。

该系统接收 hashcash 作为工作量证明（POW）代币，交换生成经 RSA 签名的代币，我称之为可复用工作量证明（RPOW）代币。RPOW 可以在人与人之间转让，并在每次转让时交换为新的 RPOW。每个 RPOW 或 POW 代币只能使用一次，但由于它会生成一个新的代币，因此就好像同一个代币可以在人与人之间传递一样。

由于 RPOW 只由等值的 POW 或 RPOW 创建，它们与用于创建它们的 hashcash 一样稀缺和"有价值"。但与 hashcash 不同的是，它们是可以复用的。

该服务器中的新概念是安全模型。RPOW 服务器运行在一个高安全处理器卡上——IBM 4758 安全密码协处理器，通过了 FIPS-140 第四级认证。该卡能够提供板上软件配置的签名证明，任何（有足够动力的）用户都可以对照系统已公开的源代码进行验证。这使得每个人都能看到系统没有后门，并且只在收到等值的 POW/RPOW 代币时才会创建 RPOW 代币。

正是这一点建立了对 RPOW 确实体现其声称价值的信任——即它们事实上是基于等值 POW（hashcash）代币创建的这一认知。

我在 [rpow.net](/finney/rpow/index.html) 上有关于该系统的大量更多信息，以及可下载的源代码。还有一个简单的 Web 界面，让你无需下载客户端即可将 POW 兑换为 RPOW。

该系统目前处于早期 Beta 阶段，如果有人有机会试用，我将非常感谢任何反馈。请注意，如果出现问题，我可能需要重新加载服务器代码，这将使人们之前创建的任何 RPOW 代币失效。所以现在还不要太疯狂地囤积 RPOW。

非常感谢——

Hal Finney
