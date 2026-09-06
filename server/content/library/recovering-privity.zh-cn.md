---
title: 重塑隐私性
authors:
  - nick-szabo
date: 1997
categories:
  - cryptography
  - privacy
doctype: essay
external: https://web.archive.org/web/20160417035006/http://szabo.best.vwh.net/privity.html
---

## 引言

在[文化演进](/library/hermeneutics-an-introduction-to-the-interpretation-of-tradition/)的过程中，进步总是伴随着遗失。例如，随着文明的经济发展阶段——农业、工业、信息——的推进，在一个阶段有用的概念可能在下一个阶段变得不那么有用（或至少不那么常用）。被淘汰后，它们就无法在后续阶段使用。为了纠正这一点，我们需要一个模因考古学的过程。关于这些技巧的更多讨论可以在我的文章"诠释学"中找到。<sup><a id="ref0" href="#fn0">[0]</a></sup> 在这里，我用它们来恢复和重构"隐私性"（privity）这一概念。这个概念的一个片段保留在英国合同法中；而令人感兴趣的是，在作者所从事的计算机安全职业中也出现了类似的平行概念。因此，我着手恢复和重构这一概念，并探索它在信息时代可以如何应用。

## 恢复隐私性

在网上快速搜索"privity"可以发现，它的使用现在主要由合同法主导。<sup><a id="ref2-1" href="#fn2-1">[2]</a></sup> 以下是一个典型的定义。

**合同相对性（PRIVITY OF CONTRACT）。** 存在于两个缔约方之间的关系（Hamm. on Part. 182）。<sup><a id="ref3" href="#fn3">[3]</a></sup>

这里"处于 privity"状态仅仅被定义为是合同的一方。我们可以通过考察成为这样一方所需的要求——即缔结此类合同的要求——来获得更深入的理解。主要要求是"意思一致"。Lysander Spooner 将法律上的 privity 关系描述为一种"相互认可、同意和达成协议"的关系。<sup><a id="ref1-1" href="#fn1-1">[1]</a></sup>

我们需要回溯一个多世纪，才能找到该词在英语法律中干瘪的现代用法之外的重要使用。在20世纪之前的英国文学中，"privity"一词出现的语境表明了两种内涵。第一种也是语言上最明显的内涵是：如果一个人对某个事件有少数人才共享的知识，那么他就对该事件拥有"privity"。在这种解释中，它意味着对该事件知情（privy）。第二种内涵是一个人对该事件或其后果表示同意。该事件可能已被其他人注意到；该事件或其后果可能已被阻止或避免。因此，"privity"通常带有道德或法律责任的含义。此外，该事件通常是某种人类行为；即合同法中当此类行为已被承诺时所称的"履行"。

在 Josephus 的英译本中，一次权力委托（法律术语中的代理）被这样表述："在没有我的 privity 的情况下，用你麾下的军队征服他。"<sup><a id="ref4" href="#fn4">[4]</a></sup> 类似地，Shakespeare<sup><a id="ref5-1" href="#fn5-1">[5]</a></sup> 写到了在"没有国王的 privity"的情况下采取的行动。这里的"没有"带有"超出"的内涵，如同处于一个边界之外。因此，"privity"被视为一个由相关当事人的知识范围（通常伴随着同意）所定义的边界。

"Privity"较早出现的一个用法描述了一种纯粹主观的现象：一个人与他所信仰和崇拜的神之间的"privity"。14世纪神秘主义著作、Walter Hilton 的《完美的阶梯》（_The Scale (or Ladder) of Perfection_）<sup><a id="ref5-2" href="#fn5-2">[5]</a></sup>强调了"精神之爱的 privity"。在两个人之间，我们可能将其称为"共情"。这给了我们一种 Michael Polanyi 所描述的"默会知识"（tacit knowledge）<sup><a id="ref6" href="#fn6">[6]</a></sup>——一种无法言传、必须保持主观的知识。此外，即使是关于特殊情况的外显知识也是广泛分散的。<sup><a id="ref8" href="#fn8">[8]</a></sup> Privity 的基础是知识的分布，包括可表达的和非外显的。

现代法律原则中的"privity"<sup><a id="ref2-2" href="#fn2-2">[2]</a></sup>在许多司法管辖区已被可预见性学说所修改。由 privity 提供的围绕合同的固定、清晰的边界被抹去，取而代之的是在特定案件中将责任范围定义为"可预见性"。这反映了法律实证主义者的计算傲慢。这种第三方对法律过程的主观干预，可能是20世纪下半叶美国侵权成本螺旋上升的主要原因之一。

19世纪"privity"的一项法律定义进一步描述了人与财产之间的关系；这是该词的一个有趣用法，我将在下文中加以展开。

## 重构隐私性

