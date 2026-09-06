---
title: "分析合约的形式化语言"
sort_title: "分析合约的形式化语言"
authors:
  - nick-szabo
date: 2002
display_date: 2002年初步草案
categories:
  - cryptography
  - law
doctype: essay
external: http://szabo.best.vwh.net/contractlanguage.html
---

作者提出了一种微型语言，供<!-- 律师、法学学者、经济学家、法律和经济史学家、商业分析师、会计师、审计师等 -->有意起草和分析合同的专业人士和研究人员使用。该语言也可供计算机读取。这种语言的主要目的是尽可能清晰、完整且简洁地规定常见合同或合同条款。这些合同包括金融合同、留置权和其他形式的担保、所有权转让、在线服务的履行，以及供应链工作流程。

在计算机解释该语言的情况下，可以解决以下问题：

- 会计与审计。复杂的合同（包括衍生品及其组合）可以用我们的形式化语言来规定。然后，可以应用自动化或手工会计规则，将合同下完成的交易转换为审计追踪和账簿条目。
- 对形式化规定的合同进行分析，以发现逻辑缺陷、时间安排问题、各方违约的机会，以及与已承诺的其他合同之间的冲突。<sup><a href="#fn1" id="ref1">[1]</a></sup>
- 将形式化合同翻译为现有的编程语言（如 E<sup><a href="#fn2" id="ref2">[2]</a></sup>）和/或密码学协议<sup><a href="#fn3" id="ref3">[3]</a></sup>，以实现[智能合约](/the-idea-of-smart-contracts/)的部分自执行和受保护执行。
- 某些类型的合同，尤其是金融和大宗商品合同及其衍生品，可以转换为决策树或博弈树，通过分析来确定风险、净现值等。

设计这种语言的过程也是探索合同基本性质（各种有用的合同是由哪些"元素"构成的？）及其可组合性（哪些组合规则可以排除不可能的合同？）的绝佳方式。该语言也是一种创造性工具，可用于构思和"草拟"新型合同。欢迎您的参与。

我们语言中的词汇尽可能遵循法律术语——例如，_performance_（履行）指的是按照合同条款完成执行（与法律领域的用法一致），而不是程序员所理解的速度、内存使用、带宽等量化指标。使用该语言不需要法律学位，但建议对合同法和合同起草有一定了解。我猜想，一位在美国 LSAT（法学院入学考试）或其海外等效考试的分析和逻辑部分表现不错的律师，比起仅有传统过程式语言经验的程序员，在使用该语言起草合同时会更加得心应手。这就是为什么我将其称为_起草语言_而非编程语言。

我们的语言可以规定谈判的输出（可能是一场拍卖、一次交易所交易、双方起草合同，或一方起草另一方同意等），也可以定义驱动和监督合同履行交易的引擎的输入：

<pre>
谈判 --> 合同 --> 履行
</pre>

合同的履行，即其作为智能合约的具体实现，因此可以被视为（目前仍是假设性的）用我们的语言编写的程序的执行。此外，我们的语言包含了各种各样的合同条款，而不仅仅是抽象的货币条款及其衍生品。这两个特点使我们的语言与<sup><a href="#fn4" id="ref4">[4]</a></sup>等专用金融合同语言截然不同。虽然我们使用了几个金融合同示例来介绍该语言并展示其灵活性，但其在功能和可表示的合同与交易协议类型方面的范围要广泛得多。

## 语义

我们语言中的每个词和短语都有明确的标准含义。因此，起草的合同在解释争议方面将大大减少。另一方面，该语言不太擅长表达合同中常常需要的许多主观和模糊的概念。就目前状态而言，它也不善于引用法律管辖权或法律学说。然而，该语言与传统编程语言仍有很大不同。合同条款是根据触发其履行的事件来定义的。这些事件包括日期和时间、各方做出的选择、可观察到的违约行为等。

我们的语言不是一种标记语言。它不是为了起草合同而操纵文本。它不是为了结构化文本、规定填写表格、定义静态数据格式或类似任务——这些是 HTML 或 XML 等语言的工作。对于这些任务，应该使用标记语言或文本处理编程语言（如 Perl），而不是我们的语言。我们的语言做的是完全不同的事情——它建模的是合同履行的动态过程，即何时以及在什么条件下应当履行义务。

该语言的词和句不是从上到下逐步执行的指令。相反，阅读合同时（无论是人还是计算机），需要跟随合同条款的嵌套定义进行展开，并查看 **when** 语句中的事件，看它们触发了什么。如果起草者确实需要明确构建一个逐步的日历计划，可以使用日历驱动的事件或 **for** 和 **then** 等词来实现。

该语言鼓励合同的组合。合同、权利和义务可以嵌套。我们将这些嵌套结构称为_条款_。合同和条款涉及两方：_持有方_（Holder），即我们从其视角阅读合同的一方，以及_对手方_（Counterparty）。多方协议可以通过组合若干双方合同来起草。

## 示例——期货合同

我们的第一个示例是一种广为人知的金融合同——_期货_（future）。期货是期货合同持有方（Holder）在某个特定月份购买一定数量的某种大宗商品的义务，以及期货合同卖方（对手方，Counterparty）交割这些商品的义务。为了介绍该合同，我们以金融分析师通常使用的抽象形式给出，省略了描述作为可信第三方中介的重要细节（这些中介负责定义大宗商品的"公允组合"），也省略了关于实际交割的许多细节。

<pre>
future(rightA="1 round lot pork bellies",
       rightB="$1,500.00",
       p = "for delivery in July 2002") =

    when withinPeriod(p)
        to Holder rightA   with   to Counterparty rightB
    then terminate
</pre>

由于该语言目前尚未被计算机解释，其语法设计更多是为了人类而非计算机的可读性。我在语法上会比较随意，你也可以如此。我主要使用制表符而非括号 {} 来组织条款，这在我看来——也希望在你看来——更加自然和易读，但可能会让计算机感到困惑。请随意发展你自己的风格。

合同顶部三行的形式为 **name(parameters)** =，告诉我们正在定义一个_命名条款_。命名条款可以定义整个合同，也可以只是更大合同中的一个条款。我们可以传入其他命名条款的名称、事件列表以及该命名条款所需的其他信息——这些就是参数。

**when withinPeriod(p)** 意为"在周期 p 内生成的第一个日历或时钟事件"。起草者可以在别处设置这种规律的"时钟滴答"事件发生的频率。周期开始后的第一次时钟滴答——在本例中即七月份的第一个计划交割日——触发花括号 {} 中的条款。更复杂的计划是可能的，例如通过在七月份的不同日期向不同持有方交割来最小化对手方的交割成本。幸运的是，我们可以将这些计划细节隐藏在日历事件和计划迭代器机制中，使起草者无需担心市场何时开市、哪些天是周末或假日或闰日等问题。对手方的交割计划可以协商，也可以将这一细节留待对手方决定。在上面的合同中，交割的约束条件是必须在七月之内，且仅在与持有方付款同步的情况下进行。<!-- 这个在 <strong>when</strong> 之后缩进的条款被称为"合同条款"，因为它为每一方都包含了权利条款（即存在对价，每一方在该合同条款下至少有一项权利和至少一项义务）。因为合同，尤其是用我们语言编写的那种合同，通常可以通过组合更小的合同来构成，所以有时这样的条款甚至直接被称为"合同"。 -->

