---
title: 自由的杀手级应用
authors:
  - daniel-krawisz
date: 2013-05-29
excerpt: "如果比特币成为货币，政府对货币的控制将就此终结。"
image: bitcoincarebears.gif
image_alt: 比特币爱心熊
series: crypto-anarchy-and-libertarian-entrepreneurship
series_index: 3
---

[_第一章：战略_](/mempool/crypto-anarchy-and-libertarian-entrepreneurship-1/ "密码无政府主义与自由意志主义创业 – 第一章：战略")

[_第二章：公钥密码学_](/mempool/crypto-anarchy-and-libertarian-entrepreneurship-2/ "密码无政府主义与自由意志主义创业 – 第二章：公钥密码学")

---

## 比特币的运作方式

毫无疑问，利用密码学可以创建的自由社区中，最伟大的范例就是 [比特币](http://bitcoin.org/)——由 Satoshi Nakamoto 发明的数字现金系统，其真实身份至今仍是个谜。比特币使用了我在前几章中描述的所有原理。它建立在自由软件之上，并使用公钥密码学来确立身份和确保其中传递的消息的有效性。

比特币是一种独立于银行和政府的点对点数字现金。关于比特币运作方式的详细解释，Satoshi 的[原论文](/bitcoin/)非常易读，[^1] 但它的运作方式完全遵循我[上文概述](/mempool/crypto-anarchy-and-libertarian-entrepreneurship-2/)的原理。每个人都有一个或多个钱包文件，其中包含公钥和私钥。比特币软件可以构造由钱包私钥签名的消息，声明将一定数量比特币的所有权转移到另一个钱包。

所有比特币交易的历史都存储在一个公开可查的数据库中，称为区块链。区块链在许多计算机上都有副本。一个钱包包含多少比特币，可以通过读取区块链来得知。这就是比特币使用我上面描述的声誉系统的方式。钱包的先前历史决定了它的能力。如果它已经花掉了所有发送给它的比特币，那它就不能再花费了。

因此，密码学确保了比特币的行为类似于物理稀缺商品，尽管它们只是计算机中的数字。新的比特币无法被创造出来，因为它无法追溯到区块链中的任何有效历史。交易无法被伪造，因为它们需要花费钱包的数字签名。

<figure>
  <img src="/static/img/library/bitcoin/transactions.svg" alt="" />
</figure>

区块链是通过一个精心设计的过程生成的，该过程旨在确保对交易历史始终存在共识。之所以需要关注这个问题，是因为有可能同时进行两笔或多笔各自有效但彼此不兼容的交易。例如，假设某人拥有至少一个但少于两个比特币，他同时进行两笔各花费一个比特币的交易。大家必须就哪笔交易被接受、哪笔被拒绝达成一致。

这是通过使区块难以生成来实现的——要求它们满足某些任意规则。作为交易费和无主比特币的回报，人们运行他们的计算机来尝试生成新区块。一旦一个区块被创建，它就拥有优先权，而要产生一个竞争性区块就很困难了。区块的创建者决定哪些交易会被纳入其中。随着区块链的增长，从过去某个时间点开始分支以产生竞争链的难度呈指数级增加。

比特币的匿名性并不如人们期望的那样好。虽然没有什么能证明谁拥有某个特定的钱包，但可以通过扫描区块链寻找线索，将钱包与某个人关联起来。这是比特币最显著的缺点。然而，正在开发中的一项可能的比特币升级方案 [Zerocoin](http://blog.cryptographyengineering.com/2013/04/zerocoin-making-bitcoin-anonymous.html) 将大大提高匿名性。[^2]

奥地利经济学派内部对于比特币是否真的适合甚至可能成为货币存在争议。然而，比特币的批评者们只是无知罢了。他们对黄金的热爱超过了他们的客观性。[^3] 我不打算在此对比特币进行经济学分析，但 Peter Šurda 和 Konrad Graf 等奥地利学派作者已经非常清晰地证明了比特币作为货币是完全可行的，如果它成为货币也不会违反任何经济学定律。[^4]

## 展望未来

比特币是对 PayPal、信用卡、银行的巨大改进，甚至在许多方面优于黄金。它可以瞬间传送到世界任何地方，而无需依赖任何机构——除了一台分布式计算机网络。一个妥善保管的比特币钱包是无法被盗窃的。银行已经过时了。创造新的比特币比创造黄金更困难。用核反应制造黄金的机器是可能造出来的。而要说服比特币社区接受允许其货币被膨胀的软件更改则要困难得多。比特币有潜力——而且我坚信极有可能——成为历史上最伟大的发明之一。它坚定地站在自由意志主义者一边。

如果比特币成为货币，政府对货币的控制将就此终结。将不再有供政府合谋的银行。通胀的黑暗时代将结束。虽然比特币只有四年的历史，但它已经震撼了全球市场。几乎所有在网上销售的东西都可以用比特币购买。阿根廷人和伊朗人用它来逃避资本管制。美国的监管者在[电视上被公然嘲笑](http://video.cnbc.com/gallery/?video=3000166533 "CFTC Explores Bitcoin")——只因他们表达了监管比特币的可能性。它的增长已经令人惊叹，而随着它的增长，它只会变得更加有用。它就像[那个怪物](http://www.youtube.com/watch?v=HCtcgI4BcIQ)。没有人能阻止它。

黑市正在繁荣发展，其程度在几年前看来是不可能的。依托比特币和 [Tor](https://www.torproject.org/ "Tor Project")，[丝绸之路网站](<http://en.wikipedia.org/wiki/Silk_Road_(marketplace)> "丝绸之路")开设了一个违禁品市场。它不需要隐藏自己的存在。这个非凡的网站向所有人敞开，自信地挑战着禁毒战争。国家无法发现它的服务器在哪里。它的银行账户无法被关闭。

这就是我们所生活的世界。比特币是一个改变游戏规则的存在。它挑战了全世界的现状。这就是密码学所能实现的。然而比特币只是我在[第一章](/mempool/crypto-anarchy-and-libertarian-entrepreneurship-1/ "密码无政府主义与自由意志主义创业 – 第一章：战略")中所描述内容的一个应用。比特币不仅仅是一个带有秘密表情符号信号的在线论坛之类的玩意。它是一个真实的社区和真实的商品——尽管它仅仅建立在一个密码学协议和一些实现该协议的软件之上。更多的可能性远不止于此。任何建立在密码学之上的社区都可能像比特币一样强大。所需要的只是一个新的应用。

比特币网络为我们提供了一个自由意志主义立法的范例。比特币协议是一条法则，任何与比特币网络交互的人都必须遵守。否则，网络就不会接受他。它的作者不是民选代表，而是一位匿名的天才，他只是把自己的提案留给我们来采纳。

<figure>
  <img src="/static/img/mempool/crypto-anarchy-and-libertarian-entrepreneurship-3/blockchain.png" alt="区块链" />
</figure>

作为自由意志主义战略，我们应该说服人们更广泛地使用密码学。我们可以通过创造新的密码学产品并使人们喜爱它们来做到这一点。人们越是习惯于密码学社区的概念，就越会需要它。他们得到的越多，压迫者的力量就越弱。我们需要一个密码学股票市场。我们需要一个密码学合同裁决系统。我们需要一个密码学信用评级系统。我们需要一个密码学社交网络。[^5] 所有这些梦想都是可能的，还有许多超乎我想象的东西。这些都不需要赢得选举，但每一个都能改变世界。

---

[_第四章：来自软件行业的风险_](/mempool/crypto-anarchy-and-libertarian-entrepreneurship-4/ "密码无政府主义与自由意志主义创业 – 第四章：来自软件行业的风险")

[^1]: Nakamoto, S., ["Bitcoin: A Peer-to-Peer Electronic Cash System"](/bitcoin/), 2008年。

[^2]: Miers, I., Garman, C., Green, M., Rubin, A., ["Zerocoin: Anonymous Distributed E-Cash from Bitcoin"](http://spar.isi.jhu.edu/~mgreen/ZerocoinOakland.pdf), 2013年4月9日。

[^3]: 参见 Gertchev, N., ["The Moneyness of Bitcoin"](http://mises.org/daily/6399/The-Moneyness-of-Bitcoins), Mises Daily, 2013年4月14日——一篇用主观偏好替代经济理论的文章。参见 Korda, P., ["Bitcoin: Money of the Future or Old-Fashioned Bubble?"](http://mises.org/daily/6401/Bitcoin-Money-of-the-Future-or-OldFashioned-Bubble), Mises Daily, 2013年4月9日——充斥着无关的胡言乱语。参见 Shostak, F., ["The Bitcoin Money Myth"](http://mises.org/daily/6411/The-Bitcoin-Money-Myth), Mises Daily, 2013年4月17日——我见过的最荒谬的比特币文章。

[^4]: 参见 Šurda, P., ["Economics of Bitcoin: is Bitcoin an Alternative to Fiat Currencies and Gold?"](/static/docs/economics-of-bitcoin.pdf), 2012年——一份精彩而详细的比特币分析。另见作者的[博客](http://www.economicsofbitcoin.com/)。参见 Graf, K., ["Bitcoins, the Regression Theorem, and that Curious but Unthreatening Empirical World"](http://konradsgraf.com/blog1/2013/2/27/in-depth-bitcoins-the-regression-theorem-and-that-curious-bu.html), 2013年2月23日——关于比特币和回归定理的精彩讨论。另见该作者的[博客](http://konradsgraf.com/)。

[^5]: 有一个叫做 [RetroShare](http://retroshare.sourceforge.net/) 的出色程序，它通过加密的分布式网络（无中央服务器）复制了 Facebook 的许多功能。然而，这个程序在有机会流行之前还需要大量的改进。
