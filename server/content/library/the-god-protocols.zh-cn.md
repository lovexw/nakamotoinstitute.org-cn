---
title: 上帝协议
sort_title: 上帝协议
authors:
  - nick-szabo
date: 1999
display_date: 最初发表于1997年
categories:
  - cryptography
doctype: essay
external: https://web.archive.org/web/20140406003844/http://szabo.best.vwh.net/msc.html
---

想象一下理想的协议。它拥有可以想象到的最值得信赖的第三方——一位站在_所有人_一边的神。所有参与者将各自的输入发送给神。神会可靠地确定结果并返回输出。作为终极的告解保密者，任何一方都不会从其他方的输入中学到比从自己的输入和输出中能推断出的更多的东西。

 alas，在我们这个世俗世界中，我们打交道的是人而非神。然而，我们常常被迫以近乎神学的方式来对待人类，因为我们的基础设施缺乏保护自身所需的安全性。

<h2>受信任的第三方</h2>

<figure>
  <img src="/static/img/library/the-god-protocols/mutually.gif" alt="" />
</figure>

网络安全理论家们最近已经在惊人的程度上解决了这个问题。他们开发了在两方或多方之间创建虚拟机的协议。多方安全计算允许任意数量的参与方共享一个计算，每方只能了解到从自己的输入和计算输出中可推断出的内容。这些虚拟机具有一个令人兴奋的特性：每一方的输入对其他方都是高度保密的。程序和输出由各方共享。

例如，我们可以在互联网上用这台虚拟计算机运行一个电子表格。我们约定一组公式，并用这些公式设置虚拟计算机。每个参与者拥有自己的输入单元格，这些单元格在其他参与者的计算机上保持空白。参与者共享输出单元格。各自将私有数据输入到自己的输入单元格中。Alice 只能从自己的输入和输出单元格中推断出关于其他参与者输入单元格的信息。

<h2>数学上可信赖的协议</h2>

<figure>
  <img src="/static/img/library/the-god-protocols/virtual.gif" alt="" />
</figure>

存在三个主要局限性。第一个是这台虚拟计算机非常慢：在某些情况下，每次算术运算需要一条网络消息。目前它最多只能用于小型逻辑或算术计算，作为更高效计算和协议的辅助或组件。

第二个局限性是隐私、公平性和容错性之间存在权衡。公平性意味着所有方都能以这样的方式获知结果：没有人可以通过先获知结果而获得优势。容错性可以提供对少数方的抵御能力，使得需要多数方退出才能中止协议；也可以是鲁棒性较低但故障即停的，使得单个参与者就能终止协议。许多论文讨论了为确保得到正确输出所需信任的参与方比例。在传统结论中，当多数方存在故障时，公平性和隐私性无法同时实现。最近的论文<sup><a href="#fn3" id="ref3">[3]</a></sup><sup><a href="#fn4" id="ref4">[4]</a></sup><sup><a href="#fn5" id="ref5">[5]</a></sup><sup><a href="#fn6" id="ref6">[6]</a></sup>即使在多数方存在故障的情况下也实现了公平和保密的协议。它们以鲁棒性换取针对任何比例故障方的隐私和公平性。这种故障即停方法的优势在于，通常可以找到新的合作伙伴重新开始，但不会遭受不可逆的损失，例如信息泄露、独自承担后果或被错误结果误导。

第三个局限性是，远非全知全能，该协议只会完成算法和输入中指定的内容。在人类受信任的第三方提供计算机无法提供的洞察或知识的情况下，协议无法替代他们。

有了这些告诫，原则上任何算法中介都可以被一台可信赖的虚拟计算机所替代。在实践中，由于这三个复杂性，我们通常用更高效的元素来构建更有限的协议。

多方计算理论通过使保密的虚拟中介成为可能，在理论上对所有类型的[合约关系](/formalizing-securing-relationships/)都有重大意义。这在谈判领域最为明显。经济学中的"机制"是一个制度的抽象模型，它通过消息与参与者沟通，其规则可以用算法来指定。这些制度可以是拍卖、交易所、投票等。它们通常实现某种谈判或决策过程。

<!-- doesn't look like an auction...
<figure>
  <img src="http://209.73.251.147/smithsonian/issues96/oct96/images/auctioneer.gif" alt="" />
</figure>
-->

经济学家假设存在一个受信任的中介来运作该机制。这里有一个使用这台虚拟计算机来实现机制的简单示例。Alice 可以提交一个买价，Bob 提交一个卖价，然后他们共享的虚拟程序只有一条指令："A 大于 B？"如果 Alice 的出价高于 Bob 的要价，计算机就返回"真"。稍微复杂一点的计算机可以根据多种不同的算法（Alice 的出价、Bob 的要价、取中间值等）决定结算价格。这就实现了"盲谈判"机制，而无需受信任的中介。