最内层的条款表示用 **rightA** 交换 **rightB**。该条款分为持有方权利和对手方权利。权利条款 **Holder rightA** 意为"持有方有权要求履行 rightA"，在本例中即交付猪肉（pork bellies）。条款 **Counterparty rightB** 意为"对手方有权要求履行 rightB"，此处即支付 1,500 美元。**with** 表示同时交换——两笔交易应当同时进行，也许通过托管代理来强制执行交割和付款条款。

**then** 语句允许我们逐步进行。如果我们有两个这样写的条款：

<pre>
to Holder right1
also to Holder right2
</pre>

它们可以按任何顺序履行——可能 right2 先履行，也可能 right1 先履行，或者（最可能的）两者同时进行。在同一层级嵌套的多个 **when** 语句之间隐含着 **also**，因为它们可以按任意顺序被触发。

<!-- 除非起草者需要将履行约束为某个日历计划，或者必须确保一个条款在另一个之前履行，否则最好让它们可以按任意顺序履行，如上所示。这使得合同的分析和履行更加简洁和灵活。 -->

想象一个小精灵在条款嵌套中跳舞，跟随条款的履行和事件的捕获。（程序员把这个跳舞的小精灵叫做"指令指针"——一个无聊的名字）。如果有 **also** 或多个 when 语句在另一个仍活跃时被触发，可能会有多个小精灵同时跳舞，但通常我们只需要一次考虑一个。

如果我们希望添加 right2 必须在 right1 履行之后才能履行的约束，我们使用 **then**：

<pre>
to Holder right1
then to Holder right2
</pre>

传统程序员会不由自主地在合同中塞满 **then** 语句，模仿过程式编程的风格。切勿如此！有合同起草经验的人知道，在某些情况下这种约束显然是合适的，而在另一些情况下显然不合适，在添加约束时保持明确性是很重要的。因此，以下写法是非法的，会被计算机和任何有头脑的起草者（即使不使用计算机）所拒绝：

<pre>
# 不要这样做！
    to Holder right1
    to Holder right2
</pre>

最后，我们已经见过这类条款：

<pre>
to Holder right1
with to Holder right2
</pre>

这表示 right1 和 right2 应当同时履行——要么两者都履行，要么都不履行。用计算机科学家的术语来说，这应当是一个"原子"交易。

命名条款末尾的 **then terminate** 确保合同履行完毕后，所有权利和义务都被终止。它只在期货合同的一行主体执行完毕后才会被触发，以及任何未完成的从属条款及其权利和义务。该条款在每个命名条款末尾是隐含的，但这一次我们将其显式写出。当起草者希望确保命名条款内嵌套的非命名条款正确终止时，通常会显式使用该条款。

现在让我们逐步走完期货合同，随着条款被激活然后被履行。正常字体表示条款处于非活跃状态。**粗体**字体表示活跃状态——条款正在被履行。

当各方承诺合同后，其首批条款（缩进最高层级的条款）被唤醒。在我们的期货合同中只有一个这样的条款，因此 **when**（但不包括其下嵌套的条款）进入活跃状态，等待 **withinPeriod()** 事件：

<pre>
<strong>when withinPeriod(p)</strong>
    to Holder rightA   with   to Counterparty rightB
then terminate
</pre>

当日历推进到八月最后一个交易日的交易结束时，**withinPeriod(p)** 事件发生，**when** 激活下一层嵌套的条款。when 本身变为非活跃——它不再等待事件：

<pre>
when withinPeriod(p)
    <strong>to Holder rightA   with   to Counterparty rightB</strong>
then terminate
</pre>

**then** 使得 **terminate** 等待 **when** 及其子条款履行完毕。一旦权利交换完成，已履行的条款转为非活跃状态，terminate 被触发：

<pre>
when withinPeriod(p)
    to Holder rightA   with   to Counterparty rightB
then <strong>terminate</strong>
</pre>

在我们的语言中很容易进行泛化。通用的期货合同如下所示：

<pre>
future(rightA, rightB, p) =
    when withinPeriod(p)
        to Holder rightA   with   to Counterparty rightB
    then terminate
</pre>

不用猪肉（pork bellies），我们可以将任何其他 **rightA** 与 **rightB** 交换，后者除了货币之外还可以是各种各样的东西。起草者可以规定非常通用的模板，之后再为具体合同填充细节。

## 示例——期权合同

我们现在展示另一种金融合同。在这个_美式期权_（American option）中，持有方有权在八月最后一个交易日或之前，以每股 20 美元（期权行权价）购买一手（100 股）XYZ 公司的股票。这类合同被称为"衍生品"，因为看涨期权源于基础权利（此处为股票）。

<pre>
callOptionAmerican (rightA="1 round lot XYZ Corp.",
                    rightB="$2,000/lot",
                    time="end of trading on last trading day of August") =
    when beforeTime(time)
        when choiceOf(Holder)
            to Holder rightA with to Counterparty rightB
    when afterTime(time)
        terminate
</pre>

再次想象那个跳舞的小精灵。（在用我们的语言阅读或写作时，跟随这些跳舞的小精灵很重要。如果小精灵的比喻令人困扰，可以想象其他动态角色或过程作为替代隐喻）。小精灵四处走动时唤醒条款，使其活跃，进而被履行。有时可能有多于一个小精灵同时在代码中跳舞——例如当一个 when 语句仍活跃时另一个也被触发——但通常我们只需要一次考虑一个。

合同开始时有跳舞小精灵在两个顶层条款中：

<pre>
<strong>when beforeTime(time)</strong>
    when choiceOf(Holder)
        to Holder rightA with to Counterparty rightB
<strong>when afterTime(time)</strong>
    terminate
</pre>

这些 when 语句现在正在等待各自的事件。由于事件是互斥的（首先是 **beforeTime(time)**，然后是 **afterTime(time)**，但绝不会同时），我们只需要考虑先执行的那个。注意，除非用 **then** 分隔，否则同一层级条款的顺序并不重要。以下代码与我们示例中的代码完全相同：

<pre>
when afterTime(time)
    terminate
when beforeTime(time)
    when choiceOf(Holder)
        to Holder rightA with to Counterparty rightB
</pre>

**beforeTime(time)** 立即被激活，因此我们从其紧邻下方嵌套的条款开始也处于活跃状态——在本例中即 when choiceOf(Holder)。

<pre>
when beforeTime(time)
    <strong>when choiceOf(Holder)</strong>
        to Holder rightA with to Counterparty rightB
<strong>when afterTime(time)</strong>
    terminate
</pre>

该条款中同一层级的一系列 when 都开始等待，等待它们中任何一个被触发。当一个 when 接收到从其下方或直接抛给它的事件时，其下方的嵌套条款变为活跃。然后其下方的条款变为活跃并被履行，直至下一层的 when。该层的 when 从非活跃转为活跃，开始等待各自事件的发生。

**when beforeTime(time)** 在期权首次被激活时变为活跃，并保持活跃直到 **time**（指定时间）。处于活跃状态时，它唤醒了 when choiceOf(Holder)。这个 when 规定了赋予合同期权性质的事件——持有方选择是否行权。如果持有方选择行权，持有方将从对手方（看涨期权的卖方）获得股票（rightA），同时支付货币（rightB）。然后跳舞小精灵从 when 条款移动到交换条款：

<pre>
when beforeTime(time)
    when choiceOf(Holder)
        <strong>to Holder rightA with to Counterparty rightB</strong>
