可复用工作量证明（RPOW）由 Hal Finney 发明，旨在作为一个数字现金原型，基于 Nick Szabo 的[收藏品理论](/library/shelling-out/)。RPOW 是数字现金历史上的重要早期一步，也是比特币的前身。虽然 RPOW 从未打算超越原型阶段，但它是一套非常精密的软件，如果推广开来，完全有能力服务于一个庞大的网络。

## 历史背景

20 世纪 90 年代，密码朋克们开始探索一种价值不依赖于发行机构的数字现金。追随 Nick Szabo 的思路，这种数字现金可以通过被证明难以创造来识别为供应有限，从而可用作货币。这可以通过以工作量证明来定义数字现金单位来实现。一些数字收藏品的方案在密码朋克邮件列表中流传，包括 Wei Dai 的 [b-money](/library/b-money/) 和 Nick Szabo 的 [Bit Gold](/library/bit-gold/)。RPOW 是唯一一个真正作为软件运行的数字收藏品。

## 工作原理

RPOW 客户端通过提供一个给定难度的、由其私钥签名的工作量证明字符串来创建一个 RPOW 代币。服务器随后将该代币注册为属于该签名密钥。客户端可以通过签署一个向另一个公钥的转账指令来将代币转移给他人。服务器随后将代币注册为属于相应的私钥。

双重支付问题是所有数字现金面临的根本性问题。RPOW 通过在可信服务器上记录代币的所有权来解决这个问题。然而，RPOW 采用了一套精密的安全模型，旨在使管理所有 RPOW 代币注册的服务器比普通银行更可信。服务器设计运行在 IBM 4758 安全密码协处理器上，该处理器能够安全地验证其正在运行的软件的哈希值。RPOW 服务器能够协作以处理更多请求。

更多详细信息，请参阅 Hal Finney 的[原始页面](/finney/rpow/index.html)，其中包括[概述](/finney/rpow/index.html)、[常见问题](/finney/rpow/faqs.html)、[理论页面](/finney/rpow/theory.html)、[演示文稿](/finney/rpow/slides/slide001.html)，以及一个非常有趣的页面——[RPOW 的世界](/finney/rpow/world.html)，它解释了 RPOW 将如何扩展以服务整个地球。

原始代码可在 GitHub 上找到：[此处](https://github.com/NakamotoInstitute/RPOW)。

_特别感谢 Fran 和 Jason Finney——Hal 的妻子和儿子——分享原始的 RPOW 代码和网站文件。_
