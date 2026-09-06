---
title: 比特币：更差即是更好
authors:
  - gwern-branwen
date: 2011-05-27
doctype: essay
external: https://gwern.net/bitcoin-is-worse-is-better
...

_最后更新：2018-11-21_

> [比特币](https://en.wikipedia.org/wiki/Bitcoin)的天才之处不在于创造了任何深奥的数学或密码学突破，而在于将数十年前的已有组件以半新颖但极其_不受欢迎_的方式组合在一起，从而发明了一种在现实世界中取得成功的数字货币。比特币所需的一切早已存在多年，包括那些核心思想。
>
> 比特币为实现去中心化所做出的牺牲——尽管实用——是一种深刻的_丑陋_。即便是对其友好的密码学家和数字货币爱好者，早期对比特币的反应也几乎一律极其负面，强调了（他们认为的）低效和（相对于大多数密码学而言）薄弱的安全保证。批评者们"让完美成为更好的敌人"，未能看到比特币的潜力。
>
> 然而，作为"更差即是更好"的一个范例，比特币这个丑陋低效的原型成功地创造了一种安全的去中心化数字货币，它可以无限期地等待成功，而这足以最终带来采用、改进，并成长为一种安全的全球数字货币。

比特币理念的伟大成就是什么？在讨论2011年比特币价格近期升至8美元/₿时，许多人一直在想中本聪面具下的真人是谁；这是一个难以回答的问题——到底有多少位自由意志主义密码学家天才？但有趣的是，中本聪可以是_任何人_，而我相信这为我们理解比特币如何从无到有地自举提供了一个有趣的线索。

中本聪可以是任何人，比特币不涉及任何_数学/密码学_层面的重大知识突破，因此中本聪无需拥有密码学方面的资质，甚至可以只是一个自学成才的程序员！

## 前提条件

中本聪在早期私下讨论[^1]之后，于[2008年11月1日](/satoshi/emails/cryptography/1/)发布了其白皮书的首次公开版本，[白皮书](/library/bitcoin/ "'Bitcoin: A Peer-to-Peer Electronic Cash System', Nakamoto 2009")随后又经过了进一步编辑，但如果你审视构成比特币的密码学技术，它们可以分为：

- 公钥密码学[^2]
- 密码学签名
- 密码学哈希函数
- 用于工作量证明的哈希链
  1. 哈希树
  1. 比特金（Bit gold）
- 密码学时间戳
- 弹性点对点网络

### 时间线

<figure>
  <blockquote>
    <p>那么，对于"为什么是现在？"的第一个答案很简单："因为时候到了。"我没法告诉你为什么博客花了这么长时间才出现，我只能说这跟技术毫无关系。当<a href="https://en.wikipedia.org/wiki/Mosaic_(web_browser)" title="Mosaic (web browser)">Mosaic</a>发布第一个支持<a href="https://en.wikipedia.org/wiki/HTML_form" title="Form (HTML)">表单</a>的浏览器的那一天，我们就已经有了做博客所需的每一项技术。每一项都在那里了。然而，我们得到的却是<a href="https://en.wikipedia.org/wiki/GeoCities" title="GeoCities">GeoCities</a>。</p>
  </blockquote>
  <figcaption><a href="https://en.wikipedia.org/wiki/Clay_Shirky" title="Clay Shirky">Clay Shirky</a>（<a href="https://gwern.net/doc/technology/2005-shirky-agroupisitsownworstenemy.pdf" title="'A Group Is Its Own Worst Enemy', Shirky 2005">《一个群体是自己最大的敌人》</a>，2003）</figcaption>
</figure>

有趣的是，在 Satoshi 发表之前，所有组件至少已经就位了8年，而发表之后又过了半年多[^3]才出现首个公开[^4]原型。如果我们查看白皮书和他人的引用，然后按年份降序排列相关技术：

1. 2001年：[SHA-256](https://en.wikipedia.org/wiki/SHA-2)定稿
1. 1999年至今：[拜占庭容错](https://en.wikipedia.org/wiki/Byzantine_fault "Byzantine fault")（[PBFT](https://www.usenix.org/legacy/publications/library/proceedings/osdi99/full_papers/castro/castro.ps)等）
1. 1999年至今：[P2P网络](https://en.wikipedia.org/wiki/Peer-to-peer)（不包括[Usenet](https://en.wikipedia.org/wiki/Usenet)或[FidoNet](https://en.wikipedia.org/wiki/FidoNet)等早期网络；[MojoNation](<https://web.archive.org/web/20230423125705/https://en.wikipedia.org/wiki/Mnet_(peer-to-peer_network)>)和[BitTorrent](https://en.wikipedia.org/wiki/BitTorrent)、[Napster](https://en.wikipedia.org/wiki/Napster)、[Gnutella](https://en.wikipedia.org/wiki/Gnutella)、[eDonkey](https://en.wikipedia.org/wiki/EDonkey_network "eDonkey network")、[Freenet](https://en.wikipedia.org/wiki/Freenet)、[i2p](https://en.wikipedia.org/wiki/I2P)等）
1. 1998年：Wei Dai，[B-money](/library/b-money/)[^5]
1. 1997年：[HashCash](https://en.wikipedia.org/wiki/Hashcash)；1998年[^6]：Nick Szabo，比特金（Bit Gold）；约2000年：MojoNation/BitTorrent；约2001—2003年，[Karma](https://netecon.seas.harvard.edu/P2PEcon03.html/Papers/Vishnumurthy_03.pdf "'KARMA: A Secure Economic Framework for Peer-to-Peer Resource Sharing', Vishnumurthy et al 2003")等
1. 1992—1993年：用于反垃圾邮件的工作量证明[^7]
1. 1991年：[密码学时间戳](https://en.wikipedia.org/wiki/Trusted_timestamping "Trusted timestamping")
1. 1980年：[公钥密码学](https://en.wikipedia.org/wiki/Public-key_cryptography)[^8]
1. 1979年：[哈希树](https://en.wikipedia.org/wiki/Merkle_tree "Merkle tree")

这种缺乏新颖性本身就是吸引力的一部分——一个密码系统中新增的部分越少，风险就越小。[^9] 所缺乏的只是一个 Satoshi 来启动一个比特币。

## 延迟

但有了后见之明，人们不禁要问——为什么会有这样的延迟？[^10]

如果这个想法（相对）容易理解且使用的是基础概念，[^11] 如果它远远谈不上处于密码学的前沿，[^12] 那么就没有理由认为它不会被认真尝试。90年代的[密码朋克](https://en.wikipedia.org/wiki/Cypherpunk)们无疑是极具创造力的，他们发明了从[Cypherpunk](https://en.wikipedia.org/wiki/Cypherpunk_anonymous_remailer "Cypherpunk anonymous remailer")/[Mixmaster](https://en.wikipedia.org/wiki/Mixmaster_anonymous_remailer "Mixmaster anonymous remailer")到[MojoNation](<https://web.archive.org/web/20230423125705/https://en.wikipedia.org/wiki/Mnet_(peer-to-peer_network)>)到[暗杀市场](https://en.wikipedia.org/wiki/Assassination_market)到[数据避风港](https://en.wikipedia.org/wiki/Data_haven)（在《[Cryptonomicon](https://en.wikipedia.org/wiki/Cryptonomicon)》中有令人难忘的描绘）等各种东西。我们已经看到了他们提出的两种加密货币，而工作量证明是应对日益泛滥的垃圾邮件最常见的提案之一。[^13] 为什么比特币花十年之久才诞生？[时机问题](https://gwern.net/timing "'Timing Technology: Lessons From The Media Lab', Branwen 2012")一直困扰着我——这类似于历史上的一个问题：为什么英国经历了工业革命并发展为帝国，而不是在各方面看似条件更好的中国？[创新从何而来](https://gwern.net/review/bakewell "'Origins of Innovation: Bakewell & Breeding', Branwen 2018")？一定有一个答案。（也许它和VR的情况类似。[^15]）

### 不切实际？

问题出在资源上吗？在白皮书中，Satoshi 说：

> 一个不包含交易的区块头大约为80字节。如果我们假设每10分钟生成一个区块，80字节 * 6 * 24 * 365 = 每年4.2MB。鉴于2008年销售的计算机系统通常配备2GB内存，而摩尔定律预测当前每年增长1.2GB，即使区块头必须保存在内存中，存储也不应该成为问题。

在2008年经历了多次翻倍之后说这话当然没问题。但在1990年代，内存会是个问题吗？不一定。比特币挖矿的难度是可调的，所以问题归结为：

1. 磁盘使用量

   - 使用更小的哈希函数如SHA1[^16]，80字节可以进一步缩小
   - 10分钟并不是一成不变的；为什么不是20分钟？这样交易开销就直接减半了
   - 哈希树可以被"垃圾回收"并压缩[^17]
   - 只有在偏执的情况下才需要维护完整的哈希树。

     在实践中，就像当时的许多程序（如邮件或Usenet客户端）一样，默认做法可以简单地说只保留最近的_n_个区块/哈希（Satoshi估计每天[12kb](/satoshi/emails/cryptography/2/)）；这将消耗有限的磁盘空间。

1. 网络连接问题可以通过#1的解决方案来解决

   1. 取决于现有哈希树的大小
   1. 以及新交易的频率

值得一提的是，人们普遍预期在某个时候，像你我这样的普通桌面用户将不再是完整节点和比特币矿工，而是会使用某种运行着强大服务器的专业服务；在一个比特币始于1990年代早期的假想宇宙中，这种转变只不过会更早发生。（而在第一次互联网泡沫中，大量投资资金急于投资的情况下，启动这样的服务将是相当容易的，无论技术要求如何。）

## 当时的反对意见

同样，对加密货币的反对意见中，几乎没有"能运行它的计算机极其昂贵"这样的说法。[^18] 在计算机领域，应用和技术往往在摩尔定律使其变得实用之前的数十年就被发明了，[^19] 但比特币似乎_并没有_经历这种情况。类似的反对意见也适用于专利或已发表的论文；如果比特币是一个已知的想法，它们在哪里？我还没看到有人指出哪些专利可能阻止了密码学研究人员和实现者；答案是根本没有。因为缺少投资者兴趣？Satoshi 并不需要投资者，但在90年代有大量的在线支付服务创业公司，每一家都在寻找那让他们赢得"心智份额"并借助"网络效应"获胜的秘密武器；[DigiCash](https://en.wikipedia.org/wiki/DigiCash)再次浮现在脑海中。即使在90年代——在我们2010年代的人看来互联网尚处于萌芽期的时代——网上仍然有数百万用户可以使用数字现金。

所以，如果基本想法是可访问的，而且在过去20年左右的消费级硬件上就能实用运行，那问题出在哪里？

### 密码学家们的反对

我认为看看 Satoshi 在密码学邮件列表上的[公告帖](http://localhost:3000/satoshi/emails/cryptography/threads/1/)很有启发性；尤其是各种早期批评：

- [磁盘/带宽无法扩展](/satoshi/emails/cryptography/threads/1/#014814)[^20]

  Satoshi 的[回应](/satoshi/emails/cryptography/threads/1/#014815)是他预期大多数比特币用户最终将成为二等公民，转而使用他在白皮书中概述的[轻客户端](https://en.bitcoin.it/wiki/Thin_Client_Security)方案——只保留部分区块链，将存储委托给真正的对等节点。这看起来并不理想。

- [提案描述不充分](/satoshi/emails/cryptography/threads/1/#014827)（忽略了分布式系统中的所有可能的[竞态条件](https://en.wikipedia.org/wiki/Race_condition)和[去同步攻击](https://culubas.blogspot.com/2011/05/timejacking-bitcoin_802.html)以及各种场景），且细节[仅在代码中临时可见](/satoshi/emails/cryptography/threads/1/#014848)[^21]
- [将交易与比特币创造混为一谈](/satoshi/emails/cryptography/threads/1/#014837)需要持续通胀
- 在大量分布式数据上达成[共识](<https://en.wikipedia.org/wiki/Consensus_(computer_science)> "Consensus (computer science)")[非常困难](/satoshi/emails/cryptography/threads/1/#014837)，即使没有激励去破坏它或发动攻击
- [快速节点主导哈希树](/satoshi/emails/cryptography/threads/1/#014857)以及交易饥饿问题
- [假名性与可链接交易](/satoshi/emails/cryptography/threads/1/#014859)[^22]（不可逆交易也意味着[双重支付](/satoshi/emails/cryptography/threads/1/#014864)必须能被非常快速地检测到）

[Nick Szabo](/library/bitcoin-what-took-ye-so-long/)总结了早期反应：

> 比特币不是一串密码学特性的列表，它是一个非常复杂的、由相互作用的数学和协议组成的系统，追求的是一个极其不受欢迎的目标。虽然安全技术绝非微不足道，但"为什么"才是最大的绊脚石——几乎每一个听到总体想法的人都觉得这是一个非常糟糕的主意。我自己、Wei Dai 和 Hal Finney 是我所知道的仅有的几个对这个想法（或者在 Dai 的情况下是他相关的想法）足够认可并愿意在一定程度上加以推进的人，直到 Nakamoto 出现（假设 Nakamoto 不是 Finney 或 Dai 的话）。只有 Finney（[RPOW](/finney/rpow/index.html)）和 Nakamoto 有足够的动力去实际实现这样一个方案。

此外，让我们再看看密码学家 [Ben Laurie](https://en.wikipedia.org/wiki/Ben_Laurie) 和 Victor Grischchenko 关实"的现实或弄清楚谁是骗子；但就像维基百科一样，哈希链只是简单地映射了某个群体的共识——而这个群体的选择多少有些随意：

> ……大家决定，任何人只要愿意都可以宣布一个时间，而最先听到的那个时间将成为官方的进攻时间。问题在于网络不是即时传输的，如果两位将军在差不多相同的时间宣布了不同的进攻时间，有些人可能先听到一个，另一些人先听到另一个。
>
> 他们使用工作量证明链来解决这个问题。一旦每位将军收到他最先听到的进攻时间，他就让自己的计算机开始求解一个包含该进攻时间哈希的极度困难的工作量证明问题。这个工作量证明如此困难，预计需要他们全体同时工作10分钟才能有人找到解。一旦某位将军找到了一个工作量证明，他就将其广播到网络上，所有人都将自己当前的工作量证明计算改为包含该证明在它们正在计算的哈希中。如果有人之前在计算一个不同的进攻时间，他们会切换到这个时间，因为它的工作量证明链现在更长了。
>
> 两小时后，某个进攻时间应该被一条包含12个工作量证明的链所哈希。每位将军只需验证该工作量证明链的难度，就可以估算出每小时消耗了多少并行CPU算力，并看到在规定时间内产生这么多工作量证明必然需要大多数计算机参与。他们一定都看到了它，因为工作量证明就是他们曾参与计算的证明。如果工作量证明链所展示的CPU算力足以破解密码，他们就可以放心地在约定时间发起进攻。
>
> 工作量证明链就是你问的所有关于同步、分布式数据库和全局视图问题的解决方案。

#### "更差"如何成为"更好"

简而言之，比特币是[更差即是更好](https://en.wikipedia.org/wiki/Worse_is_better)（[原始文章](https://dreamsongs.com/WorseIsBetter.html)）的完美例证。你可以看到Richard P. Gabriel列举的那些权衡：比特币有许多边缘情况；它缺乏人们期望加密货币拥有的许多特性；白皮书严重描述不足；许多行为是由矿工和客户端集体同意接受的内容在社会层面决定的，而非由协议决定；等等。

> 更差即是更好的哲学只有些微不同：[...]
>
> - 完整性——设计必须尽可能覆盖更多的重要情况。所有合理预期的情况都应被覆盖。为了任何其他质量，完整性都可以被牺牲。事实上，每当实现简洁性受到威胁时，完整性就必须被牺牲。如果简单性得到保留，一致性可以为完整性而牺牲；尤其无价值的是接口的一致性。
>
> ……MIT那家伙没有看到任何处理这个[边缘]情况的代码，便问New Jersey那家伙这个问题是怎么处理的。New Jersey那家伙说Unix的人意识到了这个问题，但解决方案是让系统例程总是结束，但有时会返回一个表示系统例程未能完成其操作的错误码。那么，一个正确的用户程序就必须检查错误码，以决定是否简单地重试该系统例程。MIT那家伙不喜欢这个解决方案，因为它不是正确的做法……让一半正确的东西可用并让它像病毒一样传播，要比等待更好的方案好。一旦人们上了瘾，再花时间将它改进到90%的正确。

拜占庭弹性的保证？草草勾勒，留待未来工作。激励兼容？嗯……_也许吧_。匿名性？搁置了，转而采用假名制；也许以后有人能加上真正的匿名性。交易最终性的保证？没有，用户只需查看自己的区块链副本。一致的API？别想了，连标准都没有，一切都是实现定义的（如果你写一个客户端，它最好与中本聪的客户端"向下兼容"）。登月级别的数学？不，就是基本的公钥密码学加上大量命令式栈机器的位操作。空间效率？直接的区块链和磁盘存储优先于任何花哨的压缩或数据结构方案。快速交易？你可以使用零确认，如果这还不足以买咖啡，也许有人能利用智能合约功能想出点什么。等等。

尽管存在所有这些问题，它_似乎就是能运转_。就像Unix一样，有无数种方式可以毁掉你的数据或让系统崩溃，而这些在更"正规"的操作系统如[OpenVMS](https://en.wikipedia.org/wiki/OpenVMS)上根本不存在，而且与[ITS](https://en.wikipedia.org/wiki/Incompatible_Timesharing_System "Incompatible Timesharing System")或[Lisp机器](https://en.wikipedia.org/wiki/Lisp_machine)操作系统相比，它缺少无数功能。但就像传说中的蟑螂一样，Unix传播、联网、存活了下来——而其他的则没有。[^30]而随着它的存活和逐渐进化，它慢慢变成了它一开始"应该"成为的样子。又或者HTML[^31]与[Xanadu计划](https://en.wikipedia.org/wiki/Project_Xanadu)的故事。

[Paul Ford](https://web.archive.org/web/20131127005644/http://www.businessweek.com/printer/articles/105346-bitcoin-may-be-the-global-economys-last-safe-haven "Bitcoin May Be the Global Economy's Last Safe Haven")在2013年偶然得出了类似的比特币观：

> 互联网是"最糟糕之物"的忠实拥趸。许多人认为Twitter是人们沟通方式中最糟糕的一种，不过是被缩写成小小碎片的言论；Facebook是体验人际关系的一种可怕方式，将人际关系商品化为一份可以"戳"的朋友列表。阿拉伯之春稍微改变了这个叙事。（BuzzFeed是另一个例子——让他们去看猫咪图片吧。）互联网成功的一个配方似乎是这样的：从最底层起步，从最荒谬、可笑但核心的想法开始，然后拥抱它。不知疲倦地推广它，直到你被收购或你接管了世界。比特币正在以类似的方式展开。它要求用户忘记中央银行的存在，就像Steve Jobs要求iPhone用户忘记鼠标一样。

但他缺乏"更差即是更好"的理论范式（尽管他是个程序员），不理解比特币_如何_是最糟糕之物。关键不在于比特币的去中心化方面，而在于比特币_如何_实现去中心化：一个密码学家很难想出比特币，因为其机制太丑陋了，而他心中想要的优雅特性太多。程序员和数学家常谈论"品味"，以及品味如何引导人找到更好的解决方案。密码学家的品味偏好的是优化效率和定理的密码系统；而不是优化传播性、追求社会学吸引力的系统。[^32]中心化系统是自然的解决方案，因为它们简单，就像整数一样简单；但正如整数只是实数中微乎其微的一个子集一样，中心化系统也只是去中心化系统中极小的一个子集。[^33]DigiCash和其他所有加密货币创业公司可能拥有许多精巧的功能，可能效率远更高，等等，但它们还是死掉了。[^34]它们没有社区，它们的中心化意味着它们与其企业赞助者一同倒下。它们必须在压缩的时间框架内获胜，否则就彻底消亡。但"那不死之物，可永恒长眠"。而且这场竞赛未必属于快捷者，正如[Hal Finney早期也指出的](https://bitcointalk.org/index.php?topic=11765.msg169026#msg169026 "Bitcoin and the Efficient Market Hypothesis; June 04, 2011, 11:36:04 PM")：

> 比特币每一天没有因法律或技术问题而崩溃，就为市场带来了新的信息。它提高了比特币最终成功的机会，也证明了更高的价格是合理的。

也许比特币最大的美德不是它的通缩特性，也不是它的微支付，而是它病毒式的分布式本质；它可以等待属于自己的机会。"如果你在河岸上坐得足够久，你就会看到你敌人的尸体漂过来。"

#### 反对意见：比特币不是"更差"，而是"更好"

Nick Szabo和Zooko Wilcox-O'Hearn强烈反对"比特币是更差即是更好"这一论点。他们认为，虽然比特币可能存在不好的部分，但有一个新颖的核心思想实际上非常巧妙——哈希链是一种打破常规的折中方案，它让我们绕过了分布式计算中的经典问题，给了我们某种_足够接近_可信非中心化权威的东西，使我们可以在实践中使用它。

> Gwern的文章未能认识到比特币所带来的技术进步。十五年来（自从我在DigiCash工作以来），我一直在断断续续地尝试发明一种去中心化的数字支付系统。在比特币被实际实现并变得像现在这样流行之前，我都不确定一个实用系统是否_可能存在_。科学进步在事后看来往往显而易见，比特币也是如此。[^35]

Nick Szabo[认为](/library/bitcoin-what-took-ye-so-long/ "Bitcoin, what took ye so long?")主要的阻碍因素是：

1. 关于货币本质的意识形态信念（自由主义者对非国家货币不感兴趣，而奥地利学派认为货币必须具有内在价值）
1. 比特金（bit gold）类思想的默默无闻
1. "要求在拜占庭弹性点对点系统中进行工作量证明才能成为节点，以降低不受信任方控制大多数节点从而破坏若干重要安全特性的威胁"
1. 一些简化（不是将"旧的"更难挖的比特币转换为"新的"更容易挖的比特币的市场，而是一个不断变化的、全网共识决定的挖矿难度）

我个人的看法是，因素#1可能是一个重要因素，但值得质疑，因为核心突破同样适用于各种其他任务，如安全的全球时钟、时间戳或域名系统；因素#2无关紧要，因为所有数字加密货币思想都是默默无闻的（以至于中本聪的白皮书甚至没有引用比特金，而只引用了b-money，然而Wei Dai并不认为他的b-money实际上对比特币产生了任何影响！[^36]）；而因素#3-4都是小细节，不可能解释为什么比特币在某种程度上取得了成功，而比特金这样的思想却无人问津。

## 另请参阅

- [丝路1](https://gwern.net/silk-road "'丝路1：理论与实践'，Branwen 2011")（丝路1市场平台的使用和经济哲学）
- [文件的密码学时间戳](https://gwern.net/timestamping "基于比特币的便捷、免费、安全的大量文件/字符串时间戳脚本")
- [Copyleft](https://en.wikipedia.org/wiki/Copyleft)
- [Gall定律](<https://en.wikipedia.org/wiki/John_Gall_(author)#Gall%27s_law> "John Gall (author)#Gall's law")
- [规模假说](https://gwern.net/scaling-hypothesis)（另一个不受欢迎的蛮力范式）

## 外部链接

- [原始文章](https://web.archive.org/web/20181229003208/http://bitcoinweekly.com/articles/bitcoin-is-worse-is-better)发布在_Bitcoin Weekly_上（7条评论）

  - Reddit讨论：[1](https://www.reddit.com/r/Bitcoin/comments/hlu9l/bitcoin_is_worse_is_better/)/[2](https://www.reddit.com/r/slatestarcodex/comments/7monod/bitcoinisworseisbetter/)/[3](https://www.reddit.com/r/Bitcoin/comments/9xet9l/bitcoin_is_worse_is_better_blog_post_by_gwern/)
  - Hacker News讨论：[1](https://news.ycombinator.com/item?id=2934879)，[2](https://news.ycombinator.com/item?id=6465320)，[3](https://news.ycombinator.com/item?id=26649343)

- ["中本聪不知道的事"](https://gwern.net/doc/bitcoin/2015-andresen.pdf)，Gavin Andresen 2015
- ["比特币理论（拜占庭将军及更远）"](https://bitcointalk.org/index.php?topic=99631.0)
- ["比特币：未来冲击的一小片"](https://thomasbarker.com/13/06/bitcoin-little-slice-future-shock)
- ["三角形的平方化：安全、去中心化、人类可读的名称"](http://www.aaronsw.com/weblog/squarezooko)（Aaron Swartz）
- ["Nick Szabo：加密货币的计算机科学"](https://www.bitstein.org/blog/nick-szabo-the-computer-science-of-crypto-currency/)
- ["货币、区块链与社会可扩展性"](https://unenumerated.blogspot.com/2017/02/money-blockchains-and-social-scalability.html)（Nick Szabo）
- ["以太坊协议的前史"](https://vitalik.eth.limo/general/2017/09/14/prehistory.html)（Vitalik Buterin）
- ["比特币——计算机科学研究的安德罗米达菌株"](https://www.cs.columbia.edu/~smb/blog/2017-12/2017-12-30.html)（Steven M. Bellovin）
- ["让比特币成为可能的尤里卡时刻：这项技术的一个关键洞见近三十年前在新泽西一家Friendly's餐厅里降临到一位物理学家脑中"](https://www.wsj.com/articles/the-eureka-moment-that-made-bitcoin-possible-1527268025)
- ["自上而下与自下而上的技术"](https://www.devever.net/~hl/growupdown)
- ["比特币咬下子弹：它一些最令人困惑的权衡被解释"](https://medium.com/@nic__carter/bitcoin-bites-the-bullet-8005a2a62d29)
- ["到底是什么在推动加密货币现象？"](https://iterative.capital/thesis/)，Dannen等 2018
- [Butler Lampson谈万维网](https://archive.computerhistory.org/resources/text/Oral_History/Lampson_Butler/102658024.05.01.pdf#page=36 "'Butler Lampson口述历史'，Lampson和Kay 2006-第36页")

## 附录

### 不可逆交易：元骗局

> 比特币交易的不可逆性在交易所和整个山寨币生态系统中制造了一些不寻常的动态（对我来说，可能最有趣的山寨币骗局是[Bytecoin骗局+匿名性创新](https://da-data.blogspot.com/2014/08/minting-money-with-monero-and-cpu.html "用Monero铸币……以及CPU向量内联函数")）。
> 2013年5月，我从一个[Reddit帖子](https://www.reddit.com/r/onions/comments/1euxp4/so_does_this_work_or_is_it_a_scam/ "用小号发的，因为不好意思问……http://f7tyfzd2bbqi7jaa.onion/ 它声称'让你的比特币翻倍'")中了解到了一个有趣的例子，一个Tor隐藏服务网站承诺，如果你给它发送一些比特币，它就返还双倍的金额。骗局，对吧？嗯，它确实是个骗局，但并不是它看起来的那种骗局……

首先，有一条来自某人的评论声称他们试过了，骗局的运作方式是第一次你发送比特币时它会翻倍返还，但之后你发送的任何东西它都会扣留；其思路是第一笔交易将是可疑用户的"测试"，然后他们会发送一笔"真正的"交易，这笔交易可以被_全部_窃取。具体来说：

> 哥们。我大概5天前真的试了。我发了0.5btc然后收到了1个回来，所以从技术上讲它是有效的。但是，当我把我的1btc发回去（还发了邮件给那个人）时，他把它扣下了，根本不回复。所以很明显是个骗局，但它的运作方式还挺有意思的，它第一次确实会给你翻倍，以此引诱你发送更多。编辑：我大概应该加上：不要给这个人发钱

这听起来足够合理——庞氏骗局在早期都会小心翼翼地允许提款，而庞氏骗局的运营者，比如经典的2006年"Currin trading"[EVE Online](https://en.wikipedia.org/wiki/Eve_Online)庞氏骗局（[第一部分](https://web.archive.org/web/20091026234156/http://geocities.com/currintrading/ "Currin Trading；野心、欺骗、荣誉、救赎：EVE历史上最大抢劫的故事")，[第二部分](https://web.archive.org/web/20091021193732/http://geocities.com/currintrading/bank.html "终结一切骗局的骗局；尾声：EVE历史上最大抢劫的故事")），记录了人们如何进行1到2笔测试交易，然后向庞氏存入大笔"真正的"资金。

只是……声称它对自己有效的那个人是一个从未使用过的账号，而那些对他表示怀疑的人也是！当你注意到所声称的骗局可以被任何了解其运作方式的人轻易利用（或反骗）时（第一笔交易发送大额，然后再也不发），事情变得更加有趣了；而当你想到比特币交易是公开的，因此第一位评论者_本可以_部分证明骗局如他所声称的那样对自己有效，但在被质疑并被给了9天宽限期的情况下却没有提供任何证据时，事情更加有趣了；最后，我们看到2个Reddit用户发送了小额代币并声称什么也没收到。

那么我们看到了什么？我无法确定，但我认为情况是这样的。

我们看到的是一个_元_骗局：骗局在于你以为这是一个你可以去骗的骗局，但当你试图去骗这个骗局时，你反而被骗了。最初的骗子搭建了一个骗局网站，创建了4个托儿账号来声称它有效并设定规则——发给它X它会还你2X，然后第二次当你大概发了2X+Y时它就扣下你的钱——但实际上，这个网站只是扣留所有发来的钱，所以那些计划去反骗这个骗局的人最终反而被骗了。

如果我们把欺骗想象成有不同层次，这有点令人困惑；但网站要么还你钱要么不还。第一层是网站如其所声称的那样运作：它还你钱，你发多少它翻倍还你。（任何能读懂页面的人都理解这一层。）第二层是第一层是谎言：它_不会_还你钱，它只是偷走你发送的任何钱。（任何有脑子且读过页面的人都理解这一层。）然而，接下来到了第三层：第二层并不完全正确，网站会还你钱或不还，取决于你进行了多少次交易——这个网站是个骗局会偷你的钱，但它只会在1次成功交易之后才这么做。（任何阅读Reddit评论并盲目信任它们的人理解这一层。）第四层，也就是最初超出我认知的那一层，直到我变得更加怀疑才意识到——第三层也是谎言，实际上，第二层才是真正的真相——这个网站只是单纯地偷走你的钱。

呼！太精彩了！说实话，我几乎想给那家伙寄一两块钱，就为了感谢他实现了这么一个有趣的小骗局让我思考，尽管他本可以做得更好一点，比如提前7天在区块链上倒腾一些比特币来配合他托儿账号的说法。（他并没有发明元骗局，因为这种手法似乎有先例，比如在[_Runescape_](https://darkrunescape.fandom.com/wiki/Doubling_money_scam)中的["翻倍金钱骗局"](https://runescape.fandom.com/wiki/Scams#Doubling_money)。）

[一个更近的](https://x.com/ShitcoinSherpa/status/984484032347074561)（2018年）基于[Ethereum](https://en.wikipedia.org/wiki/Ethereum)的骗局利用了以太坊的"gas"交易费和智能合约：骗子假装在一个聊天室中意外公开了其私钥，该私钥对应一个地址，里面有大量某种资产和一个智能合约，但该地址碰巧没有足够的"gas"来允许立即提取；所有蜂拥而上试图提取资产的人都必须先向该地址发送一些gas来解锁它……但那个智能合约——他们没有时间仔细检查——只是接收所有gas存款并立即将它们转移到另一个账户，所以每个发送gas的人都损失了gas，而原始资产原封不动。

所以在某种意义上，这个骗局体现了那句老话——"你骗不了诚实的人"。[^37]嗯，当然在现实世界中诚实的人也经常被骗，所以我更愿意把它理解为[纳什均衡](https://en.wikipedia.org/wiki/Nash_equilibrium)：
> "纳什均衡策略"未必等同于"最优策略"。纳什均衡可以定义一个最优解，但仅作为一种应对激烈竞争的防御性策略。更具体地说：纳什均衡几乎从来不是最大化剥削的策略。纳什均衡策略防范一切可能的竞争，包括最猛烈的竞争，因此往往无法利用竞争对手所采用的次优策略。要实现最大化剥削的策略，通常需要偏离纳什策略，并允许自身策略中存在一定的防御漏洞。

[^1]: `bitcoin.org` 于 2008-08-18 注册，因此 Satoshi（中本聪）至少在 2008 年初就已经在开发比特币的构想了。他曾提到更早的时候就在着手此事，但比特币白皮书的最早草稿似乎是在 [2008 年 8 月 22 日他联系 Wei Dai 征求意见之前](https://gwern.net/doc/bitcoin/2008-nakamoto "'Wei Dai/Satoshi Nakamoto 2009 Bitcoin emails', Nakamoto & Dai 2014"）的某个时候私下流传的。

[^2]: 尽管 [Bonneau & Miller 2014](https://gwern.net/doc/BM14-SPW-fawkescoin.pdf "Fawkescoin: A cryptocurrency without public-key cryptography") 描述了一种仅使用密码学哈希函数（通过承诺-揭示机制）而无需任何公钥密码学的加密货币设计，并明确指出"从学术角度来看，比特币本身颇为令人好奇，因为它是在所需的密码学基本原件出现数十年后才被发现的。我们的研究表明，事实上即使在公钥密码学被发现之前，它就已经是可能的了。"

[^3]: [GitHub 仓库](https://github.com/bitcoin/bitcoin)中的第一次提交日期为 2009 年 8 月，提交者为 `sirius-m`。

[^4]: Satoshi 声称在写白皮书之前，他就已经[写了一个原型](/satoshi/emails/cryptography/15/)。

[^5]: 本着"网络是一个保存所有已签名交易副本的第三方"这一思路，你还可以将 Ian Grigg 2005 年的论文["三式记账法"](/library/triple-entry-accounting/)纳入其中。

[^6]:
    我很难确定 bit gold 最初是什么时候被提出来的；Szabo 在博客中[透露](/library/bitcoin-what-took-ye-so-long/)，他于 1998 年在一个私人邮件列表上写过相关内容：

    > 以下是比特币背后的理念为何远非显而易见的更具体原因：(1) 只有少数人读到过 bit gold 的构想，虽然我在 1998 年就想出了它们（与此同时、在同一个私人邮件列表 [[libtech](https://lists.langara.bc.ca/mailman/listinfo/libtech-l)] 上，Dai 也在构思 b-money——说来话长），但直到 2005 年才公开描述了其中的大部分内容，尽管其中一些部分我描述得更早，例如其中关键的拜占庭容复制的签名交易链部分，我将其推广为我所谓的安全产权登记。

[^7]: ["通过处理能力定价，或对抗垃圾邮件"](/library/pricing-via-processing-or-combatting-junk-mail/ "''Pricing via Processing or Combatting Junk Mail'', Dwork & Naor 1993"），Dwork 1993，发表于 _CRYPTO'92_。

[^8]: 这是 Satoshi 引用的日期；Diffie-Hellman，即[首个公开发表的系统](https://en.wikipedia.org/wiki/Public-key_cryptography#History "Public key cryptography#History"），出现于 1976 年，而非 1980 年。

[^9]: 在密码学中，新的组成部分在被证明无辜之前都是有罪的。[数百个过去的系统](https://en.wikipedia.org/wiki/Category:Broken_cryptography_algorithms "Category:Broken cryptography algorithms"）已经被攻破，有些甚至在经过数十年的研究和使用之后。

[^10]:
    另一个提出同样问题的人或团队是 [Barber 等人 2012](https://crypto.stanford.edu/~xb/fc12/bitcoin.pdf "Bitter to Better - How to Make Bitcoin a Better Currency"）（尽管本文发布于 2011 年初，因此 Barber 等人 2012 的研究可能并非完全独立）：

    > 尽管有一些悲观主义者的批评和质疑，不可否认的是，比特币自发明以来已经取得了巨大成功。对于安全和密码学界来说，数字货币或电子现金的理念绝非新鲜事物。早在 1982 年，Chaum 就在其开创性论文 [10] 中勾勒了匿名电子现金方案的蓝图。自那以后，发表了数百篇学术论文以改进电子现金构造的效率和安全性——举例来说，参见 [15, 8, 9]。自然而然地，一个有趣的问题浮现出来：_尽管电子现金的研究已有三十年之久，为什么电子现金方案始终未能普及，而比特币——一个可能由某个此前默默无闻之人独立设计和初步实现的系统，一个不使用花哨密码学、绝非完美的系统——却迅速崛起并获得了成功？_
    >
    > ...比特币拥有完全分布式的架构，没有任何单一的可信实体。比特币假设其网络中的大多数节点是诚实的，并采用多数投票机制来防止双重支付和解决争议。相比之下，大多数电子现金方案都需要一个中心化的银行，该银行在电子现金的发行和双重支付检测方面被信任。这极大地吸引了那些希望拥有一种不受任何政府、银行或当局控制的自由流通货币的人——从自由意志主义者到毒品贩子以及其他地下经济的拥护者。
    >
    > ...激励机制和经济体系。比特币的生态系统设计精巧，确保用户有经济激励参与其中。首先，新比特币的生成以分布式的方式、按照可预测的速率进行："比特币矿工"通过解决计算难题来生成新的比特币，而这一过程与先前交易的验证紧密耦合。与此同时，矿工还可以因其验证交易的努力收取可选的交易费用。这为用户提供了明确的经济激励，将闲置的计算资源投入到比特币交易的验证和新比特币的生成中。在撰写本文时，投资一块 GPU 来加速比特币谜题求解可以在约 6 个月内收回成本……越早参与，铸造的货币成本越低。

[^11]:
    我只是对密码学感兴趣的门外汉，但不止我一个人看到比特币方案中缺乏真正新颖的基本原件或理念；Ben Laurie 在一篇攻击比特币的[博客文章](https://web.archive.org/web/20220630061852/https://www.links.org/?p=1164)的旁白中表达了完全相同的看法：

    > 一位朋友提醒我注意到了最近围绕比特币的热潮。我不得不问：为什么？在过去的 10 年里，有什么变化让它现在能行得通，而在比如 1999 年却不行？当年许多其他相关系统（包括我自己的一个）也曾引发过类似的兴奋？或者在那之前的 20 年，即 1990 年的那波热潮？就我所知，什么都没变。

[^12]: 人们会想到围绕[同态加密](https://en.wikipedia.org/wiki/Homomorphic_encryption）领域的巨大数学困难——在这个领域，人们确实会预期任何突破都来自一个真正的天才，或者至少是一位有资质的专家。

[^13]:
    不过讽刺的是，工作量证明似乎从未得到广泛应用，一方面是因为普遍的惰性，另一方面是因为要阻止大量垃圾邮件，工作量证明在某些模型下也会[阻止合法用户](https://www.cl.cam.ac.uk/~rnc1/proofwork.pdf)。

    垃圾邮件似乎是通过更好的过滤技术（例如 [Paul Graham](<https://en.wikipedia.org/wiki/Paul_Graham_(programmer)> "Paul Graham (computer programmer)")的["垃圾邮件防治方案"](https://paulgraham.com/spam.html)，使用[贝叶斯垃圾邮件过滤](https://en.wikipedia.org/wiki/Naive_Bayes_spam_filtering)）以及针对僵尸网络和垃圾邮件发送者的[法律行动](https://en.wikipedia.org/wiki/CAN-SPAM_Act_of_2003 "CAN-SPAM Act of 2003"）来控制的。

[^14]: 关于这段历史的更多内容，参见维基百科上关于[工业革命#欧洲的成因](https://en.wikipedia.org/wiki/Industrial_Revolution#Causes_in_Europe)、[中国工业化#工业化延迟的原因](https://en.wikipedia.org/wiki/Industrialization_of_China#Reasons_for_the_delay_in_industrialization)、[大分流](https://en.wikipedia.org/wiki/Great_Divergence)的条目；我推荐 [Gregory Clark](<https://en.wikipedia.org/wiki/Gregory_Clark_(economist)> "Gregory Clark (economist)")的[_告别施舍：世界经济简史_](https://www.amazon.com/Farewell-Alms-Economic-History-Princeton/dp/0691141282/)。

[^15]:
    ["来自虚拟过去的声音：一项其时代再次到来的技术的口述历史"](https://www.theverge.com/a/virtual-reality/oral_history)（2014）：

    > **Palmer Luckey**：我花了大量时间阅读了几乎所有已发表的 VR 文献。我认为有很多人对 VR 评价过高，因为他们是做 VR 研究的。你不会想发表一篇论文说，"经过研究，我们得出的结论是：VR 目前毫无用处，我们应该在未来 20 年里直接放弃。" 确实有少数人基本上得出了这个结论。他们说，"当前的 VR 设备视场角小、延迟高、太贵、太重，无法被消费级电脑正常驱动，甚至专业级电脑也不行。" 事实证明，我并不是第一个意识到这些问题的人。这些问题已经被认知了几十年。
    >
    > 这里有个秘密：阻止人们制造好的 VR 并解决这些问题的不是技术原因。有人在 2007 年中后期就可以花几千美元造出 Rift，在 2008 年中大约只需 [$500]($2008)。只是没有人在关注这件事。

[^16]: 截至 2011 年，SHA-1 尚未在[实践中](https://en.wikipedia.org/wiki/SHA-1#Attacks "SHA-1#Attacks"）被攻破；它在 2017 年被攻破。

[^17]: 据我了解，只是没有人愿意花精力去编写这个功能，因为 400MB 的空间并不算太大。

[^18]: 或者说，反对意见是加密货币必须是移动的——可以在当时的 PDA 和手机上使用，其计算能力仅相当于一块手表。

[^19]: [垃圾回收](<https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)> "Garbage collection (computer science)")以及人工智能的大部分领域（尤其是机器学习）似乎都等了几十年才等到足够快的硬件。事实上，我有时觉得 [Alan Kay](https://en.wikipedia.org/wiki/Alan_Kay "Alan Kay")的整个职业生涯本质上就是在勾勒如果他能拥有像样又便宜的硬件，他会做出什么东西。

[^20]: 这很可能将会实现。[一些](https://en.bitcoin.it/wiki/Scalability)[非正式的](https://www.reddit.com/r/Anarchism/comments/hdf2t/so_i_guess_bitcoin_is_probably_a_mutualists_wet/c1ulirk/)估算已经给出了处理数百万笔、价值数万亿美元的交易需要什么条件，结果通常与 Google 等公司现有的资源使用量相当（这些公司[投资](https://green.googleblog.com/2011/04/investing-in-worlds-largest-solar-power_11.html)[建设](https://www.fastcompany.com/1748331/google-sinks-100-million-worlds-largest-wind-project)自己的发电厂，或垄断便利的[水力发电](https://web.archive.org/web/20120229183459/http://www.itmanagement.com/features/columbia-river-security-risk-062507/ "The Columbia River Security Risk: How the datacenter boom in Oregon could send Google and the NSA offline simultaneously.")[大坝](https://www.nytimes.com/2006/06/14/technology/14search.html)来运行其数据中心）。

[^21]:
    近期的批评也有时集中在 C++ 代码库的[质量](https://www.reddit.com/r/Anarchism/comments/hdf2t/so_i_guess_bitcoin_is_probably_a_mutualists_wet/c1uobdl/)以及许多选择的即兴性质上；来自一条[匿名 Facebook 评论](https://gist.github.com/anonymous/1005927/4836d6231566bebd766966c7689c4094c1296700)：

    > 协议定义不明确，显然是由业余爱好者设计的（也就是说，不是做过大量协议实现工作的人）。它是一个二进制协议，掺杂了一些长度前缀、[空终止字符串](https://en.wikipedia.org/wiki/Null-terminated_string)等等。消息看起来还算合理，只是编码方式非常糟糕。协议的规则定义模糊，且与实现紧密耦合；实现者认为将 17 [KLOC](https://en.wikipedia.org/wiki/Source_lines_of_code "Source lines of code")（千行代码）的代码塞进 5 个主要源文件是合理的。由于缺乏规范明确的协议，还出现了客户端单一化的问题。
    >
    > 值得注意的是，整个系统假设使用 SHA-256——比特币社区说切换到其他算法只需引入一个新算法即可，但实际上远没有那么简单。协议中没有升级到不同算法的概念，因此需要对协议进行全面改造（因为里面有大量 32 字节的字段），并且需要重新计算/迁移整个交易历史。
    > ...协议在网络架构方面也没有经过深思熟虑——只有对等节点，仅此而已。由于交易的密码学特性，随着网络规模的扩大，使用比特币进行实时交易根本不可能（网络已经平均需要 5-10 分钟才能看到一笔交易）。因此，网络中需要引入某种节点概念，能够在两个对等方之间以更快的方式促进交互，并假设存在一定程度的信任。你当然不应该_要求_信任，但它应该被定义，我认为。

    安全专家 [Dan Kaminsky](https://en.wikipedia.org/wiki/Dan_Kaminsky) 同样对扩展后的带宽需求感到震惊（他的表情符号是":0"），并预测比特币网络最终将演变成由超级节点组成的类似银行的寡头体系（这改变了系统的性质，并且"带来了一系列丑陋的语义问题"，因为超级节点"不需要 50%——只需要给 50% 的人造成不便，让他们接受你的意见"）。他[评论](https://www.slideshare.net/dakami/bitcoin-8776098)说，虽然"普通代码"看起来不错但"深挖一下，实际上很糟糕"，而比特币代码库则是"表面上看起来很糟糕"但"深挖一下，实际上出人意料地好"。_《纽约客》_（_The New Yorker_）的文章["加密货币：比特币及其神秘的发明者"](https://gwern.net/doc/bitcoin/2011-davis)：

    > "当我第一次看代码的时候，我确信自己能攻破它，"Kaminsky 说道，并指出编程风格密集且难以理解。"整个东西的格式化方式简直疯了。只有世界上最偏执、最细心的程序员才能避免犯错。"……他很快找到了九种攻破系统的方法……但当他找到正确的位置时，有一条消息在等着他。"攻击已移除"，上面写着。同样的事情一次又一次地发生，让 Kaminsky 非常恼火。"我发现了绝妙的漏洞，"他说。"但每次我追查代码的时候，都有一行解决了这个问题。"……"我从未见过这样的事情，"Kaminsky 说道，至今仍充满敬畏……"要么有一个团队在开发这个东西，"Kaminsky 说，"要么这个人就是个天才。"

    在技术层面上，他不喜欢使用 SHA-256 而不是更慢的[时间锁密码学](https://gwern.net/self-decrypting "'Time-lock encryption', Branwen 2011")函数如 [bcrypt](https://en.wikipedia.org/wiki/Bcrypt)，因为 SHA-256"可以被 GPU 大规模加速"，导致 GPU 短缺和对等节点之间巨大的算力差距。他的幻灯片总结道"如果你接受匿名性和扩展性将迫使整个现有模型转变为实际上类似于银行的形态，那么比特币实际上设计得很好"。2013 年，他重申了对比特币的正面印象——["但核心技术_确实有效_，并且持续有效，其程度超出了某些人的预期。"](https://www.businessinsider.com/dan-kaminsky-highlights-flaws-bitcoin-2013-4)——并开始重新考虑他之前关于资源需求和节点逐渐中心化的批评。关于协议安全性的另一个证言来自 [TechCrunch](https://techcrunch.com/2013/04/11/bitcoin/ "Unfazed By Bitcoin's Wild Swings And Mysterious Origins, Silicon Valley VCs Place Their Bets")：

    > 在研究比特币的过程中，Lemon 公司的 [Casares](https://en.wikipedia.org/wiki/Wences_Casares "Wences Casares") 雇佣了两个独立的黑客团队，花了大约半年的时间检查比特币源代码中的漏洞。"他们可以说是世界上最好的。我在能找到的最好的黑客身上花了大量的时间和金钱，最终确信比特币的安全性是稳健的，"他说。"他们发现的东西对我来说非常、非常有说服力。"

    Bruce Schneier [随口提到](https://www.schneier.com/blog/archives/2013/04/bitcoins_in_the.html "Bitcoins in the Mainstream Media")："我没有分析过它的安全性，但我所看到的看起来不错。"

[^22]:
    Nick Szabo 在讨论 [Chaum 式电子现金](/library/contracts-with-bearer/)（"自 _e_ = _mc_<sup>2</sup> 以来最伟大的简单方程"）时，以一种几乎可以感知到的厌恶感评论了一个在这方面类似于比特币的假想系统：

    > 一次性地址通信混合加上放弃保持账户带来的声誉收益，理论上也可以为我们带来不可链接性，但通信混合 [BTC：["混币服务"](https://en.bitcoin.it/wiki/Mixing_service)；未必[容易实现](https://andrewbadr.com/log/11/anonymizing-bitcoin/)]是脆弱且非常昂贵的。

    最广为人知、最受欢迎且最安全的通信混合可能是 [Tor](<https://en.wikipedia.org/wiki/Tor_(network)> "Tor (anonymity network)#Weaknesses")；随着时间的推移，人们发现了它的一些缺陷，而且 Tor 永远不会非常安全——要实现一个既是匿名的通信混合又是近实时的系统，从根本上说是极其困难的，甚至是不可能的。某些缺陷_无法_被 Tor 网络消除，比如出口节点窥探流量的能力（这已经被做过很多次了，最令人印象深刻的是在 [维基解密](https://en.wikipedia.org/wiki/WikiLeaks)启动期间）。通信混合通常在资源消耗上很昂贵，因此通常只构成整个网络的一部分——而网络的其余部分会泄露大量信息，[比特币中也是如此](https://arxiv.org/abs/1107.4524 "'An Analysis of Anonymity in the Bitcoin System', Reid & Harrigan 2011")。

    从_实际_角度来看，这些并不一定是致命的问题。一个简单的混币或洗币服务可能就能满足你对匿名性的所有需求；它们可以串联使用以大幅降低风险；可以使用[安全多方计算](https://en.wikipedia.org/wiki/Secure_multi-party_computation)构建更精细、更安全的链外洗币服务；最后，总有人希望某人能想出如何在现有的 pseudonymous（假名）比特币系统之上构建真正匿名且不可追踪的交易（这在 2013 年可能已经通过比特币协议的拟议扩展 [Zerocoin](https://blog.cryptographyengineering.com/2013/04/11/zerocoin-making-bitcoin-anonymous/) 实现）。

[^23]:
    [Perry Metzger](https://gwern.net/doc/bitcoin/2011-07-12-barnes-bitcoin.html) 总结了 Laurie 的观点：

    > 我认为人们忽略了 Ben Laurie 在这里提出的更微妙的观点。比特币需要使用一种特殊的安全共识协议才能可靠地工作，而据我们所知，这种协议在此场景下并不存在。然而，如果存在这样的协议，就不再需要挖矿了——系统可以简单地通过安全选举协议（在其余条件已知的情况下，这些协议是已知的）每 _N_ 秒选出一个成员来获得一枚新币。因此，Ben 的观点是，如果你要建立一个像比特币这样的系统，至少可以建立一个像这样高效的系统，而不是一个基于电力浪费的愚蠢系统。

[^24]:
    不过，并非所有人都同意我或那些最初的发帖者的看法；["比特币创造了真正民主的政策，追随者们说"](https://web.archive.org/web/20110727183036/http://www.canada.com/Bitcoins+create+truly+democratic+policy+followers/5144669/story.html)，[Canada.com](https://en.wikipedia.org/wiki/Postmedia_Network)：

    > "它就像蒙娜丽莎。"Bruce Wagner 说道，他是一位 IT 顾问，去年 10 月发现了比特币，现在主持一档关于比特币的网络电视节目。"它是技术的杰作。"

    来自 _《纽约客》_的文章：

    > Haber 是国际...的董事国际密码学研究协会（International Association for Cryptologic Research），对比特币了如指掌。"做这件事的人对密码学有着深刻的理解"，Haber在我打电话给他时说道，"他们读过学术论文，有着敏锐的智力，并且以一种真正新颖的方式将各种概念组合在一起。"

    [《比特币的兴衰》](https://www.wired.com/2011/11/mf-bitcoin/)，_Wired_：

    > 但慢慢地，比特币的消息传播到了密码学这个封闭的小圈子之外。它赢得了一些数字货币领域最伟大头脑的赞誉。b-money的发明者Wei Dai称其"非常有意义"；创造了bit gold的Nick Szabo赞誉比特币是"对世界的巨大贡献"；而RPOW背后的杰出密码学家Hal Finney说它"有潜力改变世界"……Stefan Brands，一位前ecash顾问和数字货币先驱，称比特币"很聪明"……

    更近一些，Wei Dai[曾说道](https://www.lesswrong.com/posts/P9jggxRZTMJcjnaPw/bitcoins-are-not-digital-greenbacks?commentId=3XvTroRzb23NpHQDc)：

    > ……它在技术和概念/哲学层面都较现有最先进水平实现了重大突破，而且这些突破并非源自学术界、政府或产业界，也不太可能由它们资助或支持。此外，它的社会影响似乎更大——如果Craigslist或PayPal不存在，本质上相同的东西很快也会被创建出来；但如果比特币不存在，另一个比特币可能十年都不会出现，而且/或者可能具有非常不同的特征，例如它的代码可能采用强调价格稳定而非固定货币供应量的货币政策。

[^25]:
    计算能力之所以有用，是因为它不可能被伪造：假设哈希函数仍然是安全的，你要么能持续暴力破解一个哈希，要么不能。但严格来说，还有其他可能的不可伪造属性，未来的数字密码货币可能会使用这些属性；Szabo列出了[另外3种](/library/bitcoin-what-took-ye-so-long/)：

    > 经典的拜占庭协议假设每个节点都有一个安全的真实身份，但由于隐私是一个必要的特性，而且在互联网上实现这样一个安全的身份系统将非常困难，我们必须使用在比特币或bit gold系统内可证明的用户特征来权衡拜占庭"投票"。我现在已经列出了在比特币（或bit gold）中可证明的属性列表，消息正确性的"投票"可以据此加权：
    >
    > - 工作量证明/挖矿努力（比特币目前的做法）
    > - 由某个密钥拥有的价值或硬币数量或解的数量
    > - 某密钥作为付款方、收款方或双方参与交易的数量或价值
    > - 按交易新旧程度加权的交易数量或价值
    > - 以上各种方式的组合
    >
    > 这是一个不完整的列表，特别是如果我们加入新属性的话。这里的一个总体思路是，将拜占庭"投票"的权重倾向于在系统中更有经验的人，使新的入侵更加困难。然而，在货币系统中，还应该在各种利益相关者（持有者、债权人和债务人）之间取得平衡。由于以比特币或bit gold计价的合约通常存在于系统之外，人们至少必须公开注册由各方密钥签署的合约，才能使债权人或债务人身份可被证明。

    一种为比特币提出的方案是[权益证明](https://en.bitcoin.it/wiki/Proof_of_Stake)：

    > 在工作量证明中，挖到一个区块的概率取决于矿工所做的工作（例如用于检查哈希的CPU/GPU计算周期）。在权益证明中，用来比较的资源是矿工持有的比特币数量——持有1%比特币的人可以挖出1%的"权益证明区块"……每个区块必须由其矿工使用单个比特币账户签名。用于签名区块的账户也必须是该区块交易费和生成收入的接收方。区块仍然像以前一样通过工作量证明哈希来挖出，但难度标准有所修改。区块有效性的难度标准修改如下：当且仅当以下条件满足时，哈希生成有效区块：
    >
    > > 哈希难度 >= 难度目标 / ( max(用于签名区块的币确认数, 100 聪确认数) )^( _p_ / (_1_-p))
    >
    > 其中 0 <= _p_ < 1。随着 _p_ 趋近于1，权益变得越来越重要。建议将 _p_ = 0.8 作为合适的选择。_p_ = 0 与当前的工作量证明系统完全相同。如果区块由持有少于100聪确认数的比特币账户签名，则视为该账户持有100聪确认数。因此，非权益持有者也被允许验证区块，但与权益持有者相比，他们必须满足极其严格的难度标准。允许非权益持有者验证区块解决了初始分配问题。与以前一样，难度目标是一个定期调整的常数，设定为维持每10分钟生成1个区块的目标生成率。

[^26]:
    [《去中心化货币可能是不可能的：但至少让它们高效一些》](https://web.archive.org/web/20220522090502/https://www.links.org/files/decentralised-currencies.pdf)，Ben Laurie：

    > 现在我们理解了核心问题，即共识问题，就很容易理解比特币对这个问题的解决方案。比特币将共识组定义为"所有现存的计算能力"，并要求参与者通过使用它来产生工作量证明代币，以证明他们拥有愿意花在比特币上的那部分算力。一旦我们这样陈述问题，就能清楚地看到缺陷。除非现存至少一半的计算能力实际被用于生产比特币，否则我们无法确定我们达成了共识！例如，如果目前现存总算力的1%<sup>[7]</sup>被用于生产比特币（实际上远少于这个比例），那么任何人在任何时候都可以带着额外1.1%的总算力出现，并利用它来建立自己的共识，<sup>[8]</sup>从而使初始组的所有工作_和所有金钱_都失效，转而将整个货币据为己有。
    >
    > ……更糟糕的是，很明显，达到比特币的均衡状态是极其昂贵的：必须永远消耗现存一半的计算能力，来维持对货币当前状态的共识。而且这是不可知的：我们永远无法确定我们实际上是否在消耗现存一半的算力，因为我们不知道现存多少算力。
    >
    > [7]：严格来说，我指的是"能量"而非"功率"，因为比特币实际上是对功率随时间的积分。
    >
    > [8]：通过从创世区块开始分叉历史，并产生一条比当前共识更长的哈希链。

    Laurie指出，在实践中，比特币社区确实_依赖_一个中心化的权威机构，它定期向下传递"被祝福的"区块链——比特币开发者定期将已知良好的区块链状态硬编码到客户端中（这当然是一个理论上的弱点）。

[^27]:
    Zooko Wilcox O'Hearn，[2013-04-05](https://gwern.net/doc/bitcoin/2013-04-05-zooko-bitcoin.html)（在隐藏的评论中）：

    > ……我记得第一次听说比特币时，就因为你提到的那些"丑陋"问题之一而对它失去了兴趣：它依赖于（被描述为）全球同步的时钟，我对这一点有负面的情感反应。

[^28]:
    Chaum为其系统能够离线工作/不直接处理交易而付出了代价。不要只听我的一面之词；请看[Tim May](https://en.wikipedia.org/wiki/Tim_May)在他20世纪90年代初的_[Cyphernomicon](https://en.wikipedia.org/wiki/Timothy_C._May)_[第12.6.6节](https://koeln.ccc.de/archiv/cyphernomicon/chapter12/12.6.html)中的说法（不要与[Stephenson的](https://en.wikipedia.org/wiki/Neal_Stephenson "Neal Stephenson")[小说](https://en.wikipedia.org/wiki/Cryptonomicon "Cryptonomicon")混淆）：

    > ……Chaum花了很大力气来开发这样的系统：在单次支付时保持匿名性，但在双重支付时打破匿名性从而暴露身份。我不确定是什么市场力量使他认为这如此重要，但这确实带来了许多麻烦。除了操作笨拙之外，它还需要物理身份证明，它援引法律系统来试图向"双重支付者"追讨，并且它允许通过设置陷阱来严重侵犯隐私，这是一个极其严重的问题。例如，Alice付给Bob一个单位的货币，然后Alice在Bob能够……之前迅速花掉了那笔钱——于是Bob被揭露为"双重支付者"，他的身份被揭露给任何想要它的人……Alice、美国国税局、盖世太保等等。这是一个非常有缺陷的想法。主要只适用于小额交易。
    >
    > - 多重支付 vs. 在线清算
    >
    >   - 我倾向于在线清算。简单来说：先到先得。谁先到达存放现金的储物柜，谁就得到它。这确保了保守秘密的负担落在秘密持有者身上。
    >   - 当Alice和Bob转移资金时，Alice进行转账，Bob确认其有效（或验证他的银行已收到存款），交易就完成了。
    >   - 随着网络速度的大幅提升，在线清算对大多数交易来说应该是可行的。离线系统当然也可能有用，特别是对于小额交易，也就是现在用硬币和小额纸币处理的那些。

    更多当代的描述可以在一份1996年6月解密的NSA审查报告["如何造币：匿名电子现金的密码学"](https://cryptome.org/jya/nsamint.htm)中找到。

    Chaum盲签名的命运应该让技术人员夜不能寐。隐私保护凭证有那么多用途，比如证明年龄或公民身份，然而经过40年的数学/研发，我们使用了……几乎没有用到任何一项，因为激励机制。（大实体想要的是知识，而非证明。）

[^29]：例如，参见我在[_Death Note_：L、匿名性与逃避熵](https://gwern.net/death-note-anonymity#de-anonymization)中链接的一些最新研究。

[^30]:
    _[UNIX-HATERS手册](https://en.wikipedia.org/wiki/The_UNIX-HATERS_Handbook)_，其中包含许多有趣的、往往至今仍然适用的关于Unix系统无能和棱角的描述，还包含了一篇极其有趣的Dennis Ritchie写的"反序言"：

    > 致本书的各位撰稿人：我屈服了你们在前言中提出的诱惑：我_确实_把你们当成嫉妒的不满者和怀旧的浪漫主义者而不予理会。你们如此深情地回忆的那些系统（[TOPS-20](https://en.wikipedia.org/wiki/TOPS-20)、[ITS](https://en.wikipedia.org/wiki/Incompatible_Timesharing_System "Incompatible Timesharing System")、[Multics](https://en.wikipedia.org/wiki/Multics)、[Lisp Machine](https://en.wikipedia.org/wiki/Lisp_machine)、[Cedar/Mesa](<https://en.wikipedia.org/wiki/Mesa_(programming_language)> "Mesa (programming language)")、[Dorado](http://bitsavers.trailing-edge.com/pdf/xerox/parc/techReports/ISL-83-1_A_Retrospective_on_the_Dorado_A_High-Performance_Personal_Computer.pdf "'A Retrospective on the Dorado, a High-Performance Personal Computer', Pier 1983"))不仅仅是被放牧了，它们正在从下面给牧场施肥……你们声称追求进步，但你们主要是在抱怨。这是我的比喻：你们的书是一个塞满了恰当观察的布丁，许多构思精巧。就像排泄物一样，它含有足够未消化的营养块来维持一些人的生命。但它不是一个美味的馅饼：它散发着太多的蔑视和嫉妒的味道。祝你好胃口！

[^31]:
    [《Butler Lampson口述历史》](https://archive.computerhistory.org/resources/text/Oral_History/Lampson_Butler/102658024.05.01.pdf)，2006年：

    > [**Alan Kay**](https://en.wikipedia.org/wiki/Alan_Kay "Alan Kay）："但我希望你在休年假时曾在CERN……"
    >
    > [**Butler Lampson**](https://en.wikipedia.org/wiki/Butler_Lampson "Butler Lampson")："我去了可能是一场灾难。"
    >
    > **Kay**："我不知道。但我认为你会做出一个稍微好一点的……"
    >
    > **Lampson**："不。不。不。不。不。不。Tim [Berners-Lee]做的事情是完美的。我对web的看法是，它是计算机系统研究的巨大失败。为什么计算机系统研究者没有发明web？我可以告诉你答案。那是因为它太简单了。"
    >
    > **Kay**："确实太简单了。"
    >
    > **Lampson**："如果我当时在那里，我会把它搞砸的。我向上帝发誓。你竟然要为每次点击链接都建立一个新的TCP连接？疯狂！你要用这个满是愚蠢尖括号的叫做HTML的粗糙通用数据类型？我们绝不会这样做！但正是这些东西让它成功了。"

[^32]:
    许多[匿名评论者](https://web.archive.org/web/20221003015609/https://www.links.org/?p=1171#comment-415465)指出了这一点，因为这使比特币闻起来像某种[庞氏骗局](https://en.wikipedia.org/wiki/Ponzi_scheme)或[多层次传销](https://en.wikipedia.org/wiki/Multi-level_marketing)：

    > 比特币，就像近期的商业现象[Groupon](https://en.wikipedia.org/wiki/Groupon)一样，倾向于把人变成营销者，因为他们觉得自己有利可图，不管最终可能多么微不足道；我认为这部分解释了它暂时的成功。

    或者[《比特币的兴衰》](https://www.wired.com/2011/11/mf-bitcoin/)，_Wired_：

    > Stefan Brands，一位前ecash顾问和数字货币先驱，称比特币"很聪明"，且不愿抨击它，但他认为它的基本结构就像"传销"，奖励早期采用者。

    [John Robb](<https://en.wikipedia.org/wiki/John_Robb_(author)> "John Robb (military theorist)")，[《关于比特币的更多思考》](https://globalguerrillas.typepad.com/globalguerrillas/2011/06/more-thoughts-on-bitcoin.html)：

    > 很多人都在说："比特币中内置的通货紧缩是个糟糕的主意。人们正在变富。"事实上，这是一个绝妙的主意。它吸引了投机者（那些像在游戏中一样买卖它的人）。它创造了一个泡沫。这个泡沫让它声名远扬。这个泡沫吸引了数以千计的开发者/参与者。想想[Netscape IPO](<https://en.wikipedia.org/wiki/Netscape#Initial_public_offering_(IPO)>)是如何推动Web/互联网发展的。

    Szabo在他对人們为何对比特币式策略不感兴趣的解释中则更为宽容：

    > （2）几乎没有人真正理解货币。货币不是那样运作的，人们热切而频繁地告诉我。黄金不可能作为货币起作用，除非它在成为货币之前已经是闪亮的或对电子产品有用或其他什么用途，他们告诉我。（保险服务也必须一开始对其他什么东西有用吗，也许作为发电厂？）这个常见的论点讽刺地来自自由意志主义者，他们误读了[Menger](https://en.wikipedia.org/wiki/Carl_Menger "Carl Menger")关于货币起源的论述[参见["货币的起源"](/library/on-the-origins-of-money/ "Menger 1892")]，将其视为货币唯一可能产生的方式（而不是对它如何可能产生的描述），并以同样的方式误用了Mises的回归定理[参见_[货币与信用理论](https://en.wikipedia.org/wiki/The_Theory_of_Money_and_Credit)_]。尽管我在我对[货币起源](/library/shelling-out/ "Shelling Out: The Origins of Money")的研究中已经反驳了这些论据，我在此谦卑地建议，任何辩论比特币经济学的人都应该将此文列为必读。
    >
    > 没有什么比Nakamoto的激励营销方案更能改变人们在这些问题的看法了。:-) 多亏了装满"计划通缩"硬币的内存条，现在不缺愿意为之辩护的人。

[^33]：去中心化系统通常可以容易地转换为集中式系统，而反过来则不行。（很像[并行](https://en.wikipedia.org/wiki/Parallel_computing "Parallel computing")与串行编程——要把一个并行程序变成串行的，只需插入大量的[阻塞](<https://en.wikipedia.org/wiki/Blocking_(computing)> "Blocking (scheduling)")。）举一个简单的例子，考虑 _n_ = 2 的情况：想象一个只有一个种子节点和一个下载节点的[BitTorrent](https://en.wikipedia.org/wiki/BitTorrent)群（一个去中心化系统）。或者看看[分布式版本控制系统](https://en.wikipedia.org/wiki/Distributed_version_control)，如[Darcs](https://en.wikipedia.org/wiki/Darcs)或[Git](https://en.wikipedia.org/wiki/Git "Git (software)")；指出这一点已经是老生常谈了：如果一个团队真的想要"集中式"的工作流程，他们只需指定一个特定的代码库为"主"规范代码库，然后继续使用分布式版本控制系统，作为[Apache Subversion](https://en.wikipedia.org/wiki/Apache_Subversion)或[CVS](https://en.wikipedia.org/wiki/Concurrent_Versions_System "Concurrent Versions System")的更强大替代品。

[^34]:
    [betterunix](https://news.ycombinator.com/item?id=5671924)为DigiCash提供了一个有趣的辩护：

    > ……值得一提的是，DigiCash存续的时间比比特币存在的时间还要长——事实上是两倍。它失败的原因并不像"人们就是不关心"那么简单。美国政府中有力量在积极反对_所有_民用密码学，尤其是那些可能挫败执法调查的系统。密码学专利（讽刺的是，这包括Chaum自己持有的专利）通常起到的作用是：阻止系统大规模部署。还有糟糕的管理决策，比如Chaum拒绝接受微软将他的系统集成到Windows 95中的巨额金钱要约，以及Visa的另一笔大额要约……再过四年，如果关于比特币的新闻不是"比特币交易价格处于历史低点"或"分析加密货币的失败"，你至少可以声称比特币比Chaum的系统表现得更好。

[^35]：[Zooko](https://themonetaryfuture.blogspot.com/2011/05/bitcoin-timing-is-everything.html?showComment=1306860158361#c6958602700376442348)，2011年5月31日下午6:42

[^36]:
    Wei Dai，[2011-02-25](https://www.lesswrong.com/posts/ijr8rsyvJci2edxot/making-money-with-bitcoin?commentId=hbEu9ue9eymNzaF2J)：

    > ……如果你读过维基百科的文章，你应该知道我并没有创造比特币，只是在十多年前描述过一个类似的想法。而我的理解是，比特币的创造者，以Satoshi Nakamoto为名的那个人，在自行重新发明这个想法之前甚至都没有读过我的文章。他[后来才了解到它](#nakamoto-2008-2)并在他的论文中致谢了我。所以我与这个项目的联系相当有限。

    [Dai也批评了](https://www.lesswrong.com/posts/P9jggxRZTMJcjnaPw/bitcoins-are-not-digital-greenbacks?commentId=3XvTroRzb23NpHQDc)比特币中内置的货币政策：

    > 我认为比特币在货币政策方面是失败的（因为该政策导致高价格波动性，给其用户带来沉重的成本，他们不得不承担不良风险或进行昂贵的对冲才能使用该货币）。（这可能部分是我的错，因为当Satoshi写信给我征求对他论文草稿的意见时，我没有回复他。否则也许我能说服他（或他们）放弃"固定货币供应量"的想法。）我不知道现在改变比特币协议中内置的货币政策是否已经太晚，或者是否有另一种加密货币能超越比特币。

    Adam Back，[2013-04-18](https://bitcointalk.org/index.php?topic=15672.msg1873483#msg1873483)（经[Wei Dai确认](https://www.lesswrong.com/posts/P9jggxRZTMJcjnaPw/bitcoins-are-not-digital-greenbacks?commentId=X6CxSxC9YnACsztC5)）：

    > ……总之，我对ecash、隐私技术、密码学、分布式系统有一些了解（我的计算机科学博士论文就是关于分布式系统的），我想我算是较早阅读并尝试理解比特币这种p2p密码学巧妙之处的第一批人之一。事实上，我相信2008年当Satoshi给我发邮件询问hashcash时，正是我把Wei Dai的b-money参考文献加到了Satoshi的比特币论文中的。如果像Hal Finney那样我当时真的尝试运行矿工程序，我可能也会坐在一些创世/引导时代的硬币上。遗憾的是我一枚比特币都没有拥有过，这有点讽刺，因为实际的比特币挖矿基本上就是我的hashcash发明。

[^37]: W这是一种自我安慰的谎言，骗子用它来欺骗自己和他人，将责任推给受害者——"说真的，受害者是_罪有应得的_，你骗不了诚实的人！"——这种说法也更适合虚构（即"不真实"）的故事，读起来更有趣。但我认为，肮脏的现实更像是普通人被掠夺，因为他们不是某个领域的专家而信任了所谓的专家，从而失去了毕生积蓄。像这种骗局，或者麦道夫骗局那样复杂的设定相对罕见——在麦道夫案件中，人们以为麦道夫只是在抢先用客户的资金进行交易；不过仔细想想，只有最精明的麦道夫投资者才意识到他的回报率完全不可能实现，从而断定他在通过抢跑客户交易来行骗；而大多数把钱交给他的人，不过是普通的中产上层阶级而已。