<strong>when afterTime(time)</strong>
    terminate
</pre>

当代码变得复杂时，我们可能不容易判断最后一行隐含的 **then terminate** 是否会被执行。因此，在期权到期时显式地 **terminate**（终止）合同是个好主意。

我们将看到一些示例，其中不止一种事件，甚至事件序列（如付款日期的日历计划）触发合同条款的执行。

<!--
<p>以下是同一合同的更一般形式。</p>

<pre>
callOptionAmerican(rightA, rightB, time) =
    when beforeTime(time)
        when choiceOf(Holder)
            to Holder rightA   with   to Counterparty rightB
    when afterTime(time)
        terminate
</pre>
-->

请记住，该语言默认不是逐步执行的——相反，读者（人类或计算机）应当跟随嵌套合同定义的展开，并查看 **when** 语句中的事件，看它们触发了什么。显式的逐步日历计划可以使用 **for**、**then** 和日历事件来构建。

这里有一个使用这种显式步骤的示例。_债券_（bond）按照固定计划进行一系列固定付款，称为_票息_（coupons），然后进行最终付款，即_本金_（principal）。我们这里不展示计划本身的细节，但一般来说，计划可以定义为任何类型的时间序列——我们可以在每月的最后一天支付票息，在每个日本假日支付，按照复活节的计算来安排（别笑——中世纪集市的安排者就面临过这个问题），或者随我们选择。实现时，日历事件和计划迭代器将包含一个非常完善的实现，以解决交易处理系统中经常出现的许多棘手的日历问题。

**for** 逐一迭代计划中的事件，嵌套的 **when** 处理每个事件。当它出现在 **for** 条款之后时，**then** 将迭代器再推进一步。

<pre>
bond(coupon, principal, schedule) =
    for schedule
        when withinPeriod(schedule.next)
            to Holder coupon
    then
    when withinPeriod(schedule.next)
        to Holder principal
</pre>

接下来我们草拟一份信贷购车合同。作为草稿而非完整设计，这是一个过度简化的"玩具"示例——我们省略了各种费用、相关保险合同的引用、担保、免责等。为简便起见，我们让银行（此处即持有方）与汽车经销商为同一方。最后，我们这里也不展示担保贷款的汽车留置权。我们将在下面的示例中尝试一种类似留置权的机制。

<pre>
loanPayments(payment, schedule) =
    for schedule
        when withinPeriod(schedule.next)
            payment
carPurchase(car, downPayment, monthlyPayment, schedule)  =
    to Counterparty getTitle(car)   with   to Holder downPayment
    then to Holder loanPayment(monthlyPayment, schedule)
</pre>

如果我们希望允许提前还款，我们的计划应包含单个时间点而非带有开始时间和结束时间的周期。我们的贷款付款将如下所示：

<pre>
loanPayments(payment, schedule) =
    for schedule
           when beforeTime(schedule.next)
                 payment
</pre>

我们可以根据合同中更可能看到的其他信息来计算上述付款金额，但这只涉及普通编程。我们可以使用一个函数来执行计算：

<pre>
loanPayments(principal, interest, schedule) =
        constant payment.amount = computeInterest(principal, schedule, interest)
                # 此处为普通计算函数
        then for schedule
                when beforeTime(schedule.next)
                        payment
</pre>

"=" 永久地（因此用 **constant**）将数值 **payment.amount** 设为函数 **computeInterest** 返回的值。我们还可以做更复杂的操作——扣除提前还款的利息，或反过来增加提前还款罚金，或各种其他条件。

<!--
<p>我们也可以将 <strong>payment</strong> 设为一个变量，即其值可以改变的对象，并将函数用作<em>不变条件</em>，使用 <strong>==</strong> 和 <strong>if/else</strong> 结构来确保付款金额正确：</p>

<pre>
variable payment.amount = computeInterest(principal, schedule, interest)
    # 此处为普通计算函数
loanPayments(principal, schedule, interest) =
    for schedule
        when beforeTime(schedule.next)
            if (payment.amount == computeInterest(principal, schedule, interest))
            payment
</pre>
-->

我们还可以这样安排购车合同的结构：新车主在收到首付款之后才能获得产权：

<pre>
carPurchase(car, downPayment, monthlyPayment, schedule)  =
    to Holder downPayment
    then to Counterparty getTitle(car)
    then to Holder loanPayments(monthlyPayment, schedule)
</pre>

## 损害赔偿条款

让我们用我们的语言来分析经济制度史上的一些重要进步。热那亚是一座独立的、在当时的标准下相当自由主义的城市，深度参与地中海海上贸易。在其十二至十五世纪的鼎盛时期，热那亚发展了许多商业创新，包括我们在此考察的两种："干汇"贷款和共担风险保险。

以下是公元 1271 年 6 月 23 日在热那亚签订的一份合同中的一个条款。一位父亲正在为儿子所承担的债务提供连带担保：

> 因此，我们承诺，两人均对全部金额承担连带责任，向您或您指定的信使支付 53 枚金海佩彭（hyperpers），成色良好、重量准确，在罗马尼亚[拜占庭]于九月朔日（Kalends of September）之前交付。然而，如果我们未能在上述期限内向您交付这些[海佩彭]，无论何时您提出要求，我们承诺就所述每一枚海佩彭在热那亚支付 11 先令热那亚币。否则，我们承诺，两人均对全部金额承担连带责任，向您支付上述金额双倍的罚金，上述[条件]维持不变。并且，我们以我们所有现有及未来的财产作为上述[承诺]的担保物……<sup><a href="#fn5" id="ref5-1">[5]</a></sup>

这是一份非常巧妙的合同，学者们称之为"干汇"（dry exchange）。天主教会禁止收取利息，因此直接收取利息的贷款合同将无法执行，并使起草者面临教会的进一步制裁。但远距离兑换（在稍后日期的遥远市场进行交易——通常需要海上航行，因此称为"湿汇"）和货币兑换都是完全合法、可执行且普遍的。上述合同以巧妙的方式将这两者与损害赔偿条款结合在一起。上述各方都没有前往拜占庭、甚至走出热那亚履行此合同的意图。其逻辑可以分析如下（持有方为债权人）。我们添加了 "in (地理位置)"、**security**（担保）和 **foreclose**（清算/行使担保权）来突出此合同的重要方面。后者指通过拍卖足够的财产来满足罚金（如果财产不足以满足债权人的要求，则存在破产程序来在债权人之间公平分配剩余担保物，但此处未展示）：

<pre>
    counterpartySecurity =  pledge(allGoods(Counterparty))
    also cosignerSecurity = pledge(allGoods(co-signer))
    then
payment1() =
    when beforeTime("Kalends of September 1275")
        to Holder in Byzantium "53 hyperpers"
        terminate
payment2() =
    when breachedPerformance(payment1)
        to Holder in Genoa "53*11 = 583 shillings"
        terminate
payment3() =


    when breachedPerformance(payment2)
        to Holder in Genoa "2*583 shillings"
        terminate
payment3() =
    when breachedPerformance(payment3)
        when choiceOf(Holder)
            to Holder in Genoa foreclose(counterpartySecurity, penalty)
            terminate
        when choiceOf(Holder)
            to Holder in Genoa foreclose(cosignerSecurity, penalty)
            terminate
        continue
</pre>

