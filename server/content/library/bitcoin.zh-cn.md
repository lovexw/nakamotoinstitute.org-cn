---
title: "比特币：一种点对点电子货币系统"
authors:
  - satoshi-nakamoto
date: 2008-10-31
formats:
  - pdf
categories:
  - cryptography
  - economics
  - bitcoin
doctype: essay
external: https://bitcoin.org/files/bitcoin-paper/bitcoin_zh_cn.pdf
has_math: true
translators:
  - shdxiang
  - bill-zhao
---

<h2 id="abstract"><a href="#abstract">摘要</a></h2>

一种纯粹的点对点电子现金，将允许在线支付从一方直接发送到另一方，而无需经过任何金融机构。数字签名提供了部分解法，但如果仍需要一个受信任的第三方来防止双重支付，那么主要的好处就丧失了。我们提出一种利用点对点网络解决双重支付问题的方案。网络通过将交易散列（hash）进一条基于工作量证明（proof-of-work）的持续增长的链，为其打上时间戳，形成一条一旦不重做工作量证明就无法更改的记录。最长的链不仅是所见证事件顺序的证明，而且是它来自最大算力池的证明。只要多数算力掌握在不合作攻击网络的节点手中，它们就会生成最长的链并超过攻击者。网络本身只需要最简的结构：消息以尽力而为的方式广播，节点可以随意离开和重新加入网络，并接受最长的工作量证明链作为它们离开期间所发生事情的证明。

<h2 id="introduction"><a href="#introduction">1. 引言</a></h2>

互联网上的商业，几乎完全依赖金融机构作为受信任的第三方来处理电子支付。尽管这套体系对于大多数交易而言运转得足够好，但它仍然承受着基于信任的模型固有的弱点。完全不可逆的交易实际上并不可能，因为金融机构无法避免调解纠纷。调解的成本提高了交易成本，限制了最小可行交易规模，切断了小额临时交易的可能性，而且由于丧失了为不可逆的服务进行不可逆支付的能力，还有更广泛的代价。由于存在回滚的可能，对信任的需求随之扩散：商家必须提防自己的顾客，为了一些原本不需要的信息对他们百般盘问。一定比例的欺诈被当作不可避免而接受。这些成本和支付的不确定性，在面对面时可以通过使用实物货币避免，但若要通过通信信道进行支付，在不存在受信任方的情况下，没有任何机制可用。

我们所需要的，是基于密码学证明而非信任的电子支付系统，它允许任何两个愿意交易的双方直接交易，而无需受信任的第三方。在计算上不可逆的交易将保护卖家免受欺诈，而常规的托管机制可以轻松实现以保护买家。在本文中，我们提出一种使用点对点分布式时间戳服务器来解决双重支付问题的方案，它为交易的时序生成计算上的证明。只要诚实节点集体控制的算力超过任何协同的攻击者节点群，这个系统就是安全的。

<h2 id="transactions"><a href="#transactions">2. 交易</a></h2>

我们将一枚电子硬币（electronic coin）定义为一串数字签名。每位所有者通过上一次交易与下一位所有者公钥一起进行数字签名，并将其附加到硬币的末尾，从而把硬币转移给下一位所有者。收款人可以验证签名，从而验证所有权链条。

<figure>
  <img src="/static/img/library/bitcoin/transactions.svg" onerror="this.src='/img/library/bitcoin/transactions.png'" alt="交易" />
</figure>

问题当然在于：收款人无法验证某位所有者没有把硬币双重支付。一种常见的解法是引入一个受信任的中心权威——造币厂（mint）——由它检查每一笔交易是否存在双重支付。每次交易之后，硬币必须退回造币厂以发行新币，且只有造币厂直接发行的硬币才被信任不会双重支付。这种解法的问题在于：整个货币体系的命运系于运营造币厂的公司，每一笔交易都要经过它，就像银行一样。

我们需要一种办法让收款人知道：前面的所有者没有对更早的交易签名。就我们的目的而言，只有最早的那笔交易算数，所以我们并不关心之后的双重支付企图。确认一笔交易不存在的唯一方法是知晓所有交易。在造币厂模型中，造币厂知晓所有交易并决定哪笔先到。要在没有受信任方的情况下做到这一点，交易必须被公开宣布<sup><a href="#fn1" id="ref1">[1]</a></sup>，而且我们需要一个系统，让参与者就它们所接收顺序的单一历史达成一致。收款人需要证明：在每笔交易发生的时刻，多数节点都同意它是最先收到的。

<h2 id="timestamp-server"><a href="#timestamp-server">3. 时间戳服务器</a></h2>

