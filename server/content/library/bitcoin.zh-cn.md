---
title: "比特币：一种点对点的电子现金系统"
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
external: https://bitcoin.org/bitcoin.pdf
has_math: true
---

<h2 id="abstract"><a href="#abstract">摘要</a></h2>

一种纯点对点的电子现金版本将允许在线支付直接从一方发送到另一方，而无需通过金融机构。数字签名提供了部分解决方案，但如果仍然需要可信第三方来防止双重支付，则其主要优势将丧失。我们提出了一种使用点对点网络来解决双重支付问题的方案。该网络通过将交易哈希到一个基于哈希的工作量证明的持续链中来进行时间戳记录，形成一个除非重新完成工作量证明否则无法更改的记录。最长链不仅作为所见证事件序列的证明，也证明了它来自最大的 CPU 算力池。只要大部分 CPU 算力由不合作攻击网络的节点控制，它们就会生成最长链并超越攻击者。网络本身只需极少的结构。消息以尽力而为的方式广播，节点可以随时离开和重新加入网络，接受最长的工作量证明链作为其离开期间所发生事情的证明。

<h2 id="introduction"><a href="#introduction">1. 引言</a></h2>

互联网上的商业几乎完全依赖金融机构作为可信第三方来处理电子支付。虽然该系统对大多数交易来说足够好用，但它仍然存在基于信任的模型的固有弱点。完全不可逆的交易实际上是不可能的，因为金融机构无法避免调解纠纷。调解成本增加了交易成本，限制了最小实际交易规模，切断了小额随意交易的可能性，而且在丧失为不可逆服务进行不可逆支付的能力方面还存在更大的成本。由于存在撤销的可能性，信任的需求随之扩散。商家必须提防他们的顾客，向他们索要本不需要的更多信息。一定比例的欺诈被视为不可避免。这些成本和支付不确定性在面对面使用实体货币时可以避免，但不存在一种无需可信方就能通过通信信道进行支付的机制。

我们需要的是一种基于密码学证明而非信任的电子支付系统，允许任何两个有意愿的当事方直接进行交易，而无需可信第三方。计算上不可逆的交易将保护卖家免受欺诈，而常规的托管机制可以很容易地实施以保护买家。在本文中，我们提出了一种使用点对点分布式时间戳服务器来生成交易时间顺序的计算证明的方案，以解决双重支付问题。只要诚实节点集体控制的 CPU 算力超过任何合作的攻击者节点组，该系统就是安全的。

<h2 id="transactions"><a href="#transactions">2. 交易</a></h2>

我们将电子硬币定义为一串数字签名链。每个所有者通过数字签名前一笔交易的哈希和下一个所有者的公钥，并将这些添加到硬币的末尾来将硬币转移给下一个所有者。收款人可以验证签名以验证所有权链。

<figure>
  <img src="/static/img/library/bitcoin/transactions.svg" onerror="this.src='/img/library/bitcoin/transactions.png'" alt="交易" />
</figure>

当然，问题在于收款人无法验证所有者中是否有人重复支付了该硬币。一个常见的解决方案是引入一个可信的中心机构或铸币厂，检查每笔交易是否存在双重支付。每笔交易后，硬币必须交回铸币厂以发行新硬币，只有直接从铸币厂发行的硬币才被信任不会双重支付。这个解决方案的问题在于，整个货币体系的命运取决于运营铸币厂的公司，每笔交易都必须经过他们，就像银行一样。

我们需要一种方法让收款人知道前一个所有者没有签署过任何更早的交易。就我们的目的而言，最早的交易才是有效的，所以我们不关心后来的双重支付尝试。确认某笔交易不存在的唯一方法是了解所有交易。在基于铸币厂的模型中，铸币厂了解所有交易并决定哪些先到达。要在没有可信方的情况下实现这一点，交易必须被公开宣布<sup><a href="#fn1" id="ref1">[1]</a></sup>，而且我们需要一个系统让参与者就它们被接收的单个历史顺序达成一致。收款人需要证明在每笔交易时，大多数节点都同意它是第一个收到的。

<h2 id="timestamp-server"><a href="#timestamp-server">3. 时间戳服务器</a></h2>