双方都没有预期 payment1 会被履行。hyperpers 和 shillings 的数量可能准确地反映了当时两种硬币之间的汇率——没必要做得太明显。但如果仅仅为了做这笔兑换就前往拜占庭，成本将远远太高。因此，实际上双方都预期 payment2——一个虚假的损害赔偿条款——通常会被履行。如果没有被履行，那么我们就有两个真正的损害赔偿条款——尚算合理的"双倍罚金"和致命的"我们所有的财产，现有的和未来的"。对后一个条款的另一种解释是，它只涉及价值不超过双倍罚金金额的货物，但可以从债务人和联署人的所有货物中选择。当然，现代法院会认为我在我们的语言中对这个条款所做的解释是不可接受的，因此无法执行。

在我们引用的部分之上，合同并没有说明原始贷款金额是多少——债务人只是承认他们从债权人那里收到了"一定数量的热那亚第纳尔"，然后承诺如上所述以其他货币作为回报。因此，教会调查员无法仅通过阅读合同来证明收取了任何利息。至于仲裁纠纷的热那亚法官，他很可能会支持有息贷款，乐意睁一只眼闭一只眼，按字面意思来解释合同。

现代衍生品交易员一直在这样做，创造合成资产或组合，以模拟其他合约的金融功能，同时规避其法律限制。我们的语言非常适合起草和分析此类合约。

## 保险

最早的风险共担保险合约在结构上与贷款类似，并且依据相同的法律原则执行。确实，让我们从一个简单的无息购买货物贷款开始，持有人（即债权人）可以在 **t1** 到 **t2** 之间的任何时间要求偿还贷款：

<pre>
loan(goods, principal, penalty, t1, t2) =
    counterpartySecurity =  pledge(allGoods(Counterparty))
    with to Counterparty getTitle(goods)
    loanPayment(principal, t1, t2)
    with when breachedPerformance(loanPayment)
        to Holder foreclose(counterpartySecurity, penalty)
loanPayment(principal, t1, t2) =
    when withinPeriod(t1,t2)
        when choiceOf(Holder)
            to Holder principal
</pre>

让我们在语言中添加一个 **safeArrival(goods)** 事件——即携带 **goods** 的船只安全抵达港口并且 **goods** 被卸载和清点的事件。现在，只需在这个贷款合约中增加一行，即触发 **safeArrival()**，并稍微修改其他几行，我们就可以将其转变为一份海上保险合约。被保险人是持有人，保险人是对方。在这个简单版本中，如果 **safeArrival** 没有发生，则支付固定金额（**principal**）作为损害赔偿：

<pre>
insureGoods(goodsPremium, principal, penalty, t1, t2, goodsInsured) =
    counterpartySecurity =  pledge(allGoods(Counterparty))
    with to Counterparty getTitle(goodsPremium)
    insurancePayment(goodsInsured, principal, t1, t2)
    with when breachedPerformance(insurancePayment)
        to Holder foreclose(counterpartySecurity, penalty)
insurancePayment(goodsInsured, principal, t1, t2) =
    when safeArrival(goodsInsured) terminate
    when withinPeriod(t1,t2)
        when choiceOf(Holder)
            to Holder principal
</pre>

这是一个此类早期保险合约的例子——同样来自热那亚，现代商业机构的诞生地。我们第一次看到了一个保险人池——不是一个而是多个对方，每个人都以其全部财产作为担保。他们通常是拥有大片土地的封建领主，因此可以为这些保险合约提供巨额价值支持。这就是劳合社 Names 至今仍在运作的方式。由于几个 Names 共同支持一份合约（例如，像这里一样承保一批货物的运输），每个 Name 在那次航行中只将其资产的一小部分置于风险之中。像劳合社这样的保险交易所允许货物所有者、托运人和 Names 的代理人聚集在一起，大规模生产此类合约。

> ……Geri，已故 Florence 的 Ser Lapo 之子，Simone Guascone，[还列出了9位 Names]，他们中的每一位都[承担]如下所写的金额，已经向我， undersigned 公证人，作为[担任]公职的公务人员，承认并确实声明，以 Federico Vivaldi，热那亚公民的名义并代替其作出 stipulation 并收到：他们已经从他说 Frederico 那里购买、获得并收到了一定数量的货物……就这些货物及其价格而言，他们中的每一个人都承诺向 said Frederico 或其授权信使支付：[来自] said Geri，150 枚金币，said Simone，50 枚金币，[其他 Names 各 100 枚金币]，在即日起的五个月内。否则，他们承诺向 said Frederico 支付双倍罚金及全部违约金额，连同所有因违约或未遵守上述约定而产生或可能产生的损失、未实现利润以及在法庭内外的费用——上述条件仍然有效，并以他们及其任何一方的现有和未来货物作为抵押和质押。</p>
>
> [上述内容有效，]但有一个例外和特别保留：如果由 Frederico Imperiale 或由其代表为 said Frederico Vivaldi 的利益在 Aigues-Mortes 装载或将要装载的一定数量的货物、财产和商品——将由某艘船运往 Ayassoluk 和 Rhodes 或其中之一……并且该船已从 Aigues-Mortes 出发或将要从 Aigues-Mortes 出发驶向上述地区——安全地被运抵并卸载在 said Ayassoluk 和 Rhodes 或其中之一，那么在这种情况下，本文书被撤销、无效、无价值，且按比例。并需理解，此类风险自 said 船舶从 Aigues-Mortes 启航出发时开始，并在船长航行、停泊[于港口]、行驶、装卸过程中，从 said Aigues-Mortes 到 said Ayassoluk 和 Rhodes，以他希望的任何方式和途径，持续存在，直到 said 数量的货物、财产和商品安全地被运抵并卸载在 Ayassoluk 和 Rhodes 或其中之一，且按比例。如果 said Frederico 在要求或获得上述款项的时限届满后一年内不要求支付上述金额，本文书也应被撤销。……以上述方式完成，9月15日，约非a时。[公元1393年]<sup><a href="#fn5" id="ref5-2">[5]</a></sup>

忽略按比例条款、阻止或不阻止 safeArrival() 事件生成的风险具体定义，并忽略多个 Names（即将其视为一个对方），该合约可以用我们上面起草的保险合约来建模，参数填写如下，Frederico Vivaldi 为被保险人（持有人）：