我们提出的方案从一个时间戳服务器开始。时间戳服务器的工作方式是：对一批待加时间戳的条目取散列，然后广泛发布该散列，例如发表在报纸或 Usenet 帖子中<sup><a href="#fn2" id="ref2-1">[2-5]</a></sup>。时间戳证明数据在当时必然已经存在——显然如此，否则它无法进入散列。每个时间戳在其散列中包含前一个时间戳，形成一条链，每新增一个时间戳都对其前面的时间戳进行加固。

<figure>
  <img src="/static/img/library/bitcoin/timestamp-server.svg" onerror="this.src='/img/library/bitcoin/timestamp-server.png'" alt="时间戳服务器" />
</figure>

<h2 id="proof-of-work"><a href="#proof-of-work">4. 工作量证明</a></h2>

要在点对点的基础上实现分布式时间戳服务器，我们将需要使用类似 Adam Back 的 Hashcash<sup><a href="#fn6" id="ref6">[6]</a></sup> 的工作量证明系统，而不是报纸或 Usenet 帖子。工作量证明包括寻找这样一个值：当它（例如用 SHA-256）被散列时，散列值以若干个零比特开头。所需平均工作量随所需零比特的数目呈指数增长，而验证只需执行一次散列。

对我们的时间戳网络而言，我们通过在区块中递增一个随机数（nonce）来实现工作量证明，直到找到一个使区块散列满足所需零比特的值。一旦消耗了 CPU 算力使区块满足工作量证明，不重做这个工作就无法更改该区块；而当后续区块链接在其后时，更改该区块的工作就包括重做其后的所有区块。

<figure>
  <img src="/static/img/library/bitcoin/proof-of-work.svg" onerror="this.src='/img/library/bitcoin/proof-of-work.png'" alt="工作量证明" />
</figure>

工作量证明同时解决了在多数决策中确定代表权的问题。如果多数是基于"一个 IP 地址一票"，那么任何能够支配大量 IP 地址的人都可以颠覆它。工作量证明本质上是"一个 CPU 一票"。多数决策由最长的链代表，它投入了最大的工作量证明努力。如果多数算力由诚实节点控制，诚实的链将增长得最快并超过任何竞争链。要修改过去的某个区块，攻击者必须重做该区块及其后所有区块的工作量证明，然后追上并超过诚实节点的工作。我们将在后文说明：随着后续区块的添加，较慢的攻击者追上的概率呈指数下降。

为补偿硬件速度的提升以及随时间变化运行节点的意愿，工作量证明的难度由一个移动平均值决定，目标是每小时平均生成固定数量的区块。如果区块生成得过快，难度就会提高。

<h2 id="network"><a href="#network">5. 网络</a></h2>

运行网络的步骤如下：

1. 新交易广播给所有节点。
2. 每个节点将新交易收集进一个区块。
3. 每个节点为自己的区块寻找一个困难的工作量证明。
4. 当某节点找到工作量证明，它将该区块广播给所有节点。
5. 仅当区块中的所有交易都有效且未被支付过，节点才接受该区块。
6. 节点通过以下方式表达对区块的接受：以被接受区块的散列作为前散列，着手创建链中的下一个区块。

节点始终认为最长的链是正确的链，并持续为扩展它而工作。如果两个节点同时广播不同版本的下一个区块，某些节点可能先收到其中一个。此时它们在先收到的那条分支上工作，但保留另一条分支，以防它变得更长。当下一个工作量证明被找到、其中一条分支变得更长时，平局即被打破；在另一条分支上工作的节点将切换到较长的那条。

新交易的广播不必到达所有节点。只要到达许多节点，不久之后它们就会进入一个区块。区块广播同样容忍消息丢失：如果某节点没有收到一个区块，当它收到下一个区块并意识到漏掉了一个时，会去索取它。

<h2 id="incentive"><a href="#incentive">6. 激励</a></h2>

按照约定，区块中的第一笔交易是一笔特殊交易，它启动一枚归区块创建者所有的新币。这为节点支持网络增加了激励，并提供了将币初始分发到流通中的途径，因为不存在发行它们的中心权威。稳定地新增固定数量的新币，类似于金矿矿工消耗资源、把黄金添加到流通中。在我们的情形中，消耗的是 CPU 时间与电力。

激励也可以由交易手续费提供。如果一笔交易的输出值小于其输入值，差额就是一笔交易手续费，它被加进包含该交易的区块的激励值中。一旦既定数量的币全部进入流通，激励就可以完全转变为交易手续费，从而完全没有通胀。