我们提出的解决方案从一个时间戳服务器开始。时间戳服务器的工作方式是对一个需要加盖时间戳的数据块进行哈希计算并广泛发布该哈希值，例如在报纸或 Usenet 帖子中<sup><a href="#fn2" id="ref2-1">[2-5]</a></sup>。时间戳证明数据在那一刻必然存在，显然，才能被纳入哈希中。每个时间戳都在其哈希中包含前一个时间戳，形成一条链，每个额外的时间戳都在加强之前的时间戳。

<figure>
  <img src="/static/img/library/bitcoin/timestamp-server.svg" onerror="this.src='/img/library/bitcoin/timestamp-server.png'" alt="时间戳服务器" />
</figure>

<h2 id="proof-of-work"><a href="#proof-of-work">4. 工作量证明</a></h2>

要以点对点方式实现分布式时间戳服务器，我们需要使用类似于 Adam Back 的 Hashcash<sup><a href="#fn6" id="ref6">[6]</a></sup> 的工作量证明系统，而不是报纸或 Usenet 帖子。工作量证明包括扫描一个值，当对该值进行哈希计算时（例如使用 SHA-256），哈希值开头包含一定数量的零比特。所需的平均计算量是所需零比特数量的指数级，并且可以通过执行一次哈希来验证。

对于我们的时间戳网络，我们通过在区块中递增一个随机数来实现工作量证明，直到找到一个使区块哈希值满足所需零比特的值。一旦耗费了 CPU 算力使其满足工作量证明，该区块就无法在不重做工作的情况下被更改。由于后续区块在它之后被链接，更改该区块的工作将包括重做其后的所有区块。

<figure>
  <img src="/static/img/library/bitcoin/proof-of-work.svg" onerror="this.src='/img/library/bitcoin/proof-of-work.png'" alt="工作量证明" />
</figure>

工作量证明还解决了在多数决策中确定代表权的问题。如果多数决定基于一个 IP 地址一票，任何能分配大量 IP 的人都可以颠覆它。工作量证明本质上是一个 CPU 一票。多数决定由最长链表示，最长链投入了最大的工作量证明努力。如果大多数 CPU 算力由诚实节点控制，诚实链将增长最快并超越任何竞争链。要修改过去的区块，攻击者必须重做该区块及其后所有区块的工作量证明，然后赶上并超越诚实节点的工作。我们稍后将展示，随着后续区块的增加，较慢的攻击者赶上的概率呈指数级递减。

为了补偿硬件速度的增长和运行节点的兴趣随时间的变化，工作量证明难度由一个移动平均值来确定，目标是平均每小时产生一定数量的区块。如果区块产生得太快，难度就会增加。

<h2 id="network"><a href="#network">5. 网络</a></h2>

运行网络的步骤如下：

1. 新交易被广播到所有节点。
2. 每个节点将新交易收集到一个区块中。
3. 每个节点致力于为其区块寻找一个困难的工作量证明。
4. 当一个节点找到工作量证明时，它将区块广播给所有节点。
5. 节点只有在区块中的所有交易都有效且未被花费的情况下才接受该区块。
6. 节点通过致力于使用已接受区块的哈希作为前一个哈希来创建链中的下一个区块，表示对该区块的接受。

节点始终认为最长的链是正确的链，并继续致力于扩展它。如果两个节点同时广播了下一个区块的不同版本，一些节点可能先收到其中一个。在这种情况下，它们致力于先收到的那个，但保存另一个分支以防它变得更长。当下一个工作量证明被找到并且一个分支变得更长时，僵局将被打破；之前致力于另一个分支的节点将切换到更长的分支。

新交易广播不一定需要到达所有节点。只要它们到达许多节点，它们很快就会被打包进一个区块。区块广播也能容忍丢失的消息。如果一个节点没有收到一个区块，它将在收到下一个区块时发现自己错过了一个，然后请求该区块。

<h2 id="incentive"><a href="#incentive">6. 激励</a></h2>

按照约定，区块中的第一笔交易是一个特殊的交易，它创建一个由区块创建者拥有的新硬币。这为节点支持网络提供了激励，并提供了一种最初将硬币分配到流通中的方式，因为没有中央机构来发行它们。稳定增加固定数量的新硬币类似于金矿开采者消耗资源将黄金投入流通。在我们的情况下，消耗的是 CPU 时间和电力。

激励也可以通过交易费来资助。如果一笔交易的输出值小于其输入值，差额就是交易费，被添加到包含该交易的区块的激励值中。一旦预定数量的硬币进入流通，激励可以完全过渡到交易费，从而完全无通胀。