<pre>
insureGoods(goodsPremium="a certain amount of goods",
      principal="100 fl + 50 fl + 7*100 fl",
      penalty=2*principal,
      t1="5 months from now",
      t2="1 year after [legal] time limit has expired"
      goodsInsured="that amount of goods, property,
          and merchandise which was loaded")
</pre>

这份合约在法律上仍然是一份贷款。这对我们现在所说的保险费至少产生了两个有趣的影响。首先，保险费被保险人视为赊购的货物。其次，即使在这个较晚的时期，合约中对这些货物的实际价值仍然含糊其辞。将这些货物的价值留作未说明，使得这种"贷款"中的高利贷行为难以被证明。

<!--
<p>Let's call <b>damages</b> the amount of damages to said goods, and maxDamages the maximium amount payable. Then we can draft the following contract:</p>
-->

## 规则：逻辑组合与叠加事件

**when** 子句中的事件可以用逻辑条件进行组合，这些条件必须评估为真才能触发子条款。这可用于建模合约中的条件条款，更广泛地说，可以建模法律的程序性和实体性规则。在构建规则时，我们将基本事件称为_元素_。例如，以下大致依照《合同法重述（第二版）》（Restatement (Second) of Contracts），是禁止反言（promissory estoppel）的法律规则：

<pre>
when
    "there is a promise"
    P "has relied on that promise"
    D "should reasonably expect P would rely on that promise"  and
    "injustice can only be remedied by enforcing the promise"
then
    "the promise will be enforced"
else
    "the promise will not be enforced"
</pre>

为了可读性，我们在这里包含了一个多余的"then"。程序员应注意，我们在这里遵循的是律师使用的简写——我们将逻辑短语 **(A and B and C and D)** 写作 **(A B C and D)**。在混合使用 and 和 or 时，写出完整的逻辑，并在适当的地方使用括号。

规则元素，例如"there is a promise"，存在于一种_叠加_状态中。默认情况下，逻辑对事实一无所知，每个元素都_真正处于争议中_。因此，"there is a promise"和上述规则的其他元素同时既为真又为假。（熟悉量子力学或法律推理的人知道我在说什么）。在初始状态下，每个元素都真正处于争议中，非平凡的规则将总是同时评估为真和假。因此，"promise will be enforced"和"promise will not be enforced"两个子条款都将被触发。当这些子条款互斥时（如其标签所示），由子条款的实现者来正确处理这种情况。在这种情况下，这种子条款在所有关键元素被裁定之前应仅被视为_建议性的_——即不再真正处于争议中，此时该规则可用于做出_决定_，即触发一个采取一致行动的单一子条款。本文档的未来版本将描述如何将真正处于争议中的元素解决为不真正处于争议中的元素，从而就单一结果或行动方案做出决定。它还将描述如何处理建议性子条款；例如，分析哪些元素最有利于某一结果或另一结果。最后，另一个未来功能将包括覆盖一系列数值的元素，而不仅仅是真或假，以及一个形式化的"平衡测试"，根据底层数值估计来确定结果。

## 产权——地产与未来权益

我们的规则语言非常适合在不动产契据中指定地产和未来权益。在适当的情况下，也可以将这些模式应用于其他类型的财产。以下是一些例子：

<!--  TODO
  * assignment of future interests
    + define them separately?
    + granting vs. devising
  * RAP -- determining vesting (i.e. elimination of all contingencies)
  * I need to rewrite every contract in this article from the _obligee_ or rightholder's side, since they will normally be the ones with a bearer cert demanding payment.  Of course, obligors should keep records as per here in order to know what they are or may be obligated to perform in the future.
  * another section on writing WILLS
  * servitudes -- are these specific to the kind of property?
  * co-tenancies
-->

定期租赁：（注意——Grantor = 自身）。这是一种古老的普通法租赁，实际上在一定期限内转让产权。

<pre>
leaseWithTerm(Property, Lessee, Start, Term) =
    when afterTime(Start) to Lessee Property
    then when afterTime(Start+Term) to Grantor Property
</pre>

终身地产附归复权：（注意——Grantor = 自身）

<pre>
lifeEstateReverter(Property, Grantee) =
    to Grantee Property
    then when afterDeath(Grantee)
        to Grantor Property
</pre>

可转让的租赁归复权。要使未来权益可转让，需单独定义。注意将 Grantor 明确化。（照例我们从义务人的角度来看）：

<pre>
Reverter (Grantor, Grantee, Property) =
    when afterDeath(Grantee)
        to Grantor Property
</pre>

现在我们可以用单独定义的未来权益来重新定义终身地产附归复权：

<pre>
lifeEstateReverter(Property, Grantee, Reverter) =
    to Grantee Property
    then Reverter(Grantor, Grantee, Property)
</pre>

终身地产附剩余权。唯一的区别是，财产被剩余给第三方而不是归复给授予人。

<pre>
lifeEstateRemainder(Property, Grantee, Remainderman) =
    to Grantee Property
    then when afterDeath(Grantee) to Remainderman Property
</pre>

可决定完全所有权。**Condition** 可以是任何可验证的事件或财产及其产权的状态变化。例如，一个常见的房地产条件是"用于商业目的"——即限制该财产不得用于商业目的，否则受让人将因丧失产权而受到惩罚，产权归复给授予人。

<pre>
feeSimpleDeterminable(Property, Grantee, Condition) =
    to Grantee Property
    then when Condtion(Property) to Grantor Property
</pre>

附执行性限制的完全所有权。与可决定完全所有权相同，只是财产被剩余给第三方而不是归复给授予人。

<pre>
feeSimpleSubjectToExecutoryLimitation(Property, Grantee, Condition, Remainderman) =
    to Grantee Property
    then when Condtion(Property) to Remainderman Property
</pre>

附后续条件的完全所有权。此处，条件发生后产权并不自动转移。相反，授予人必须做出某些积极的、可验证的行为（在此例中为"进入"该财产），才能收回产权。

<pre>
feeSimpleSubjectToConditionSubsequent(Property, Grantee, Condition, Enters) =
    to Grantee Property
    then when Condtion(Property)
        when Enters(Grantor, Property) to Grantor Property
</pre>

## 更多进阶示例

在本节中，我们将研究构建多方协议的方法，区分环境事件与抛出事件，并审视我们语言的其他一些更高级的功能或使用方式。

我们将通过"开立"（writing）期权来完成我们在上面起草的美式期权的完整生命周期——从基础证券 **rightA** 创建它并以 **rightX** 的价格出售。在这里，持有人（与上面的持有人是同一方，即购买开立期权的人）首先通过 Broker 验证对方确实持有基础证券（**rightA**）。Broker 受持有人信任，确保对方在期权被行使或到期之前继续持有该证券。Broker 与持有人之间的合约是 **escrowRight()**。

由于对方（期权开立方）没有为 **rightB** 上的期权预先支付任何费用，因此该权利不需要托管。

<pre>
escrowRight(right, escrow, newHolder, currentHolder,
            newHolderReleaseEvents, currentHolderReleaseEvents) =
    to escrow right
    then
    when (holderReleaseEvents)
        to rightHolder right then terminate
    when (counterpartyReleaseEvents)
        to currentHolder right then terminate


writeCallOptionAmerican(rightA, rightB, rightX, time) =
    escrowRight(rightA, Holder, Counterparty,
            (optionExercised), (optionExpired))
    then
            to Counterparty callOptionAmercian(rightA, rightB, time)
            with to Holder rightX
</pre>

我们现在重新起草期权本身，以利用托管。**rightA** 在行使时通过 **throw** 转移给持有人，或者在期权到期时返还给对方。

<pre>
callOptionAmerican(escrowRight, rightB, time) =
    when beforeTime(time)
        when choiceOf(Holder)
            { throw optionExercised at escrowRight }
            with to Counterparty rightB
            then terminate
    when afterTime(time)
        throw optionExpired at escrowRight
        then terminate
</pre>

我们可以将事件分为两类。第一类是_环境_事件（ambient events），它们在环境中自发产生，或由外部的实体（如用户或调度程序）生成。第二类是_抛出_事件（thrown events），是我们如上所述显式抛出的事件。

在本手册中，我用权利来表达合约条款。合约语言通常用义务来表达，这可以作为镜像——**to Holder right** 等同于 **from Counterparty obligation**，反之亦然。使用 **from** 来区分义务。

## 连接机器

进一步展示我们语言的灵活性，我们可以添加传感器和执行器，为合约添加"智能"，用技术约束来增强法律执行。

首先，我们为类似合约的自动售货机行为起草一个规范：

<pre>
sellCandy(candyPrice = $0.90) =
    variable moneyAmount = $0.00
    then
        # coins also fall into a temporary till tempTill
    when (nickel)
        add(moneyAmount, $0.05)
    when (dime)
        add(moneyAmount, $0.10)
    when (quarter)
        add(moneyAmount, $0.25)
    when (moneyReturn)
        dropCoins(tempTill, returnTill)
        with moneyAmount = $0.00
    when threshold(moneyAmount, candyPrice)
        when (nickel | dime | quarter)
            redirectNewCoinsTo(returnTill)
        also display("ready to dispense -- please select candy")
        then when (candySelection)
          dropCandy(candyRacks, candySelection)
          with dropCoins(tempTill, permTill)
          with moneyAmount = $0.00
    continue
</pre>

我们在这里引入了一个新的语言特性——状态变量。我们的状态变量 **moneyAmount** 在超过 $0.90 的糖果价格阈值时产生一个事件。注意，nickels、dimes 等是实际的物理对象，由传感器（产生"nickel"、"dime"等事件）检测并分别处理——它们不仅仅是抽象的金额。

状态变量可能带来麻烦，除非绝对必要（如这里），否则应避免使用。这个状态变量相对无害，因为投币口倾向于迫使硬币一次一个地进入，因此不会有两个子条款同时试图改变状态变量。即使如此，加法运算是数学家所说的"交换的"，意味着运算顺序无关紧要。但如果对状态变量的操作更复杂或涉及某些其他类型的操作，我们就不知道它是否是交换的了。事件发生和改变状态变量的顺序可能非常重要，我们可能会陷入大麻烦。因此，尽量避免使用状态变量。

为了简化，我们省略了找零功能——我们的机器必须挂上你有时会看到的那种标志："只收准确金额"。如果顾客投入的硬币使金额从 $.80 变成了 $1.05——太糟糕了，机器吞掉了多余的部分。但是，如果顾客投入了 $0.90（或更多），然后再投入更多硬币，机器会自动退回多余的硬币。如果顾客改变主意、决定不买糖果了，机器也会退回投币口中的所有金额。给读者的练习：请自行验证上述行为描述与代码的编写是否一致。

**RedirectNewCoinsTo(returnTill)** 使后续的硬币落入退币槽而不是落在触发上述事件的传感器上。读者必须在这里想象该机构的样貌，因为部分行为被"编码"在其机械结构中，而不是显式地体现在这条语句中。

将嵌套的合约和权利想象成一棵倒立的树——一个嵌套子句的层次结构。事件从树的"叶子"向上传播到顶部的"根"。它们被遇到的第一个针对该事件的 **when event** 捕获。在这种情况下，一旦我们进入 **when threshold()** 子句，**when (nickel | dime | quarter)** 子句就会覆盖其上方的 **when(nickel)** 等子句。

就像永续年金一样，我们的自动售货机没有预定的停止时间或条件——因此我们有一个 **continue** 语句来覆盖最后一行隐含的 **then terminate**。

遗憾的是，无论是我还是现实世界中的糖果机制造商，都没有任何代码来解决糖果卡在机器里的情况。

以上是对机器行为的转录。现在我们让它更像一份合约。在这里，我们纳入了顾客及其选择，这些在上面的代码中隐含地产生了硬币事件——这里的硬币是持有人的权利。更多地从当事人而非机器的角度思考，使我们认识到顾客在每一步都想知道他们投入了多少钱，因此有了 **to Counterparty display(moneyAmount)**。这个显示由持有人（作为供应商代理的自动售货机）作为对方（顾客）的权利来执行。为了给顾客提供更好的选择，我们在语言中添加了一个新构造：**choiceOf(agent, right)**，它允许顾客根据他们希望将哪种权利转移给对方的代理人（这里是自动售货机，即持有人）来进行多种选择。

<pre>
sellCandy(candyPrice = $0.90) =
    variable moneyAmount = $0.00
    then
        # coins also fall into a temporary till tempTill
    when choiceOf(Counterparty, nickel)
        to TempTill nickel
        then to Counterparty add(moneyAmount, $0.05)
        then to Counterparty display(moneyAmount)
    when choiceOf(Counterparty, dime)
        to TempTill dime
        then to Counterparty add(moneyAmount, $0.10)
        then to Counterparty display(moneyAmount)
    when choiceOf(Counterparty, quarter)
        to TempTill quarter
        then to Counterparty add(moneyAmount, $0.25)
        then to Counterparty display(moneyAmount)
    when choiceOf(Counterparty, moneyReturn)
        to Counterparty dropCoins(tempTill, returnTill)
        with moneyAmount = $0.00
        then to Counterparty display(moneyAmount)
    when threshold(moneyAmount, candyPrice)
        to Holder (nickel | dime | quarter)
            to CounterParty redirectNewCoinsTo(returnTill)
        also display("ready to dispense -- please select candy")
        then when (candySelection)
            to Counterparty dropCandy(candyRacks, candySelection)
            with to PermanentTill dropCoins(TempTill)
            with moneyAmount = $0.00
    continue
</pre>

我们是如何用一种为起草合约而设计的语言来指定自动售货机行为的呢？nickels、dimes、quarters 以及将硬币从一个钱箱移到另一个钱箱这样的操作，能否被视为权利和义务？我认为可以。当然，它们不是_法律上的_权利和义务。供应商与糖果机顾客之间没有明确的合约，即使有，也可能会免除违反我们代码中大多数条款的责任。这段代码描述的是自动售货机的逻辑和典型行为。它也将大多数顾客在使用自动售货机时的隐性理解具体化了。因此，它建模了由机器介导的顾客与供应商之间一种类似合约的"意思一致"（meeting of the minds）。

以下是对假想的["自动回购汽车"](/the-idea-of-smart-contracts/)的一个正式描述尝试。汽车由 [proplet](/proplets-devices-for-controlling-property/) 控制，proplet 通过查阅[产权登记](/secure-property-titles/)来确定所有权权限。proplet 只允许有产权的所有者进入和驾驶汽车。"Holder"是发放贷款的银行，"Counterparty"是新的所有者。照例，我们忽略了汽车经销商；银行最初拥有该汽车。这个例子突出了该语言非常简洁地描述合约的能力，但也突出了它无法描述实际执行合约的安全机制。当然，这里缺少很多东西，包括上述汽车贷款合约中缺失的条目。从智能合约的角度来看，最大的缺失是最后一个 **when** 中的"Holder getTitle(car)"缺乏任何动机，也没有在这里指定任何执行方式。当然，所有权与进入、启动和驾驶汽车的权限之间的所有联系在这里都是隐含的——proplet 在这方面的实际行为需要考虑安全性、紧急使用等因素。

做了这么多准备工作，我们实际上只在上面的汽车购买合约中添加了一个条款。该条款规定了产权的丧失，其结构与我们见过的损害赔偿条款非常相似。如果检测到（由持有人、第三方审计员或 proplet 本身）对方未能按照 **loan** 指定的计划付款，则会产生一个 **breachedPerformance()** 事件。

<pre>
loan(payment, schedule) =
    for schedule
        when withinPeriod(schedule.next)
            payment
carPurchase(car, downPayment, monthlyPayment, schedule)  =
    to Counterparty getTitle(car)  with  to Holder downPayment
    then
    to Holder loan(monthlyPayment, schedule)
    when breachedPerformance(loan)
        to Holder getTitle(car)
</pre>


<!--
<p>接下来，我们用这门语言来勾勒一个想法——我不敢说它与合约有多大的相似之处。但它确实与合约存在某种关联，尤其是与产权转让以及业主与安保服务提供商之间的关系有关。此外，安保服务和技术对于强制执行合约履行以及保护这种履行免受第三方干扰都至关重要。</p>

<p>这个想法是关于一栋建筑的安保系统。我们假设的设备从一个公开的产权数据库（参见文章 securetitle.html）获取建筑物的所有者。如果缺乏这样的服务，它也可以让新所有者直接重新编程设置所有者或安保服务（但我们不展示该设计）。我们的系统查询业主雇佣了哪家安保服务，并通知他们相关安全事件。如果物业被出售，软件会通过 <strong>getTitle()</strong> 自动识别出新业主是谁，以及哪家安保服务是其处理安全事件的授权代理。<strong>passEvent()</strong> 则将当前事件接收到的信息原样传递下去。</p>

<pre>
buildingSecurity =
    when(glassBreak) {
        aimCamera(glassBreak.location)
        with passEvent(securityService(getTitle(property).Owner))
    }
    when(laserPerimeterBreach) {
        aimCamera(lasterPerimeterBreach.location)
        with passEvent(securityService(getTitle(property).Owner))
    }
</pre>

<p>我们可以通过让产权转移和安保服务变更生成事件，然后将 <strong>securityService</strong> 存储为状态变量，来节省通知安保服务时的宝贵延迟时间。这样，安保系统在发生闯入时就无需再花时间去查找业主和对应的安保服务了。</p>

<pre>
buildingSecurity =
    securityService = securityService(getTitle(property).Owner))
    then
    when(glassBreak) {
        aimCamera(glassBreak.location)
        with passEvent(securityService)
    }
    when(laserPerimeterBreach) {
        aimCamera(lasterPerimeterBreach.location)
        with passEvent(securityService)
    }
    when(titleTransfer OR newSecurityService)
        securityService = securityService(getTitle(property).Owner))
    }
