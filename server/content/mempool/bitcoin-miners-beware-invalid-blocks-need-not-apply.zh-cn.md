---
title: "比特币矿工当心：无效区块恕不受理"
authors:
  - stop-and-decrypt
date: 2018-06-01
added: 2024-09-13
image: invalid-blocks-need-not-apply.jpg
image_alt: 无效区块恕不受理
original_site: HackerNoon
original_url: https://hackernoon.com/bitcoin-miners-beware-invalid-blocks-need-not-apply-51c293ee278b
excerpt: 比特币是一座不可穿透的验证堡垒。
---

## 比特币是一座不可穿透的验证堡垒。

_像我的[摩尔定律文章](https://hackernoon.com/moores-observation-35f7b25e5773)一样，这是从一篇[更大的文章](https://hackernoon.com/sharding-centralizes-ethereum-by-selling-you-scaling-in-disguised-as-scaling-out-266c136fc55d)中摘录的片段。它足以作为一篇独立文章，因为此文旨在消除的误解是一个常见的、令人厌烦地反复出现的问题。_

### 无需数学也能理解比特币网络

比特币不仅仅是一条区块组成的链。我想帮助你理解比特币区块链 _网络_ 是如何设计的，因为这将帮助你在这一领域获取更多知识时填补一些空白。我说 _区块链_ 网络是因为比特币在上面还有一层 _支付通道_ 网络（闪电网络），它不影响区块链网络的结构。不过我在本文中不会讨论比特币的闪电网络，因为它与我要阐述的观点关系不大。

下面是一个将比特币网络缩小到1000个完全验证节点的粗略示例（_目前实际约有115,000个_）。这里的每个节点都有到其他节点的8个连接，因为这是客户端在未经任何修改时默认的连接数。我的节点就在其中的某个地方，如果你也在运行一个，它也在里面。Coinbase 的节点在里面，Bitmain 的节点在里面，如果 Satoshi 还在活跃，Satoshi 的节点也在里面。

_请注意，这只是一个示意图，真实的网络拓扑结构可能（而且很可能）与此不同。一些节点拥有超过默认数量的连接，而其他节点可能选择连接到有限数量的节点或仅留在一个节点之后。没有办法知道网络实际看起来是什么样子，因为 **它的设计考虑了隐私**（尽管一些监控公司确实试图获得非常接近的近似值），而且节点可以定期更换其对等节点。_

<figure>
  <img src="/static/img/mempool/bitcoin-miners-beware-invalid-blocks-need-not-apply/figure-1.png" alt="">
</figure>

<figure>
  <img src="/static/img/mempool/bitcoin-miners-beware-invalid-blocks-need-not-apply/figure-2.gif" alt="">
</figure>

我从这个示意图开始是因为我想让你理解，这些节点之间没有区别，因为 **它们都进行完全验证。** 这意味着它们都检查整条链，以确保每一笔交易和每一个区块都遵循规则。这在我进一步解释时会变得很重要。

内部的节点与外部的节点没有区别，它们都有相同数量的连接。当你启动一个全新的节点时，它会找到对等节点并成为蜂巢中的一员。在这个示意图中，从任何节点到另一个节点的最长距离是6。在现实生活中，由于[发现新对等节点](https://en.bitcoin.it/wiki/Satoshi_Client_Node_Discovery)不是一个完美地均匀分配每个人的自动化过程，这个距离存在一些偏差，但总的来说，向网络添加更多节点不会改变这一点。Kevin Bacon 的六度分隔理论同样适用于此——在6跳之内，我的交易已经到达了（_几乎_）每个节点的手中，**前提是它是有效的。**

我要从这个群体中选择"我的"节点并将其拖出来，这样我就可以演示当我创建一笔交易并向网络宣布时会发生什么。在下面你会看到最右边的我的节点，然后你会看到与我的节点相连的8个其他节点（_对等节点_）。

<figure>
  <img src="/static/img/mempool/bitcoin-miners-beware-invalid-blocks-need-not-apply/figure-3.png" alt="">
</figure>

当我创建一笔交易并"将它发送到全世界"时，它实际上只发送给了这8个对等节点。由于比特币从底层设计就让每个节点成为完全验证节点，当这8个节点收到我的交易时，它们会检查它是否有效，然后再将其转发给 _它们_ 的8个对等节点。**如果我的交易是无效的，它永远不会突破网络的"表面"。** 我的对等节点永远不会将那笔糟糕的交易转发给它们的对等节点。它们实际上甚至不知道是我创建了那笔交易。它们无法分辨，而且它们平等地对待所有数据，但如果我不断向我的8个对等节点中的任何一个发送无效交易，它们最终都会封禁我。这是它们自动执行的，以防止我垃圾式地占用与它们的连接。无论你是谁，无论你的公司有多大，**如果你的交易无效，它就不会被传播。**

现在假设你不运行全节点，而是使用[轻客户端](https://en.bitcoin.it/wiki/Thin_Client_Security)。桌面端和手机端都有各种轻客户端。其中一些包括 Electrum、Armory、Bread 和 Samourai Wallet。轻客户端绑定到一个特定的节点。一些可以设置为随时间更换连接的节点，但它们最终仍然是绑定的。这就是绑定的样子：

<figure>
  <img src="/static/img/mempool/bitcoin-miners-beware-invalid-blocks-need-not-apply/figure-4.png" alt="">
</figure>

我要你注意这只是一个示意图，用一个碰巧在边缘的节点来演示绑定很容易，但实际上没有真正的边缘，无论该节点在这个示意图中的哪个位置，绑定就是绑定。我用黄色标出了这一点。被绑定的节点是绿色的，蓝色圆点是轻客户端。所有进出轻客户端的信息都经过它们绑定的节点。它们依赖于那个节点。**它们不是网络的一部分。它们不是节点。**

接下来是有趣的部分，也是其他人试图歪曲网络实际运作方式的地方：**如果我想开始挖矿呢？**

_挖_ 一个区块就是 _创造_ 一个区块的行为。就像你想发送的交易一样，你必须创建区块并向网络宣布它。任何节点都可以宣布新区块，这个过程没有什么特别的，_你只需要一个新区块_。挖矿变得越来越困难，但如果你愿意，你可以购买专用硬件并将其连接到你的个人节点。

<figure>
  <img src="/static/img/mempool/bitcoin-miners-beware-invalid-blocks-need-not-apply/figure-5.png" alt="">
</figure>

还记得关于无效交易的那些话吗？区块也是如此，但你需要了解一些关于区块创建的非常具体的细节。

首先观看这个视频。我跳到了关于哈希、使用随机数 nonce（_随机值_）以及用新区块 **头** 追加链条的重要部分：

<figure>
  <img src="/static/img/mempool/bitcoin-miners-beware-invalid-blocks-need-not-apply/figure-6.jpg" alt="">
</figure>

如果有时间请观看整个视频。这是我个人最喜欢的解释挖矿如何工作的视频。

当你看到视频中应用"Prev hash"标签的部分时，那些就是区块头：

<figure>
  <img src="/static/img/mempool/bitcoin-miners-beware-invalid-blocks-need-not-apply/figure-7.png" alt="">
</figure>

这个视频中没有提到的是，即使区块内的所有交易都是无效的，你也可以创建有效的区块头。挖一个包含无效交易的区块仍然需要与挖一个包含有效交易的区块相同的时间。花费所有这些时间和精力创建这样一个区块的动机是推动一笔奖励你不属于你的比特币的交易。这就是为什么所有节点不仅要检查区块头，**还要检查交易**如此重要。这就是阻止矿工花费这些时间的原因。因为 **所有** 节点都检查，**没有** 矿工可以欺骗系统。如果所有节点都不检查，你就必须依赖那些 _确实_ 检查的节点。这会将节点分成不同的"类型"，而唯一重要的类型将是那些检查的节点。

那么如果你加入矿池呢？你可能这样做是因为单独挖矿对你来说太难了，或者如果你是一个稍大的实体，你可能更喜欢稳定的收入而非零散的收入。许多矿工都这样做，他们使用一种完全不同的协议——[Stratum 挖矿协议](https://en.bitcoin.it/wiki/Stratum_mining_protocol)——将其专用硬件直接连接到矿池。就像用你的非节点手机创建交易一样，**你不需要运行节点就可以将你的硬件连接到矿池。** 你可以在不运行节点的情况下挖矿，许多矿工正是这样做的。下面是它的示意图，蓝色部分。我用 Slush Pool 作为示例：

<figure>
  <img src="/static/img/mempool/bitcoin-miners-beware-invalid-blocks-need-not-apply/figure-8.png" alt="">
</figure>

记住，我将这些矿池运行的节点从示意图中拖出来是为了演示。像任何其他节点一样，这些矿池运行的节点需要对等节点。它们需要对等节点来接收交易和区块，也需要对等节点来宣布它们创建的区块。让我再次重申：**所有节点验证所有区块和所有交易。**

如果这些矿池中的任何一个宣布了一个无效区块，它们的对等节点会知道，**因为它们进行完全验证**，它们不会将其转发给其他节点。就像交易一样，**无效区块不会进入网络。**

另一种看待这个问题的方式是不将这些节点从示意图中拖出。下面是一个私人矿工，不想被人知道，它有8个随机的对等节点，**这些对等节点中没有一个知道它是一个矿工**。再次强调，这是出于隐私原因的有意设计。网络中的任何节点都无法知道它收到的区块是被对等节点 _创造_ 的，还是被对等节点 _中继_ 的。它们只知道它是否有效，如果有效就转发，如果无效就不转发。

<figure>
  <img src="/static/img/mempool/bitcoin-miners-beware-invalid-blocks-need-not-apply/figure-9.png" alt="">
</figure>

希望你已经明白了，而且我不相信我使用了任何花哨的数学或方程式来达到这个目的。我想继续了，因为我觉得这已经是完整的覆盖，但还有最后一件事情我想说明，因为正是这最后一个方面被用来混淆那些不完全理解我刚才解释的一切的人。它被如此泛滥地使用，以至于我需要专门说明一下。

<figure>
  <img src="/static/img/mempool/bitcoin-miners-beware-invalid-blocks-need-not-apply/figure-10.png" alt="">
  <figcaption>
    <a href="https://twitter.com/VitalikButerin/status/1000232465540136960">https://twitter.com/VitalikButerin/status/1000232465540136960</a>
  </figcaption>
</figure>

我最初的评论谈论的是轻客户端，也称为SPV客户端，以及它们如何不是网络的一部分。我在上面用蓝色的绑定点演示了这一点。他的后续评论试图暗示挖矿的节点是唯一其拒绝重要的节点。_记住：节点无法知道哪些其他节点挖了一个区块还是中继了一个区块，**这是有意设计的。**_

最后来一张图，让我试着解释一下当人们说"只有挖矿的节点才重要"时使用的逻辑。一些矿工直接连接到其他矿工，这样在它们的网络对等列表中，一些也是其他矿工。**并非所有矿工都这样做。** 一些直接连接的矿工还使用 _可选的_ 中继网络，比如由 Bitcoin Core 开发者 [Matt Corallo](https://twitter.com/TheBlueMatt) [设计的](http://bluematt.bitcoin.ninja/2016/07/07/relay-networks/) FIBRE 网络，但即使是这个侧网络也不局限于矿工，任何人包括你我都可以加入，它只是帮助区块在网络中中继。无论如何，人们试图争辩说这种"挖矿节点"之间的互联性（_无论是否使用类似 FIBRE 的东西_）意味着它们是唯一重要的节点，这是荒谬的：

<figure>
  <img src="/static/img/mempool/bitcoin-miners-beware-invalid-blocks-need-not-apply/figure-11.png" alt="">
</figure>

在这个例子中，我将节点的对等节点保留在示意图中。你现在应该明白要点了。它们拒绝无效区块。绿色圆圈内的那组节点绝不是这个网络中唯一重要的节点。

<figure>
  <blockquote>
    <p>比特币是一座不可穿透的验证堡垒。</p>
    <p>不管是你创造了交易/区块，还是别人发给你的：如果它无效，它就进不来。</p>
    <p>所有节点协同执行验证。</p>
    <p>有些人似乎仍然不理解这个概念。</p>
  </blockquote>
  <figcaption>— <cite>@StopAndDecrypt</cite>，<time datetime="2018-06-01">2018年6月1日</time></figcaption>
</figure>