激励可能有助于鼓励节点保持诚实。如果一个贪婪的攻击者能够组装比所有诚实节点更多的 CPU 算力，他将不得不选择是利用它来欺骗人们——通过偷回自己的付款，还是利用它来生成新硬币。他应该会发现按规则行事更有利可图——这些规则使他获得比其他所有人加起来更多的新硬币——而不是破坏系统及其自身财富的有效性。

<h2 id="reclaiming-disk-space"><a href="#reclaiming-disk-space">7. 回收磁盘空间</a></h2>

一旦硬币中最近的交易被足够多的区块覆盖，之前的已花费交易就可以被丢弃以节省磁盘空间。为了在不破坏区块哈希的情况下实现这一点，交易被哈希到 Merkle 树 <sup><a href="#fn7" id="ref7">[7]</a></sup><sup><a href="#fn2" id="ref2-2">[2]</a></sup><sup><a href="#fn5" id="ref5">[5]</a></sup> 中，只有根哈希被包含在区块的哈希中。旧区块可以通过截断树的分支来压缩。内部哈希不需要存储。

<figure>
  <img src="/static/img/library/bitcoin/reclaiming-disk-space.svg" onerror="this.src='/img/library/bitcoin/reclaiming-disk-space.png'" alt="回收磁盘空间" />
</figure>

一个没有交易的区块头大约为 80 字节。假设每 10 分钟生成一个区块，80 字节 \* 6 \* 24 \* 365 = 每年 4.2MB。以 2008 年计算机系统通常配备 2GB 内存来看，且摩尔定律预测当前增长为每年 1.2GB，即使区块头必须保存在内存中，存储也不应成为问题。

<h2 id="simplified-payment-verification"><a href="#simplified-payment-verification">8. 简化支付验证</a></h2>

无需运行完整的网络节点也可以验证支付。用户只需保存最长工作量证明链的区块头副本，他可以通过查询网络节点直到确信自己拥有最长的链来获得，然后获取将交易链接到其时间戳所在区块的 Merkle 分支。他无法自行检查交易，但通过将其链接到链中的某个位置，他可以看到一个网络节点已经接受了它，并且之后添加的区块进一步确认了网络已经接受了它。

<figure>
  <img src="/static/img/library/bitcoin/simplified-payment-verification.svg" onerror="this.src='/img/library/bitcoin/simplified-payment-verification.png'" alt="简化支付验证" />
</figure>

因此，只要诚实节点控制网络，验证就是可靠的，但如果网络被攻击者压倒，验证就更加脆弱。虽然网络节点可以自行验证交易，但如果攻击者能够持续压制网络，简化方法就可能被攻击者伪造的交易所欺骗。防止这种情况的一种策略是接受网络节点在检测到无效区块时发出的警报，促使用户的软件下载完整的区块和被警报的交易以确认不一致。经常收到支付的企业可能仍然希望运行自己的节点，以获得更独立的安全性和更快的验证。

<h2 id="combining-and-splitting-value"><a href="#combining-and-splitting-value">9. 合并和拆分价值</a></h2>

虽然可以单独处理每个硬币，但为转账中的每一分钱都进行单独的交易会很笨拙。为了允许价值的拆分和合并，交易包含多个输入和输出。通常要么有一个来自较大的先前交易的单个输入，要么有多个合并较小金额的输入，最多有两个输出：一个用于支付，一个将零钱（如果有）返回给发送者。

<figure>
  <img src="/static/img/library/bitcoin/combining-splitting-value.svg" onerror="this.src='/img/library/bitcoin/combining-splitting-value.png'" alt="合并和拆分价值" />
</figure>

需要注意的是，扇出——即一笔交易依赖于多笔交易，而这些交易又依赖于更多交易——在这里不是问题。永远不需要提取交易历史的完整独立副本。

<h2 id="privacy"><a href="#privacy">10. 隐私</a></h2>

传统银行模型通过将信息访问限制在当事方和可信第三方来实现一定程度的隐私。公开宣布所有交易的必要性排除了这种方法，但隐私仍然可以通过在另一个地方打破信息流来维护：通过保持公钥的匿名性。公众可以看到有人向某人发送了一定金额，但没有信息将交易与任何人联系起来。这类似于证券交易所发布的信息程度，在那里单笔交易的时间和规模——即"行情"——是公开的，但不会透露当事方是谁。

