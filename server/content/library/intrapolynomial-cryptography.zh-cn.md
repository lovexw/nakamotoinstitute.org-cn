---
title: 多项式内密码学
authors:
  - nick-szabo
date: 1999
categories:
  - cryptography
doctype: essay
external: http://szabo.best.vwh.net/intrapoly.html
---

研究人员提出了多种"客户端谜题"或"忙碌工作"方案，如 hashcash、MicroMint、bit gold 和计算成本邮资，用以创建独立的货币或使垃圾邮件发送者付出代价。这些方案的数学含义是，存在一种可以称为多项式内密码学的东西。多项式内密码学理论有四个动机：(a) 诸如上述应用的新构造，(b) 更准确地估计破解密码的计算成本，(c) 证明下界可能比仅仅是猜想超多项式（标准）密码学的下界更容易，(d) 如果单向函数不存在，标准密码学就是多项式内的而非超多项式的。

我提出以下形式化定义：

<pre>
f: {0,1}* --> {0,1}* is called a strong k-benchmark function
for machine model M and k>=1 if the following hold:

1. f is computable in O(p(n)) time on M, where p is a polynomial.
2. f does not shrink the input more than q(n,k), where q(n,k)
is a polynomial of degree k.
3. For every randomized algorithm A running on M in time
less than q(n,k)p(n), there exists an N such that for n > N
        Pr[A(f(x)) = f^-1(f(x))] < 1/q(n,k)p(n)
</pre>

换句话说，不存在运行速度快于 q(n,k)p(n) 且能对超过极小数量值求逆 f 的算法。

类似地，可以定义平均情况、最佳情况和最差情况的 k 次基准函数，类似于单向函数的定义。开放问题（类似于超多项式密码学中单向函数是否存在的开放问题）：能否在某种可实现的机器模型（如 RAM-log）上，对某个函数和 k>=1 将条件 (3) 作为上下界来证明？

强情况和平均情况与密码学应用最为相关。不幸的是，为此我们还需要：

<ol type="a">
  <li>一个涵盖所有物理上可实现的机器的机器模型列表，其涵盖方式是任何这样的机器都可以被列表上的某个模型以非常小的开销（如常数或 O(log(n))）来模拟，以及</li>
  <li>证明列表上所有模型上某个基准函数的下界</li>
</ol>

由于这至少非常繁琐，人们希望在实践中可以用一个覆盖所有可能实现的机器架构的简短列表来应付。例如，当破解协议的总暴露风险小于设计和构建新型机器架构来击败它的研发成本时，这种方法就可能可行。密码分析将包括发现最适合破解多项式内密码的机器架构。

上述分析至少有两个实际含义。一是计算成本邮资、hashcash、bit gold、MicroMint 和其他此类多项式内密码学方案的分析和实现中几乎没有犯错的余地。另一个是，除非对手预算非常低因而仅限于标准个人电脑，否则在不考虑机器架构的情况下分析这些方案的安全性或成本是没有意义的。例如，垃圾邮件发送者可能通过使用针对计算特定谜题函数而优化的定制芯片来击败计算成本邮资。