原则上，由于任何可计算问题都可以在这台虚拟计算机上解决（它们是"图灵完备"的），任何可计算的经济机制都可以在没有受信任中介的情况下实现。在实践中，我们面临上述三个局限性。但是存在性证明——任何经济机制都可以在没有受信任中介的情况下运行——是非常令人兴奋的。这意味着，原则上，任何可以通过受信任第三方（如拍卖或交易所）进行谈判的合约都可以直接进行谈判。因此，在某种抽象意义上，智能合约谈判中仅剩的"困难"问题是：(a) 即使有受信任的中介也被认为是困难的问题（出于标准经济学原因），以及 (b) 用算法指定谈判规则和输出合约条款的任务（包括中介提供了参与者无法获得的知识的情形，例如律师就如何起草合约提供建议）。在实践中，许多原则上可以用多方计算解决的问题，在我们以高效、实用的方式实现协议时会重新出现。上帝协议为我们提供了一个瞄准的目标。

将这种分析应用于合约的履行阶段不那么直接。首先，关于履行阶段的经济学理论不像谈判的机制理论那样成熟或简洁。事实上，大多数经济学理论干脆假设所有合约都可以完美地、无成本地执行。"交易成本"文献中的一些研究已经开始超越这一假设，但在合约执行技术和成本领域，还没有多少令人信服的成果或共识理论。

使用多方安全计算理论进行履行阶段分析，似乎只适用于可以在虚拟计算机内部执行的合约。但是，使用不可后伪造的审计日志，结合在共享虚拟计算机内部运行审计协议，可以使虚拟计算机之外的广泛履约活动至少被选定的仲裁者观察和验证，尽管不能主动自动执行。

这种相互[保密审计](/confidential-auditing/)协议的参与者可以验证账本是否与先前提交的交易日志中存储的交易细节一致，以及数字是否正确加总。参与者可以对保密共享的交易日志计算汇总统计，包括与交易对手方日志的交叉核对，而无需揭示这些日志。他们只能从统计中推断出信息，看不到交易的细节。另一个引人注目的可能性是，虚拟计算机可以长期保持状态，从而实现复杂的保密和自执行的[担保信贷](/credit-with-privity/)形式。

如果相互保密审计变得切实可行，我们将能够在不揭示交易报告中涉及的标识和其他详细信息的情况下，高度确信交易对手方主张和报告的真实性。这些将为可靠的[信誉系统](/negative-reputations/)和其他受信任第三方系统奠定基础，这些系统在时间、通信、汇总过程中保持完整性，并为交易参与者保护保密性。了解相互保密审计原则上可以实现，有望引导我们找到解决这些重要问题的实用方案。

<h2>参考文献</h2>

<ol>
  <li id="fn1">
    <p>D. Chaum, C. Cr&eacute;peau, and I. Damgaard, Multiparty unconditionally secure protocols; In 19th Symp. on Theory of Computing, pages 11-19. ACM, 1988.</p>
  </li>

  <li id="fn2">
    <p>"The Spymasters Double Agent Problem: Multiparty Computations Secure Unconditionally from Minorities and Cryptographically from Majorities," D. Chaum, Advances in Cryptology CRYPTO'89, G. Brassard (Ed.), Springer-Verlag, pp. 591-601.</p>
  </li>

  <li id="fn3">
    <p>C. Cr&eacute;peau, J. van de Graaf, and A. Tapp, Committed Oblivious Transfer and Private Multi-Party Computations; Advances in Cryptology: Proceedings of Crypto '95, Springer-Verlag, pages 110-123, 1995.&nbsp;<a href="#ref3">↩</a></p>
  </li>

  <li id="fn4">
    <p>Complete Characterization of Adversaries Tolerable in Secure Multi-Party Computation, Martin Hirt and Ueli Maurer. Computer Science Department, ETH Z&uuml;rich. 1997. in Proceedings of PODC '97&nbsp;<a href="#ref4">↩</a></p>
  </li>

  <li id="fn5">
    <p>Matthias Fitzi, Martin Hirt, and Ueli Maurer: Trading correctness for privacy in unconditional multi-party computation. In Advances in Cryptology &mdash; CRYPTO '98, volume 1462 of Lecture Notes in Computer Science, 1998.&nbsp;<a href="#ref5">↩</a></p>
  </li>

  <li id="fn6">
    <p>R. Cramer, I. Damgaard, S. Dziembowski, M. Hirt, T. Rabin, Efficient Multi-Party Computations with Dishonest Majority, Proceedings of Eurocrypt '99, Springer Verlag LNCS, to appear (May '99).&nbsp;<a href="#ref6">↩</a></p>
  </li>
</ol>

---

请将您的评论发送至 nszabo (at) law (dot) gwu (dot) edu

Copyright &copy; 1997-1999 by Nick Szabo\
Permission to redistribute without alteration hereby granted