<figure>
  <img src="/static/img/library/bitcoin/privacy.svg" onerror="this.src='/img/library/bitcoin/privacy.png'" alt="隐私" />
</figure>

作为一道额外的防火墙，每次交易都应使用新的密钥对，以防止它们被关联到同一个所有者。对于多输入交易，某些关联仍然是不可避免的，这必然揭示了这些输入属于同一个所有者。风险在于，如果某个密钥的所有者被揭示，关联可能会揭示属于同一所有者的其他交易。

<h2 id="calculations"><a href="#calculations">11. 计算</a></h2>

我们考虑攻击者试图比诚实链更快地生成替代链的场景。即使做到了这一点，它也不会使系统对任意更改敞开大门，例如凭空创造价值或拿走从不属于攻击者的钱。节点不会接受无效交易作为付款，诚实节点永远不会接受包含它们的区块。攻击者只能尝试更改自己的交易以取回最近花费的钱。

诚实链和攻击者链之间的竞赛可以被描述为二项随机游走。成功事件是诚实链被扩展一个区块，将其领先优势增加 +1，失败事件是攻击者的链被扩展一个区块，将差距缩小 -1。

攻击者从给定落后距离追赶上的概率类似于赌徒破产问题。假设一个拥有无限信用的赌徒从赤字开始，进行可能无限次数的试验以试图达到盈亏平衡。我们可以计算他永远达到盈亏平衡的概率，即攻击者永远赶上诚实链的概率，如下所示：<sup><a href="#fn8" id="ref8">[8]</a></sup>

$$
\begin{aligned}
p &= \text{诚实节点找到下一个区块的概率} \\
q &= \text{攻击者找到下一个区块的概率} \\
q_z &= \text{攻击者从落后 $z$ 个区块追赶上的概率}
\end{aligned}
$$

$$
\large q_z = \begin{Bmatrix}
1 & \text{if}\; p \leq q\newline
(q/p)^z & \text{if}\; p > q
\end{Bmatrix}
$$

鉴于我们假设 $p \gt q$，概率随着攻击者需要追赶的区块数量增加而呈指数级下降。在胜算不利于他的情况下，如果他不能在早期做出幸运的冲刺，随着他越来越落后，他的机会变得微乎其微。

我们现在考虑新交易的接收方在多大程度上可以确信发送方无法更改交易之前需要等待多长时间。我们假设发送方是一个攻击者，他想让接收方相信他已经付款了一段时间，然后在一段时间后将交易切换为支付给自己。接收方会在那时收到警报，但发送方希望为时已晚。

接收方在签署前不久生成一个新的密钥对，并将公钥给发送方。这防止发送方通过持续工作预先准备好一条区块链直到他有幸获得足够的领先优势，然后在那个时刻执行交易。一旦交易发送，不诚实的发送方开始在秘密的平行链上工作，该链包含他交易的替代版本。

接收方等待交易被添加到一个区块中，并且 $z$ 个区块已经在其后链接。他不知道攻击者取得了多少确切进展，但假设诚实区块花费了每个区块的平均预期时间，攻击者的潜在进展将是泊松分布，其期望值为：

$$
\lambda = z \frac{q}{p}
$$

为了得到攻击者现在仍然可以赶上的概率，我们将攻击者可能取得的每种进展的泊松密度乘以他从该点能够赶上的概率：

$$
\sum_{k=0}^{\infty} \frac{\lambda^k e^{-\lambda}}{k!} \cdot
\begin{Bmatrix}
(q/p)^{(z-k)} & \text{if}\; k\leq z\newline
1 & \text{if}\; k > z
\end{Bmatrix}
$$

重新排列以避免对分布的无限尾部求和...

$$
1 - \sum_{k=0}^{z} \frac{\lambda^k e^{-\lambda}}{k!}
\left( 1-(q/p)^{(z-k)} \right)
$$

转换为 C 代码...

<pre>
#include &lt;math.h&gt;
double AttackerSuccessProbability(double q, int z)
{
	double p = 1.0 - q;
	double lambda = z * (q / p);
	double sum = 1.0;
	int i, k;
	for (k = 0; k <= z; k++)
	{
		double poisson = exp(-lambda);
		for (i = 1; i <= k; i++)
			poisson *= lambda / i;
		sum -= poisson * (1 - pow(q / p, z - k));
	}
	return sum;
}
</pre>