激励还可以促使节点保持诚实。如果一个贪婪的攻击者能够汇集比所有诚实节点更多的算力，他将不得不在两者之间做出选择：用它骗回自己已付出的款项，还是用它生成新币。他应当会发现，按规则行事更有利可图——这样的规则让他获得比其他所有人加起来还多的新币——而不是削弱这个系统以及自己财富的有效性。

<h2 id="reclaiming-disk-space"><a href="#reclaiming-disk-space">7. 回收磁盘空间</a></h2>

一旦一枚硬币的最新交易被埋在足够多的区块之下，其之前已花费的交易就可以被丢弃以节省磁盘空间。为便于做到这一点而不破坏区块的散列，交易以梅克尔树（Merkle Tree）<sup><a href="#fn7" id="ref7">[7]</a></sup><sup><a href="#fn2" id="ref2-2">[2]</a></sup><sup><a href="#fn5" id="ref5">[5]</a></sup> 的形式被散列，只有根被纳入区块的散列。于是，旧的区块可以通过截去树的分支来压缩，内部的散列无需存储。

<figure>
  <img src="/static/img/library/bitcoin/reclaiming-disk-space.svg" onerror="this.src='/img/library/bitcoin/reclaiming-disk-space.png'" alt="回收磁盘空间" />
</figure>

一个不含交易的区块头大约 80 字节。假设每 10 分钟生成一个区块，80 字节 × 6 × 24 × 365 = 每年 4.2MB。2008 年，计算机系统通常配备 2GB 内存，而摩尔定律预测当前每年增长 1.2GB，即便区块头必须保存在内存中，存储也不该成为问题。

<h2 id="simplified-payment-verification"><a href="#simplified-payment-verification">8. 简化支付验证</a></h2>

不运行完整网络节点也有可能验证支付。用户只需保存最长工作量证明链的区块头副本——他可以通过查询网络节点来确认自己拥有最长的链——并取得将交易链接到其被打时间戳的区块的梅克尔分支。他无法亲自检查该交易，但通过把它链接到链中的某个位置，他可以看到某个网络节点已接受了它；而其后添加的区块进一步确认了网络对它的接受。

<figure>
  <img src="/static/img/library/bitcoin/simplified-payment-verification.svg" onerror="this.src='/img/library/bitcoin/simplified-payment-verification.png'" alt="简化支付验证" />
</figure>

如此一来，只要诚实节点控制着网络，这种验证就是可靠的；但如果网络被攻击者压制，它就更为脆弱。虽然网络节点可以亲自验证交易，但只要攻击者能够持续压制网络，这种简化方法就可能被攻击者伪造的交易所欺骗。防御这一点的策略之一是：当网络节点检测到无效区块时接受它们的警报，提示用户的软件下载完整区块及受警告的交易，以确认不一致。经常收付款的商家，可能仍希望运行自己的节点，以获得更独立的安全性和更快的验证。

<h2 id="combining-and-splitting-value"><a href="#combining-and-splitting-value">9. 价值的合并与拆分</a></h2>

尽管可以逐枚处理硬币，但为转账中的每一分钱都做一笔单独的交易会非常笨拙。为允许价值被拆分与合并，交易包含多个输入和输出。通常，要么是来自某笔此前较大交易的单个输入，要么是合并较小金额的多个输入，至多两个输出：一个用于支付，一个（如有）把找零退回发送者。

<figure>
  <img src="/static/img/library/bitcoin/combining-splitting-value.svg" onerror="this.src='/img/library/bitcoin/combining-splitting-value.png'" alt="价值的合并与拆分" />
</figure>

应当指出，扇出（fan-out）——一笔交易依赖于若干笔交易、而这些交易又依赖于更多的交易——在这里并不是问题。从不需要提取一笔交易历史的完整独立副本。

<h2 id="privacy"><a href="#privacy">10. 隐私</a></h2>

传统银行模型通过把信息的访问限制在参与各方与受信任的第三方之内，达成一定程度的隐私。公开宣布所有交易的必要性排除了这种方法，但隐私仍可在另一个环节上被维持：让公钥保持匿名。公众可以看到有人正在向某人支付一定金额，但没有任何信息将该交易与任何人关联起来。这类似于证券交易所发布的信息水平：个股交易的时间与规模（"行情带"）是公开的，但不告知交易双方是谁。

<figure>
  <img src="/static/img/library/bitcoin/privacy.svg" onerror="this.src='/static/img/library/bitcoin/privacy.png'" alt="隐私" />
</figure>

