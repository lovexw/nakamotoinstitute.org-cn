---
title: 法定人数系统
authors:
  - nick-szabo
date: 1998
categories:
  - cryptography
doctype: essay
external: https://web.archive.org/web/20160629221812/http://szabo.best.vwh.net/quorum.html
has_math: true
---

## 引言

$N$ 方组成集合 $U$（"全集"），希望参与一个协议。这些方可以结成联盟来相互攻击。可能的联盟集合就是 $U$ 的所有子集的集合，$\mathcal{C} = 2^U$。

协议设计者应首先明确哪些联盟是被允许的，哪些是被禁止的。如果各方具有理性的自利动机，那么只有那些成员没有动机去串谋（无论是计算错误结果还是侵犯任何参与者的隐私）的联盟，才应被允许有可能干扰协议。引入"动机"意味着需要对联盟进行经济或博弈论分析，这将在未来的文章中讨论。

目前，我们仅观察到协议设计者需要从 $C$ 中划分出一组允许的（"好的"）联盟 $\mathcal{G}$。$\mathcal{G}$ 中的任何一方集合都是足以成功完成协议的联盟。同时，从 $C$ 中划分出一组与 $\mathcal{G}$ 不相交的禁止（"坏的"）联盟 $\mathcal{B}$，不允许它们有机会干扰协议。如果 $\mathcal{G} \cup \mathcal{B} = \mathcal{C}$，则我们称该划分是明确的。同时，$\mathcal{G}$ 中的集合是 $\mathcal{B}$ 中集合的补集，反之亦然。

为了构建安全的协议，这些联盟需要满足某些标准。特别值得关注的是_法定人数系统_，即一组好的联盟，其每个成员至少在一个参与方上相交。每个法定人数可以代表系统执行协议。交集有助于法定人数之间的一致性。例如，如果一个操作发生在两个法定人数中，则至少有一方同时观察到两者。事实上，容错或安全的法定人数系统的交集包含足够多的参与方以保证正确性。例如，参见 Malkhi & Reiter <a id="refMR97" href="#fnMR97">[MR97]</a> 所使用的掩码型和传播型法定人数系统，用于设计能够抵御坏联盟 Byzantine 故障的安全复制数据库。

<a id="refBW98-1" href="#fnBW98">[BW98]</a> 沿着 <a id="refHM97" href="#fnHM97">[HM97]</a> 和 <a id="refNW96" href="#fnNW96">[NW96]</a> 等人开辟的道路，证明了如果任何单方都可以被信任其正确性，那么法定人数系统对于多方计算<a id="refS97" href="#fnS97">[S97]</a>中输入的隐私性（对抗资源无上限的攻击者）是必要且充分的。经典的多方计算分析得出结论：超过半数参与方的阈值对于私密计算是必要且充分的。这只是 <a id="refBW98-2" href="#fnBW98">[BW98]</a> 结果的一个特例。任何阈值超过 $N/2$ 的阈值系统也是一个法定人数系统——总共只有 $N$ 方，因此两个大小超过 $N/2$ 的联盟必然至少有一个共同参与方，从而形成法定人数系统。

经典分析还得出结论：多数阈值对于_正确的_多方计算是必要且充分的，即能够安全抵御拥有多项式级资源的小规模活跃 Byzantine 故障。对于资源无上限的攻击者，则需要三分之二多数。据我所知，目前还没有针对多方计算中法定人数系统的正确性结果。

## 约束族

### 掩码型

首先考虑这样的法定人数系统：它们不仅在单个参与方上相交（这会使其对这些参与方的任何故障都不容忍），而是在足够多的参与方上相交，以容许最多 $f$ 个故障的方式完成协议，其中 $f>0$。实现这一点的一种方法称为_掩码_，它约束法定人数系统满足以下条件：

M1：包含最新值的正确服务器集合都不是坏联盟。为实现这一点，任何法定人数交集减去任何坏联盟不应是任何其他坏联盟的子集。形式化表述：**对所有 $Q_1, Q_2 \in \mathcal{G}$ 和所有 $B_1, B_2 \in \mathcal{B}$，$(Q_1 \cap Q_2) \setminus B_1$ 不是 $B_2$ 的子集。**

M2：没有坏联盟能使所有法定人数失效。形式化表述：**对所有 $B \in \mathcal{B}$，存在某个 $Q \in \mathcal{G}$ 使得 $B$ 和 $Q$ 不相交。**

当且仅当 $|U| > 4f$ 时，这些约束足以确保复制数据库被一致且正确地更新。

### 传播型

要得到_传播_法定人数系统，我们放宽第一个约束。现在我们只需每个交集不包含在任何坏联盟中：