</pre>

<p>我们设计安保系统的方式，与合约起草者的工作方式大体相同。首先从最相关、最可用的标准条款开始，拟定主要条款，然后填补遗漏的细节，思考各方可能的作弊方式，并据此修订——直到我们得到一份令人满意的合约或安保系统。显然，当以这种方式使用时，我们的语言展示了其作为工具的灵活性，能够高度概括各种关系——无论这些关系是由法律合约、机器还是两者共同调控和约束的——但我们远未真正实现一个实际的安保系统。我们的语言可以在通过智能合约协调和约束构成安保系统的人员、组织、设备和软件方面发挥高层作用。安保系统本身也可用于帮助执行和保护智能合约。</p>
-->

## 技术说明 &ndash; 计算机可读语法

以下是该语言"巴科斯范式"（BNF）语法的正式规范。该规范面向计划中的计算机可读版本语言，存在一些细微差异，例如使用花括号 {} 代替制表符来表示嵌套。BNF 用于定义语言学家所说的"上下文无关文法"。它也用于——如本文所示——定义计算机可以解释和执行的语言的语法。我还加入了一些关于单词和结构含义的进一步讨论，尤其是计算机可能如何解释它们。如你所见，这是一门不断演进的语言，是一项正在进行中的工作，还有许多未解决的问题。欢迎您提出关于更改或添加更多类型合约条款到我们语言中的建议。