作为一道附加的防火墙，每笔交易都应使用新的密钥对，以使它们不至于被关联到共同的所有者。对于多输入交易，某种关联仍不可避免，因为这些输入必然暴露它们为同一所有者持有。风险在于：如果某个密钥的所有者被暴露，关联可能暴露属于同一所有者的其他交易。

<h2 id="calculations"><a href="#calculations">11. 计算</a></h2>

我们考虑这样的情形：攻击者试图以快于诚实链的速度生成一条替代链。即便做到了这一点，系统也不会向任意改动敞开大门——例如凭空创造价值，或夺取从不属于攻击者的钱。节点不会把无效交易当作有效支付接受，诚实节点也永远不会接受包含它们的区块。攻击者能做的，只是试图更改自己的一笔交易，以拿回他最近付出的钱。

诚实链与攻击者链之间的这场竞赛，可以刻画为二项随机游走。成功事件是诚实链被延长一个区块、领先优势 +1；失败事件是攻击者链被延长一个区块、差距 -1。

攻击者从给定落后量追上的概率，类似于赌徒破产问题。假设一个拥有无限信用的赌徒从一定的亏损开始，进行潜在无限次数的尝试以图达到盈亏平衡。我们可以计算他达到盈亏平衡的概率，也就是攻击者追上诚实链的概率，如下<sup><a href="#fn8" id="ref8">[8]</a></sup>：

$$
\begin{aligned}
p &= \text{probability an honest node finds the next block} \\
q &= \text{probability the attacker finds the next block} \\
q_z &= \text{probability the attacker will ever catch up from $z$ blocks behind}
\end{aligned}
$$

$$
\large q_z = \begin{Bmatrix}
1 & \text{if}\; p \leq q\newline
(q/p)^z & \text{if}\; p > q
\end{Bmatrix}
$$

给定 $p \gt q$ 的假设，攻击者需要追上的区块数越多，概率呈指数下降。鉴于形势对他不利，如果他没有在早期幸运地猛冲一把，随着落后越来越远，他的机会将变得微乎其微。

现在我们考虑一笔新交易的收款人需要等待多久，才能充分确信发送者无法更改该交易。我们假设发送者是一个攻击者，他想要让收款人在一段时间内相信自己已付款，然后过了一段时间再将交易切换成支付回自己。届时收款人会被警报，但发送者希望那时为时已晚。

收款人生成一个新的密钥对，并在签名前不久把公钥交给发送者。这防止发送者提前准备一条区块链：持续在其中工作直到他幸运地领先足够多，然后在那一刻执行交易。交易发出后，不诚实的发送者开始在暗中进行一条平行链的工作，其中包含他这笔交易的另一个版本。

收款人等待该交易被打进一个区块、且其后已链接 $z$ 个区块。他不知道攻击者确切的进度，但假设诚实区块耗尽了每个区块的平均期望时间，攻击者的潜在进度将是一个泊松分布，其期望为：

$$
\lambda = z \frac{q}{p}
$$

要得到攻击者此刻仍可能追上的概率，我们把攻击者可能取得的每种进度的泊松密度，乘以他从该点追上的概率：

$$
\sum_{k=0}^{\infty} \frac{\lambda^k e^{-\lambda}}{k!} \cdot
\begin{Bmatrix}
(q/p)^{(z-k)} & \text{if}\; k\leq z\newline
1 & \text{if}\; k > z
\end{Bmatrix}
$$

整理以避免对分布的无穷尾求和……

$$
1 - \sum_{k=0}^{z} \frac{\lambda^k e^{-\lambda}}{k!}
\left( 1-(q/p)^{(z-k)} \right)
$$

转换为 C 代码……

<pre>
#include &lt;math.h&gt;
double AttackerSuccessProbability(double q, int z)
{
	double p = 1.0 - q;
	double lambda = z * (q / p);
	double sum = 1.0;
	int i, k;
	for (k = 0; k &lt;= z; k++)
	{
		double poisson = exp(-lambda);
		for (i = 1; i &lt;= k; i++)
			poisson *= lambda / i;
		sum -= poisson * (1 - pow(q / p, z - k));
	}
	return sum;
}
</pre>

运行若干结果，可以看到概率随 $z$ 指数下降。

<pre>
q=0.1
z=0    P=1.0000000
z=1    P=0.2045873
z=2    P=0.0509779
z=3    P=0.0131722
z=4    P=0.0034552
z=5    P=0.0009137
z=6    P=0.0002428
z=7    P=0.0000647
z=8    P=0.0000173
z=9    P=0.0000046
z=10   P=0.0000012

