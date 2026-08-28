---
title: 分布式权威及其声明验证
authors:
  - nick-szabo
date: 1997
categories:
  - cryptography
doctype: essay
external: https://web.archive.org/web/20160417035139/http://szabo.best.vwh.net/authorities.html
---

[声誉系统](/negative-reputations/)最终需要基于事实而非仅仅基于观点或信仰才能有效。例如，如果我们要有一个好的信用评级系统，我们需要确信评级机构收集的信用记录足够准确。声誉信息通常由受信任的权威机构来收集和分发。其他类型的特定履约也常常委托给第三方；我称此类第三方为"权威"。我们必须能够信任权威机构（信用机构、杀毒软件供应商、证书颁发机构、数字现金铸币厂等）的特定声明（关于信用度、危险字节模式、身份、货币供应的守恒等）。正如里根所说，"信任但要验证"。为了配得上我们的信任，权威机构必须让我们相信它们的声明是真实的。我们需要能够"探测"它们的真实性，验证某些声称的交易确实发生了。在市场经济中存在一整个行业来执行这一功能：审计。

在商业和政治领域早就认识到，当权力被分散时，权威更加值得信任。考虑以下粗糙但有效的"协议"：

_[权力分立](https://avalon.law.yale.edu/18th_century/fed47.asp)_：政治权力分为几个分支，每个分支只负责权力的某些方面（例如一个机构立法，另一个不同的机构执法）。

_[职责分离](https://web.archive.org/web/19990427063637/http://www.bus.orst.edu/faculty/brownc/lectures/controls/control1.htm)_：在大型企业中，交易被分解以使任何单个人都无法实施欺诈。我称之为"必要共谋原则"。例如，仓库/交付、销售和收款功能各由不同方执行，有一项政策要求每一方向第四个职能部门——会计——报告每笔交易。任何单一报告的活动（例如，交付但未收到付款）都表明存在潜在的欺诈（例如，向客户交付了货物而付款被中饱私囊而非纳入公司金库）。职责分离是审计师最喜欢的工具。在它缺失的地方，审计师会大喊"违规"，就像一个好的工程师对单点故障的反应一样。许多密码系统理所当然地走向了商业失败，因为它们归结为对单一实体的信任，而不是分离功能以要求共谋。

讽刺的是，利用密码学，我们可以大大改进传统的审计技术（职责分离、与交易对手方的账本进行交叉核对等）。我将简要提及三种机制：

## 仲裁

基于执行或控制资源所需密钥的[秘密共享](https://web.archive.org/web/19990423083549/http://cacr.math.uwaterloo.ca/%7Edstinson/ssbib.html)，对资源执行或控制进行仲裁（又称阈值）分布。例如，[Markus Jacobsson](https://web.archive.org/web/20120113024315/http://cseweb.ucsd.edu/users/markus/) 设计了一个由 M 个铸币厂组成的仲裁来签署数字货币。仲裁建立了 M-out-of-N 的"必要共谋"来执行一项功能，提供了比职责分离中典型的 2-out-of-N 更强的保护选项，以及对职责分离底层安全性的更大信心。

<h2 id="post-unforgeable-auditing-logs">事后不可伪造审计日志</h2>

传统上，审计师会联系交易对手方以验证一笔交易确实发生了。（"必要共谋原则"再次发挥作用。）通过事后不可伪造日志，利用[单向哈希函数的层次系统](https://web.archive.org/web/20160417035139/https://web.archive.org/web/19980218081923/http://www.surety.com/howfiles/detail3.html)，一方可以在完成交易时通过发布签名的交易流累积哈希来公开承诺交易。交易的保密性得到完全维护，直到审计师"探测"该交易以确定其实际性质。交易对手方的身份可以保密，因为不需要它来确立交易的其他事实。唯一的攻击是在交易本身发生的实时伪造交易，在大多数实际情况下这是不可行的。大多数会计欺诈涉及分析已完成的交易集然后伪造它们，使其计算出期望的反事实结果。

<h2 id="mutually-confidential-auditing">互相保密审计</h2>

[多方安全计算](https://web.archive.org/web/19981202092848/http://harvest.transarc.com/afs/transarc.com/public/beaver/html/research/publications/biblio.html#mpp)允许 N 方共享一次计算，每一方只能了解到可以从其自己的输入和计算输出中推断出的信息。例如，各方可以对共享的交易日志计算汇总统计量，包括与交易对手方的日志进行交叉核对，而无需泄露这些日志。不幸的是，直接的多方安全计算太慢了（每条"大数"机器指令需要一次互联网消息），但知道这种能力原则上存在可能会引导我们找到实际的解决方案。

通过组合这些密码学能力，我们可以对权威机构声明和报告的事实性获得非常高的信心，而无需从这些报告背后的交易中揭示身份信息和其他详细信息。这些为进一步的声誉系统和受信任第三方系统提供了基础，这些系统在时间、通信、汇总过程中保持完整性，同时为交易参与者保护保密性。

## 参考文献：

<ul class="references">
  <li>BRICS, <a href="https://web.archive.org/web/20160417035139/http://www.brics.aau.dk/BRICS/Activities/95/SecMultComp/index.html">"A BRICS Course on Secure Multi-Party Computation"</a></li>

  <li>Carol Brown, <a href="https://web.archive.org/web/19970808205719/http://www.bus.orst.edu/faculty/brownc/lectures/controls/control1.htm">"Internal Control Concepts"</a></li>

  <li>Publius (James A. Madison), Federalist No. 47 — <a href="https://avalon.law.yale.edu/18th_century/fed47.asp">"The Particular Structure of the New Government and the Distribution of Power Among Its Different Parts"</a></li>

  <li>Publius (James A. Madison), Federalist No. 47 — Federalist No. 48 — <a href="https://avalon.law.yale.edu/18th_century/fed48.asp">"These Departments Should Not Be So Far Separated as to Have No Constitutional Control Over Each Other"</a></li>

  <li>Douglas Stinson, <a href="https://web.archive.org/web/19990423083549/http://cacr.math.uwaterloo.ca/%7Edstinson/ssbib.html">"Bibliography on Secret Sharing Schemes"</a></li>

  <li>Surety Technologies, <a href="https://web.archive.org/web/20160417035139/https://web.archive.org/web/19980218081923/http://www.surety.com/howfiles/detail3.html">"Digital Fingerprints"</a></li>

  <li>Nick Szabo, <a href="/negative-reputations/">"Negative Reputation Systems"</a></li>
</ul>

---

请将您的评论发送至 nszabo (at) law (dot) gwu (dot) edu
