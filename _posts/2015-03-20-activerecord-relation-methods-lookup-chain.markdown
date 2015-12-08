---
layout: post
title: "理解ActiveRecord::Relation.where等方法的查找链"
date: 2015-03-20
author: Hayden Wei
comments: true
categories: [Rails]
tags: [Rails ActiveRecord Relation where]
duoshuo_thhead_key: 4

---

阅读完本篇文章，你将了解到：

* 类似Book.where(id: 1)这样的方法是如何执行的
* ActiveRecord::Relation对象是什么

### 理解where方法的查找链

假设我们有一个名为Book的model:

``` ruby
class Book < ActiveRecord::Base
end
```

再假设我们要查询id为1的那本书，以 `where` 方法为例，那么我们的查询语句一般会这样写: `Book.where(id: 1)`；但在Book类中你并没有定义`where`方法，那么这句代码是怎样被执行的呢？让我们一起来探究一下。

1、首先，Book类中没有定义where方法；但由于Book类继承自ActiveRecord::Base类，因此方法调用链会去尝试调用ActiveRecord::Base.where方法。

2、通过查看ActiveRecord::Base类的源码可知，ActiveRecord::Base类也没有显式定义where方法；但ActiveRecord::Base类extend了ActiveRecord::Querying模块：

``` ruby  ~/.rvm/gems/ruby-2.1.1@rails3_2_13/gems/activerecord-3.2.13/lib/active_record/base.rb
module ActiveRecord
  class Base
    extend Querying
  end
end
```

3、ActiveRecord::Querying模块也没有显式定义where方法，它使用了`delegate`委派技术将对ActiveRecord::Querying.where的调用转换为调用scoped.where，源码如下：

``` ruby ~/.rvm/gems/ruby-2.1.1@rails3_2_13/gems/activerecord-3.2.13/lib/active_record/querying.rb
delegate :select, :group, :order, :except, :reorder, :limit, :offset, :joins,
         :where, :preload, :eager_load, :includes, :from, :lock, :readonly,
         :having, :create_with, :uniq, :to => :scoped
```

4、可见，Rails将where、group、includes等常用的查询方法都代理到了scoped之上。那么scoped是什么呢？它是ActiveRecord::Scoping::Named模块里的一个方法，用于创建一个空的scope:

``` ruby ~/.rvm/gems/ruby-2.1.1@rails3_2_13/gems/activerecord-3.2.13/lib/active_record/scoping/named.rb
def scoped(options = nil)
  if options
    scoped.apply_finder_options(options)
  else
    if current_scope
      current_scope.clone
    else
      scope = relation
      scope.default_scoped = true
      scope
    end
  end
end
```

5、由于我们调用scoped.where时并没有传入options和current_scope这两个参数，因此scoped方法的执行逻辑会进入到最后一个else语句。那么问题来了，这里的scoped方法是属于谁的呢，怎么可以直接被Book类调用呢？

``` ruby ~/.rvm/gems/ruby-2.1.1@rails3_2_13/gems/activerecord-3.2.13/lib/active_record/scoping.rb
module ActiveRecord
  module Scoping
    extend ActiveSupport::Concern
    included do
      include Named # ActiveRecord::Scoping模块include了ActiveRecord::Scoping::Named模块
    end
  end
end

# From:  ~/.rvm/gems/ruby-2.1.1@rails3_2_13/gems/activerecord-3.2.13/lib/active_record/base.rb
module ActiveRecord
  class Base
    include Scoping # 而ActiveRecord::Base又include了ActiveRecord::Scoping模块
  end
end
```

6、ActiveRecord::Base类通过include ActiveRecord::Scoping模块而引入了scoping方法，因此Book类才能够调用。现在回到上一步，由于执行逻辑进入了最后一个else语句，那么代码`scope = relation`会首先被执行。`relation`是定义在ActiveRecord::Base类的一个private方法：