q=0.3
z=0    P=1.0000000
z=5    P=0.1773523
z=10   P=0.0416605
z=15   P=0.0101008
z=20   P=0.0024804
z=25   P=0.0006132
z=30   P=0.0001522
z=35   P=0.0000379
z=40   P=0.0000095
z=45   P=0.0000024
z=50   P=0.0000006
</pre>

求解 P 小于 0.1%……

<pre>
P < 0.001
q=0.10   z=5
q=0.15   z=8
q=0.20   z=11
q=0.25   z=15
q=0.30   z=24
q=0.35   z=41
q=0.40   z=89
q=0.45   z=340
</pre>

<h2 id="conclusion"><a href="#conclusion">12. 结论</a></h2>

我们提出了一种不依赖信任的电子交易系统。我们从通常的、由数字签名构成硬币的框架出发，它提供了对所有权的有力控制，但若没有防止双重支付的办法仍不完整。为解决这一点，我们提出了一个使用工作量证明记录公开交易历史的点对点网络：只要诚实节点控制多数算力，攻击者若想更改这段历史，很快就会在计算上得不偿失。网络以其无结构的简洁性而强健。节点们同时工作，几乎无需协调；它们无需被识别，因为消息不路由到任何特定位置，只需以尽力而为的方式送达。节点可以随意离开和重新加入网络，接受工作量证明链作为它们离开期间所发生事情的证明。它们以自己的算力投票：通过为有效区块的延长而工作表达接受，通过拒绝在无效区块上工作表达否决。任何所需的规则与激励，都可以凭借这一共识机制来执行。

<h2 id="references"><a href="#references">参考文献</a></h2>

<ol>
	<li id="fn1">
		<p>W. Dai, <a href="/b-money/">"b-money,"</a> <a href="http://www.weidai.com/bmoney.txt">http://www.weidai.com/bmoney.txt</a>, 1998.&nbsp;<a href="#ref1" title="Jump back to [1]">↩</a></p>
	</li>
	<li id="fn2">
		<p>H. Massias, X.S. Avila, and J.-J. Quisquater, <a href="/static/docs/secure-timestamping-service.pdf">"Design of a secure timestamping service with minimal trust requirements,"</a> In <em>20th Symposium on Information Theory in the Benelux</em>, May 1999.&nbsp;<a href="#ref2" title="Jump back to [2-5]">↩</a></sup>&nbsp;<a href="#ref2-2" title="Jump back to [2]">↩</a></p>
	</li>
	<li id="fn3">
		<p>S. Haber, W.S. Stornetta, <a href="/library/time-stamp-digital-document/">"How to time-stamp a digital document,"</a> In <em>Journal of Cryptology</em>, vol 3, no 2, pages 99-111, 1991.&nbsp;<a href="#ref2" title="Jump back to [2-5]">↩</a></p>
	</li>
	<li id="fn4">
		<p>D. Bayer, S. Haber, W.S. Stornetta, <a href="/library/improving-time-stamping/">"Improving the efficiency and reliability of digital time-stamping,"</a> In <em>Sequences II: Methods in Communication, Security and Computer Science</em>, pages 329-334, 1993.&nbsp;<a href="#ref2" title="Jump back to [2-5]">↩</a></p>
	</li>
	<li id="fn5">
		<p>S. Haber, W.S. Stornetta, <a href="/static/docs/secure-names-bit-strings.pdf">"Secure names for bit-strings,"</a> In <em>Proceedings of the 4th ACM Conference on Computer and Communications Security</em>, pages 28-35, April 1997.&nbsp;<a href="#ref2" title="Jump back to [2-5]">↩</a>&nbsp;<a href="#ref5" title="Jump back to [5]">↩</a></p>
	</li>
	<li id="fn6">
		<p>A. Back, <a href="/static/docs/hashcash.pdf">"Hashcash - a denial of service counter-measure,"</a> <a href="http://www.hashcash.org/papers/hashcash.pdf">http://www.hashcash.org/papers/hashcash.pdf</a>, 2002.&nbsp;<a href="#ref6" title="Jump back to [6]">↩</a></p>
	</li>
	<li id="fn7">
		<p>R.C. Merkle, <a href="/library/public-key-cryptosystems/">"Protocols for public key cryptosystems,"</a> In <em>Proc. 1980 Symposium on Security and Privacy</em>, IEEE Computer Society, pages 122-133, April 1980.&nbsp;<a href="#ref7" title="Jump back to [7]">↩</a></p>
	</li>
	<li id="fn8">
		<p>W. Feller, <a href="/library/introduction-probability-theory-vol-i/">"An introduction to probability theory and its applications,"</a> 1957.&nbsp;<a href="#ref8" title="Jump back to [8]">↩</a></p>
	</li>
</ol>