<pre>
agent = Holder | Counterparty
    ## 使合约在双方看起来不同

period = (startTime,finishTime)
# period 是必须履行义务的时间窗口，
# 例如欧式期权必须在到期日的
# 营业时间内行权。

[for periodIterator "{" ...periodIterator.next... "}"] [then ... periodIterator.next...]*
# 权利按时间顺序执行。
# 时间段的序列用作 withinPeriod(p) 事件序列的输入。
# 这是否可以更通用化，成为事件的迭代器？但时间段有
# 自然顺序，而其他类型的事件可以以任意顺序发生。
# 每个 periodIterator.next 生成一个事件，由
# 下一个时间事件捕获（如果迭代器生成的是
# 时间段，则为 withinPeriod()；如果生成的是时间点，
# 则为 aftertime() 或 beforeTime()）
# 从 for 向*下*。隐含的 "throw" 发生在 periodIterator.next 处
# 所以我们仍然可以——勉强地——将其视为从
# "throw" 向*上*传播。
# （这与正常的事件语义不同，正常情况下 throw
# 向解析树*上*传播）——我应该把它改成*向上*
# 并重写上面的调度迭代器代码吗？但把它放在循环*外部*
# 会让我和可能的计算机都感到困惑。

event = choiceOf(agent) | withinPeriod(period) |
    performed(right)  | breachedPerformance(right) |
    threshold(amount,threshold) | afterTime(time) | beforeTime(time)

right = throw event at [ contract | right] | passEvent([right | contract])
# 生成一个事件，由指定的合约或权利捕获。
# 如果未指定合约或权利，则触发第一个父级 when(event)。

# 直接使用 when withinPeriod(whenWritten,time)
# right = doBefore time { right }

# 语义等价：
# Holder right = O Counterparty obligation

right = getTitle(property)
# 将产权从义务人转让给权利人
# 参见 /secure-property-titles/

right = null

right = [ when event "{" right "}" ]*
    ## 设想一个"指令指针"，它
    ## 跟随嵌套结构和事件的发生。
    ## 如果存在 "also" 或两个事件同时
    ## 发生，可以有多个指令指针，
    ## 但通常我们只需要考虑一个。
    ## 一个条款要么是活跃的，要么是不活跃的。
    ## 当一个 when 条款处于活跃状态时，它在等待
    ## 某个事件的发生。
    ## 当指令指针到达一个嵌套的 when 时，
    ## 该 when 从不活跃变为等待状态。
    ## 同一层级的一系列 when
    ## 都在等待其中任何一个被触发。
    ## 当它接收到从下方抛出
    ## 或指向它的事件时，它变为活跃。然后
    ## 其下方的条款变为活跃，一直到
    ## 下一层的 when。那一层的
    ## when 从不活跃变为
    ## 等待。
    ## 正在考虑的替代设计：从上次中断处继续，
    ## 除非 when 中有明确的 "terminate"

right = functionPerformance
    ## 特定服务的函数式规范
    ## 放在此处
    ## 函数签名，前置条件，后置条件

obligation = throw event at [contract | right]
  # 生成一个事件，由指定的合约或权利捕获。
  # 如果未指定合约或权利，则触发第一个父级 when
  # 。

  # 语义等价：Holder obligation = Counterparty right

obligation = surrenderTitle(property)
  # 将产权从义务人转让给权利持有人
  # 参见 /secure-property-titles/

obligation = null

obligation = [ when event "{" obligation "}" ]*
    ## 正在考虑的替代设计：从上次中断处继续，
    ## 除非 when 中有明确的 "terminate"

obligation = functionPerformance
  ## 特定服务的函数式规范
  ## 放在此处
  ## 函数签名，前置条件，后置条件

contract = agent [right | obligation] ["with" agent [right | obligation]]*
    ## "with" 允许组合 Holder 和 Counterparty
    ## 相互之间的权利

contract = [ when event "{" contract "}" ]*
</pre>

## 基本函数

<pre>
doOn(right, period) =
    when withinPeriod(p) { right }
# 必须在 (period) 内履行 "right"
# = 零息债券 = 息票
#

doOnDemand(right) =
    when choiceOf(Holder) { right }
