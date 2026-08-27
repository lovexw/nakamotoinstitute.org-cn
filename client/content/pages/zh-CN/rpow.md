可重用工作量证明（Reusable Proof-of-Work，RPOW）由 Hal Finney 发明，其定位是作为一种基于 Nick Szabo [藏品理论](/library/shelling-out/)的数字现金原型。RPOW 是数字现金历史上重要的早期一步，也是比特币的前身。尽管 RPOW 从一开始就只是一个原型，但它是一套非常精巧的软件——倘若得到推广，它本有能力支撑一个庞大的网络。

## 历史背景

20 世纪 90 年代，密码朋克们开始探索一种价值不依赖于某个发行组织的数字现金。沿袭 Nick Szabo 的思路，这种数字现金之所以能被识别为供应量有限、从而可用作货币，在于其被证明极难创造。这可以通过以工作量证明来定义数字现金的单位来实现。当时密码朋克邮件列表上流传着若干数字藏品的构想，包括 Wei Dai 的 [b-money](/library/b-money/) 和 Nick Szabo 的 Bit Gold。而 RPOW 是唯一真正以软件形式实现并运行过的数字藏品。

## 工作原理

RPOW 客户端通过提供一个达到指定难度的工作量证明字符串（以其私钥签名）来创建一个 RPOW 代币。服务器随后将该代币登记为签名密钥所有。客户端之后可以通过签署一笔向某个公钥的转让指令，把代币交给另一个密钥。服务器再相应地把该代币登记为对应私钥所有。

双重支付问题是所有数字现金的根本难题。RPOW 通过将代币的所有权登记在一台可信服务器上来解决这一问题。不过，RPOW 构建了一套精密的安全模型，旨在让管理所有 RPOW 代币登记的服务器比一家普通银行更可信。服务器设计运行于 IBM 4758 安全密码协处理器之上，该硬件能够安全地校验自身正在运行的软件的哈希值。多台 RPOW 服务器之间还可以协作以处理更多请求。

欲了解更多信息，请访问 Hal Finney 的[原始页面](/finney/rpow/index.html)，其中包括[概览](/finney/rpow/index.html)、[常见问题](/finney/rpow/faqs.html)、[理论说明](/finney/rpow/theory.html)、[演示文稿](/finney/rpow/slides/slide001.html)，以及一个非常有意思的页面——[RPOW 之世界](/finney/rpow/world.html)，它解释了 RPOW 将如何扩展以服务整个地球。

原始代码可在 GitHub 上[这里](https://github.com/NakamotoInstitute/RPOW)找到。

_特别感谢 Hal 的妻子 Fran Finney 和儿子 Jason Finney，他们分享了原始的 RPOW 代码与网站文件。_