运行一些结果，我们可以看到概率随 $z$ 呈指数级下降。

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

求解 P 小于 0.1%...

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

我们提出了一种不依赖信任的电子交易系统。我们从数字签名构成的硬币的通常框架开始，它提供了对所有权的强有力控制，但在没有防止双重支付的方法的情况下是不完整的。为了解决这个问题，我们提出了一个使用工作量证明的点对点网络来记录交易的公共历史，如果诚实节点控制了大多数 CPU 算力，攻击者在计算上就很快无法更改它。网络以其非结构化的简单性而稳健。节点同时工作，几乎不需要协调。它们不需要被识别，因为消息不被路由到任何特定的地方，只需尽力送达即可。节点可以随时离开和重新加入网络，接受工作量证明链作为其离开期间所发生事情的证明。它们用 CPU 算力投票，通过致力于扩展有效区块来表达对它们的接受，通过拒绝在其上工作来拒绝无效区块。任何需要的规则和激励都可以通过这种共识机制来执行。

<h2 id="references"><a href="#references">参考文献</a></h2>

<ol>
	<li id="fn1">
		<p>W. Dai, <a href="/b-money/">"b-money,"</a> <a href="http://www.weidai.com/bmoney.txt">http://www.weidai.com/bmoney.txt</a>, 1998.&nbsp;<a href="#ref1" title="返回 [1]">↩</a></p>
	</li>
	<li id="fn2">
		<p>H. Massias, X.S. Avila, and J.-J. Quisquater, <a href="/static/docs/secure-timestamping-service.pdf">"Design of a secure timestamping service with minimal trust requirements,"</a> In <em>20th Symposium on Information Theory in the Benelux</em>, May 1999.&nbsp;<a href="#ref2" title="返回 [2-5]">↩</a></sup>&nbsp;<a href="#ref2-2" title="返回 [2]">↩</a></p>
	</li>
	<li id="fn3">
		<p>S. Haber, W.S. Stornetta, <a href="/library/time-stamp-digital-document/">"How to time-stamp a digital document,"</a> In <em>Journal of Cryptology</em>, vol 3, no 2, pages 99-111, 1991.&nbsp;<a href="#ref2" title="返回 [2-5]">↩</a></p>
	</li>
	<li id="fn4">
		<p>D. Bayer, S. Haber, W.S. Stornetta, <a href="/library/improving-time-stamping/">"Improving the efficiency and reliability of digital time-stamping,"</a> In <em>Sequences II: Methods in Communication, Security and Computer Science</em>, pages 329-334, 1993.&nbsp;<a href="#ref2" title="返回 [2-5]">↩</a></p>
	</li>
	<li id="fn5">
		<p>S. Haber, W.S. Stornetta, <a href="/static/docs/secure-names-bit-strings.pdf">"Secure names for bit-strings,"</a> In <em>Proceedings of the 4th ACM Conference on Computer and Communications Security</em>, pages 28-35, April 1997.&nbsp;<a href="#ref2" title="返回 [2-5]">↩</a>&nbsp;<a href="#ref5" title="返回 [5]">↩</a></p>
	</li>
	<li id="fn6">
		<p>A. Back, <a href="/static/docs/hashcash.pdf">"Hashcash - a denial of service counter-measure,"</a> <a href="http://www.hashcash.org/papers/hashcash.pdf">http://www.hashcash.org/papers/hashcash.pdf</a>, 2002.&nbsp;<a href="#ref6" title="返回 [6]">↩</a></p>
	</li>
	<li id="fn7">
		<p>R.C. Merkle, <a href="/library/public-key-cryptosystems/">"Protocols for public key cryptosystems,"</a> In <em>Proc. 1980 Symposium on Security and Privacy</em>, IEEE Computer Society, pages 122-133, April 1980.&nbsp;<a href="#ref7" title="返回 [7]">↩</a></p>
	</li>
	<li id="fn8">
		<p>W. Feller, <a href="/library/introduction-probability-theory-vol-i/">"An introduction to probability theory and its applications,"</a> 1957.&nbsp;<a href="#ref8" title="返回 [8]">↩</a></p>
	</li>
</ol>