# 必须随时/按要求履行 "right"
#

doOn(contract, period) =
    when withinPeriod(p) { contract }
# 必须在 (period) 内履行 "contract"
#

doOnDemand(contract) =
    when choiceOf(Holder) { contract }
# 必须随时/按要求履行 "contract"
#
</pre>

## 更多示例

<pre>
future(rightA, rightB, p) =
    Holder doOn(rightA, p)   with   Counterparty doOn(rightB, p)
#
# [附加约束 p=p 不仅仅是代数组合]
#
callOptionAmerican(rightA, rightB, t) =
    when withinPeriod(whenWritten, t)
        when choiceOf(Holder)
          Holder rightA  with  Counterparty rightB
#
callOptionEuro(rightA, rightB, p) =
      when choiceOf(Holder)
   	      Holder doOn(rightA, p)
              with Counterparty doOn(rightB, p))
#
putOptionAmerican(rightA,rightB,t) =
    when withinPeriod(whenWritten, t)
        when choiceOf(Holder)
		        Holder rightA   with   Counterparty rightB

# 事件语义需要通过等待下一个 when 来
# 存储 choiceOf 事件。
putOptionEuro(rightA,rightB,p) =
    when choiceOf(Holder)
   	    Holder doOn(rightB, p)
            with Counterparty doOn(rightA, p))
#
note(right) = demandDeposit(right) =
    Holder doOnDemand(right)
# [尚未引入持票人与账户持有人之间的区分]
#
zeroCouponBond(right,p) = doOn(right, p)
#
callableZeroCouponBond(right,p) =
    when choiceOf(Holder) { right }
    when withinPeriod(p) { right }
#
bond(coupon, principal, schedule) =
    for schedule {
        doOn(coupon, schedule.next)
    } then
    doOn(principal, schedule.next)
bond(coupon, principal, schedule) =
    for schedule {
      doOn(coupon, schedule.next)
    } then
    doOn(principal, schedule.next)
</pre>

## 常见问题

**问：已经有用于指定金融合约的语言<sup><a href="#fn3" id="ref3">[3]</a></sup>了，这里有什么新颖之处？**

答：这是第一个将合约结构推广到任何类型的排他性权利（而不仅仅是金钱）的规范语言。这也是第一门以简洁、完整且潜在可执行的方式纳入许多合约动态特性（即它们对时间或事件的依赖性）的语言。令人惊讶的是，这通常使规范更加而非更不简洁。

**钱在哪里？**

答：这门语言面向的是由分布式软件和设备相互提供服务所构成的经济体系。货币经济可以由物物交换经济构建而成，但反过来不行。真正的在线货币远比单纯的共享变量（甚至本语言中"银行票据"的规范）要微妙得多。金钱只是可替代排他权的一种，金融合约的结构通过将金钱条款转换为任何可替代排他权而得到推广。

**问：你做了哪些假设？**

答：对于任何新方案，这都是最重要的问题！我至少识别出以下假设：

1. 我暂时搁置了履行的保护和执行问题，这些问题我在其他地方已经讨论过（http://szabo.vwh.best.com/ 上有许多专注于该主题的文章）。最终目标是创建协议来执行语言的原子操作，然后组合这些原子操作并保持可执行性。
2. 两个具体的执行假设 &ndash; 存在一个安全的、双方公认的时间源，且其他已定义事件的发生可以由双方达成一致和/或由第三方审计。
3. 我假设每个权利原子履行都具有某种原子性 &ndash; 例如，当一个事件触发 "when" 时，另一个线程中的 functionPerformance 要么优雅地回滚，要么完成。
4. 合约只有两方，即 Holder（权利方）和 Counterparty（对手方）。
5. 合约以两种镜像形式存在，其中一个可以从另一个推断出来。一方总是将自己视为 Holder。Holder 的义务总是可以用 Counterparty 的权利来表达和推断，反之亦然。
6. 我可能还做出了其他尚未发现的假设 &ndash; 如果您发现了任何，请告诉我！

**问：这门语言有哪些你希望解决的问题？**

答：实现对上述假设中特定语言原子的实现，以及原子组合的实现。（当然，"金融密码学"领域的各种协议、我自己的提案、E 语言等都为此类解决方案提供了许多有价值的构建模块。）

<!--
<h3>技术说明 &ndash; 本语言的创新之处</h3>

<pre>
-- 每条指令之后的特定关键字，将其区分为：
- 异步 (also)
- 异步且原子 (with)
由于不能保证原子性，唯一确定的属性是
两条指令在继续之前都必须完成吗？
在这种情况下，"X with Y" 等价于 "X also Y then"。
- 同步 (then)。这也阻塞所有同等或更低嵌套的
先前异步调用。
-- 我的消息是单向的——它们没有返回参数。
（但话说回来，整个要点是交换权利和履行
语言范围之外定义的服务。实际的
"信息处理"应该使用另一种语言来完成）。
-- E 默认允许 "then"。异步 "also" 式调用必须有
明确的 "when" 来等待其返回。在我的语言中
这些调用在下一个同等或更高嵌套的 "then" 处阻塞，
并且没有返回参数。E 没有
"with" 的等价物，可能是因为原子性没有经过
可靠性验证，而且跨信任边界执行 "with"
（如本文通常所做的那样）需要可信的托管或，
也许，一些非常奇怪的密码学协议。
-- 事件是异步可调用方法，仅当
"when" 处于 "等待" 状态时才活跃。（Catch 也可以
处于 "不活跃" 或 "活跃" 状态）。它们从目标命名子句的叶子开始搜索 when（"throw at target"。
据我所知，E 没有类似的东西。会
破坏能力纪律？（但我的意图是安全地
实现所有原子—— surely 在事件中存在某个子集
可以安全发送，即从不发送能力
在它们的消息参数中？）
</pre>
-->

## 参考文献

<ol class="references">
  <li id="fn1">
    <p>许多情况下，交易在最后一刻告吹——销售人员与法务核实后发现，由于另一份合约中的某项条款，该交易无法进行 &ndash; 例如，承诺在特定时期内不向某行业客户竞争对手销售的条款。更糟糕的是，这种冲突可能直到矛盾的承诺已经做出后才被发现。&nbsp;<a href="#ref1">↩</a></p>
  </li>

  <li id="fn2">
    <p><a href="http://www.erights.org/">E 编程语言</a>&nbsp;<a href="#ref2">↩</a></p>
  </li>

  <li id="fn3">
    <p><em>金融密码学会议论文集</em>，Springer-Verlag&nbsp;<a href="#ref3">↩</a></p>
  </li>

  <li id="fn4">
    <p><a href="http://citeseer.nj.nec.com/jones00composing.html"> 组合合约：金融工程中的冒险</a> &ndash; 一种用于指定金融合约以计算其风险和价值的不同类型的语言。&nbsp;<a href="#ref4">↩</a></p>
  </li>

  <li id="fn5">
    <p>Lopez 和 Raymond，<em>地中海世界的 Medieval Trade</em>，Columbia University Press 2001。&nbsp;<a href="#ref5-1">↩</a>&nbsp;<a href="#ref5-2">↩</a></p>
  </li>
</ol>

---

请将您的评论发送至 nszabo (at) law (dot) gwu (dot) edu

版权所有 &copy; 2002 Nick Szabo\
初步草案 — 仅供经作者书面许可后分发。

--

_编者注：部分链接可能已失效。_