从语言学和语义学上看，隐私（privacy）显然是 privity 的近亲。一个人对某些信息拥有"隐私"，恰恰是相对于那些与之不处于 privity 关系的人而言的——这里使用的是早期"知情"（privy to）的含义。在合同法中，"privity"仅隐含地涉及对第三方知识的相对缺乏，但直接涉及法律上的第三方_控制_。在为我们自己的用途重构 privity 时，我们可以将这一概念概括为同时缺乏第三方知识_和_控制。

这引出了一个有趣的类比，展示了这一焕发新生的 privity 概念在信息时代的实用性。我们对 privity 的定义现在对应于针对数据安全系统的被动攻击和主动攻击。针对隐私的被动攻击以 Eve——即窃听者——为代表。针对履行的主动攻击以 Mallet——一个恶意干扰者——为代表。<sup><a id="ref9" href="#fn9">[9]</a></sup>

将控制加入隐私之后，privity 成为一种元关系：即特定各方处于 privity 中的关系与处于该关系边界之外的第三方之间的关系。这种恢复和重构后的 privity，即广义的 privity，是保护关系的内容和活动（或具体地说，合同的条款和履行）免受第三方影响的概念。

因此，privity 涵盖了作为与特定合同（以及由此处于该合同 privity 关系中的各方，即"所有者"）相关联的稳定客体的财产权。它让我们可以将财产权的基础分析为不仅仅是 Lock 式的"劳动混合"，而是关于知识、稳定性和激励的问题。作为客体与合同之间的 privity，财产概念涵盖了法律传统中严格单一所有者财产权的众多例外：留置权、抵押品等。与其前身一样，这种新的 privity 带有当事人对合同内活动的责任内涵。它创造了一个清晰的边界，在其中运作着一组连贯的权利、责任以及执行这些责任和保护这些权利所需的知识。或许最重要的是，恢复后的 privity 为我们提供了分析关于新型财产（尤其是"知识产权"）新主张的基础。

我们恢复的 privity 还给"社会契约"理论的心脏钉上了一根桩。Edward, Earl of Clarendon<sup><a id="ref7" href="#fn7">[7]</a></sup> 和 Lysander Spooner<sup><a id="ref1-2" href="#fn1-2">[1]</a></sup> 都有力地论证了这一点。

现在，我们已经恢复和重构了一个比20世纪法律教科书中留下的贫乏定义更加通用、更有用的 privity 概念。这种新生的 privity 理念——作为关系内部和关系之间知识、控制和责任的清晰边界——非常适合用来描述各种网络空间关系，无论是非正式的还是通过法律条文或软件正式化的。

## 参考文献

<ol class="references" start="0">
  <li id="fn0">[0] <a href="https://web.archive.org/web/20160417035006/http://szabo.best.vwh.net/index.html">My web essays</a> can be found under <a href="https://web.archive.org/web/20160417035006/http://szabo.best.vwh.net/index.html">http://www.best.com/~szabo/</a> <a href="#ref0">↩</a></li>
  <li id="fn1">[1] Lysander Spooner, &ldquo;No Treason: The Constitution of No Authority&rdquo; <a href="#ref1-1">↩</a> <a href="#ref1-2">↩</a></li>
  <li id="fn2">[2] Palmer, <em>The Paths to Privity: The History of Third-Party Beneficiary Contracts at English Law</em> <a href="#ref2-1">↩</a> <a href="#ref2-2">↩</a></li>
  <li id="fn3">[3] John Bouvier, <a href="https://constitution.org/1-Constitution/bouv/bouvier_p.htm"><em>A Law Dictionary</em></a> <a href="#ref3">↩</a></li>
  <li id="fn4">[4] English translation of <a href="https://wesley.nnu.edu/other-theologians/flavius-josephus/the-antiquities-of-the-jews-book-xviii/">Josephus</a> by William Whiston. <a href="#ref4">↩</a></li>
  <li id="fn5">[5] William Shakespeare, <a href="https://shakespeare.mit.edu/henryviii/henryviii.1.1.html">&ldquo;Henry VIII&rdquo;</a> <a href="#ref5-1">↩</a> <a href="#ref5-2">↩</a></li>
  <li id="fn6">[6] The 14th-century mystical tome of Walter Hilton, <a href="https://web.archive.org/web/20010425131314/http://www.ccel.org/h/hilton/ladder/ladder-PART-3.html"><em>The Scale (or Ladder) of Perfection</em></a> <a href="#ref6">↩</a></li>
  <li id="fn7">[7] Edward, Earl of Clarendon, <a href="https://historyofeconomicthought.mcmaster.ca/hobbes/clarend">&ldquo;A Survey of Hobbes and His Leviathan&rdquo;</a> <a href="#ref7">↩</a></li>
  <li id="fn8">[8] Friedrich Hayek, &ldquo;On the Use of Knowledge in Society&rdquo; <a href="#ref8">↩</a></li>
  <li id="fn9">[9] Bruce Schneier, <em>Applied Cryptography</em> <a href="#ref9-1">↩</a> <a href="#ref9-2">↩</a></li>
</ol>