D1：任何法定人数交集都不是任何坏联盟的子集。形式化表述：**对所有 $Q_1, Q_2 \in \mathcal{G}$ 和所有 $B \in \mathcal{B}$，$(Q_1 \cap Q_2)$ 不是 $B$ 的子集。**

D2：没有坏联盟能使所有法定人数失效。形式化表述：**对所有 $B \in \mathcal{B}$，存在某个 $Q \in \mathcal{G}$ 使得 $B$ 和 $Q$ 不相交。**

当且仅当 $|U| > 3f$ 时，这些约束足以确保复制数据库被一致地更新。数据的正确性必须通过其他手段来保证，例如外部签名和数字签名验证。

## 特殊类别

### 阈值型

如果 **$\mathcal{B} = \{B \subseteq U : |B| = f\}, n > 4f$**，则 **$\mathcal{Q} = \{Q \subseteq U : |Q| = \lceil \frac{n + 2f + 1}{2} \rceil\}$** 是 $\mathcal{B}$ 的阈值掩码法定人数系统。如果 $n > 3f$，则 $\mathcal{B}$ 的阈值传播法定人数系统为 **$|Q| = \lceil \frac{n + f + 1}{2} \rceil$**。

### 网格型

假设 $|U| = k^2$。参与方可以排列成 $k \times k$ 的网格。则对于 **$\mathcal{B} = \{B \subseteq U : |B| = f\}, 3f + 1 < k$**，网格掩码法定人数系统为 **$\mathcal{Q} = \{C_j \cup \bigcup_{i \in I} R_i : I, \{j\} \subseteq \{1, \ldots, k\}, |I| = 2f + 1\}$**。网格传播法定人数系统与掩码情况相同，只是 $|I| = f + 1$。

### 分区型

这里我们将 $U$ 划分为 $m$ 个簇，并表示在任何时候最多有一个簇出错的假设。因此 $\mathcal{B} = \{B_1, \ldots, B_m\}$ 是 $U$ 的一个划分。则分区掩码法定人数系统为 $m > 4, \mathcal{Q} = \{\bigcup_{i \in I} B_i : I \subseteq \{1, \ldots, m\}, |I| = \lceil \frac{m + 3}{2} \rceil\}$，传播法定人数系统为 $m > 3, \mathcal{Q} = \{\bigcup_{i \in I} B_i : I \subseteq \{1, \ldots, m\}, |I| = \lceil \frac{m + 3}{2} \rceil\}$。

### 残垣型

这达不到传播或掩码的标准，但也更高效。参与方被排列成不同宽度的行。一个法定人数是某一完整行与该完整行下方每一行各取一个参与方的并集。残垣墙中的许多法定人数都是小规模的少数；通常为 $O(\log|U|)$ 级别。

## 结论

对联盟特别是法定人数系统的研究，提供了一个看似全面的多方协议理论，远超局限于线性阈值世界的框架。

## 参考文献

<ol class="references">
 <li id="fnBW98">[BW98] D. Beaver and A. Wool, "Quorum-based Secure Multi-Party Computation", Eurocrypt '98, also at <a href="https://doi.org/10.1007/BFb0054140">https://doi.org/10.1007/BFb0054140</a> <a href="#refBW98-1">↩</a> <a href="#refBW98-2">↩</a></li>
 <li id="fnHM97">[HM97] M. Hirt and U. Maurer, "Complete characterization of adversaries tolerable in secure multi-party computation", 16th ACM PODC <a href="#refHM97">↩</a></li>
 <li id="fnM91">[M91] R. Myerson, <em>Game Theory: Analysis of Conflict</em></li>
 <li id="fnMR97">[MR97] D. Maklhi & M. Reiter, "Byzantine Quorum Systems", 21st ACM STOC, also at <a href="https://malkhi.com/">https://malkhi.com/</a>; For an important application of Byzantine tolerant replication, see <a href="#fnS98">[S98]</a> <a href="#refMR97">↩</a></li>
 <li id="fnNW96">[NW96] M. Naor and A. Wool, "Access control and signatures via quorum secret sharing", 3rd ACM Conf. on Computer and Communications Security <a href="#refNW96">↩</a></li>
 <li id="fnS96">[S96] On secure credit reporting, virus list distribution, etc.: <a href="/library/negative-reputations/">"Negative Reputations"</a></li>
 <li id="fnS97">[S97] A gentle introduction to multiparty computation and its potential applications: <a href="/library/the-god-protocols/">"The God Protocols"</a> <a href="#refS97">↩</a></li>
 <li id="fnS98">[S98] <a href="/library/secure-property-titles/">"Secure Property Titles with Owner Authority"</a></li>
</ol>