``` ruby ~/.rvm/gems/ruby-2.1.1@rails3_2_13/gems/activerecord-3.2.13/lib/active_record/base.rb
private

def relation
  relation = Relation.new(self, arel_table)

  if finder_needs_type_condition?
    relation.where(type_condition).create_with(inheritance_column.to_sym => sti_name)
  else
    relation
  end 
end
```

7、可以看出，ActiveRecord::Base.relation方法很简单，仅仅new了一个ActiveRecord::Relation实例便返回了。其中self表示当前的调用类，即本例的Book类。也就是说，ActiveRecord::Base.relation方法返回了一个包含当前调用类表字段信息的Relation对象。

8、第7步完成后，就表示完成了对`scoped`方法的调用，返回的是一个ActiveRecord::Relation对象。还记得第3步中所说的吗？对ActiveRecord::Base.where的调用委派为调用scoped.where；现在由于`scoped`返回的是ActiveRecord::Relation对象，因此就转换为调用ActiveRecord::Relation#where方法了。ActiveRecord::Relation通过include ActiveRecord::QueryMethods模块引入了where方法：

``` ruby ~/.rvm/gems/ruby-2.1.1@rails3_2_13/gems/activerecord-3.2.13/lib/active_record/relation.rb
module ActiveRecord
  class Relation
    include FinderMethods, Calculations, SpawnMethods, QueryMethods, Batches, Explain, Delegation
  end
end

# From: ~/.rvm/gems/ruby-2.1.1@rails3_2_13/gems/activerecord-3.2.13/lib/active_record/relation/query_methods.rb
def where(opts, *rest)
  return self if opts.blank?

  relation = clone
  relation.where_values += build_where(opts, rest)
  relation
end
```

9、where方法中需要注意的是`build_where`这个方法，该方法会最终调用ActiveRecord::Sanitization.sanitize\_sql\_for\_conditions方法来将你传入到where方法中的查询条件转化为一个有效的SQL语句字符串片段。**值得注意的是以Hash的形式传入时是有所不同的。**例如：

``` ruby
Book.where("id = 1"])  #=> 返回["id = 942998"]
Book.where(["id = 1"]) #=> 返回["id = 942998"]
Book.where(id: 1)      #=> 返回包含id=1查询条件的Arel::Nodes::Equality对象数组
```

10、当build_where方法返回后，整个`where`方法也就是返回了。到此为止，你对`books = Book.where(id: 1)`的调用就算是完全执行完了。那么得到的books是什么呢？是你想要的id为1的这本书的信息吗？不是！从上面整个执行过程我们已经得到答案了，**这里的books只是一个ActiveRecord::Relation对象，该对象包含了当前调用类Book的表信息，还包含了需要执行的查询条件的SQL语句，仅此而已。也就是说，这时并没有真正地去连接数据库进行查询。**那么问题又来了，Rails什么时候才去查询数据库呢？

### ActiveRecord::Relation对象何时查询数据库？

1、想象一下我们通常对ActiveRecord::Relation对象做些什么操作？比如上面得到的books对象，我们通常会有这样的操作：

```
books.each do |book|
  p book.id
end
```

2、books是一个ActiveRecord::Relation对象，那么ActiveRecord::Relation.each方法是什么呢？

``` ruby
delegate :to_xml, :to_yaml, :length, :collect, :map, :each, :all?, :include?, :to_ary, :to => :to_a
```

3、可见Rails将我们常用的each、map等方法都委派到了ActiveRecord::Relation.to_a方法上:

``` ruby
def to_a
  # We monitor here the entire execution rather than individual SELECTs
  # because from the point of view of the user fetching the records of a
  # relation is a single unit of work. You want to know if this call takes
  # too long, not if the individual queries take too long.
  #
  # It could be the case that none of the queries involved surpass the
  # threshold, and at the same time the sum of them all does. The user
  # should get a query plan logged in that case.
  logging_query_plan do
    exec_queries
  end
end
```

4、继续升入to\_a方法内部，它调用exec\_queries方法
