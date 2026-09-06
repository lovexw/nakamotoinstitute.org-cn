---
title: 基于所有者授权的安全产权制度
authors:
  - nick-szabo
date: 1998
display_date: 最初发表于1998年
categories:
  - cryptography
  - law
doctype: essay
external: http://szabo.best.vwh.net/securetitle.html
---

文字的出现极大地改善了产权的记录方式，并确实催生了我们现代的产权制度和法律体系。然而，事实证明书面记录极易遭到滥用。在[政治动荡或压迫](http://chronicle.com/free/99/06/99061701t.htm)时期，一种常见的模式是通过伪造或销毁公共记录来没收土地。即使可以通过非正式记录（如电话簿中记载的居住信息）进行重建，这种做法不仅成本高昂，而且充斥着错误和欺诈的可能性<sup><a href="#fn1" id="ref1">[1]</a></sup>。在发展中国家，大量甚至大多数财产都没有经过正式登记<sup><a href="#fn2" id="ref2">[2]</a></sup>。即使在发达国家的政治稳定时期，[产权](http://hobbyfarm.com/buysell11.html)方面也会出现许多代价高昂的问题。<sup><a href="#fn3" id="ref3">[3]</a></sup> 将书面记录直接转录到集中式的在线数据库中，会使许多问题变得更加严重——电子记录极易遭受丢失和伪造，而内部人员是此类攻击最常见的来源。本文提出一种安全、分布式的产权登记数据库，以在未来防止此类对产权的攻击。

许多种互联网资源都有一个基本特征：用户必须在信任边界之间就其控制权达成一致。一个重要的例子是名称。文章["名称：去中心化、安全、人类可读：三者择其二"](https://web.archive.org/web/20120204172516/http://zooko.com/distnames.html)不仅否定了这一问题的普遍性和重要性，还否定了找到解决方案的可能性。<sup><a href="#fn4" id="ref4">[4]</a></sup> 取而代之的是提出了[宠物名](http://www.erights.org/elib/capability/pnml.html)。宠物名充其量只是将人类可读名称转换为密码学名称的助记符；它们无法在信任边界之间保障命名的安全性。所有三个属性——去中心化、安全和人类可读——都必须得到满足，人们才能在互联网上进行安全的通信和被通信，本文与[分布式安全进展](/advances-in-distributed-security/)一文一起展示了如何同时实现这三个属性。

更一般地，我们展示了如何实现完全由协议强制执行的、可转让的全球性权利，适用于名称、归属权、[bit gold](/bit-gold/)以及类似的纯信息财产——这些财产由特定实体拥有但由公众持有和依赖；我们还展示了如何为其他类型的财产实现安全的产权登记数据库。关于完全由协议强制执行的跨信任边界权利的一个具体示例，请参见我关于[跨信任边界文件系统中的名称完整性](/p2p-filename-integrity/)的提案。

在所有涉及产权的情况下，都存在一个已定义的空间，无论是命名空间还是物理空间，任务是对该空间的细分单元达成关于简单属性或控制权的共识。在某些情况下，名称或其他符号对应着某个人所拥有或控制的人或物。例如，互联网用户必须就哪个域名对应哪个网站运营商达成一致。在其他情况下，我们仅仅关心对空间细分的控制权。对于房地产，我们必须就谁拥有一块土地的各项权利（地表占据权、地下矿产开采权等）达成一致。对于无线电频谱，我们必须就谁拥有什么频率范围以及在什么物理空间内（或以发射功率作为物理空间使用范围的易于观测的近似值）拥有权利达成一致。

作者的假设是，所有要在信任边界之间达成并遵守的控制权协议——包括对符号语义的控制——都是关于达成和维持产权共识的问题。因此，本文的结果比表面看来适用范围要广得多——我相信本文既提供了安全命名空间及类似问题的解决方案，也提供了安全记录传统产权协议的解决方案。强调公共目录的产权性质也凸显了这些映射的局限性——例如，名称、地址和其他由个人控制其语义的符号通常可以被委托授权，就像财产可以被赠予或出租一样。

复制数据库技术的新进展将使我们能够为各种类型的财产安全地维护和转让所有权，不仅包括土地，还包括动产、证券、名称和地址。这项技术将赋予我们能够"在核战争中幸存"的公共记录，正如互联网最初的设计目标。虽然暴徒仍然可以用武力夺取实物财产，但正确所有权记录的持续存在将始终是篡夺者主张道路上的荆棘。

在本文中，我使用政治术语作为隐喻，来描述我们假设的产权软件，特别是其在公共网络上分发产权数据库的协议，可以如何运作。一个被称为"财产俱乐部"的群体在互联网上<sup><a href="#fn5" id="ref5">[5]</a></sup>聚集起来，决定跟踪某种财产的所有权。财产由产权证书来表示：指向该财产的名称，与当前所有者持有的私钥对应的公钥，由前一位所有者签名，以及一系列此前产权证书的链条。产权名称可以"完整地"描述该财产，例如命名空间中的分配。（当然，名称总是指向某些东西——即其语义——所以这种描述并非真正完整。）或者产权名称可能只是指向该财产的标签。各种描述和规则——地图、契约等——也可以包含其中。

财产俱乐部可以被看作是一个"微型政府"，一个在全球范围内独立执行通常与政府相关联的某项单一功能的实体。具体而言，它是一个具有低进入和退出成本的"宪政微型民主"。在产权转移规则确定之后，每次投票都应在此宪政框架内进行——因此通常投票只是按照财产规则执行一项分布式操作。之所以需要投票，并非出于民主政治理念，而是因为这是对存在恶意攻击者的分布式数据库进行分析的最优结果。<sup><a href="#fn6" id="ref6-1">[6]</a></sup> 如果获胜的投票者违反了规则，正确的失败者可以退出该群体并重新组建新群体，继承原有的产权证书。希望维持正确产权的产权证书使用者（依赖方）可以自行安全地验证哪个分裂出来的群体正确地遵循了规则，并转向正确的群体。如果违反规则的是失败的投票者，他们可以被正确的获胜者和遵守规则的依赖方排除在后续参与之外。

这种投票或重组的方法在退出成本较低时效果良好。因此，在实践中，用户不应"把所有鸡蛋放在一个篮子里"，而应为不同类型的财产使用不同的产权俱乐部。需要注意的是，俱乐部的关键安全特征不是投票本身，而是一套客观的、通常是自动化的规则，以及一条不可伪造的审计轨迹，使俱乐部成员和依赖方都能核查每次投票是否遵循了规则。因此，为了进一步延伸这个政治隐喻，财产俱乐部是一个"宪政微型民主"，重点在于"宪政"。投票是必要的，但受到严格规范。

为了实现财产俱乐部，我们建立一个复制数据库，使俱乐部成员——以下称"服务器"——能够安全地维护所有权产权，并应当前所有者的请求安全地转让产权。让最终用户真正尊重通过该系统达成的产权协议，将取决于财产的具体性质，这超出了当前研究的范围。复制数据库的目的仅仅是安全地就谁拥有什么达成一致。整个数据库是公开的。

<!--
<p>Confidentiality will be addressed below.</p>
-->

理想的产权数据库应具备以下属性：

1. 当前所有者Alice应该只能将产权转让给唯一的依赖方交易对手（类似于数字现金中的"双重支付"问题）
2. 服务器不应该能够伪造转让
3. 服务器不应该能够阻止向或从政治不正确方的转让

我们无法同时实现理想（1）和（3），因此引入"投票"机制如下。安全复制数据库的一个良好模型是Malkhi &amp; Reiter的"拜占庭法定人数系统"。<sup><a href="#fn6" id="ref6-2">[6]</a></sup> 与最近大多数对等软件研究不同，我们的设计基于数学安全证明，而非含糊其辞的推论。关于此类服务器阈值方法的简要讨论，请参阅我的文章["安全协议的联盟设计"](http://szabo.best.vwh.net/coalition.html)。数据库在服务器全域U上复制，|U|=n。"法定人数系统"是这些服务器的子集（法定人数）的集合，其中任意两个子集相交。每个法定人数可以代表系统执行操作；交叉性保证了在不同法定人数上执行的操作保持一致性。一个能够容忍拜占庭（无条件恶意）服务器故障的法定人数系统是服务器子集的集合，其中任意两个子集的交集包含足够多的正确服务器，以保证复制数据的一致性。作者构建了一个协议，使得任意交集包含至少2f+1台服务器，从而提供对最多f台恶意服务器的抵御能力，其中n &gt; 4f。

利用这些结果，我们似乎可以按以下方式接近理想的产权数据库：

1. Alice对产权证书和Bob的公钥进行签名，并将此消息发送给2f+1台服务器，从而承诺将产权转让给Bob。Bob在依赖Alice的转让之前，至少检查2f+1台服务器。
2. 任何服务器联盟都无法伪造Alice的签名（我们至少理想地实现了这一属性！）
3. 一个由&gt;=(1/4)n台服务器组成的阴谋集团可以阻止转让。Alice唯一的追索权是使用其他渠道广播她的意图，证明登记处没有遵循她的意愿，并希望替代渠道更加可靠。Bob只有在与Alice签署了一份证明他们之间转让产权意图的文件时，才有类似的追索权。最基本的追索权是正确子集的服务器退出财产俱乐部并建立一个新的俱乐部，然后如上所述宣传其正确性（并证明其对立群体的不正确性）。

分享财产控制权——例如作为贷款的担保——可以通过分享与当前所有者公钥对应的私钥来实现。拥有这个私钥是签署产权转让所必需的；也可以处理多方阈值签名。因此，为每个产权和当前所有者的组合使用一对密钥，而不是使用代表所有者身份的密钥对，可能是一个好主意。当某些合同条件得到满足时——例如贷款的最后一笔付款——这可以触发生成仅由所有者持有的新密钥对，并将产权从共享密钥对转移到新密钥对。

## 可分割性与拓荒

初始分配可以通过将现有产权从其当前制度形式中映射出来，或者通过使用传统的标桩和相互承认主张的谈判方法来进行。本节将讨论一些较少依赖现有法律制度来保障权利的分配方法。

对于某些类型的分配，例如空间区域或分层命名空间，我们希望能够细分和重新合并财产。当前所有者Alice应该能够将她的产权的各种比例部分转让给多个唯一的依赖方交易对手。一种方法是设立"分割"或"合并"消息，通过这些消息，当前财产的所有者可以停用旧的财产规格并将其链接到新的财产规格，整个消息由所有者签名。然后引入新的财产规格并将其视为活跃状态，而旧的规格被视为已停用。后续受让方有责任确保新规格互不交叉，且在其他方面完好无误。

我称解决拓荒或初始分配问题的一种方法为"涌现尊重"模式：Alice声称拥有整个未分配的宇宙。Bob也声称拥有它——同一份财产规格，但在不同的数字签名下。然后他们可以选择细分、出售、赠送财产。每个冲突的根像树一样生长，形成对所有财产的分配。

如何解决具有冲突根的树？最终，强制执行产权的暴徒、机制或非正式协议将汇聚在某棵树上，将其视为标准的、正确的分配。将更多财产分配给更多人的根，或者实际部署机制来保护其财产的根，将为其所发起的树赢得更多尊重。

在命名空间中，可以通过为冲突的根命名，并将这些名称-子树映射作为财产来记录，从而解决冲突。

篡夺者可能通过建立自己的根并强制执行来窃取财产，但他们无法删除替代分配。历史始终作为主张的证据存在。

对于那些对冲突主张没有第一手了解的人，他们可以通过咨询权威机构来解决冲突，并根据信任度量来权衡这些权威机构的意见，这类似于公钥证书中有时使用的信任度量。

有了安全时间戳，拓荒可以按照先到先得的原则而非涌现尊重的原则进行。

## 逆权占有

对于某些类型的财产，我们可能希望加入逆权占有的权利，即正式化的占住权。以下是实现一种逆权占有的一种通用方法：

1. 转让必须被安全地加盖时间戳。
2. 转让会过期。为了维持所有权，所有者必须在过期前发起新的自我转让。
3. 过期后，该财产可以按先到先得或涌现尊重的原则进行拓荒。

这种方法并不试图定义或利用"闲置"状态。相反，它将财产的活跃性与所有者——一个了解产权并希望继续拥有该产权的在线所有者——的持续在线活跃状态等同起来。通过要求所有者定期缴纳登记费，可以使维持产权的成本变得很高。然而，这引入了一个问题：根据财产俱乐部的规则，这笔费用的收益归谁所有；以及这笔费用降低了拥有财产的收益，甚至可能使其变为负数。一种可能的方案是，在保护财产的成本较高的情况下，基于对财产价值潜力的某种不精确但客观的估计来征收"乔治主义税"，并将这笔税收用于保护财产。要得出这一估计，或核算财产本身的使用情况，将涉及特定于财产类型的机制或特征观察，我们现在转向这一主题。

## 与地面的对应关系

上文基本未涉及的是实际状况与目录权利之间的差异问题。例如，在大多数产权执行者眼中，占住者可能合理地占据并改善一片产权登记显示为他人所有的闲置土地。德索托<sup><a href="#fn2" id="ref2-2">[2]</a></sup>描述了美国边疆和当今发展中国家的占住者和涌现性产权。当名称成为财产时，某个名称可能侵犯已有的商标，导致新命名空间和旧商标命名空间都旨在解决的混淆问题。

当差异变得过大时，就需要一种解决产权登记与现实不符的方案。一种解决方案是让占住者建立自己的竞争性登记处，然后证明其登记处在资源控制和使用的实际现实方面具有更优的对应关系。占住者的另一种解决方案是使用上述逆权占有机制——但这只有在维持产权的成本足够高时才有效。

另一种解决方案是审视有产权所有者的激励，看他们是否与真实声称对资源的控制相对应。在大多数情况下，可能存在说谎的激励，我们无法使用这种方法。在某些情况下，有说实话的激励，我们可以附带条件地依赖它。财产规则中的任何此类激励假设都应该被明确说明，以便依赖方可以审查创造该激励的条件是否仍然成立。

还有一种解决方案是让财产俱乐部规则和登记处从一开始就纳入关于财产实际状态的丰富信息，并基于该状态修改财产的实际所有权和转让，留下很少的歧义，从而使俱乐部成员和第三方能够对其进行全面审计。当这种审计可以保持自动化时（如上文所设想的），是最有利的。然而，将物理财产中常见的未记录（或未安全记录的）瞬态作为规则标准引入，会使审计——从而产权——变得既不安全又更加昂贵。

<!--
<h2>Confidential Ownership</h2>

<p>Using a new key pair for each transfer, besides facilitating shared control over property, can also help solve the confidentiality problem, and make it so that servers cannot discriminate against politically incorrect parties. This takes advantage of the "blindfolded justice" effect provided by anonymity. The holder of the unique key can remain anonymous (to some extent, see caveats below) and still transfer the title to others. One could contact the owners if they incorporate remailer-return envelopes with the title.</p>

<p>Anonymous property titles would have some other interesting consequences. Let's say there's a public good which nobody has incentive to fund unless they own most of a certain kind of property. (For example, the classic stock market takeover, where only holders of large voting blocks will put in the oversight needed to straighten out management). They could purchase property under different keys without raising suspicion that a takeover is underway. Of course, the same strategy could be used to create monopolies for less useful purposes.</p>

<p>If potential users of a property don't know who the owner of the property is, that might make practical enforcement of some kinds of property rights difficult. To enforce Alice's rights, she may have to prove to a jurisdiction that she owns the property. She can prove that the titled owner claims that she owns (not the same thing as proving that she owns, but perhaps good enough for enforcement purposes) by signing her jurisdictional name with the current owner's key. To completely prove that she owns, she would have to transfer the title to her jurisdictional name. (The jurisdiction being the entity that actually physically enforces the property rights, where this is necessary). In either case, it seems she has to reveal her jurisdictional identity in order to enforce her rights.</p>

<p>Self-enforcing property protection protocols might allow more anonymity, where these are feasible.</p>

<p>Some kinds of property would naturally be associated with some physical location, and thereby not be very anonymous. Furthermore, a mass of transaction detail can accumulate in the public database, revealing unique patterns of behavior. So overall the anonymity is pretty weak even with use-once keys, and may raise problems with hidden monopolies and enforcement.</p>

<p>So it would be nice if the servers could be trusted not to block trades even when they know the identities of the owners. In the design I suggested a conspiracy of >=1/4 of the servers can so block. It might also be nice if some sort of blinding/mixing mechanism (a la digital cash) could be introduced to unlink trades between these identities while maintaining the integrity of ownership transfer, so that the public database doesn't reveal so much traffic information.</p>

<h2>Keeping Servers Honest</h2>

<p>The two theoretical areas dealing with this are Byzantine agreement (used here) and multiparty secure computation. Some recent work in these areas has been done by:</p>

<ul>
  <li><a href="http://theory.lcs.mit.edu/~canetti/">Ran Canetti</a></li>
  <li><a href="http://www.toc.lcs.mit.edu/~oded/">Oded Goldreich</a></li>
  <li><a href="http://www.research.att.com/~dalia/">Dahlia Maklhi</a></li>
</ul>

<p>The Byzantine agreement and related results typically require n>3f. (n is the number of servers and f is the number of maliciously faulty, or "Byzantine", servers that can be tolerated). Multiparty secure comptutions achieve n>2f but assume Byzantine agreement for synchronization, so they have in theory a 3f "security hole".</p>

<p>Variations don't always achieve such numbers. The Malkhi/Meiter replicated database achieved only n>4f. (They do have a newer paper I haven't read which may improve upon this by going to "highly probable" security).</p>

<p>Under the assumption of digital signatures, agreement can be reached in n > f. This gives the same abstract trust model as the untraceability of anonymous remailers. (Of course, actually getting the message through requires all n remailers to work properly, so in that sense even cf reliability is better than remailers). It would be neat if one could do a replicated database with such a high trust threshold, but I haven't seen anything like that in the literature and there may be good reasons why we can't.</p>

<p>Economic security models would be desirable here, but are not ready for prime time. Deciding what the preferences and resources of the attacker should be is tough. Economists assume some typical probability distribution of preferences, and some constant amount of wealth. Cryptographers, and even some people studying fault tolerance, assume a much more powerful and malicious adversary: with polynomial computational resources, and preferring to do the most damage possible to the user. The Byzantine attacker's utility is precisely the negative utility of the user!</p>

<p>Economic models tend to look at linear or constant differences (Mallet can't make more money than it costs him to crack the security, so Mallet won't try to crack it) whereas cryptographers prefer super-polynomial differences (the cost to Mallet is super-polynomial in a security parameter controlled by the defender). Economic models bear some similiarity to the "benign" models of statistically distributed error in fault tolerance (as opposed to the "Byzantine" models of maximally malicious faults). However, once security models bubble up to the level of trading off f vs. 2f vs. 3f security, we have the same linear structure as an economic model. So it would make sense to introduce economics at that level of analysis.</p>

<p>Economic security ideas like "exposure" make a lot of sense, especially for financial security. An example is the the ATM limit of $300/day: this is the user's "exposure", the most she can lose, to a crack of the ATM system. This is a "knob" which can be adjusted to reflect the current costs of cracking the security.</p>

<p>So it would be nice to come up with good theories along these lines at some point. Another nice thing might be a theoretical regime "in between" economics and cryptography, dealing with resource and preference differences within the polynomial range (e.g., O(n<sup>4</sup>) vs. O(n)).</p>
-->

## 致谢

感谢Gregory Burch律师、Eileen O'Connor律师、Melora Svoboda以及许多其他人提供的宝贵意见。

## 参考文献

<ol>
  <li id="fn1">
    <p>Kelly McCollum, <a href="http://chronicle.com/free/99/06/99061701t.html">"Using Phone Books, Scholars Build a Data Base for Resettling Kosovars"</a>&nbsp;<a href="#ref1">↩</a></p>
  </li>

  <li id="fn2">
    <p>Hernando de Soto, <em>The Mystery of Capital</em>&nbsp;<a href="#ref2">↩</a>&nbsp;<a href="#ref2-2">↩</a></p>
  </li>

  <li id="fn3">
    <p><a href="http://hobbyfarm.com/buysell11.html">Reasons to buy title insurance</a>&nbsp;<a href="#ref3">↩</a></p>
  </li>

  <li id="fn4">
    <p>Bryce "Zooko" Wilcox, <a href="https://web.archive.org/web/20120204172516/http://zooko.com/distnames.html">Names: Decentralized, Secure, Human-Meaningful: Choose Two</a>&nbsp;<a href="#ref4">↩</a></p>
  </li>

  <li id="fn5">
    <p>Property on the Internet may take all kinds of new forms. For analysis one recently emerged form, the ownership of open source software projects, see <a href="http://firstmonday.dk/issues/issue3_10/raymond/index.html">Eric Raymond, "Homesteading the Noosphere".</a>&nbsp;<a href="#ref5">↩</a></p>
  </li>

  <li id="fn6">
    <p>Malkhi &amp; Reiter, <a href="https://www.cs.unc.edu/~reiter/papers/1997/PODC1.pdf">"Byzantine Quorum Systems"</a>, STOC97&nbsp;<a href="#ref6-1">↩</a>&nbsp;<a href="#ref6-2">↩</a></p>
  </li>
</ol>

<!--
<h3>Byzantine Quorum Systems</h3>

<ul>
  <li>
    <p>Dahlia Malkhi and Michael Reiter. Byzantine quorum systems. Journal of Distributed Computing, 11(4):203--213, 1998.</p>
  </li>

  <li>
    <p>Dahlia Malkhi, Michael Reiter, and Rebecca Wright. Probabilistic quorum systems. Proceeding of the 16th Annual ACM Symposium on the Principles of Distributed Computing (PODC 97), pages 267--273, Santa Barbara, CA, August 1997.</p>
  </li>

  <li>
    <p>Lorenzo Alvisi, Dahlia Malkhi, Evelyn Pierce, Michael Reiter, and Rebecca Wright. Dynamic Byzantine Quorum Systems International Conference on Dependable Systems and Networks (DSN, FTCS-30 and DCCA-8), New York, 2000.</p>
  </li>
</ul>
-->

---

请将您的评论发送至 nszabo (at) law (dot) gwu (dot) edu

版权所有 &copy; 1998,1999,2002,2005 Nick Szabo\
允许在不做修改的前提下自由转发
