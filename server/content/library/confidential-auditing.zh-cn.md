---
title: 保密审计
authors:
  - nick-szabo
date: 1998
categories:
  - economics
doctype: essay
external: https://web.archive.org/web/20160319150321/http://szabo.best.vwh.net/confidential.html
---

审计功能是现代经济中庞大而不可或缺的一部分。审计控制使得（除其他外）雇主能够将资源和权力委托给员工、特许经营商能够将权力委托给加盟商、股东能够将权力委托给管理层、广告商能够统计眼球数量、营销人员能够收集更可靠的客户数据，并使各种其他此类关系成为可能。审计控制可以公平地被称为资本主义的安全协议。

最近的一项综合调查显示，**83%** 的美国人对他们在互联网上的隐私"非常担忧"。可以预期欧洲客户的数据会更加强烈，他们对私人数据有更多的第一手经验——其中大部分最初是出于无害的原因收集的——被用于政治压迫。企业认识到了保密协议（NDA）的不足，正在寻找更可靠的方法来保护机密数据。绝大多数电子商务客户都关心隐私。

审计与加强隐私的努力存在深刻冲突。审计师有着记录、调查和尽可能多报告的职业道德，常常将隐私保护努力视为企图阻止审计并可能掩盖欺诈。事实上，近期数十亿美元的霸菱银行和长期资本对冲基金的倒闭，以及更普遍的近期"裙带资本主义"问题——使股东和债权人损失超过 1 万亿美元——都被归因于这种保密<sup><a href="#fn3" id="ref3">[3]</a></sup>。在 IMF 当前改革方案的首位是"透明度"——一个引入更强审计控制和报告要求的流行语。

由于审计控制用于每年保障数万亿美元的交易，它们不会消失，而且确实可能会变得更加有效和更具侵入性。另一方面，我们现在拥有过去二十年中现代密码学取得的大量突破。我们能否利用这些突破在审计和隐私之间取得更好的平衡？我设计了一种架构，使用此类协议来大大改善这种权衡：保密审计。

我们可以通过安全时间戳<sup><a href="#fn1" id="ref1">[1]</a></sup>实现承诺后不可伪造的审计日志。然后通过多方完整性约束下的职责分离<sup><a href="#fn2" id="ref2">[2]</a></sup>，我们可以在很大程度上实现承诺前的不可伪造性。然后我们通过多方安全计算<sup><a href="#fn4" id="ref4">[4]</a></sup>来审计这些承诺。这种组合使得大量以正常效率进行的交易能够被选定的仲裁者或审计者观察和验证——通过对随机抽样的承诺应用更昂贵的安全计算。这在很大程度上维护了输入的保密性。

在这个互相保密审计协议中，参与者可以验证账本与先前提交的交易日志中存储的交易细节是否一致，以及数字是否正确加总。参与者可以对保密共享的交易日志计算汇总统计量，包括对交易对手方的日志进行交叉核对，而无需泄露这些日志。他们只能了解到可以从统计量中推断出的信息，无法看到交易的细节。

假设我在这份草案中略去的许多实际细节（如审计计算的效率、数字交易记录的标准化格式可用性等），保密审计可以大大改善现行做法。目前，一个组织的所有交易细节——例如 HMO 中的医疗记录和政府绝密项目中的交易——要么直接暴露给审计师，要么免于审计，从而允许欺诈。

通过互相保密审计，我们将能够对交易对手方声明和报告的事实性获得高度信心，而无需从这些报告背后的交易中揭示身份信息和其他详细信息。这将为进一步的声誉系统和受信任第三方系统提供基础，这些系统在时间、通信、汇总过程中保持完整性，同时为交易参与者保护保密性。通过保密审计，我们常常可以兼得开放性与隐私性。

## 脚注

<ol>
  <li id="fn1">
    <p>BLLV98  A. Buldas, P. Laud, H. Lipmaa, J. Villemson, "Time-Stamping with Binary Linking Schemes", Crypto 98&nbsp;<a href="#ref1">↩</a></p>
  </li>

  <li id="fn2">
    <p>Szabo, in progress&nbsp;<a href="#ref2">↩</a></p>
  </li>

  <li id="fn3">
    <p>See recent back issues of <em>The Wall Street Journal</em> and <em>The Economist</em>&nbsp;<a href="#ref3">↩</a></p>
  </li>

  <li id="fn4">
    <p><a href="/the-god-protocols/">Overview</a>; Quorum systems model, <a href="/library/quorum-systems/">"Quorum Systems"</a>&nbsp;<a href="#ref4">↩</a></p>
  </li>
</ol>

<h2>参考文献</h2>

<ul class="references">
  <li id="fnB91">
    <p>[B91] D. Beaver, "Efficient Multiparty Protocols Using Circuit Randomization", ACM STOC 91</p>
  </li>

  <li id="fnRB89">
    <p>[RB89] T. Rabin & M. Ben-Or, "Verifiable Secret Sharing and Multiparty Protocols with Honest Majority", ACM STOC 89</p>
  </li>

  <li id="fnGRR98">
    <p>[GRR98] R. Gennaro, T. Rabin, & M. Rabin: "Simplified VSS and Fast-Track Multiparty Computations", PODC 98</p>
  </li>
</ul>
