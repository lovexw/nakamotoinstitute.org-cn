---
title: 通俗易懂的Truledger
authors:
  - bill-st-clair
date: 2008
categories:
  - cryptography
  - finance
doctype: essay
external: http://truledger.com/doc/plain-english.html
---

[Truledger](http://truledger.com/) 是一个匿名的、数字签名的金库和交易系统。与[Loom](https://loom.cc/)类似，它允许任何人发行资产（数字货币）。与完全依赖（非常好的）隐蔽性来保障安全的Loom不同，Truledger的数字签名允许服务器和客户彼此证明他们在特定时间就其余额达成了共识。它可以在关闭交易后销毁交易历史记录。Truledger最初将提供基于服务器的交易功能。最终，它将提供数字支票和无记名证书。不过，这些_将_需要永久存储交易历史记录（除非它们设有过期时间）。

[doc/db.txt](http://truledger.com/doc/db.txt) 给出了Truledger服务器数据库和协议的简明描述。本页面试图用通俗易懂的语言来解释该协议。

Truledger使用公钥密码学对其网络界面与Truledger服务器之间来回传递的所有消息进行签名。数字签名是一种几乎不可伪造的方式，用于确保消息确实出自其声称的作者。Truledger使用OpenSSL进行公钥加密。你每次访问安全网站 https://somewhere.com/ 时可能都在使用OpenSSL，网络服务器也是如此。我没有自己造轮子，只是使用了保护网络安全的那套经过验证的可靠技术。你可以在[这里](http://en.wikipedia.org/wiki/Public-key_cryptography)和[这里](http://www.pgpi.org/doc/pgpintro/)阅读更多关于公钥密码学、数字签名和哈希的内容。

在下面的场景中，我将使用四个角色。"Server"是Truledger服务器的名称。"Bob"和"Sue"是两个互相交易的客户。"Spammer"是第三个客户，Bob和Sue都不认识他。

## 场景：开设账户

Sue（通过电子邮件或即时通讯）：嘿，Bob。看看Truledger。去Truledger.com，下载客户端，安装到你的电脑上。然后创建一个私钥，把你的ID发给我，我会给你一些使用令牌，这样你就可以创建账户了。

Bob（通过电子邮件或即时通讯）：谢谢，Sue！我安装好了Truledger客户端并创建了私钥。这是我的ID。

Sue（通过她的Truledger客户端）：嘿，服务器。这是一个新的请求编号。请给我一个交易编号。\
签名：Sue

服务器：这是一个新的交易编号。\
签名：服务器

Sue：嘿，服务器，这是你给我的交易编号。请将50个使用令牌支付给Bob的ID，附言"嘿Bob。欢迎来到Truledger！"我支付2个使用令牌作为交易费，当Bob接受支付时我会拿回来。此交易后我的余额将是1025个使用令牌。此交易后我的发件箱哈希将是X。\
签名：Sue

服务器：我处理了你向Bob的ID支付50个使用令牌的交易。我确认此交易时的交易费为2个使用令牌，你此交易后的余额为1025个使用令牌。我同意你的发件箱哈希。\
签名：服务器

Sue（通过电子邮件或即时通讯）：好的，Bob。我给了你50个使用令牌。你现在应该可以在Truledger.com创建账户了。注册好后通过Truledger给我发个消息。

Bob（通过他的Truledger客户端）：你好，服务器。这是我的ID和我的公钥。你的ID和公钥是什么？\
签名：Bob

服务器：这是我的ID和公钥。\
签名：服务器

Bob：这是我的ID和我的公钥，请为我创建一个账户。\
签名：Bob

服务器：我已经注册了你的ID和公钥。有人给了你足够的令牌来注册。欢迎来到Truledger。\
签名：服务器

---

要对消息进行签名，你需要拥有一个私钥。要验证消息上的签名，你需要拥有相应的公钥。Truledger通过客户公钥的哈希值——即他们的ID——来识别客户。ID是一个40字符的数字和字母A到F组成的字符串，即160位数字的十六进制表示。你通过一个密码短语向Truledger客户端标识你的账户，该密码短语用于加密磁盘上的私钥。你只需要在第一次告诉交易伙伴如何向你汇款或像Sue为Bob做的那样为你充值使用令牌时，复制粘贴你的ID。

使用令牌是Patrick Chkoreff的[Loom](https://loom.cc/)系统中的一个概念。它们是一种收取服务器资源费用的方式。你必须为账户余额购买存储空间，并为交易租赁临时存储。使用令牌就是用于此目的的"货币"。Truledger还支持以其他资产类型收取费用，供希望赚取超过使用令牌销售收入的服务器管理方使用。Truledger使用文件系统作为数据库。Truledger数据库中的一个文件花费一个使用令牌。文件大小各异，但通常约为8K，主要是签名。

请注意，Bob必须两次向服务器发送他的公钥——一次是在他请求服务器的公钥时，另一次是在他注册时。发往和来自Truledger的每条消息都经过数字签名。只有在知道签名者的公钥时才能验证数字签名。新客户的公钥在注册后才存入数据库，因此在最初的两次消息中——新客户获取服务器的公钥以便验证服务器的签名，以及注册请求——都需要包含客户的公钥，以便验证这两条消息上的签名。注册完成后，后续消息只需携带ID即可；公钥可在数据库中查找。

实际发送的消息（省略了每个括号项目附带的签名）：

<pre>
Sue: (&lt;suesid&gt;,gettime,&lt;serverid&gt;,&lt;req#&gt;)
Server: (&lt;serverid&gt;,time,&lt;suesid&gt;,&lt;time#&gt;)
Sue: (&lt;suesid&gt;,spend,&lt;serverid&gt;,&lt;time#&gt;,&lt;bobsid&gt;,&lt;tokenid&gt;,50,Hey Bob. Welcome to Truledger!).
        (&lt;suesid&gt;,tranfee,&lt;serverid&gt;,&lt;time#&gt;,&lt;tokenid&gt;,2).
        (&lt;suesid&gt;,balance,&lt;serverid&gt;,&lt;time#&gt;,&lt;tokenid&gt;,1025).
        (&lt;suesid&gt;,outboxhash,&lt;serverid&gt;,&lt;time#&gt;,X)
Server: (&lt;serverid&gt;,@spend,(&lt;suesid&gt;,spend,&lt;serverid&gt;,&lt;time#&gt;,&lt;bobsid&gt;,&lt;tokenid&gt;,50,Hey Bob. Welcome to Truledger!)).
        (&lt;serverid&gt;,@tranfee,(&lt;suesid&gt;,tranfee,&lt;serverid&gt;,&lt;time#&gt;,&lt;tokenid&gt;,2)).
        (&lt;serverid&gt;,@balance,(&lt;suesid&gt;,balance,&lt;serverid&gt;,&lt;time#&gt;,&lt;tokenid&gt;,1025)).
        (&lt;serverid&gt;,@outboxhash,(&lt;suesid&gt;,outboxhash,&lt;serverid&gt;,&lt;time#&gt;,X))
Bob: (&lt;bobsid&gt;,serverid,&lt;pubkey&gt;)
Server: (&lt;serverid&gt;,register,&lt;serverid&gt;,&lt;pubkey&gt;,Truledger)
Bob: (&lt;bobsid&gt;,register,&lt;serverid&gt;,&lt;pubkey&gt;,Bob)
Server: (&lt;serverid&gt;,@register,(&lt;bobsid&gt;,register,&lt;serverid&gt;,&lt;pubkey&gt;,Bob))
</pre>

## 场景：接收资产

Bob：你好，服务器。这是我的ID和一个新的请求编号。我的收件箱里有什么？\
签名：Bob

服务器：你的收件箱包含来自Sue的50个使用令牌的支付，附言"嘿Bob。欢迎来到Truledger！"它还包含来自服务器的10个使用令牌的扣费，附言"注册费"。这里有两个交易编号，你可以用来接受这些支付并自己进行一笔支付。\
签名：服务器

Bob：这是我的ID和你给我的第一个交易编号。接受来自Sue的支付，附言"谢谢，Sue。我对Truledger感到兴奋！"接受服务器的扣费。此交易后我的余额将是39个使用令牌。\
签名：Bob

服务器：我处理了来自Sue的支付和服务器的扣费。我确认你此交易后的余额为39个使用令牌。\
签名：服务器

---

对电子服务器的一种可能攻击是某人重放截获的消息。除非协议对此加以防护，否则这可能导致问题。除了serverid请求、注册请求和获取客户最后请求编号的请求外，每个信息请求都必须附带一个大于客户上次使用的请求编号的请求编号，每个交易都必须附带服务器发放的交易编号。服务器维护一个计数器，每次有人请求交易编号时递增。这使得揭示信息或发起交易的请求在没有客户密码短语和私钥的情况下不可能被重放。在Truledger的世界里，你的密码短语和私钥就是你的身份。请妥善保管。

另一种可能的重放攻击是截获发往一个服务器的消息并将其发送给另一个服务器。客户可以通过为不同服务器使用不同的ID（因此使用不同的公钥/私钥对）来防范这种情况。但使用同一个ID会更加方便。你的朋友们会认出你，而且你只需记住一个密码短语。因此，服务器的ID被包含在几乎所有请求中。发往其他服务器的请求将不起作用。

你可能想知道为什么Bob交易后的余额是39而不是40个使用令牌。他从Sue那里得到了50个使用令牌，向服务器支付了10个使用令牌的注册费。多出的一个使用令牌是用于存储使用令牌余额的新文件的价格。存储需要使用令牌。Loom每16字节存储收取1个使用令牌。我曾考虑按字节收费，但决定按文件收费更容易处理，虽然不那么公平。当然，只有在消息大小有限制的情况下才有意义。如果允许兆字节大小的消息，那么Truledger就必须按字节或千字节收费。

实际发送的消息：

<pre>
Bob: (&lt;bobsid&gt;,getinbox,&lt;serverid&gt;,&lt;req#&gt;)
Server: (&lt;serverid,@getinbox,(&lt;bobsid&gt;,getinbox,&lt;serverid&gt;,&lt;req#&gt;)).
        (&lt;serverid&gt;,inbox,&lt;time3#&gt;,(&lt;suesid&gt;,spend,&lt;serverid&gt;,&lt;time#&gt;,&lt;bobsid&gt;,&lt;tokenid&gt;,50,Hey Bob. Welcome to Truledger!)).
        (&lt;serverid&gt;,inbox,&lt;time4#&gt;,(&lt;serverid&gt;,spend,&lt;serverid&gt;,&lt;time2#&gt;,&lt;bobsid&gt;,&lt;tokenid&gt;,-10,Registration Fee)).
        (&lt;serverid&gt;,time,&lt;bobsid&gt;,&lt;time5#&gt;).
        (&lt;serverid&gt;,time,&lt;bobsid&gt;,&lt;time6#&gt;)
Bob: (&lt;bobsid&gt;,processinbox,&lt;serverid&gt;,&lt;time5#&gt;,&lt;time3#&gt;|&lt;time4#&gt;).
       (&lt;bobsid&gt;,spend|accept,&lt;serverid&gt;,&lt;suesid&gt;,&lt;time#&gt;,Thanks Sue. I'm excited about Truledger!).
       (&lt;bobsid&gt;,spend|accept,&lt;serverid&gt;,&lt;serverid&gt;,&lt;time2#&gt;).
       (&lt;bobsid&gt;,balance,&lt;serverid&gt;,&lt;time5#&gt;,&lt;tokenid&gt;,39)
Server: (&lt;serverid&gt;,@processinbox,(&lt;bobsid&gt;,processinbox,&lt;serverid&gt;,&lt;time5#&gt;,&lt;time3#&gt;|&lt;time4#&gt;)).
        (&lt;serverid&gt;,@spend|accept,(&lt;bobsid&gt;,spend|accept,&lt;serverid&gt;,&lt;suesid&gt;,&lt;time#&gt;,Thanks Sue. I'm excited about Truledger!)).
        (&lt;serverid&gt;,@spend|accept,(&lt;bobsid&gt;,spend|accept,&lt;serverid&gt;,&lt;serverid&gt;,&lt;time2#&gt;)).
        (&lt;serverid&gt;,@balance,(&lt;bobsid&gt;,balance,&lt;serverid&gt;,&lt;time5#&gt;,&lt;tokenid&gt;,39))
</pre>

## 场景：关闭交易

Sue：你好，服务器。这是我的ID和一个新的请求编号。我的收件箱里有什么？\
签名：Sue

服务器：你的收件箱包含Bob对你50个使用令牌支付的接受，附言"谢谢Sue。我对Truledger感到兴奋！"这里有两个交易编号，你可以用来关闭该交易并进行新的支付。\
签名：服务器

Sue：这是我的ID和你给我的第一个交易编号。清除向Bob的支付。此交易后我的余额将是1027个使用令牌。此交易后我的发件箱哈希将是Y。\
签名：Sue

服务器：我已清除向Bob的支付（并退还了租赁发件箱和收件箱位置的使用令牌）。我确认你此交易后的余额为1027个使用令牌。我也同意你此交易后的发件箱哈希为Y。\
签名：服务器

---

Truledger账户有三个主要部分：余额、发件箱和收件箱。价值存储在所有这三个地方。当你进行支付时，你支付资产的余额被扣减，支付请求被存储在你的发件箱和收件人的收件箱中。你需要支付两个使用令牌来租赁新的发件箱和收件箱文件。当收件人接受支付时，其支付资产的余额被贷记，支付通知从其收件箱中移除，支付接受通知被添加到你的收件箱中。当你确认其接受支付时，支付请求从你的发件箱中移除，接受通知从你的收件箱中移除，你为租赁这些文件而支付的两个使用令牌被贷记到你的余额中。这个三步流程是必要的，因为服务器没有你的签名许可就不能修改你的余额，没有收件人的签名许可也不能修改收件人的余额。

你可能想知道"发件箱哈希"是什么。你的余额加上你的发件箱代表了你和服务器已经达成共识的账户部分。你的收件箱在你不知情的情况下被更改，但服务器需要你的签名许可才能更改你的发件箱（进行支付）或你的余额。由于你的发件箱可能变得很大，与其在每次支付或确认收件人接受（或拒绝）支付时来回发送全部内容，不如计算发件箱的哈希值并发送它，服务器回复对该发件箱哈希的确认（感谢Patrick Chkoreff提供了这个想法）。

实际发送的消息：

<pre>
Sue: (&lt;suesid&gt;,getinbox,&lt;serverid&gt;,&lt;req2#&gt;)
Server: (&lt;serverid,@getinbox,(&lt;suesid&gt;,getinbox,&lt;serverid&gt;,&lt;req2#&gt;)).
        (&lt;serverid&gt;,inbox,&lt;time7#&gt;,(&lt;bobsid&gt;,spend|accept,&lt;serverid&gt;,&lt;suesid&gt;,&lt;time#&gt;,Thanks Sue. I'm excited about Truledger!)).
        (&lt;serverid&gt;,time,&lt;bobsid&gt;,&lt;time8#&gt;).
        (&lt;serverid&gt;,time,&lt;bobsid&gt;,&lt;time9#&gt;)
Sue: (&lt;suesid&gt;,processinbox,&lt;serverid&gt;,&lt;time8#&gt;,&lt;time7#&gt;).
       (&lt;suesid&gt;,balance,&lt;serverid&gt;,&lt;time8#&gt;,&lt;tokenid&gt;,1027).
       (&lt;suesid&gt;,outboxhash,&lt;serverid&gt;,&lt;time8#&gt;,Y)
Server: (&lt;serverid&gt;,@processinbox,(&lt;suesid&gt;,processinbox,&lt;serverid&gt;,&lt;time8#&gt;,&lt;time7#&gt;)).
        (&lt;serverid&gt;,@balance,(&lt;suesid&gt;,balance,&lt;serverid&gt;,&lt;time8#&gt;,&lt;tokenid&gt;,1027)).
        (&lt;serverid&gt;,@outboxhash,(&lt;suesid&gt;,outboxhash,&lt;serverid&gt;,&lt;time8#&gt;,Y))
</pre>

## 场景：防止垃圾信息

Spammer（可能通过自动化客户端）：嘿，服务器。这是一个新的请求编号。请给我一个交易编号。\
签名：Spammer

服务器：这是一个新的交易编号。\
签名：服务器

Spammer：嘿，服务器。这是你给我的交易编号。请将0个使用令牌支付给Bob的ID，附言"彻夜狂欢。访问BuyViagra.com。"我支付2个使用令牌作为交易费，当Bob接受支付时我会拿回来。此交易后我的余额将是2425个使用令牌。此交易后我的发件箱哈希将是Z。\
签名：Spammer

服务器：我处理了你向Bob的ID支付0个使用令牌的交易。我确认此交易时的交易费为2个使用令牌，你此交易后的余额为2425个使用令牌。我同意你的发件箱哈希。\
签名：服务器

Bob：你好，服务器。这是我的ID和一个新的请求编号。我的收件箱里有什么？\
签名：Bob

服务器：你的收件箱包含来自Spammer的0个使用令牌支付，附言"彻夜狂欢。访问BuyViagra.com。"这里有两个交易编号，你可以用来接受这些支付并自己进行一笔支付。\
签名：服务器

Bob：这是我的ID和你给我的第一个交易编号。拒绝Spammer的支付，附言"谢谢你的令牌"，并把他为发送那条垃圾信息支付的2个使用令牌给我。此交易后我的余额将是41个使用令牌。\
签名：Bob

服务器：我已拒绝了Spammer的支付。我确认你此交易后的余额为41个使用令牌。\
签名：服务器

---

支付可以被拒绝。支付的金额会退回给支付方，但收款方获得交易费。零支付将Truledger用作简单的消息服务。但除非收件人想要这条消息，否则它不是免费的。在我看来，垃圾邮件之所以大量存在，很大程度上是因为发送电子邮件几乎免费。在每条垃圾信息花费2个使用令牌的系统中——便宜但并非免费——我怀疑垃圾信息不会成为太大的问题。时间会证明一切。

实际发送的消息：

<pre>
Spammer: (&lt;spammersid&gt;,gettime,&lt;serverid&gt;,&lt;req#&gt;)
Server: (&lt;serverid&gt;,time,&lt;spammersid&gt;,&lt;time10#&gt;)
Spammer: (&lt;spammersid&gt;,spend,&lt;serverid&gt;,&lt;time10#&gt;,&lt;bobsid&gt;,&lt;tokenid&gt;,0,Go all night. Visit BuyViagra.com.).
        (&lt;spammersid&gt;,tranfee,&lt;serverid&gt;,&lt;time#&gt;,&lt;tokenid&gt;,2).
        (&lt;spammersid&gt;,balance,&lt;serverid&gt;,&lt;time#&gt;,&lt;tokenid&gt;,2425).
        (&lt;spammersid&gt;,outboxhash,&lt;serverid&gt;,&lt;time#&gt;,Z)
Server: (&lt;serverid&gt;,@spend,(&lt;spammersid&gt;,spend,&lt;serverid&gt;,&lt;time#&gt;,&lt;bobsid&gt;,&lt;tokenid&gt;,0,Go all night. Visit BuyViagra.com.)).
        (&lt;serverid&gt;,@tranfee,(&lt;spammersid&gt;,tranfee,&lt;serverid&gt;,&lt;time#&gt;,&lt;tokenid&gt;,2)).
        (&lt;serverid&gt;,@balance,(&lt;spammersid&gt;,balance,&lt;serverid&gt;,&lt;time#&gt;,&lt;tokenid&gt;,2425)).
        (&lt;serverid&gt;,@outboxhash,(&lt;spammersid&gt;,outboxhash,&lt;serverid&gt;,&lt;time#&gt;,Z))
Bob: (&lt;bobsid&gt;,getinbox,&lt;serverid&gt;,&lt;req2#&gt;)
Server: (&lt;serverid,@getinbox,(&lt;bobsid&gt;,getinbox,&lt;serverid&gt;,&lt;req2#&gt;)).
        (&lt;serverid&gt;,inbox,&lt;time11#&gt;,(&lt;spammersid&gt;,spend,&lt;serverid&gt;,&lt;time10#&gt;,&lt;bobsid&gt;,&lt;tokenid&gt;,0,Go all night. Visit BuyViagra.com.)).
        (&lt;serverid&gt;,time,&lt;bobsid&gt;,&lt;time12#&gt;).
        (&lt;serverid&gt;,time,&lt;bobsid&gt;,&lt;time13#&gt;)
Bob: (&lt;bobsid&gt;,processinbox,&lt;serverid&gt;,&lt;time12#&gt;,&lt;time11#&gt;).
       (&lt;bobsid&gt;,spend|reject,&lt;serverid&gt;,&lt;spammersid&gt;,&lt;time12#&gt;,&lt;time10#&gt;,Thanks for the tokens).
       (&lt;bobsid&gt;,balance,&lt;serverid&gt;,&lt;time12#&gt;,&lt;tokenid&gt;,41)
Server: (&lt;serverid&gt;,@processinbox,(&lt;bobsid&gt;,processinbox,&lt;serverid&gt;,&lt;time12#&gt;,&lt;time11#&gt;)).
        (&lt;serverid&gt;,@spend|reject,(&lt;bobsid&gt;,spend|accept,&lt;serverid&gt;,&lt;spammersid&gt;,&lt;time12#&gt;,&lt;time10#&gt;,Thanks for the tokens)).
        (&lt;serverid&gt;,@balance,(&lt;bobsid&gt;,balance,&lt;serverid&gt;,&lt;time12#&gt;,&lt;tokenid&gt;,41))
</pre>

## 场景：发行资产

Bob：嘿，服务器。这是一个新的请求编号。请给我一个交易编号。\
签名：Bob

服务器：这是一个新的交易编号。\
签名：服务器

Bob：嘿，服务器。这是你给我的交易编号。请注册一个名为"Bob GoldGrams"的新资产。它的标度为7，精度为3。它的ID是&lt;bobggid&gt;。此交易后我的余额将是39个使用令牌和-1 &lt;bobggid&gt;。

服务器：我已经注册了新的"Bob GoldGrams"资产。我确认你此交易后的余额为39个使用令牌和-1 &lt;bobggid&gt;。

---

与Loom一样，Truledger允许客户创建自己的资产类型。然后，如果他们能说服其他客户这样做，其他客户就可以用该资产类型进行交易。Truledger资产的ID是创建者ID、其标度、其精度和其名称的sha1哈希值。但客户签名的创建资产的消息，以及服务器签名以确认创建的消息，还包含serverid。这允许资产在多个服务器上以相同的ID注册，但使每次特定注册特定于特定服务器。因此，资产发行方提供将其资产持有量在他注册的服务器之间转移的服务是有意义的——不言而喻，服务器A上的Bob GoldGrams与服务器B上的Bob GoldGrams是同一种资产。

我计划支持资产发行的转移，但还没有弄清楚其中的复杂性。

与Loom一样，Truledger中的所有金额都以整数存储。标度值控制小数点在实际表示中放置的位置：向左移动标度位数。精度控制打印的最小小数位数。因此，标度为7、精度为3时，值12000000将被Truledger客户端打印为1.200，Bob新货币的最小值为0.0000001——即一千万分之一克黄金，按30美元/克计算为0.000003美元：万分之三美分。微支付来了。

同样与Loom一样，一种资产类型的所有账户和发件箱中的金额总和为-1。有一个负余额属于发行者，他可以随意支付任意金额，还有一堆正余额和发件箱条目。发行者账户中的-1余额意味着该资产中没有未偿还余额或发件箱条目，所以这就是Bob的Bob GoldGrams余额的起点。资产的用户必须在Truledger之外相信发行者的保证——他的资产由具有真实价值的某种东西作为支撑，而且他发行的虚拟资产数量永远不会超过他拥有的支持商品。当然，除非他想像一个国家那样行事，发行以他的完全信任和信用为支撑、别无其他的法定货币。祝你好运，让别人接受这个。

实际发送的消息：

<pre>
Bob: (&lt;bobsid&gt;,gettime,&lt;serverid&gt;,&lt;req3#&gt;)
Server: (&lt;serverid&gt;,time,&lt;bobsid&gt;,&lt;time13#&gt;)
Bob: (&lt;bobsid&gt;,asset,&lt;serverid&gt;,&lt;bobggid&gt;,7,3,Bob GoldGrams).
       (&lt;bobsid&gt;,balance,&lt;serverid&gt;,&lt;time13#&gt;,&lt;tokenid&gt;,39).
       (&lt;bobsid,balance,&lt;serverid&gt;,&lt;time13#&gt;,&lt;bobggid&gt;,-1)
Server: (&lt;serverid&gt;,#asset,(&lt;bobsid&gt;,asset,&lt;serverid&gt;,&lt;bobggid&gt;,7,3,Bob GoldGrams)).
       (&lt;serverid&gt;,#balance,(&lt;bobsid&gt;,balance,&lt;serverid&gt;,&lt;time13#&gt;,&lt;tokenid&gt;,39)).
       (&lt;serverid&gt;,#balance,(&lt;bobsid,balance,&lt;serverid&gt;,&lt;time13#&gt;,&lt;bobggid&gt;,-1))
</pre>

## 场景：多个子账户

Bob：嘿，服务器。这是一个新的请求编号。请给我一个交易编号。\
签名：Bob

服务器：这是一个新的交易编号。\
签名：服务器

Bob：嘿，服务器。这是你给我的交易编号。向我自己做一个零支付。此交易后我的余额将是38个使用令牌，默认子账户中-311.0347681 Bob GoldGrams，"Gun Safe"子账户中311.034768 Bob GoldGrams。

服务器：我完成了这笔支付。我确认交易后你的余额是38个使用令牌，默认账户中-311.0347681 Bob GoldGrams，"Gun Safe"子账户中311.034768 Bob GoldGrams。

Bob：嘿，服务器。这是一个新的请求编号。请给我一个交易编号。\
签名：Bob

服务器：这是一个新的交易编号。\
签名：服务器

Bob：嘿，服务器。这是你给我的交易编号。请将2.4056304 Bob GoldGrams支付给Sue，附言"嗯，我终于发行了我的新货币，以我保险柜里的Krugerrand金币作为支撑。我给你一克以感谢你向我推荐Truledger，还有[1.4056304克](<http://www.google.com/search?q=(36+dollars+%2F+(796.60+dollars+per++troy+ounce))+in+grams>)兑换36个[Capulin Coffee](http://capulin.com/)单位，你说过你愿意卖给我，这样我就可以多买一些Daniel Fourwinds的优质咖啡，那天我们在你家享用得很开心。我用的金价是$796.60/盎司，Kitco今晨的买入价。"我的交易费将是2个使用令牌。此交易后我的余额将是36个使用令牌，"Gun Safe"子账户中309.6291376 Bob GoldGrams。此交易后我的发件箱哈希将是A。\
签名：Bob

服务器：我已完成了你向Sue支付2.4056304 Bob GoldGrams的交易，附你的消息，交易费为2个使用令牌。我确认你此交易后的余额为36个使用令牌，"Gun Safe"子账户中309.6291376 Bob GoldGrams。我同意发件箱哈希。\
签名：服务器

---

Truledger支持将你的余额拆分为多个"子账户"。就像传统服务器给你提供支票账户和储蓄账户一样，你可以使用这些子账户来帮助管理你的资产。你可以拥有任意数量的子账户，唯一的限制是你需要有使用令牌来支付文件费用。

Bob决定用一个"Gun Safe"子账户来记录他的Bob GoldGrams资产，余额记录了他保险柜中尚未投入流通的黄金克数。他用[10盎司](http://www.google.com/search?q=10+troy+ounces+in+grams)黄金来初始化它，这是他愿意出售的部分持有。然后他把其中一些支付给Sue，要求换取足够的Capulin Coffee单位来买两磅Capulin咖啡（每磅$17.95，含运费）。

请注意，你不必在每次支付时提及所有余额。你只需提及发生变化的余额。还要注意，向你自己支付不需要交易费。在你的子账户之间移动资产只需支付新文件的使用令牌。不需要发件箱和收件箱那一套。

实际发送的消息：

<pre>
Bob: (&lt;bobsid&gt;,gettime,&lt;serverid&gt;,&lt;req4#&gt;)
Server: (&lt;serverid&gt;,time,&lt;bobsid&gt;,&lt;time14#&gt;)
Bob: (&lt;bobsid&gt;,spend,&lt;serverid&gt;,&lt;time14#&gt;,&lt;bobsid&gt;,&lt;bobggid&gt;,0).
        (&lt;bobsid&gt;,balance,&lt;serverid&gt;,&lt;time14#&gt;,&lt;bobggid&gt;,-3110347681).
        (&lt;bobsid&gt;,balance,&lt;serverid&gt;,&lt;time14#&gt;,&lt;bobggid&gt;,3110347680,Gun Safe)
Server: (&lt;serverid&gt;,@spend,(&lt;bobsid&gt;,spend,&lt;serverid&gt;,&lt;time14#&gt;,&lt;bobsid&gt;,&lt;bobggid&gt;,0)).
        (&lt;serverid&gt;,@balance,(&lt;bobsid&gt;,balance,&lt;serverid&gt;,&lt;time14#&gt;,&lt;bobggid&gt;,-3110347681)).
        (&lt;serverid&gt;,@balance,(&lt;bobsid&gt;,balance,&lt;serverid&gt;,&lt;time14#&gt;,&lt;bobggid&gt;,3110347680,Gun Safe))
Bob: (&lt;bobsid&gt;,gettime,&lt;serverid&gt;,&lt;req5#&gt;)
Server: (&lt;serverid&gt;,time,&lt;bobsid&gt;,&lt;time15#&gt;)
Bob: (&lt;bobsid&gt;,spend,&lt;serverid&gt;,&lt;time15#&gt;,&lt;suesid&gt;,&lt;bobggid&gt;,24056304,Well\, I
      finally issued my new currency\, backed by Krugerands in my gun
      safe. I'm giving you a gram in thanks for turning me on to Truledger\,
      and 1.4056304 grams for 36 Capulin Coffee Units\, which you said you'd
      sell me\, so I can buy more of Daniel Fourwinds' fine coffee that we
      relished at your house the other day. I used a gold price of
      $796.60/ounce, Kitco's bid price this morning.).
       (&lt;bobsid&gt;,tranfee,&lt;serverid&gt;,&lt;time15#&gt;,&lt;tokenid&gt;,2).
       (&lt;bobsid&gt;,balance,&lt;serverid&gt;,&lt;time15#&gt;,&lt;bobggid&gt;,3096291376,Gun Safe).
       (&lt;bobsid&gt;,outboxhash,&lt;serverid&gt;,&lt;time15#&gt;,A)
Server: (&lt;serverid&gt;,@spend,(&lt;bobsid&gt;,spend,&lt;serverid&gt;,&lt;time15#&gt;,&lt;suesid&gt;,&lt;bobggid&gt;,24056304,Well\, I
       finally issued my new currency\, backed by Krugerands in my gun
       safe. I'm giving you a gram in thanks for turning me on to Truledger\,
       and 1.4056304 grams for 36 Capulin Coffee Units\, which you said you'd
       sell me\, so I can buy more of Daniel Fourwinds' fine coffee that we
       relished at your house the other day. I used a gold price of
       $796.60/ounce, Kitco's bid price this morning.)).
       (&lt;serverid&gt;,@tranfee,(&lt;bobsid&gt;,tranfee,&lt;serverid&gt;,&lt;time15#&gt;,&lt;tokenid&gt;,2)).
       (&lt;serverid&gt;,@balance,(&lt;bobsid&gt;,balance,&lt;serverid&gt;,&lt;time15#&gt;,&lt;bobggid&gt;,3096291376,Gun Safe)).
       (&lt;serverid&gt;,@outboxhash,(&lt;bobsid&gt;,outboxhash,&lt;serverid&gt;,&lt;time15#&gt;,A))
</pre>

## 场景：获取信息

待完成

## 场景：取消支付

待完成

---

版权所有 &copy; 2008 Bill St. Clair，保留所有权利。
